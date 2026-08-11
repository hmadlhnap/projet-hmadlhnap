import type { Metadata } from "next";
import TourCard from "@/components/sections/tour/TourCard";
import { getToursByDepartureAndType } from "@/lib/tours";
import ContactSection from "@/components/sections/Home/ContactSection";
import {getActivitiesCards} from "@/data/activities";
import ActivityCard from "@/components/sections/activities/ActivityCard";


export const metadata: Metadata = {
  title: "Marrakech Activities | Things to Do in Morocco",

description:"Discover the best Marrakech activities and things to do in Morocco with Marrakech Package. Enjoy hot air balloon rides, desert adventures, cultural experiences and unforgettable local activities.",

  keywords: [
    "tours from Marrakech",
    "Things to Do in Morocco",
    "Marrakech tours",
    "private tours from Marrakech",
    "private sahara desert tour from marrakech",
    "Morocco tours from Marrakech",
    "Marrakech activities",
    "things to do in Marrakech",
    "Sahara desert tours from Marrakech",
    "Atlas Mountains tours",
    "Agafay Desert",
    "agafay desert camp",
  ],

  alternates: {
    canonical: "/tours",
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
    url: "/marrakech-tours",
    siteName: "Marrakech Package",
    title: "Marrakech Activities | Private Morocco Tours",
    description:
      "Explore private tours from Marrakech, Sahara desert journeys, Atlas Mountains escapes, Agafay Desert experiences and top activities in Marrakech.",
    images: [
      {
        url: "/images/desert.webp",
        width: 1200,
        height: 630,
        alt: "Private Marrakech tours and activities in Morocco",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Marrakech Activities | Private Morocco Tours",
    description:
      "Explore private tours from Marrakech, Sahara trips, Atlas Mountains, Agafay Desert and top Marrakech activities.",
    images: ["/images/desert.webp"],
  },
};


export default async function ToursPage(): Promise<React.JSX.Element> {
  const tours = await getToursByDepartureAndType("marrakech", "private");
  const activities = getActivitiesCards();


  return (
    <section
      aria-labelledby="tours-title"
      className="bg-background py-6 lg:py-8"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Private Morocco Tours
          </span>

          <h1
            id="tours-title"
            className="mt-2 text-3xl font-bold leading-tight text-heading sm:text-4xl lg:text-5xl"
          >
            Morocco Tours from <span className="text-primary">Marrakech</span>
          </h1>

          <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg">
            Explore private Morocco tours from Marrakech, from Sahara desert
            journeys and Atlas Mountain routes to historic cities, plus
            carefully selected activities and local experiences in and around
            Marrakech.
          </p>
        </div>

        {/* Tours grid */}
        {tours.length > 0 ? (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-14 max-w-lg rounded-2xl border border-border bg-card px-6 py-12 text-center shadow-sm">
            <h2 className="text-xl font-bold text-heading">
              Tours coming soon
            </h2>
            <p className="mt-2 text-text-secondary">
              We&apos;re preparing new Morocco tours. Please check back shortly.
            </p>
          </div>
        )}

        {activities.length > 0 && (
          <div className="mt-8">
            <div className="mx-auto max-w-4xl text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Things to Do
              </span>

              <h2 className="mt-2 text-3xl font-bold leading-tight text-heading sm:text-4xl">
                Marrakech <span className="text-primary">Activities</span>
              </h2>

              <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg">
                Discover unforgettable experiences in and around Marrakech—from
                hot air balloon rides and quad biking to traditional hammams and
                authentic cooking classes.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        )}

        <ContactSection />
      </div>
    </section>
  );
}
