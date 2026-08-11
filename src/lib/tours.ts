import "server-only";

export interface WordPressRendered {
  rendered: string;
  protected?: boolean;
}

export interface TourImage {
  ID?: number;
  id: number;
  title?: string;
  filename?: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: Record<string, string | number | boolean>;
}

export type TourHeroImage = TourImage | number | null;

export interface TourTaxonomyTerm {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  filter?: string;
}

export interface ToursByDepartureGroup {
  departure: TourTerm;
  tours: TourCard[];
}


export interface TourAcf {
  tour_badge: string;

  hero_description: string;
  hero_image: TourHeroImage;

  duration: string;

  tour_type: number | null;
  departure: TourTaxonomyTerm | null;

  experience: string;
  accommodation: string;

  highlights: string;

  overview_title: string;
  overview_content: string;

  itinerary_title: string;
  itinerary: string;

  included: string;
  excluded: string;

  price: number | string | null;
  price_label: string;

  faq: string;

  map_embed_url: string;

  related_tours: number[];

  seo_title: string;
  seo_description: string;
  keywords: string;
}

export interface WordPressTour {
  id: number;
  date: string;
  modified: string;

  slug: string;
  status: "publish";
  type: "tour";
  link: string;

  title: WordPressRendered;
  excerpt: WordPressRendered;

  "tour-types"?: number[];
  "tour-departures"?: number[];

  acf: TourAcf;
}


export interface TourCard {
  id: number;
  slug: string;
  date: string;

  title: string;
  excerpt: string;

  tourBadge: string;

  heroImage: TourImage | null;
  heroDescription: string;

  duration: string;
  experience: string;
  accommodation: string;

  price: number | null;
  priceLabel: string;
}

export interface TourTerm {
  id: number;
  name: string;
  slug: string;
  count: number;
}

/* =========================================================
   CONFIGURATION
========================================================= */

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL?.trim().replace(
  /\/+$/,
  "",
);

const TOURS_REST_BASE = "tours";

const TOUR_TYPES_REST_BASE = "tour-types";

const TOUR_DEPARTURES_REST_BASE = "tour-departures";

const TOURS_CACHE_TAG = "wordpress-tours";

const TOURS_REVALIDATE_SECONDS = 600;

const TAXONOMIES_REVALIDATE_SECONDS = 600;

const MAX_TOURS = 100;

const REQUEST_HEADERS = {
  Accept: "application/json",
  "User-Agent": "MarrakechPackage/1.0 (+https://marrakechpackage.com)",
};

function getWordPressApiUrl(): string | null {
  if (!WORDPRESS_API_URL) {
    console.warn("WORDPRESS_API_URL is missing.");

    return null;
  }

  return WORDPRESS_API_URL;
}

function createApiUrl(
  endpoint: string,
  parameters: Record<string, string> = {},
): URL | null {
  const apiUrl = getWordPressApiUrl();

  if (!apiUrl) {
    return null;
  }

  const url = new URL(`${apiUrl}/${endpoint}`);

  for (const [key, value] of Object.entries(parameters)) {
    url.searchParams.set(key, value);
  }

  return url;
}

function createTourUrl(parameters: Record<string, string> = {}): URL | null {
  return createApiUrl(TOURS_REST_BASE, {
    acf_format: "standard",
    ...parameters,
  });
}

export function htmlToText(value: string | null | undefined): string {
  if (!value) {
    return "";
  }

  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&#8217;/g, "’")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;|&apos;/gi, "'")
    .replace(/&hellip;/gi, "…")
    .replace(/\s+/g, " ")
    .trim();
}

export function linesToArray(value: string | null | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getTourImage(image: TourHeroImage): TourImage | null {
  if (!image || typeof image === "number") {
    return null;
  }

  return image;
}

export function parseFaq(
  html: string | null | undefined,
): { question: string; answer: string }[] {
  if (!html) {
    return [];
  }

  const faqItems: {
    question: string;
    answer: string;
  }[] = [];

  const pattern = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;

  for (const match of html.matchAll(pattern)) {
    const question = htmlToText(match[1] ?? "");
    const answer = htmlToText(match[2] ?? "");

    if (question && answer) {
      faqItems.push({
        question,
        answer,
      });
    }
  }

  return faqItems;
}

/* =========================================================
   NORMALIZERS
========================================================= */

function normalizePrice(
  value: number | string | null | undefined,
): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const price = Number(value);

  if (!Number.isFinite(price)) {
    return null;
  }

  return price;
}

function normalizeSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "");
}

function isValidSlug(value: string): boolean {
  return /^[a-z0-9-]+$/.test(value);
}

/* =========================================================
   TOUR CARD MAPPER
========================================================= */

function mapTourCard(tour: WordPressTour): TourCard {
  return {
    id: tour.id,

    slug: tour.slug,

    date: tour.date,

    title: htmlToText(tour.title?.rendered),

    excerpt: htmlToText(tour.excerpt?.rendered),

    tourBadge: tour.acf?.tour_badge ?? "",

    heroImage: getTourImage(tour.acf?.hero_image ?? null),

    heroDescription: tour.acf?.hero_description ?? "",

    duration: tour.acf?.duration ?? "",

    experience: tour.acf?.experience ?? "",

    accommodation: tour.acf?.accommodation ?? "",

    price: normalizePrice(tour.acf?.price),

    priceLabel: tour.acf?.price_label ?? "",
  };
}

/* =========================================================
   INTERNAL TOUR CARDS FETCH
========================================================= */

async function fetchTourCards(
  filters: Record<string, string> = {},
  extraTags: string[] = [],
  limit?: number,
): Promise<TourCard[]> {
  const perPage =
    typeof limit === "number" && limit > 0
      ? Math.min(Math.floor(limit), MAX_TOURS)
      : MAX_TOURS;

  const url = createTourUrl({
    status: "publish",
    per_page: String(perPage),
    orderby: "date",
    order: "desc",
    acf_format: "standard",

    _fields: [
      "id",
      "slug",
      "date",
      "title",
      "excerpt",
      "acf.tour_badge",
      "acf.hero_description",
      "acf.hero_image",
      "acf.duration",
      "acf.experience",
      "acf.accommodation",
      "acf.price",
      "acf.price_label",
    ].join(","),

    ...filters,
  });

  if (!url) {
    return [];
  }

  try {
    const response = await fetch(url, {
      headers: REQUEST_HEADERS,

      next: {
        revalidate: TOURS_REVALIDATE_SECONDS,
        tags: [TOURS_CACHE_TAG, ...extraTags],
      },
    });

    if (!response.ok) {
      console.error(`Unable to fetch tours. Status: ${response.status}`);

      return [];
    }

    const result: unknown = await response.json();

    if (!Array.isArray(result)) {
      return [];
    }

    return result.map(mapTourCard);
  } catch (error) {
    console.error("Unable to fetch tours:", error);

    return [];
  }
}

/* =========================================================
   INTERNAL TAXONOMY TERM BY SLUG
========================================================= */

async function getTermBySlug(
  taxonomyRestBase: string,
  slug: string,
): Promise<TourTerm | null> {
  const normalizedSlug = normalizeSlug(slug);

  if (!normalizedSlug || !isValidSlug(normalizedSlug)) {
    return null;
  }

  const url = createApiUrl(taxonomyRestBase, {
    slug: normalizedSlug,
    per_page: "1",
    _fields: "id,name,slug,count",
  });

  if (!url) {
    return null;
  }

  try {
    const response = await fetch(url, {
      headers: REQUEST_HEADERS,
      next: {
        revalidate: TAXONOMIES_REVALIDATE_SECONDS,

        tags: [TOURS_CACHE_TAG, `wordpress-${taxonomyRestBase}`],
      },
    });

    if (!response.ok) {
      console.error(
        `Unable to fetch taxonomy "${taxonomyRestBase}" term "${normalizedSlug}". Status: ${response.status}`,
      );

      return null;
    }

    const result: unknown = await response.json();

    if (!Array.isArray(result)) {
      return null;
    }

    const terms = result as TourTerm[];

    return terms[0] ?? null;
  } catch (error) {
    console.error(
      `Taxonomy fetching error for "${taxonomyRestBase}/${normalizedSlug}":`,
      error instanceof Error ? error.message : error,
    );

    return null;
  }
}

