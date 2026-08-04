import Link from "next/link";
import {getPostCategories,getPostKeywords, htmlToText,} from "@/lib/blogs";


import type { WordPressBlogCard } from "@/lib/blogs";
import { ArrowRight } from "lucide-react";

interface TopBlogsProps {
  posts: WordPressBlogCard[];
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function TopBlogs({posts,}: TopBlogsProps): React.JSX.Element | null {

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className=" text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8 lg:py-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            From Our Blog
          </span>

          <h2 className="mt-3 text-4xl font-bold leading-tight text-heading sm:text-5xl">
            Latest Travel <span className="text-primary">Stories & Guides</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
            Discover expert travel tips, inspiring stories and practical guides
            for exploring Marrakech and the most remarkable destinations in
            Morocco.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const title = htmlToText(post.title.rendered);
            const excerpt = htmlToText(post.excerpt.rendered);
            const category = getPostCategories(post)[0];
            const keywords = getPostKeywords(post).slice(0, 3);

            return (
              <article
                key={post.id}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 "
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] bg-primary"
                />

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-text-muted">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>

                  {category && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="rounded-full bg-gold-muted px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                        {category.name}
                      </span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h2 className="mt-4 line-clamp-2 text-2xl font-bold leading-snug text-heading">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors before:absolute before:inset-0 hover:text-primary"
                  >
                    {title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-heading">
                  {excerpt}
                </p>

                {/* Keywords */}
                {keywords.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {keywords.map((keyword) => (
                      <li
                        key={keyword}
                        className="rounded-md border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-text-secondary"
                      >
                        {keyword}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Read more */}
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read article
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </article>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center  px-1 text-sm font-semibold text-heading transition hover:border-primary hover:text-primary"
          >
            Explore all travel stories
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
