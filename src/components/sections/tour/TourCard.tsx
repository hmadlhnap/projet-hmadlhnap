import Image from "next/image";
import Link from "next/link";

import { ArrowRight, BedDouble, CalendarDays, Mountain } from "lucide-react";

import type { TourCard as TourCardType } from "@/lib/tours";

interface TourCardProps {
  tour: TourCardType;
}

export default function TourCard({ tour }: TourCardProps) {

  const imageUrl = tour.heroImage?.url || "/images/desert.webp";
  const imageAlt = tour.heroImage?.alt || tour.title;

  return (
    <article className="group overflow-hidden rounded-[6px] border border-border bg-card">
      {/* IMAGE */}
      <Link
        href={`/tours/${tour.slug}`}
        aria-label={`View ${tour.title}`}
        className="block"
      >
        <div className="relative aspect-[4/2] overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {tour.tourBadge && (
            <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
              {tour.tourBadge}
            </span>
          )}
        </div>
      </Link>


      <div className="p-4">
        {/* DURATION */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
          <CalendarDays aria-hidden="true" className="size-4" />

          <span>{tour.duration}</span>
        </div>

        {/* TITLE */}
        <Link href={`/tours/${tour.slug}`}>
          <h3 className="mt-3 line-clamp-2 text-2xl font-bold leading-[1.1] text-heading transition-colors group-hover:text-primary">
            {tour.title}
          </h3>
        </Link>

        {/* DETAILS */}
        <div className="mt-5 space-y-3">
          {tour.experience && (
            <div className="flex items-start gap-3">
              <Mountain
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-primary"
                strokeWidth={1.8}
              />

              <span className="line-clamp-1 text-sm font-medium text-text-secondary">
                {tour.experience}
              </span>
            </div>
          )}

          {tour.accommodation && (
            <div className="flex items-start gap-3">
              <BedDouble
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-primary"
                strokeWidth={1.8}
              />

              <span className="line-clamp-2 text-sm font-medium text-text-secondary">
                {tour.accommodation}
              </span>
            </div>
          )}
        </div>

        {/* PRICE + CTA */}
        <div className="mt-6 flex items-end justify-between border-t border-border pt-3">
          <div>
            {tour.price !== null ? (
              <>
                <span className="text-xs font-semibold text-text-muted">
                  From
                </span>

                <div className="mt-0.5 flex items-end gap-1">
                  <span className="text-3xl font-bold leading-none text-primary">
                    €{tour.price}
                  </span>

                  {tour.priceLabel && (
                    <span className="pb-0.5 text-xs font-medium text-text-secondary">
                      {tour.priceLabel}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <span className="text-sm font-semibold text-text-secondary">
                View details
              </span>
            )}
          </div>

          <Link
            href={`/tours/${tour.slug}`}
            aria-label={`View ${tour.title}`}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            <ArrowRight
              aria-hidden="true"
              className="size-5 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
