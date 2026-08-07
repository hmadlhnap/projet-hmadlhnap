import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {BusFront,Clock3,MapPin,UsersRound,} from "lucide-react";

import { htmlToText} from "@/lib/daytrips";

interface HeroDayTripProps {
  title: string;
  heroImage:{
    url: string;
    alt: string;
  } | null;
  heroDescription: string;
  duration: string;
  departureCity: string;
  transport: string;
  dayTripType: string;
};


interface HeroFact {
  label: string;
  value: string;
  icon: LucideIcon;
}

function formatDayTripType(type: string): string {
  if (type === "shared") {
    return "Shared tour";
  }

  if (type === "shared_private") {
    return "Shared or private tour";
  }

  return "Private tour";
}


export default function HeroDayTrip({title, heroImage, heroDescription, duration, departureCity, transport, dayTripType}: HeroDayTripProps) {

   const cleanTitle = htmlToText(title);

  const imageUrl = heroImage?.url ?? "/images/day-trip-placeholder.webp";

  const imageAlt = heroImage?.alt || `${cleanTitle} in Morocco`;

  const facts: HeroFact[] = [
    {
      label: "Duration",
      value: duration || "Full Day",
      icon: Clock3,
    },
    {
      label: "Departure city",
      value: departureCity || "Marrakech",
      icon: MapPin,
    },
    {
      label: "Transport",
      value: transport || "Comfortable vehicle",
      icon: BusFront,
    },
    {
      label: "Tour type",
      value: formatDayTripType(dayTripType),
      icon: UsersRound,
    },
  ];


  return (
    <section aria-labelledby="day-trip-title" className="relative bg-background pb-6 sm:pb-10">
      {/* Hero image */}
      <div className="relative min-h-[300px] overflow-hidden sm:min-h-[320px] lg:min-h-[350px]">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay utilisant la couleur footer */}
        <div className="absolute inset-0 bg-gradient-to-r from-footer via-footer/65 to-footer/5" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex min-h-[300px] max-w-[1440px] items-center px-4 pb-24 pt-20 sm:min-h-[360px] sm:px-6 lg:min-h-[400px] lg:px-8">
          <div className="max-w-2xl">
            <h1 id="day-trip-title" className="max-w-xl text-3xl font-bold leading-[1.05] text-footer-foreground sm:text-4xl lg:text-5xl">
              {cleanTitle}
            </h1>

            <p className="mt-3 max-w-xl whitespace-pre-line text-base leading-8 text-white sm:text-lg">
              {heroDescription}
            </p>
          </div>
        </div>
      </div>

    
      {/* Quick facts */}
      <div className="relative z-20 mx-auto -mt-14 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-3 rounded-[6px] border border-border bg-card p-2 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => {
            const Icon = fact.icon;

            return (
              <div
                key={fact.label}
                className="flex min-h-[105px] items-center gap-4 px-5 py-2"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-card text-primary">
                  <Icon
                    aria-hidden="true"
                    className="size-5"
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                    {fact.label}
                  </p>

                  <p className="mt-1 text-sm font-semibold leading-5 text-heading">
                    {fact.value || "Not specified"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
