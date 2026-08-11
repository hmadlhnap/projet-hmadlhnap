import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeEuro,
  BusFront,
  CalendarDays,
  Camera,
  MailCheck,
  Map,
  MapPinned,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";

import TourCard from "@/components/sections/tour/TourCard";
import { getSharedTours} from "@/lib/tours";


const benefits = [
  {
    title: "Small Groups",
    description: "Travel comfortably with a limited number of travelers.",
    icon: UsersRound,
  },
  {
    title: "Great Value",
    description:
      "Share transportation costs while keeping a complete itinerary.",
    icon: BadgeEuro,
  },
  {
    title: "Comfortable Transport",
    description: "Travel in air-conditioned vehicles suited to the group size.",
    icon: BusFront,
  },
  {
    title: "Local Experience",
    description:
      "Follow well-planned routes through Morocco with experienced drivers.",
    icon: MapPinned,
  },
];

const steps = [
  {
    number: "01",
    title: "Choose Your Tour",
    description: "Browse our available shared group tours.",
    icon: Map,
  },
  {
    number: "02",
    title: "Select Your Date",
    description: "Choose the departure date that works for you.",
    icon: CalendarDays,
  },
  {
    number: "03",
    title: "Get Confirmation",
    description: "Receive your tour details and meeting information.",
    icon: MailCheck,
  },
  {
    number: "04",
    title: "Meet Your Group",
    description: "Join the other travelers at the confirmed meeting point.",
    icon: UserRoundCheck,
  },
  {
    number: "05",
    title: "Enjoy Your Tour",
    description: "Travel through Morocco and enjoy the scheduled itinerary.",
    icon: Camera,
  },
];


export const metadata: Metadata = {
  title: "Shared Group Tours in Morocco | Tours from Marrakech",
  description:"Explore shared group tours in Morocco from Marrakech with scheduled departures, comfortable transport, desert routes and multi-day itineraries at great value.",

  keywords: [
    "shared group tours Morocco",
    "shared tours Morocco",
    "shared group tours Marrakech",
    "shared tours from Marrakech",
    "Morocco group tours",
    "small group tours Morocco",
    "Marrakech group tours",
    "shared desert tours from Marrakech",
    "Morocco desert group tours",
    "group tours from Marrakech",
    "Morocco multi-day group tours",
  ],

  alternates: {
    canonical: "/shared-group-tours",
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
    url: "/shared-group-tours",
    siteName: "Marrakech Package",

    title: "Shared Group Tours in Morocco | Tours from Marrakech",

    description:
      "Travel across Morocco on shared group tours from Marrakech with scheduled departures, comfortable transport and carefully planned itineraries.",

    images: [
      {
        url: "/images/shared.jpeg",
        alt: "Shared group tours in Morocco from Marrakech",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Shared Group Tours in Morocco | Tours from Marrakech",

    description:
      "Explore shared group tours from Marrakech with desert journeys, cultural routes and scheduled departures across Morocco.",

    images: ["/images/shared.jpeg"],
  },
};

export default async function SharedGroupPage() {
  const tours = await getSharedTours();

  return (
    <section className="bg-background">
      <section className="bg-background py-8 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Explore Morocco Together
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-heading sm:text-5xl lg:text-6xl">
              Shared Group Tours
              in Morocco
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
              Travel across Morocco with a small group, shared transport and a
              carefully planned itinerary. Meet other travelers on desert tours,
              mountain routes and cultural experiences from Marrakech.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/destinations"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
              >
                View Tours
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-heading transition hover:bg-muted"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="shared-tours" className=" py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mt-3 text-3xl font-bold text-heading sm:text-4xl">
              Popular Shared Group Tours
            </h2>

            <p className="mt-4 text-base leading-7 text-text-secondary">
              Join scheduled departures from Marrakech and travel with other
              guests following the same route and itinerary.
            </p>
          </div>

          {tours.length > 0 ? (
            <>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>

              <div className="mt-10 text-center">
                <Link
                  href="/destinations"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  View All Tours
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="mt-12 rounded-2xl border border-border bg-card p-10 text-center">
              <p className="text-text-secondary">
                No shared group tours are available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mt-3 text-3xl font-bold text-heading sm:text-4xl">
              Why Choose Small Group Tours?
            </h2>

            <p className="mt-4 text-base leading-7 text-text-secondary">
              Shared tours combine structured itineraries, comfortable
              transportation and per-person pricing for travelers who prefer
              joining a group.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="rounded-xl border border-border bg-card p-4 text-center"
                >
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-gold-muted text-primary">
                    <Icon
                      aria-hidden="true"
                      className="size-6"
                      strokeWidth={1.8}
                    />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-heading">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-bold text-heading sm:text-4xl">
              Simple Steps to Your Adventure
            </h2>

            <p className="mt-4 text-base leading-7 text-text-secondary">
              From choosing your shared tour to meeting the group, the booking
              process stays simple and clear.
            </p>
          </div>

          <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article key={step.number} className="relative text-center">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-border bg-card text-primary">
                    <Icon
                      aria-hidden="true"
                      className="size-7"
                      strokeWidth={1.7}
                    />
                  </div>

                  <span className="absolute left-1/2 top-12 flex size-7 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {step.number}
                  </span>

                  <h3 className="mt-7 text-lg font-bold text-heading">
                    {step.title}
                  </h3>

                  <p className="mx-auto mt-2 max-w-[210px] text-sm leading-6 text-text-secondary">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
}
