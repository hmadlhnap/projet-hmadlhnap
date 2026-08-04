import { WordPressPost, getPostSeoDescription, htmlToText } from "@/lib/blogs";

export default function BlogPostJsonLd({post,siteUrl,}: {post: WordPressPost;siteUrl: string;}): React.JSX.Element {
  const dateModified = post.modified >= post.date ? post.modified : post.date;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${siteUrl}/blog/${post.slug}/#article`,
    headline: htmlToText(post.title.rendered).slice(0, 110),
    description: getPostSeoDescription(post),
    image: {
      "@type": "ImageObject",
      url: `${siteUrl}/images/hero.jpeg`,
      width: 1200,
      height: 630,
    },
    datePublished: post.date,
    dateModified,
    url: `${siteUrl}/blog/${post.slug}`,
    inLanguage: "en",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    author: {
      "@type": "Organization",
      name: "Marrakech Package",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Marrakech Package",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logofooter.jpeg`,
        width: 600,
        height: 60,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