/* =========================================================
   INTERNAL GET TAXONOMY TERMS
========================================================= */

async function getTaxonomyTerms(taxonomyRestBase: string): Promise<TourTerm[]> {
  const url = createApiUrl(taxonomyRestBase, {
    per_page: "100",
    hide_empty: "true",
    orderby: "name",
    order: "asc",
    _fields: "id,name,slug,count",
  });

  if (!url) {
    return [];
  }

  try {
    const response = await fetch(url, {
      headers: REQUEST_HEADERS,

      next: {
        revalidate: TAXONOMIES_REVALIDATE_SECONDS,

        tags: [TOURS_CACHE_TAG, `wordpress-${taxonomyRestBase}`],
      },
    });

    if (!response.ok) {
      console.error(
        `Unable to fetch taxonomy "${taxonomyRestBase}". Status: ${response.status}`,
      );

      return [];
    }

    const result: unknown = await response.json();

    if (!Array.isArray(result)) {
      return [];
    }

    return result as TourTerm[];
  } catch (error) {
    console.error(
      `Taxonomy "${taxonomyRestBase}" fetching error:`,
      error instanceof Error ? error.message : error,
    );

    return [];
  }
}

/* =========================================================
   2. GET TOUR DETAILS
========================================================= */

export async function getDetailsTour(
  slug: string,
): Promise<WordPressTour | null> {
  const normalizedSlug = normalizeSlug(slug);

  if (!normalizedSlug || !isValidSlug(normalizedSlug)) {
    return null;
  }

  const url = createTourUrl({
    status: "publish",
    slug: normalizedSlug,
    per_page: "1",
  });

  if (!url) {
    return null;
  }

  try {
    const response = await fetch(url, {
      headers: REQUEST_HEADERS,
      next: {
        revalidate: TOURS_REVALIDATE_SECONDS,

        tags: [TOURS_CACHE_TAG, `wordpress-tour-${normalizedSlug}`],
      },
    });

    if (!response.ok) {
      console.error(
        `Unable to fetch tour "${normalizedSlug}". Status: ${response.status}`,
      );

      return null;
    }

    const result: unknown = await response.json();

    if (!Array.isArray(result)) {
      return null;
    }

    return (result[0] as WordPressTour | undefined) ?? null;
  } catch (error) {
    console.error(
      `Tour details fetching error for "${normalizedSlug}":`,
      error instanceof Error ? error.message : error,
    );

    return null;
  }
}

/* =========================================================
   3. GET ALL TOUR SLUGS
========================================================= */

export async function getTourSlugs(): Promise<string[]> {
  const url = createTourUrl({
    status: "publish",
    per_page: String(MAX_TOURS),
    orderby: "date",
    order: "desc",
    _fields: "slug",
  });

  if (!url) {
    return [];
  }

  try {
    const response = await fetch(url, {
      headers: REQUEST_HEADERS,
      next: {
        revalidate: TOURS_REVALIDATE_SECONDS,
        tags: [TOURS_CACHE_TAG, "wordpress-tour-slugs"],
      },
    });

    if (!response.ok) {
      console.error(`Unable to fetch tour slugs. Status: ${response.status}`);
      return [];
    }

    const result: unknown = await response.json();

    if (!Array.isArray(result)) {
      return [];
    }

    return Array.from(
      new Set(
        (result as Array<{ slug?: string }>)
          .map((tour) => tour.slug?.trim() ?? "")
          .filter(Boolean),
      ),
    );
  } catch (error) {
    console.error(
      "Tour slugs fetching error:",
      error instanceof Error ? error.message : error,
    );

    return [];
  }
}

/* =========================================================
   4. GET TOURS BY TYPE
========================================================= */

/*
 * getToursByType("shared")
 */

export async function getSharedTours(): Promise<TourCard[]> {
  const term = await getTermBySlug(TOUR_TYPES_REST_BASE, "shared");

  if (!term) {
    return [];
  }

  return fetchTourCards(
    {
      [TOUR_TYPES_REST_BASE]: String(term.id),
    },
    ["wordpress-tour-type-shared"],
  );
}

