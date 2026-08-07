import Link from "next/link";
import type { WordPressBlogCard } from "@/lib/blogs";
import BlogCard from "../Blog/Blogcarte";

interface TopBlogsProps {
  posts: WordPressBlogCard[];
}

export default function TopBlogs({posts,}: TopBlogsProps): React.JSX.Element | null {

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className=" text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8 lg:py-4">
        <div className="mx-auto max-w-4xl text-center">
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
             return <BlogCard key={post.id} post={post} />;
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
