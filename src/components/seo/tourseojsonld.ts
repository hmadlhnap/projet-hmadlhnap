import "server-only";

import type { WordPressTour } from "@/lib/tours";

import { getTourImage, htmlToText, parseFaq } from "@/lib/tours";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || "https://marrakechpackage.com";
const SITE_NAME = "Marrakech Package";
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function createTourJsonLd(tour: WordPressTour) {
  const { acf } = tour;

  const pageUrl = `${SITE_URL}/tours/${tour.slug}`;
  const pageId = `${pageUrl}#webpage`;
  const tourId = `${pageUrl}#tour`;
  const imageId = `${pageUrl}#primaryimage`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const faqId = `${pageUrl}#faq`;

  const title = htmlToText(tour.title.rendered);

  const description = acf.seo_description?.trim() || acf.hero_description?.trim() || htmlToText(tour.excerpt.rendered);

  const heroImage = getTourImage(acf.hero_image);
  const faqItems = parseFaq(acf.faq);

  const faqQuestions = faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));

  const graph: Record<string, unknown>[] = [
    {
      "@type": "TravelAgency",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
      areaServed: {
        "@type": "Country",
        name: "Morocco",
      },
    },

    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en",
      publisher: {
        "@id": ORGANIZATION_ID,
      },
    },
  ];

  /* =======================================================
     IMAGE
  ======================================================= */

  if (heroImage) {
    graph.push({
      "@type": "ImageObject",
      "@id": imageId,
      url: heroImage.url,
      contentUrl: heroImage.url,
      caption: heroImage.alt || title,
      ...(heroImage.width ? {width: heroImage.width, }: {}),
      ...(heroImage.height ? {  height: heroImage.height, } : {}),});
  }

  graph.push({
    "@type": "TouristTrip",
    "@id": tourId,
    identifier: String(tour.id),
    name: title,
    description,
    url: pageUrl,
    provider: {
      "@id": ORGANIZATION_ID,
    },
    mainEntityOfPage: {
      "@id": pageId,
    },

    ...(heroImage
      ? {
          image: {
            "@id": imageId,
          },
        }
      : {}),

    ...(acf.departure?.name
      ? {
          tripOrigin: {
            "@type": "Place",

            name: acf.departure.name,

            address: {
              "@type": "PostalAddress",

              addressLocality: acf.departure.name,

              addressCountry: "MA",
            },
          },
        }
      : {}),

    ...(acf.experience
      ? {
          touristType: acf.experience,
        }
      : {}),
  });

  /* =======================================================
     WEB PAGE
  ======================================================= */

  graph.push({
    "@type": "ItemPage",

    "@id": pageId,

    url: pageUrl,

    name: acf.seo_title?.trim() || `${title} | ${SITE_NAME}`,

    description,

    inLanguage: "en",

    datePublished: tour.date,

    dateModified: tour.modified,

    isPartOf: {
      "@id": WEBSITE_ID,
    },

    publisher: {
      "@id": ORGANIZATION_ID,
    },

    mainEntity: {
      "@id": tourId,
    },

    about: {
      "@id": tourId,
    },

    breadcrumb: {
      "@id": breadcrumbId,
    },

    ...(heroImage
      ? {
          primaryImageOfPage: {
            "@id": imageId,
          },
        }
      : {}),

    ...(acf.keywords
      ? {
          keywords: acf.keywords,
        }
      : {}),

    ...(faqItems.length > 0
      ? {
          hasPart: {
            "@id": faqId,
          },
        }
      : {}),
  });

  /* =======================================================
     BREADCRUMB
  ======================================================= */

  graph.push({
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
        name: "Morocco Tours",
        item: `${SITE_URL}/destinations`,
      },

      {
        "@type": "ListItem",

        position: 3,

        name: title,

        item: pageUrl,
      },
    ],
  });

  /* =======================================================
     FAQ
  ======================================================= */

  if (faqQuestions.length > 0) {
    graph.push({
      "@type": "FAQPage",

      "@id": faqId,

      url: `${pageUrl}#faq`,

      name: `${title} FAQs`,

      isPartOf: {
        "@id": pageId,
      },

      mainEntity: faqQuestions,
    });
  }

  return {
    "@context": "https://schema.org",

    "@graph": graph,
  };
}
