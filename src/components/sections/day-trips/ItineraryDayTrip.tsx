
interface ItineraryDayTripProps {
  itineraryTitle: string;
  itinerary: string;
}

export default function ItineraryDayTrip({itineraryTitle,itinerary,}: ItineraryDayTripProps) {

  if (!itinerary) {
    return null;
  }

  return (
    <section
      aria-labelledby="day-trip-itinerary-title"
      className="bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">

        <h2
          id="day-trip-itinerary-title"
          className="text-3xl font-bold text-primary sm:text-4xl"
        >
          {itineraryTitle}
        </h2>

        <div className="relative mt-8 border-l-2 border-border pl-7

            [&_h3]:relative
            [&_h3]:mt-8
            [&_h3]:text-2xl
            [&_h3]:font-bold
            [&_h3]:leading-tight
            [&_h3]:text-heading

            [&_h3:first-child]:mt-0

            [&_h3]:before:absolute
            [&_h3]:before:-left-[2.15rem]
            [&_h3]:before:top-1
            [&_h3]:before:size-4
            [&_h3]:before:rounded-full
            [&_h3]:before:border-4
            [&_h3]:before:border-gold-muted
            [&_h3]:before:bg-primary

            [&_p]:mt-2
            [&_p]:text-base
            [&_p]:leading-7
            [&_p]:text-text-secondary
          "
          dangerouslySetInnerHTML={{
            __html: itinerary,
          }}
        />
      </div>
    </section>
  );
}
