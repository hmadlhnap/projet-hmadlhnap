import {
  getDayTripImage,
  htmlToText,
  parseFaq,
  type WordPressDayTrip,
} from "@/lib/daytrips";


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://marrakechpackage.com";

const SITE_NAME = "Marrakech Package";

interface DayTripJsonLdProps {
  dayTrip: WordPressDayTrip;
}

export default function DayTripJsonLd({ dayTrip }: DayTripJsonLdProps) {

  const { acf } = dayTrip;

  const title = htmlToText(dayTrip.title.rendered);

  const description = ( acf.seo_description || htmlToText(dayTrip.excerpt.rendered) || htmlToText(acf.hero_description)).replace(/\s+/g, " ").trim();

  const pageUrl = `${SITE_URL}/day-trips/${dayTrip.slug}`;

  const organizationId = `${SITE_URL}/#organization`;

  const websiteId = `${SITE_URL}/#website`;

  const pageId = `${pageUrl}#webpage`;

  const tripId = `${pageUrl}#tourist-trip`;

  const imageId = `${pageUrl}#primary-image`;

  const breadcrumbId = `${pageUrl}#breadcrumb`;

  const faqId = `${pageUrl}#faq`;

  const heroImage = getDayTripImage(acf.hero_image);

  const faqItems = parseFaq(acf.faq);

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: SITE_NAME,
      url: SITE_URL,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: SITE_NAME,
      url: SITE_URL,

      publisher: {
        "@id": organizationId,
      },

      inLanguage: "en-US",
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
          name: "Day Trips",
          item: `${SITE_URL}/day-trips`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: title,
          item: pageUrl,
        },
      ],
    },
  ];

  if (heroImage?.url) {
    graph.push({
      "@type": "ImageObject",
      "@id": imageId,

      url: heroImage.url,
      contentUrl: heroImage.url,

      caption: heroImage.alt || `${title} from Marrakech`,

      ...(heroImage.width && {
        width: heroImage.width,
      }),

      ...(heroImage.height && {
        height: heroImage.height,
      }),
    });
  }

  graph.push({
    "@type": "TouristTrip",
    "@id": tripId,

    identifier: String(dayTrip.id),

    name: title,
    description,
    url: pageUrl,

    provider: {
      "@id": organizationId,
    },

    tripOrigin: {
      "@type": "City",

      name: acf.departure_city || "Marrakech",

      address: {
        "@type": "PostalAddress",
        addressCountry: "MA",
      },
    },

    mainEntityOfPage: {
      "@id": pageId,
    },

    ...(heroImage?.url && {
      image: {
        "@id": imageId,
      },
    }),
  });

  /* ================================================
     FAQ
  ================================================= */

  if (faqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": faqId,

      url: `${pageUrl}#faq`,

      isPartOf: {
        "@id": pageId,
      },

      mainEntity: faqItems.map((item) => ({
        "@type": "Question",

        name: item.question,

        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  /* ================================================
     WEB PAGE
  ================================================= */

  graph.push({
    "@type": "WebPage",
    "@id": pageId,

    url: pageUrl,

    name: acf.seo_title?.trim() || title,

    headline: title,
    description,

    datePublished: dayTrip.date,
    dateModified: dayTrip.modified,

    inLanguage: "en-US",

    isPartOf: {
      "@id": websiteId,
    },

    publisher: {
      "@id": organizationId,
    },

    mainEntity: {
      "@id": tripId,
    },

    about: {
      "@id": tripId,
    },

    breadcrumb: {
      "@id": breadcrumbId,
    },

    ...(heroImage?.url && {
      primaryImageOfPage: {
        "@id": imageId,
      },
    }),

    ...(acf.keywords?.trim() && {
      keywords: acf.keywords.trim(),
    }),

    ...(faqItems.length > 0 && {
      hasPart: {
        "@id": faqId,
      },
    }),
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  
  const safeJsonLd = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: safeJsonLd,
      }}
    />
  );
}
