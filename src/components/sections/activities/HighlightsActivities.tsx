import {
  BadgeCheck,
  Camera,
  Car,
  Coffee,
  Landmark,
  Map,
  Mountain,
  Palmtree,
  ShieldCheck,
  Sparkles,
  Sun,
  Sunrise,
  UsersRound,
  UserRoundCheck,
  Footprints,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import type { ActivityHighlight } from "@/data/activities";

interface HighlightsActivitiesProps {
  highlights: ActivityHighlight[];
}

const iconMap: Record<ActivityHighlight["icon"], LucideIcon> = {
  sunrise: Sunrise,
  mountain: Mountain,
  palm: Palmtree,
  camera: Camera,
  certificate: BadgeCheck,
  breakfast: Coffee,
  safety: ShieldCheck,
  transport: Car,
  pilot: UserRoundCheck,
  group: UsersRound,

  landmark: Landmark,
  map: Map,
  walk: Footprints,
  culture: Sparkles,
  camel: Mountain,
  sunset: Sun,
};

export default function HighlightsActivities({highlights,}: HighlightsActivitiesProps) {

  if (highlights.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="activity-highlights-title" className="bg-background py-6" >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="activity-highlights-title"
            className="mt-3 text-3xl font-bold text-primary sm:text-4xl"
          >
            Activity Highlights
          </h2>

          <p className="mt-4 text-base leading-7 text-text-secondary">
            Everything included in the experience, from local highlights and
            scenic moments to transportation and professional assistance.
          </p>
        </div>

        {/* HIGHLIGHTS */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {highlights.map((highlight) => {
            const Icon = iconMap[highlight.icon];

            return (
              <article
                key={`${highlight.icon}-${highlight.title}`}
                className="group flex min-h-30 flex-col items-center justify-center rounded-xl border border-border bg-card p-2 text-center"
              >
                {/* ICON */}
                <div className="flex size-12 items-center justify-center rounded-full bg-gold-muted transition-transform duration-300 group-hover:scale-110">
                  <Icon
                    aria-hidden="true"
                    className="size-7 text-primary"
                    strokeWidth={1.8}
                  />
                </div>

                {/* TITLE */}
                <h3 className="mt-4 text-sm font-bold leading-5 text-heading sm:text-base">
                  {highlight.title}
                </h3>

                {/* OPTIONAL DESCRIPTION */}
                {highlight.description && (
                  <p className="mt-2 text-xs leading-5 text-text-secondary">
                    {highlight.description}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
