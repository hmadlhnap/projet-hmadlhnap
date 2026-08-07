import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WordPressBlogCard, getPostCategories,getPostKeywords,htmlToText,} from "@/lib/blogs";
import { formatDate } from "@/hooks/date";


export default function BlogCard({post,}: { post: WordPressBlogCard;}): React.JSX.Element {

  const title = htmlToText(post.title.rendered);
  const excerpt = htmlToText(post.excerpt.rendered);
  const category = getPostCategories(post)[0];
  const keywords = getPostKeywords(post).slice(0, 3);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
     

      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-primary"
      />

     
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

     
      <h2 className="mt-4 line-clamp-2 text-xl font-bold leading-snug text-heading">
        <Link
          href={`/blog/${post.slug}`}
          className="transition-colors before:absolute before:inset-0 hover:text-primary"
        >
          {title}
        </Link>
      </h2>

      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-text-secondary">
        {excerpt}
      </p>


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

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        Read article
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </article>
  );
}
