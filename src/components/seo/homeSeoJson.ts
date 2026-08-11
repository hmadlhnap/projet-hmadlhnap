type HomeFaq = {
  q: string;
  a: string;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || "https://marrakechpackage.com";
const SITE_NAME = "Marrakech Package";
const HOME_TITLE = "Marrakech Package | Morocco Travel Guide";
const HOME_DESCRIPTION ="Marrakech Package offers private Morocco tours, shared group tours, Sahara desert trips, day trips from Marrakech and local activities across Morocco.";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;

export function createHomeJsonLd(faqs: HomeFaq[]) {
    
  const faqNodes = faqs.map((faq, index) => ({
    "@type": "Question",
    "@id": `${SITE_URL}/#faq-${index + 1}`,
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        url: SITE_URL,
        description: HOME_DESCRIPTION,
        additionalType: "https://schema.org/TravelAgency",
        areaServed: {
          "@type": "Country",
          name: "Morocco",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Morocco Tours and Travel Experiences",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                "@id": `${SITE_URL}/destinations#private-tours`,
                name: "Private Morocco Tours",
                description:
                  "Private multi-day Morocco tours with personalized transportation and itineraries.",
                url: `${SITE_URL}/destinations`,
                provider: {
                  "@id": ORGANIZATION_ID,
                },
                areaServed: {
                  "@type": "Country",
                  name: "Morocco",
                },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                "@id": `${SITE_URL}/shared-group-tours#shared-tours`,
                name: "Shared Group Tours in Morocco",
                description:
                  "Shared group tours with scheduled departures, shared transportation and planned itineraries across Morocco.",
                url: `${SITE_URL}/shared-group-tours`,
                provider: {
                  "@id": ORGANIZATION_ID,
                },
                areaServed: {
                  "@type": "Country",
                  name: "Morocco",
                },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                "@id": `${SITE_URL}/day-trips#day-trips`,
                name: "Day Trips from Marrakech",
                description:
                  "Day trips from Marrakech to destinations including the Atlas Mountains, Ourika Valley, Ouzoud Waterfalls and Essaouira.",
                url: `${SITE_URL}/day-trips`,
                provider: {
                  "@id": ORGANIZATION_ID,
                },
                areaServed: {
                  "@type": "AdministrativeArea",
                  name: "Marrakech and surrounding regions",
                },
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        description: HOME_DESCRIPTION,
        inLanguage: "en",
        publisher: {
          "@id": ORGANIZATION_ID,
        },
      },
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: SITE_URL,
        name: HOME_TITLE,
        description: HOME_DESCRIPTION,
        inLanguage: "en",
        isPartOf: {
          "@id": WEBSITE_ID,
        },
        about: {
          "@id": ORGANIZATION_ID,
        },
        mainEntity: {
          "@id": ORGANIZATION_ID,
        },
        keywords: [
          "Marrakech Package",
          "Morocco tours",
          "private Morocco tours",
          "tours from Marrakech",
          "Sahara desert tours",
          "day trips from Marrakech",
          "Marrakech activities",
          "best things to do in marrakech",
        ],

        hasPart: faqNodes.map((faq) => ({
          "@id": faq["@id"],
        })),
      },

      /* =====================================================
         FAQ QUESTIONS
      ===================================================== */

      ...faqNodes,
    ],
  };
}
