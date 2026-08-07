import Image from "next/image";
import Link from "next/link";
import type { DayTripCard } from "@/lib/daytrips";


interface CarteDayTripProps {
  dayTrip: DayTripCard;
}


interface PriceInformation {
  price: number | null;
  label: string;
}


function getPriceInformation(dayTrip: DayTripCard): PriceInformation {
  if (dayTrip.sharedTourPrice !== null && dayTrip.sharedTourPrice > 0) {
    return {
      price: dayTrip.sharedTourPrice,
      label: "/ person",
    };
  }

  if (dayTrip.privateTourPrice !== null && dayTrip.privateTourPrice > 0) {
    return {
      price: dayTrip.privateTourPrice,
      label: "/ private tour",
    };
  }

  return {
    price: null,
    label: "",
  };
}


export default function CarteDayTrip({ dayTrip }: CarteDayTripProps) {
  const priceInformation = getPriceInformation(dayTrip);

  const imageUrl = dayTrip.heroImage?.url ?? "/images/merzouga.webp";

  const imageAlt = dayTrip.heroImage?.alt || `${dayTrip.title} day trip`;

  const detailsUrl = `/day-trips/${dayTrip.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[6px] border border-border bg-card ">
      {/* Image */}
      <Link
        href={detailsUrl}
        aria-label={`View details of ${dayTrip.title}`}
        className="relative block aspect-[16/9] overflow-hidden bg-muted"
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="
            (max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw
          "
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="flex  flex-1 flex-col p-6">
        <h2 className="text-2xl font-semibold leading-tight text-heading">
          <Link
            href={detailsUrl}
            className="transition-colors duration-200 hover:text-primary"
          >
            {dayTrip.title}
          </Link>
        </h2>

        <p className="mt-4 line-clamp-3 text-base leading-7 text-text-secondary">
          {dayTrip.excerpt || dayTrip.heroDescription}
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-8">
          {/* Price */}
          <div>
            {priceInformation.price !== null ? (
              <p className="flex flex-wrap items-baseline gap-1">
                <span className="text-sm font-semibold text-primary">From</span>

                <span className="text-2xl font-bold text-primary">
                  €{priceInformation.price}
                </span>

                <span className="text-sm font-medium text-text-main">
                  {priceInformation.label}
                </span>
              </p>
            ) : (
              <p className="font-semibold text-primary">Contact us</p>
            )}
          </div>

          {/* View details */}
          <Link
            href={detailsUrl}
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-primary transition-colors duration-200 hover:text-primary-hover"
          >
            View Details
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
