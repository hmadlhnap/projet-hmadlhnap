const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://marrakechpackage.com";

export default function BlogArchiveJsonLd({currentPage = 1,}: {currentPage?: number;}): React.JSX.Element {
 
   const blogUrl = currentPage > 1 ? `${SITE_URL}/blog/page/${currentPage}` : `${SITE_URL}/blog`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${blogUrl}/#webpage`,
        url: blogUrl,
        name: currentPage > 1 ? `Morocco Travel Blog – Page ${currentPage}` : "Morocco Travel Blog",
        description:"Morocco travel guides, Marrakech tips, and destination stories from local experts.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${SITE_URL}/blog`,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
