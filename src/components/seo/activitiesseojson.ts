import type { Activity } from "@/data/activities";

const SITE_URL =process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || "https://marrakechpackage.com";
const SITE_NAME = "Marrakech Package";
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function getAbsoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function getActivityUrl(slug: string): string {
  return `${SITE_URL}/activities/${slug}`;
}


export function createActivityJsonLd(activity: Activity) {
  const pageUrl = getActivityUrl(activity.slug);

  const pageId = `${pageUrl}#webpage`;
  const serviceId = `${pageUrl}#activity`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  const heroImageId = `${pageUrl}#primaryimage`;
  const contentImageId = `${pageUrl}#contentimage`;

  const heroImageUrl = getAbsoluteUrl(activity.heroImage.src);

  const contentImageUrl = getAbsoluteUrl(activity.contentImage.src);

  const faqQuestions = activity.faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        url: SITE_URL,
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: {
          "@id": ORGANIZATION_ID,
        },
      },
      {
        "@type": "ImageObject",
        "@id": heroImageId,
        url: heroImageUrl,
        contentUrl: heroImageUrl,
        caption: activity.heroImage.alt,
      },
      {
        "@type": "ImageObject",
        "@id": contentImageId,
        url: contentImageUrl,
        contentUrl: contentImageUrl,
        caption: activity.contentImage.alt,
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: activity.title,
        description: activity.shortDescription,
        url: pageUrl,
        serviceType: activity.title,
        image: [
          {
            "@id": heroImageId,
          },
          {
            "@id": contentImageId,
          },
        ],
        provider: {
          "@id": ORGANIZATION_ID,
        },
        areaServed: {
          "@type": "City",
          name: "Marrakech",
          containedInPlace: {
            "@type": "Country",
            name: "Morocco",
          },
        },
        mainEntityOfPage: {
          "@id": pageId,
        },
      },
      {
        "@type": ["ItemPage", "FAQPage"],
        "@id": pageId,
        url: pageUrl,
        name: activity.seo.title,
        description: activity.seo.description,
        inLanguage: "en",
        isPartOf: {
          "@id": WEBSITE_ID,
        },
        about: {
          "@id": serviceId,
        },
        primaryImageOfPage: {
          "@id": heroImageId,
        },
        breadcrumb: {
          "@id": breadcrumbId,
        },
        keywords: activity.seo.keywords.join(", "),
        mainEntity: faqQuestions,
      },

      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Activities",
            item: `${SITE_URL}/activities`,
          },
          {
            "@type": "ListItem",

            position: 3,

            name: activity.title,

            item: pageUrl,
          },
        ],
      },
    ],
  };
}
