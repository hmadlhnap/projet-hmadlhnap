import Image from "next/image";

import { Clock3, Languages, MapPin, UsersRound } from "lucide-react";

import type { ActivityImage } from "@/data/activities";

interface OverviewActivitiesProps {
  contentImage: ActivityImage;
  overviewTitle: string;
  overview: string[];

  duration: string;
  activityType: string;
  pickup: string;
  languages: string[];
}

export default function OverviewActivities({
  contentImage,
  overviewTitle,
  overview,
  duration,
  activityType,
  pickup,
  languages,
}: OverviewActivitiesProps) {
  return (
    <section className="bg-background py-6 lg:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-10">
    
          <div className="relative min-h-[360px] overflow-hidden bg-muted sm:min-h-[400px] lg:min-h-full">
            <Image
              src={contentImage.src}
              alt={contentImage.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              The Experience
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-heading sm:text-4xl">
              {overviewTitle}
            </h2>

            {/* DESCRIPTION */}
            <div className="mt-6 space-y-2">
              {overview.map((paragraph, index) => (
                <p
                  key={`${index}-${paragraph.slice(0, 20)}`}
                  className="text-base leading-7 text-text-secondary"
                >
                  {paragraph}
                </p>
              ))}
            </div>


            <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-xl border border-border bg-card sm:grid-cols-4">
              {/* DURATION */}
              <div className="flex flex-col items-center justify-center border-b border-r border-border p-2 text-center sm:border-b-0">
                <div className="flex size-10 items-center justify-center rounded-full bg-gold-muted">
                  <Clock3
                    aria-hidden="true"
                    className="size-5 text-primary"
                    strokeWidth={1.8}
                  />
                </div>

                <span className="mt-3 text-xs font-medium text-text-muted">
                  Duration
                </span>

                <span className="mt-1 text-sm font-bold text-heading">
                  {duration}
                </span>
              </div>

              {/* ACTIVITY TYPE */}
              <div className="flex flex-col items-center justify-center border-b border-border p-2 text-center sm:border-b-0 sm:border-r">
                <div className="flex size-10 items-center justify-center rounded-full bg-gold-muted">
                  <UsersRound
                    aria-hidden="true"
                    className="size-5 text-primary"
                    strokeWidth={1.8}
                  />
                </div>

                <span className="mt-3 text-xs font-medium text-text-muted">
                  Experience
                </span>

                <span className="mt-1 text-sm font-bold text-heading">
                  {activityType}
                </span>
              </div>

              {/* PICKUP */}
              <div className="flex flex-col items-center justify-center border-r border-border p-2 text-center">
                <div className="flex size-10 items-center justify-center rounded-full bg-gold-muted">
                  <MapPin
                    aria-hidden="true"
                    className="size-5 text-primary"
                    strokeWidth={1.8}
                  />
                </div>

                <span className="mt-3 text-xs font-medium text-text-muted">
                  Pick-up
                </span>

                <span className="mt-1 line-clamp-2 text-sm font-bold text-heading">
                  {pickup}
                </span>
              </div>

              {/* LANGUAGES */}
              <div className="flex flex-col items-center justify-center p-2 text-center">
                <div className="flex size-10 items-center justify-center rounded-full bg-gold-muted">
                  <Languages
                    aria-hidden="true"
                    className="size-5 text-primary"
                    strokeWidth={1.8}
                  />
                </div>

                <span className="mt-3 text-xs font-medium text-text-muted">
                  Languages
                </span>

                <span className="mt-1 line-clamp-2 text-sm font-bold text-heading">
                  {languages.join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
