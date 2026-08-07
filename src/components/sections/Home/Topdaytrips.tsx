import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CarteDayTrip from "@/components/sections/day-trips/CarteDayTrip";
import { getCarteDayTrip } from "@/lib/daytrips";

export default async function TopDayTrips(): Promise<React.JSX.Element> {

  const dayTrips = await getCarteDayTrip(3);

  if (dayTrips.length === 0) {
    return <></>;
  }

  return (
    <section aria-labelledby="top-day-trips-title" className="bg-background py-4 lg:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    
        <div className="mx-auto max-w-4xl text-center">
          <h2
            id="top-day-trips-title"
            className="mt-2 text-3xl font-bold leading-tight text-heading sm:text-4xl"
          >
            Day Trips from <span className="text-primary">Marrakech</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary">
            Explore Morocco&apos;s most beautiful destinations on a day trip
            from Marrakech—comfortable transport, authentic experiences, and
            unforgettable scenery.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dayTrips.map((dayTrip) => (
            <CarteDayTrip key={dayTrip.id} dayTrip={dayTrip} />
          ))}
        </div>
      </div>
    </section>
  );
}
