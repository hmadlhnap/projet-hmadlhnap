import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Compass } from "lucide-react";

import type { ActivityCard as ActivityCardType } from "@/data/activities";

interface ActivityCardProps {
  activity: ActivityCardType;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <article className="group overflow-hidden rounded-[8px] border border-border bg-card">
     

      <Link
        href={`/activities/${activity.slug}`}
        aria-label={`View ${activity.title}`}
        className="block"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={activity.heroImage.src}
            alt={activity.heroImage.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badge */}
          {activity.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-foreground">
              {activity.badge}
            </span>
          )}
        </div>
      </Link>

      <div className="relative px-6 pb-6 pt-10 text-center">
        {/* Floating icon */}
        <div className="absolute left-1/2 top-0 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-card bg-card shadow-sm">
          <Compass
            aria-hidden="true"
            className="size-7 text-primary"
            strokeWidth={1.8}
          />
        </div>

        {/* Title */}
        <Link href={`/activities/${activity.slug}`}>
          <h3 className="text-2xl font-bold leading-tight text-heading transition-colors group-hover:text-primary">
            {activity.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mx-auto mt-3 line-clamp-3 max-w-sm text-sm leading-6 text-text-secondary">
          {activity.shortDescription}
        </p>

        {/* CTA */}
        <Link
          href={`/activities/${activity.slug}`}
          aria-label={`Explore ${activity.title}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-heading"
        >
          Explore
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
