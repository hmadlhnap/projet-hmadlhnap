import "server-only";

export interface WordPressRendered {
  rendered: string;
  protected?: boolean;
}

export interface DayTripImage {
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

export type DayTripHeroImage = DayTripImage | number | null;

export type DayTripType = "shared" | "private" | "shared_private";

export interface DayTripAcf {
  hero_image: DayTripHeroImage;
  hero_description: string;

  duration: string;
  departure_city: string;
  transport: string;
  day_trip_type: DayTripType;

  highlights: string;

  overview_title: string;
  overview_content: string;
  why_choose: string;

  itinerary_title: string;
  itinerary: string;
  included: string;
  excluded: string;

  content_sections: string;
  important_information: string;
  faq: string;

  shared_tour_price: number | null;
  private_tour_price: number | null;

  seo_title: string;
  seo_description: string;
  keywords: string;
}

export interface WordPressDayTrip {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: "publish";
  type: "day-trips";
  link: string;

  title: WordPressRendered;
  excerpt: WordPressRendered;

  acf: DayTripAcf;
}

export interface DayTripCard {
  id: number;
  slug: string;
  date: string;

  title: string;
  excerpt: string;

  heroImage: DayTripImage | null;
  heroDescription: string;

  duration: string;
  departureCity: string;
  transport: string;
  dayTripType: DayTripType;

  sharedTourPrice: number | null;
  privateTourPrice: number | null;
}

/* =========================================================
   CONFIGURATION
========================================================= */

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL?.replace(/\/+$/, "");

const DAY_TRIPS_CACHE_TAG = "wordpress-day-trips";
const DAY_TRIPS_REVALIDATE_SECONDS = 600;

function getWordPressApiUrl(): string | null {
  if (!WORDPRESS_API_URL) {
    console.warn("WORDPRESS_API_URL is missing.");
    return null;
  }

  return WORDPRESS_API_URL;
}

function createDayTripUrl(parameters: Record<string, string>): URL | null {
  const apiUrl = getWordPressApiUrl();

  if (!apiUrl) {
    return null;
  }

  const url = new URL(`${apiUrl}/day-trips`);

  // Permet à ACF de retourner hero_image en Image Array.
  url.searchParams.set("acf_format", "standard");

  for (const [key, value] of Object.entries(parameters)) {
    url.searchParams.set(key, value);
  }

  return url;
}

/* =========================================================
   HELPERS
========================================================= */

export function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;|&apos;/gi, "'")
    .replace(/&hellip;/gi, "…")
    .replace(/\s+/g, " ")
    .trim();
}

export function linesToArray(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getDayTripImage(image: DayTripHeroImage): DayTripImage | null {
  if (!image || typeof image === "number") {
    return null;
  }
  return image;
}

/* =========================================================
   1. GET DAY TRIP CARDS
========================================================= */

export async function getCarteDayTrip(limit = 12): Promise<DayTripCard[]> {
  const safeLimit = Math.min(100, Math.max(1, Math.trunc(limit)));

  const url = createDayTripUrl({
    status: "publish",
    orderby: "date",
    order: "desc",
    per_page: String(safeLimit),
    _fields: "id,slug,date,title,excerpt,acf",
  });

  if (!url) {
    return [];
  }

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "MarrakechPackage/1.0 (+https://marrakechpackage.com)",
      },
      next: {
        revalidate: DAY_TRIPS_REVALIDATE_SECONDS,
        tags: [DAY_TRIPS_CACHE_TAG],
      },
    });

    if (!response.ok) {
      console.error(
        `Unable to fetch day trip cards. Status: ${response.status}`,
      );
      return [];
    }

    const result: unknown = await response.json();

    if (!Array.isArray(result)) {
      return [];
    }

    const dayTrips = result as WordPressDayTrip[];

    return dayTrips.map((dayTrip) => ({
      id: dayTrip.id,
      slug: dayTrip.slug,
      date: dayTrip.date,

      title: htmlToText(dayTrip.title?.rendered ?? ""),
      excerpt: htmlToText(dayTrip.excerpt?.rendered ?? ""),

      heroImage: getDayTripImage(dayTrip.acf?.hero_image ?? null),
      heroDescription: dayTrip.acf?.hero_description ?? "",

      duration: dayTrip.acf?.duration ?? "",
      departureCity: dayTrip.acf?.departure_city ?? "",
      transport: dayTrip.acf?.transport ?? "",
      dayTripType: dayTrip.acf?.day_trip_type ?? "private",

      sharedTourPrice: dayTrip.acf?.shared_tour_price ?? null,
      privateTourPrice: dayTrip.acf?.private_tour_price ?? null,
    }));
  } catch (error) {
    console.error(
      "Day trip cards fetching error:",
      error instanceof Error ? error.message : error,
    );

    return [];
  }
}

/* =========================================================
   2. GET DAY TRIP DETAILS BY SLUG
========================================================= */

export async function getDetailsDayTrip(
  slug: string,
): Promise<WordPressDayTrip | null> {
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    return null;
  }

  const url = createDayTripUrl({
    status: "publish",
    slug: normalizedSlug,
    per_page: "1",
  });

  if (!url) {
    return null;
  }

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "MarrakechPackage/1.0 (+https://marrakechpackage.com)",
      },
      next: {
        revalidate: DAY_TRIPS_REVALIDATE_SECONDS,
        tags: [DAY_TRIPS_CACHE_TAG, `wordpress-day-trip-${normalizedSlug}`],
      },
    });

    if (!response.ok) {
      console.error(
        `Unable to fetch day trip "${normalizedSlug}". Status: ${response.status}`,
      );
      return null;
    }

    const result: unknown = await response.json();

    if (!Array.isArray(result)) {
      return null;
    }

    return (result[0] as WordPressDayTrip | undefined) ?? null;
  } catch (error) {
    console.error(
      `Day trip details fetching error for "${normalizedSlug}":`,
      error instanceof Error ? error.message : error,
    );

    return null;
  }
}

/* =========================================================
   3. GET ALL DAY TRIP SLUGS
========================================================= */

export async function getDayTripSlugs(): Promise<string[]> {
  const url = createDayTripUrl({
    status: "publish",
    per_page: "100",
    orderby: "date",
    order: "desc",
    _fields: "slug",
  });

  if (!url) {
    return [];
  }

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "MarrakechPackage/1.0 (+https://marrakechpackage.com)",
      },
      next: {
        revalidate: DAY_TRIPS_REVALIDATE_SECONDS,
        tags: [DAY_TRIPS_CACHE_TAG],
      },
    });

    if (!response.ok) {
      console.error(
        `Unable to fetch Day Trip slugs. Status: ${response.status}`,
      );

      return [];
    }

    const result: unknown = await response.json();

    if (!Array.isArray(result)) {
      return [];
    }

    const dayTrips = result as Array<{
      slug?: string;
    }>;

    return dayTrips
      .map((dayTrip) => dayTrip.slug?.trim() ?? "")
      .filter(Boolean);
  } catch (error) {
    console.error(
      "Day Trip slugs fetching error:",
      error instanceof Error ? error.message : error,
    );
    return [];
  }
}



export function parseFaq(html: string): { question: string; answer: string }[] {
  if (!html) return [];

  const paragraphs = html
    .split(/<\/p>/i)
    .map((p) => p.replace(/<[^>]+>/g, "").trim())
    .filter((p) => p.length > 0);

  const faqs: { question: string; answer: string }[] = [];

  for (let i = 0; i < paragraphs.length; i += 2) {
    const question = paragraphs[i];
    const answer = paragraphs[i + 1];
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  return faqs;
}