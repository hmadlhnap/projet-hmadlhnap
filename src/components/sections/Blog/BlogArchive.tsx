import { getBlogPosts} from "@/lib/blogs";

import BlogPagination from "./BlogPagination";
import BlogCard from "./Blogcarte";

interface BlogArchiveProps {
  currentPage: number;
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
            {currentPage > 1 && (
              <span className="mt-2 block text-lg font-semibold text-text-secondary sm:text-xl">
                Page {currentPage}
              </span>
            )}
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
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                return <BlogCard key={post.id} post={post} />;
              })}
            </div>

            <BlogPagination currentPage={currentPage} totalPages={totalPages} />
          </>
        )}
      </div>
    </section>
  );
}
