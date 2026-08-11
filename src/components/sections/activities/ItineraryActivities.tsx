import Link from "next/link";

import { Check, X, ArrowRight } from "lucide-react";

import type { ActivityItineraryStep } from "@/data/activities";

interface ItineraryActivitiesProps {
  itineraryTitle: string;
  itinerary: ActivityItineraryStep[];
  included: string[];
  excluded: string[];
}

export default function ItineraryActivities({
  itineraryTitle,
  itinerary,
  included,
  excluded,
}: ItineraryActivitiesProps) {
  return (
    <section className="bg-background py-6 lg:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Step by Step
            </p>

            <h2 className="mt-3 text-3xl font-bold text-heading sm:text-4xl">
              {itineraryTitle}
            </h2>

            <div className="relative mt-10">
              {/* Timeline line */}
              <div
                aria-hidden="true"
                className="absolute bottom-6 left-5 top-6 w-px bg-border"
              />

              <div className="space-y-8">
                {itinerary.map((step, index) => (
                  <article
                    key={`${index}-${step.title}`}
                    className="relative flex gap-5"
                  >
                    {/* Number */}
                    <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                      {index + 1}
                    </div>

                    {/* Content */}
                    <div className="pb-2">
                      <h3 className="text-lg font-bold text-heading">
                        {step.title}
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-text-secondary sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2 lg:pt-4">
            {/* INCLUDED */}
            <div className="rounded-2xl border border-border p-4 sm:p-5">
              <h2 className="text-2xl font-bold text-heading">
                What&apos;s Included
              </h2>

              <div className="mt-5 space-y-3">
                {included.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-whatsapp-soft">
                      <Check
                        aria-hidden="true"
                        className="size-4 text-whatsapp"
                        strokeWidth={2.5}
                      />
                    </div>

                    <span className="text-sm leading-6 text-text-secondary">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* EXCLUDED */}
            <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
              <h2 className="text-2xl font-bold text-heading">
                What&apos;s Not Included
              </h2>

              <div className="mt-5 space-y-3">
                {excluded.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted">
                      <X
                        aria-hidden="true"
                        className="size-4 text-primary"
                        strokeWidth={2.5}
                      />
                    </div>

                    <span className="text-sm leading-6 text-text-secondary">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* BOOK NOW */}
            <div className="rounded-xl border border-border bg-card p-3 sm:p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Ready to Book?
              </p>

              <h2 className="mt-2 text-2xl font-bold text-heading">
                Book Your Experience
              </h2>
              <Link
                href="/contact"
                className="group mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary p-3 text-sm font-bold text-primary-foreground"
              >
                Book Now
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
