import type { Metadata } from "next";
import BlogArchive from "@/components/sections/Blog/BlogArchive";
import BlogArchiveJsonLd from "@/components/seo/BlogArchiveJsonLd";

export const metadata: Metadata = {
  title: "Morocco Travel Blog | Guides, Tips & Marrakech package",
  description:
    "Explore Morocco travel guides, Marrakech tips, and destination stories from our local experts. Practical advice for planning an unforgettable Moroccan journey.",
  keywords: [
    "Morocco travel blog",
    "Marrakech travel guide",
    "Morocco travel tips",
    "things to do in Marrakech",
    "morocco trip guide",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: "/blog",
    siteName: "Marrakech Package",
    title: "Morocco Travel Blog | Marrakech Package",
    description:
      "Morocco travel guides, Marrakech tips, and destination stories from local experts.",
    locale: "en_US",
    images: [
      {
        url: "/images/hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Marrakech skyline with the Koutoubia Mosque at sunset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morocco Travel Blog | Marrakech Package",
    description:
      "Morocco travel guides, Marrakech tips, and destination stories from local experts.",
    images: ["/images/hero.jpeg"],
  },
};



export default function BlogPage(): React.JSX.Element {
  return (
     <>
    <BlogArchiveJsonLd currentPage={1} />
    <BlogArchive currentPage={1} />;
     </>
  );
}
