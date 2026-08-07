import {
  Camera,
  Castle,
  Fish,
  ShoppingBag,
  UsersRound,
  UtensilsCrossed,
  Waves,
} from "lucide-react";

import { linesToArray } from "@/lib/daytrips";

interface HighlightsDayTripProps {
  title: string;
  highlights: string;
}

const icons = [
  Castle,
  Fish,
  Waves,
  ShoppingBag,
  Camera,
  UtensilsCrossed,
  UsersRound,
];

export default function HighlightsDayTrip({
  title,
  highlights,
}: HighlightsDayTripProps) {
  const highlightItems = linesToArray(highlights);

  if (highlightItems.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="day-trip-highlights"
      className="bg-background pb-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2
          id="day-trip-highlights"
          className="text-center text-3xl font-bold text-heading sm:text-4xl"
        >
          {title} <span className="text-primary">Highlights</span>
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {highlightItems.map((highlight, index) => {
            const Icon = icons[index] ?? Camera;

            return (
              <article
                key={`${highlight}-${index}`}
                className="flex min-h-[160px] flex-col items-center justify-center rounded-xl border border-border bg-surface-soft px-4 py-6 text-center"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-gold-muted text-primary">
                  <Icon
                    aria-hidden="true"
                    className="size-6"
                    strokeWidth={1.8}
                  />
                </div>

                <p className="mt-4 text-sm font-semibold leading-6 text-heading">
                  {highlight}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
