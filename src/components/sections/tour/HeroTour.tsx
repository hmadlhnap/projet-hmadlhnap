import Image from "next/image";
import Link from "next/link";

import { BedDouble,Clock3, Compass ,MapPin} from "lucide-react";


interface HeroTourProps {
  title: string;

  tourBadge: string;

  heroDescription: string;

  heroImage: {
    url: string;
    alt: string;
  } | null;

  duration: string;
  experience: string;
  accommodation: string;
  departure: string;
}


export default function HeroTour({title,tourBadge,heroDescription,heroImage,duration,experience,accommodation,departure,}: HeroTourProps) {
  const imageUrl = heroImage?.url ?? "/images/desert.webp";

  const imageAlt = heroImage?.alt || title;

  const tourDetails = [
    {
      icon: Clock3,
      value: duration,
    },
    {
      icon: Compass,
      value: experience,
    },
    {
      icon: BedDouble,
      value: accommodation,
    },
    {
      icon: MapPin,
      value: departure,
    },
  ];

  return (
    <section aria-labelledby="tour-title" className="relative min-h-[420px] overflow-hidden mb-8">
    
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-footer/70 via-footer/30 to-footer/2"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl items-center px-4 py-12 sm:px-6 lg:px-8">

        <div className="max-w-4xl">
          {tourBadge && (
            <p className="mb-3 inline-flex rounded-md bg-primary px-2 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground">
              {tourBadge}
            </p>
          )}

          <h1 id="tour-title" className="max-w-4xl text-3xl font-bold leading-tight text-footer-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          {/* Description */}
          {heroDescription && (
            <p className="mt-6 max-w-2xl text-base leading-8 text-footer-foreground sm:text-lg">
              {heroDescription}
            </p>
          )}

          {/* Tour details */}
          <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4">
            {tourDetails.map(({ icon: Icon, value }) => {
              if (!value) {
                return null;
              }

              return (
                <div
                  key={value}
                  className="flex items-center gap-2.5 text-sm font-medium text-footer-foreground"
                >
                  <Icon
                    aria-hidden="true"
                    className="size-5 text-primary"
                    strokeWidth={1.8}
                  />

                  <span>{value}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-3 py-2 font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
