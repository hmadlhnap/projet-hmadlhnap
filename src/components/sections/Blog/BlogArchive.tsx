import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBlogPosts, getPostCategories, htmlToText ,getPostKeywords} from "@/lib/blogs";

import BlogPagination from "./BlogPagination";

interface BlogArchiveProps {
  currentPage: number;
}


function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}


export default async function BlogArchive({currentPage,}: BlogArchiveProps): Promise<React.JSX.Element> {

  const { posts, totalPages } = await getBlogPosts(currentPage, 6);
  

  return (
    <section className="min-h-[800px] bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl">
       


        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Our Blog
          </span>

          <h1 className="mt-3 text-4xl font-bold leading-tight text-heading sm:text-5xl">
            Morocco Travel <span className="text-primary">Guides</span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
            Inspiring stories, destination guides, and practical tips to help
            you explore Morocco and plan your next adventure.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="mx-auto mt-14 max-w-lg rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
            <h2 className="text-xl font-bold text-heading">
              Articles temporarily unavailable
            </h2>
            <p className="mt-2 text-text-secondary">
              Please return shortly to read our latest Morocco travel guides.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const title = htmlToText(post.title.rendered);
                const excerpt = htmlToText(post.excerpt.rendered);
                const category = getPostCategories(post)[0];
                const keywords = getPostKeywords(post).slice(0, 3); 

                return (
                  <article
                    key={post.id}
                    className="group mt-8 relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 "
                  >

                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-primary"/>

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

            <BlogPagination currentPage={currentPage} totalPages={totalPages} />
          </>
        )}
      </div>
    </section>
  );
}
