import { getToursGroupedByDeparture } from "@/lib/tours";
import Image from "next/image";
import TourCard from "@/components/sections/tour/TourCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Morocco Tours | Marrakech, Fes, Agadir & More",

  description:
    "Explore private Morocco tours departing from Marrakech, Fes, Agadir, Casablanca and Tangier, including Sahara desert tours, cultural routes and multi-day journeys.",

  keywords: [
    "private Morocco tours",
    "Morocco private tours",
    "private tours Morocco",
    "private tours from Marrakech",
    "private tours from Fes",
    "private tours from Agadir",
    "private tours from Casablanca",
    "private tours from Tangier",
    "Morocco desert tours",
    "private sahara desert tour from marrakech",
    "Morocco multi-day tours",
    "Morocco tour packages",
  ],

  alternates: {
    canonical: "/destinations",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/destinations",
    siteName: "Marrakech Package",
    title: "Private Morocco Tours | Marrakech, Fes, Agadir & More",
    description:"Explore private Morocco tours from Morocco's major departure cities, including Sahara desert journeys, cultural routes and multi-day experiences.",
    images: [
      {
        url: "/images/marrakech2.jpeg",
        alt: "Private Morocco tours and Sahara desert journeys",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Private Morocco Tours | Marrakech, Fes, Agadir & More",
    description:
      "Explore private Morocco tours from Marrakech, Fes, Agadir and other cities, including Sahara desert and multi-day journeys.",
    images: ["/images/marrakech2.jpeg"],
  },
};

export default async function ToursPage() {
  const groups = await getToursGroupedByDeparture();

  return (
    <section className="bg-background py-10">
      <section className="bg-background">
        <div className="mx-auto grid min-h-[400px] max-w-6xl grid-cols-1 items-center gap-10 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] lg:gap-16 lg:px-8 lg:py-10">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">
              Marrakech Package Tours
            </p>

            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-heading sm:text-5xl">
              Explore All Our
              <span className="block text-primary">Morocco Tours</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-text-secondary sm:text-lg">
              Discover private desert journeys, cultural experiences and
              tailor-made tours departing from Morocco&apos;s most popular
              cities.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:ml-auto">
            <div className="relative aspect-[4/4] overflow-hidden">
              <Image
                src="/images/marrakech2.jpeg"
                alt="Camel caravan crossing the Sahara Desert in Morocco"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl mt-6 px-4 sm:px-6 lg:px-8">
        {groups.map((group) => (
          <div key={group.departure.id} className="mb-16">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <h2 className="mt-2 text-3xl font-bold leading-tight text-heading sm:text-4xl">
                Private Tours from{" "}
                <span className="text-primary">{group.departure.name}</span>
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
                Explore private Morocco tours departing from{" "}
                {group.departure.name}, including desert journeys, cultural
                routes and multi-day experiences across Morocco.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {group.tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
