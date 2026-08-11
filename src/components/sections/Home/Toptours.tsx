import type { TourCard as TourCardType } from "@/lib/tours";
import TourCard from "@/components/sections/tour/TourCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function Toptours({ tours }: { tours: TourCardType[] }) {
  return (
    <section aria-labelledby="tours-title" className="relative overflow-hidden bg-background py-6" >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-gold-muted px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Explore Morocco
          </span>

          <h2
            id="tours-title"
            className="mt-3 text-3xl font-bold leading-tight text-heading sm:text-4xl lg:text-5xl"
          >
            Best Tours from <span className="text-primary">Marrakech</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
            Travel from Marrakech to the Sahara, Atlas Mountains and
            Morocco&apos;s historic cities with carefully planned private and
            shared tours.
          </p>
        </div>

       
        {tours.length > 0 ? (
          <>
            <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {tours.slice(0, 3).map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 flex justify-center">
              <Link
                href="/destinations"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-primary bg-background px-7 py-3.5 text-sm font-bold text-primary transition duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                View All Morocco Tours
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </>
        ) : (
          <div className="mx-auto mt-12 max-w-lg rounded-2xl border border-border bg-card px-6 py-12 text-center shadow-sm">
            <h3 className="text-xl font-bold text-heading">
              Tours coming soon
            </h3>

            <p className="mt-2 leading-6 text-text-secondary">
              We&apos;re preparing new Morocco tours. Please check back shortly.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Toptours;