/* =========================================================
   6. GET TOUR TYPES
========================================================= */

export async function getTourTypes(): Promise<TourTerm[]> {
  return getTaxonomyTerms(TOUR_TYPES_REST_BASE);
}

/* =========================================================
   7. GET TOUR DEPARTURES
========================================================= */

export async function getTourDepartures(): Promise<TourTerm[]> {
  return getTaxonomyTerms(TOUR_DEPARTURES_REST_BASE);
}


// get relative tours
export async function getRelatedToursByIds(ids: number[],currentTourId?: number,): Promise<TourCard[]> {

  const validIds = Array.from(
    new Set(
      ids.filter(
        (id) => Number.isInteger(id) && id > 0 && id !== currentTourId,
      ),
    ),
  );

  if (validIds.length === 0) {
    return [];
  }

  return fetchTourCards(
    {
      include: validIds.join(","),
      orderby: "include",
      per_page: String(validIds.length),
    },
    ["wordpress-related-tours"],
  );
}


// get tours by departure and type

export async function getToursByDepartureAndType(departureSlug: string,typeSlug: string,limit?: number,): Promise<TourCard[]> {

  const normalizedDeparture = normalizeSlug(departureSlug);
  const normalizedType = normalizeSlug(typeSlug);

  if (
    !normalizedDeparture ||
    !normalizedType ||
    !isValidSlug(normalizedDeparture) ||
    !isValidSlug(normalizedType)
  ) {
    return [];
  }

  const [departureTerm, typeTerm] = await Promise.all([
    getTermBySlug(TOUR_DEPARTURES_REST_BASE, normalizedDeparture),
    getTermBySlug(TOUR_TYPES_REST_BASE, normalizedType),
  ]);

  if (!departureTerm || !typeTerm) {
    return [];
  }

  return fetchTourCards(
    {
      [TOUR_DEPARTURES_REST_BASE]: String(departureTerm.id),
      [TOUR_TYPES_REST_BASE]: String(typeTerm.id),
      tax_relation: "AND",
    },
    [
      `wordpress-tour-departure-${normalizedDeparture}`,
      `wordpress-tour-type-${normalizedType}`,
    ],
    limit,
  );
}


// GET TOURS GROUPED BY DEPARTURE

export async function getToursGroupedByDeparture(): Promise<ToursByDepartureGroup[]> {

  try {
    const [privateTerm, departures] = await Promise.all([
      getTermBySlug(TOUR_TYPES_REST_BASE, "private"),
      getTourDepartures(),
    ]);

    if (!privateTerm) {
      return [];
    }

    const url = createTourUrl({
      status: "publish",
      per_page: String(MAX_TOURS),
      orderby: "date",
      order: "desc",

      [TOUR_TYPES_REST_BASE]: String(privateTerm.id),

      _fields: [
        "id",
        "slug",
        "date",
        "title",
        "excerpt",
        "tour-departures",
        "acf.tour_badge",
        "acf.hero_description",
        "acf.hero_image",
        "acf.duration",
        "acf.experience",
        "acf.accommodation",
        "acf.price",
        "acf.price_label",
      ].join(","),
    });

    if (!url) {
      return [];
    }

    const response = await fetch(url, {
      headers: REQUEST_HEADERS,

      next: {
        revalidate: TOURS_REVALIDATE_SECONDS,
        tags: [
          TOURS_CACHE_TAG,
          "wordpress-private-tours-grouped-by-departure",
        ],
      },
    });

    if (!response.ok) {
      console.error(
        `Unable to fetch private tours grouped by departure. Status: ${response.status}`,
      );

      return [];
    }

    const result: unknown = await response.json();

    if (!Array.isArray(result)) {
      return [];
    }

    const tours = result as WordPressTour[];

    return departures
      .map((departure) => {
        const departureTours = tours
          .filter((tour) =>
            tour["tour-departures"]?.includes(departure.id),
          )
          .map(mapTourCard);

        return {
          departure,
          tours: departureTours,
        };
      })
      .filter((group) => group.tours.length > 0);
  } catch (error) {
    console.error(
      "Unable to fetch private tours grouped by departure:",
      error instanceof Error ? error.message : error,
    );

    return [];
  }
}