import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft,Calendar, Tag } from "lucide-react";
import {
  getBlogPostBySlug,
  getBlogPostSlugs,
  getBlogPosts,
  getPostCategories,
  getPostKeywords,
  getPostSeoTitle,
  getPostSeoDescription,
  htmlToText,
  normalizeInternalLinks,
} from "@/lib/blogs";
import BlogPostJsonLd from "@/components/seo/BlogPostJsonLd";


const SITE_URL =process.env.NEXT_PUBLIC_SITE_URL || "https://marrakechpackage.com";


export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}


export async function generateMetadata({params,}: {params: Promise<{ slug: string }>;}): Promise<Metadata> {
  
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

 if (!post)
   return {
     title: "Article not found",
     robots: { index: false, follow: false },
   };

  const title = getPostSeoTitle(post);
  const description = getPostSeoDescription(post);
  const keywords = getPostKeywords(post);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blog/${slug}`,
      siteName: "Marrakech Package",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: [
        { url: "/images/hero.jpeg", width: 1200, height: 630, alt: title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/hero.jpeg"],
    },
  };
}



function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}


export default async function BlogPostPage({params,}: {params: Promise<{ slug: string }>;}): Promise<React.JSX.Element> {

  const { slug } = await params;
 

  const [post, { posts: latestPosts }] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPosts(1, 5),
  ]);

  if (!post) notFound();
 

  const relatedPosts = latestPosts.filter((p) => p.id !== post.id).slice(0, 4);

  const title = htmlToText(post.title.rendered);
  const category = getPostCategories(post)[0];
  const keywords = getPostKeywords(post);
  const content = normalizeInternalLinks(post.content.rendered);

  return (
    <>
      <BlogPostJsonLd post={post} siteUrl={SITE_URL} />

      <div className="bg-background py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to blog
          </Link>

          {/* 2-column layout: article + aside */}
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
            {/* MAIN ARTICLE */}
            <article className="min-w-0">
              <header>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-secondary">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar
                      className="h-4 w-4 text-primary"
                      aria-hidden="true"
                    />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </span>
                  {category && (
                    <span className="inline-flex items-center gap-1.5">
                      <Tag
                        className="h-4 w-4 text-primary"
                        aria-hidden="true"
                      />
                      {category.name}
                    </span>
                  )}
                </div>

                <h1 className="mt-4 text-3xl font-bold leading-tight text-heading sm:text-4xl lg:text-5xl">
                  {title}
                </h1>
              </header>

              {/* Content */}
              <div
                className="blog-content mt-10"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Keywords */}
              {keywords.length > 0 && (
                <div className="mt-12 border-t border-border pt-6">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted">
                    Related topics
                  </h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {keywords.map((keyword) => (
                      <li
                        key={keyword}
                        className="rounded-md border border-border bg-muted px-3 py-1 text-xs font-medium text-text-secondary"
                      >
                        {keyword}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>

            {/* ASIDE — Related posts (sticky) */}
            {relatedPosts.length > 0 && (
              <aside className="lg:sticky lg:top-24 lg:h-fit">
                <div className="flex items-center justify-between pb-4">
                  <h2 className="text-lg font-bold text-heading">
                    More Articles
                  </h2>
                  <Link
                    href="/blog"
                    className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
                  >
                    View all
                  </Link>
                </div>

                <ul className="mt-4 space-y-3">
                  {relatedPosts.map((related, index) => {
                    const relatedTitle = htmlToText(related.title.rendered);
                    const relatedCategory = getPostCategories(related)[0];

                    return (
                      <li key={related.id}>
                        <Link
                          href={`/blog/${related.slug}`}
                          className="group relative block overflow-hidden rounded-xl border border-border bg-card p-4"
                        >
                          {/* Left accent bar on hover */}
                          <span
                            aria-hidden="true"
                            className="absolute inset-y-0 left-0 w-[4px] bg-primary"
                          />

                          <div className="flex items-start gap-3">
                            {/* Number */}
                            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-muted text-xs font-bold text-primary">
                              {index + 1}
                            </span>

                            <div className="min-w-0">
                              {relatedCategory && (
                                <p className="text-[12px] font-bold uppercase tracking-widest text-primary">
                                  {relatedCategory.name}
                                </p>
                              )}

                              <h3 className="mt-1 line-clamp-2 text-lg font-bold leading-snug text-heading transition-colors group-hover:text-primary">
                                {relatedTitle}
                              </h3>

                              <time
                                dateTime={related.date}
                                className="mt-2 block text-xs text-text-muted"
                              >
                                {formatDate(related.date)}
                              </time>
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
