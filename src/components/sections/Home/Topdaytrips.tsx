import CarteDayTrip from "@/components/sections/day-trips/CarteDayTrip";
import type { ActivityCard as activitycardtype} from "@/data/activities";
import { DayTripCard } from "@/lib/daytrips";
import ActivityCard from "@/components/sections/activities/ActivityCard";


interface TopDayTripsProps {
  dayTrips: DayTripCard[];
  activities: activitycardtype[];
}

export default async function TopDayTrips({ dayTrips, activities }: TopDayTripsProps): Promise<React.JSX.Element> {

  if (dayTrips.length === 0) {
    return <></>;
  }

  return (
    <section aria-labelledby="top-day-trips-title" className="bg-background py-4 lg:pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            id="experiences-title"
            className="mt-2 text-3xl font-bold leading-tight text-heading sm:text-4xl lg:text-5xl"
          >
            Best Day Trips &{" "}
            <span className="text-primary">Activities Marrakech</span>
          </h2>

          <p className="mx-auto mt-6 max-w-4xl text-base leading-relaxed text-text-secondary sm:text-lg">
            Explore the best day trips from Marrakech and Marrakech activities,
            from Atlas Mountain valleys and waterfalls to the Agafay Desert, hot
            air balloon rides and authentic local experiences.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dayTrips.map((dayTrip) => (
            <CarteDayTrip key={dayTrip.id} dayTrip={dayTrip} />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </section>
  );
}
