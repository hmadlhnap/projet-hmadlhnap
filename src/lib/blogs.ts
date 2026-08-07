import "server-only";
import { cache } from "react";

export interface WordPressRendered {
  rendered: string;
  protected?: boolean;
}

export interface WordPressAuthor {
  id: number;
  name: string;
  slug: string;
  link: string;
}

export interface WordPressTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: "category" | "post_tag";
}

export interface WordPressBlogAcf {
  seo_title?: string;
  seo_description?: string;
  keywords?: string;
}

export interface WordPressPostPreview {
  id: number;
  slug: string;
  date: string;

  title: WordPressRendered;
  excerpt: WordPressRendered;

  acf?: WordPressBlogAcf;

  _embedded?: {
    author?: WordPressAuthor[];
    "wp:term"?: WordPressTerm[][];
  };
}

export interface WordPressPost extends WordPressPostPreview {
  status: "publish";
  modified: string;
  link: string;

  categories: number[];
  content: WordPressRendered;
}

export type WordPressBlogCard = WordPressPostPreview;

export interface PaginatedBlogPosts {
  posts: WordPressPostPreview[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

interface WordPressPostSlug {
  slug: string;
}

/* =========================================================
   WORDPRESS CONFIGURATION
========================================================= */

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL?.replace(/\/+$/, "");

const BLOG_REVALIDATE_SECONDS = 600;

const BLOG_CACHE_TAG = "wordpress-blog-posts";



function getWordPressApiUrl(): string | null {
  if (!WORDPRESS_API_URL) {
    console.warn("WORDPRESS_API_URL is missing from environment variables.");

    return null;
  }

  return WORDPRESS_API_URL;
}

function createBlogUrl(parameters: Record<string, string>): URL | null {
  const apiUrl = getWordPressApiUrl();

  if (!apiUrl) {
    return null;
  }

  const url = new URL(`${apiUrl}/posts`);

  for (const [key, value] of Object.entries(parameters)) {
    url.searchParams.set(key, value);
  }

  return url;
}



/* =========================================================
   TEXT HELPERS
========================================================= */

export function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCodePoint(Number(code)),
    )
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;|&apos;/gi, "'")
    .replace(/&hellip;/gi, "…")
    .replace(/&ndash;/gi, "–")
    .replace(/&mdash;/gi, "—")
    .replace(/\s+/g, " ")
    .trim();
}

export function getPostTerms(post: WordPressPostPreview): WordPressTerm[] {
  return post._embedded?.["wp:term"]?.flat() ?? [];
}

export function getPostCategories(post: WordPressPostPreview): WordPressTerm[] {
  return getPostTerms(post).filter((term) => term.taxonomy === "category");
}

/* =========================================================
   SEO HELPERS
========================================================= */

export function getPostSeoTitle(post: WordPressPostPreview): string {
  const seoTitle = post.acf?.seo_title?.trim();

  if (seoTitle) {
    return seoTitle;
  }

  return htmlToText(post.title?.rendered ?? "");
}


function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim() + "…";
}

export function getPostSeoDescription(post: WordPressPost): string {
  const seoDescription = post.acf?.seo_description?.trim();

  if (seoDescription) {
    return seoDescription;
  }

  const excerpt = htmlToText(post.excerpt?.rendered ?? "");

  if (excerpt) {
    return truncate(excerpt, 180);
  }

  return truncate(htmlToText(post.content?.rendered ?? ""), 180);
}


export function getPostKeywords(post: WordPressPostPreview): string[] {
  const keywords = post.acf?.keywords ?? "";

  return [
    ...new Set(keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean),
    ),
  ];
}


/**
 * Garde la compatibilité avec ton ancienne fonction.
 */
export function getPostDescription(post: WordPressPost): string {
  return getPostSeoDescription(post);
}


/* =========================================================
   GET PAGINATED BLOG POSTS
========================================================= */

function isValidPost(post: unknown): post is WordPressPostPreview {
  return (
    typeof post === "object" &&
    post !== null &&
    typeof (post as WordPressPostPreview).id === "number" &&
    typeof (post as WordPressPostPreview).slug === "string" &&
    typeof (post as WordPressPostPreview).title?.rendered === "string"
  );
}

