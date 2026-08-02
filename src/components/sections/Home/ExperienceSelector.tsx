"use client";

import Image from "next/image";
import {
  Check,
  ArrowRight,
  User,
  Users,
  BadgeCheck,
  Headphones,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";

type TourOption = {
  badge: "private" | "group";
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
};

const options: TourOption[] = [
  {
    badge: "private",
    title: "Private Tour",
    subtitle: "Your Journey, Your Way",
    image: "/images/merzouga.webp",
    imageAlt: "Private 4x4 desert tour",
    features: [
      "4x4 or Minibus transportation",
      "Accommodations included",
      "Dinners + Breakfasts included",
      "Sandboarding experience",
      "Camel ride",
      "Flexible itinerary",
      "Personalized experience",
    ],
    ctaLabel: "Book Private Tour",
    ctaHref: "/tours/private",
  },
  {
    badge: "group",
    title: "Shared Group Tours",
    subtitle: "Share, Explore, Enjoy",
    image: "/images/share.jpeg",
    imageAlt: "Shared group desert tour",
    features: [
      "Comfortable tourist transportation",
      "Accommodations included",
      "Dinners + Breakfasts included",
      "Sandboarding experience",
      "Camel ride",
      "Fixed departure dates",
      "Meet travelers from around the world",
    ],
    ctaLabel: "Book Share Group",
    ctaHref: "/tours/group",
  },
];



const trustItems = [
  {
    icon: BadgeCheck,
    title: "Best Price Guarantee",
    subtitle: "No hidden costs",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    subtitle: "We're here to help",
  },
  {
    icon: CalendarCheck,
    title: "Flexible Cancellation",
    subtitle: "Peace of mind",
  },
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    subtitle: "Your data is safe with us",
  },
];


export default function DesertExperienceSelector() {
  return (
    <section className="bg-background px-4 py-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-heading md:text-4xl lg:text-5xl">
            Choose Your Perfect{" "}
            <span className="text-primary">Desert Experience</span>
          </h2>
          <p className="mt-4 text-text-secondary">
            We offer two flexible tour options to suit your travel style,
            budget, and adventure. Whether you prefer a private journey or a
            shared group experience, we&apos;ve got you covered.
          </p>
        </div>

        {/* Cards */}
        <div className="relative mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          {options.map((option) => (
            <div
              key={option.badge}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card md:odd:rounded-r-none md:even:rounded-l-none md:even:border-l-0"
            >
              {/* Image */}
              <div className="relative h-56 w-full md:h-64">
                <Image
                  src={option.image}
                  alt={option.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={75}
                  className="object-cover"
                />
                {/* Small role badge, centered on THIS image's bottom edge */}
                <div className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 translate-y-1/2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-card shadow-md">
                    {option.badge === "private" ? (
                      <User className="h-5 w-5 text-primary" />
                    ) : (
                      <Users className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col px-8 pb-8 pt-10 text-center">
                <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-heading">
                  {option.title}
                </h3>
                <p className="my-2 text-sm font-semibold text-primary">
                  {option.subtitle}
                </p>

                <ul className="mx-auto flex w-full max-w-xs flex-1 flex-col gap-2 text-left">
                  {option.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 border-b border-dashed border-border/70 py-2.5 text-sm text-text-main last:border-b-0"
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-primary text-primary">
                        <Check
                          className="size-3 stroke-[3]"
                          aria-hidden="true"
                        />
                      </span>

                      <span className="font-medium leading-5">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={option.ctaHref}
                  className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  {option.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-4 grid grid-cols-1 gap-6 rounded-xl border border-border bg-card p-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} className="flex items-center gap-3">
              <Icon className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold text-heading">{title}</p>
                <p className="text-xs text-text-muted">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
