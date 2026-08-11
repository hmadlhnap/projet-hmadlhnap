import CarteDayTrip from "@/components/sections/day-trips/CarteDayTrip";
import ContactSection from "@/components/sections/Home/ContactSection";
import { getCarteDayTrip } from "@/lib/daytrips";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Day Trips from Marrakech | Ourika, Ouzoud & Essaouira",

  description: "Explore the best day trips from Marrakech to Ourika Valley, Ouzoud Waterfalls, Essaouira, Imlil and Ouarzazate with comfortable transport and local experiences.",

  keywords: [
    "day trips from Marrakech",
    "best day trips from Marrakech",
    "Marrakech day trips",
    "Ourika Valley day trip from Marrakech",
    "Ouzoud Waterfalls day trip",
    "Essaouira day trip from Marrakech",
    "Imlil day trip from Marrakech",
    "Ouarzazate day trip from Marrakech",
  ],

  alternates: {
    canonical: "/day-trips",
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
    url: "/day-trips",
    siteName: "Marrakech Package",
    title: "Day Trips from Marrakech | Ourika, Ouzoud & Essaouira",
    description:"Explore day trips from Marrakech to the Ourika Valley, Ouzoud Waterfalls, Essaouira, Imlil and Ouarzazate.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Day Trips from Marrakech | Ourika, Ouzoud & Essaouira",
    description:
      "Explore the best day trips from Marrakech to Ourika Valley, Ouzoud Waterfalls, Essaouira, Imlil and Ouarzazate.",
  },
};

export default async function DayTripsPage() {
  const dayTrips = await getCarteDayTrip();

  return (
    <section aria-labelledby="day-trips-title" className="bg-background py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <h1
            id="day-trips-title"
            className="text-2xl font-bold leading-tight text-heading sm:text-3xl lg:text-4xl"
          >
            Our Day Trips from <span className="text-primary">Marrakech</span>
          </h1>

          <p className="mx-auto mt-4 max-w-4xl text-base leading-7 text-text-secondary">
            Make the most of your stay with carefully planned day trips from
            Marrakech to some of Morocco&apos;s most beautiful destinations.
            Travel to the Ourika Valley, Ouzoud Waterfalls, Essaouira, Imlil and
            Ouarzazate while enjoying comfortable transport, authentic local
            experiences and memorable scenery.
          </p>
        </div>

        {/* Day trip cards */}
        {dayTrips.length > 0 ? (
          <div className="grid grid-cols-1 py-4 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {dayTrips.map((dayTrip) => (
              <CarteDayTrip key={dayTrip.id} dayTrip={dayTrip} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card px-6 py-12 text-center">
            <h2 className="text-2xl font-semibold text-heading">
              No day trips available
            </h2>

            <p className="mt-2 text-text-secondary">
              New day trips will be available soon.
            </p>
          </div>
        )}

        <ContactSection />
      </div>
    </section>
  );
}