export async function getBlogPosts(page = 1,perPage = 6,): Promise<PaginatedBlogPosts> {

  const safePage = Math.max(1, Math.trunc(page));

  const safePerPage = Math.min(100, Math.max(1, Math.trunc(perPage)));

  const emptyResult: PaginatedBlogPosts = {
    posts: [],
    totalPosts: 0,
    totalPages: 1,
    currentPage: safePage,
    perPage: safePerPage,
  };

  const url = createBlogUrl({
    status: "publish",
    orderby: "date",
    order: "desc",
    page: String(safePage),
    per_page: String(safePerPage),
    _embed: "wp:term",
    _fields: [
      "id",
      "slug",
      "date",
      "title",
      "excerpt",
      "acf",
      "_links",
      "_embedded",
    ].join(","),
  });

  if (!url) {
    return emptyResult;
  }

  try {
    const response = await fetch(url, {
      next: {
        revalidate: BLOG_REVALIDATE_SECONDS,
        tags: [BLOG_CACHE_TAG],
      },
    });

    if (!response.ok) {
      console.error(
        `Unable to fetch WordPress posts. Status: ${response.status}`,
      );

      return emptyResult;
    }

    const result = await response.json();

    const posts = Array.isArray(result) ? result.filter(isValidPost) : [];

    const totalPosts = Number(response.headers.get("X-WP-Total") ?? posts.length,);

    const totalPages = Number(response.headers.get("X-WP-TotalPages") ?? 1);


    return {
      posts,
      totalPosts: Number.isFinite(totalPosts) ? totalPosts : posts.length,
      totalPages:Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1,
      currentPage: safePage,
      perPage: safePerPage,
    };
  } catch (error) {
    console.error(
      "WordPress posts fetching error:",
      error instanceof Error ? error.message : error,
    );

    return emptyResult;
  }
}




/* =========================================================
   GET BLOG POST BY SLUG
========================================================= */

export const getBlogPostBySlug = cache(
  async (slug: string): Promise<WordPressPost | null> => {
    const normalizedSlug = slug.trim();

    if (!normalizedSlug) {
      return null;
    }

    const url = createBlogUrl({
      slug: normalizedSlug,
      status: "publish",
      per_page: "1",
      _embed: "author,wp:term",
    });

    if (!url) {
      return null;
    }

    try {
      const response = await fetch(url, {
        next: {
          revalidate: BLOG_REVALIDATE_SECONDS,
          tags: [BLOG_CACHE_TAG, `wordpress-blog-post-${normalizedSlug}`],
        },
      });

      if (!response.ok) {
        console.error(
          `Unable to fetch WordPress post "${normalizedSlug}". Status: ${response.status}`,
        );

        return null;
      }

      const result = await response.json();

      const posts = Array.isArray(result) ? (result as WordPressPost[]) : [];

      return posts[0] ?? null;
    } catch (error) {
      console.error(
        `WordPress post fetching error for "${normalizedSlug}":`,
        error instanceof Error ? error.message : error,
      );

      return null;
    }
  },
);


/* =========================================================
   GET ALL BLOG SLUGS
========================================================= */

async function getBlogSlugsPage(page: number): Promise<{
  posts: WordPressPostSlug[];
  totalPages: number;
}> {
  const url = createBlogUrl({
    status: "publish",
    per_page: "100",
    page: String(page),
    _fields: "slug",
  });

  if (!url) {
    return {
      posts: [],
      totalPages: 1,
    };
  }

  try {
    const response = await fetch(url, {
      next: {
        revalidate: BLOG_REVALIDATE_SECONDS,
        tags: [BLOG_CACHE_TAG],
      },
    });

    if (!response.ok) {
      console.error(
        `Unable to fetch blog slugs page ${page}. Status: ${response.status}`,
      );

      return {
        posts: [],
        totalPages: 1,
      };
    }

    const result = await response.json();

    const posts = Array.isArray(result) ? (result as WordPressPostSlug[]) : [];

    const totalPages = Number(response.headers.get("X-WP-TotalPages") ?? 1);

    return {
      posts,
      totalPages:
        Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1,
    };
  } catch (error) {
    console.error(
      `WordPress blog slugs page ${page} fetching error:`,
      error instanceof Error ? error.message : error,
    );

    return {
      posts: [],
      totalPages: 1,
    };
  }
}


export async function getBlogPostSlugs(): Promise<string[]> {
  const firstPage = await getBlogSlugsPage(1);

  if (firstPage.totalPages === 1) {
    return firstPage.posts.map((post) => post.slug).filter(Boolean);
  }

  const remainingPageNumbers = Array.from(
    {
      length: firstPage.totalPages - 1,
    },
    (_, index) => index + 2,
  );

  const remainingPages = await Promise.all(
    remainingPageNumbers.map((page) => getBlogSlugsPage(page)),
  );

  return [
    ...firstPage.posts,
    ...remainingPages.flatMap((result) => result.posts),
  ]
    .map((post) => post.slug)
    .filter(Boolean);
}



export function normalizeInternalLinks(html: string): string {
  return html.replace(
    /href="https?:\/\/(www\.)?marrakechpackage\.com([^"]*)"/gi,
    'href="$2"',
  );
}