import TourCard from "./TourCard";
import type { TourCard as TourCardType } from "@/lib/tours";

interface RelatedToursProps {
  tours: TourCardType[];
}

export default function RelatedTours({ tours }: RelatedToursProps) {

  if (tours.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-tours-title" className="bg-background py-6" >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Continue Exploring
          </p>

          <h2 id="related-tours-title" className="mt-3 text-3xl font-bold leading-tight text-heading sm:text-4xl">
            Related Morocco Tours
          </h2>

          <p className="mt-4 text-base leading-7 text-text-secondary sm:text-lg">
            Explore other Morocco tours with different routes, destinations and
            desert experiences.
          </p>
        </div>

        {/* TOURS */}
        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
