interface OverviewDayTripProps {
  overviewTitle: string;
  overviewContent: string;
  whyChoose: string;
}

export default function OverviewDayTrip({overviewTitle,overviewContent,whyChoose,}: OverviewDayTripProps) {

  return (
    <section
      aria-labelledby="day-trip-overview-title"
      className="bg-background"
    >
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-4 sm:px-6 sm:py-8">
       

        <article>
          <h2 id="day-trip-overview-title" className="text-3xl font-bold text-heading sm:text-4xl">
            {overviewTitle}
          </h2>

          <div
            className="
              mt-5 space-y-4
              text-base leading-8 text-text-secondary
              [&_p]:m-0
              [&_p]:pl-2
              [&_strong]:font-bold
              [&_strong]:text-heading
            "
            dangerouslySetInnerHTML={{
              __html: overviewContent,
            }}
          />
        </article>

        {/* Why choose */}
        <article>
          <div
            className="
              space-y-4
              text-base leading-8 text-text-secondary
              [&_h2]:mb-5
              [&_h2]:text-3xl
              [&_h2]:font-bold
              [&_h2]:leading-tight
              [&_h2]:text-heading
              sm:[&_h2]:text-4xl
              [&_p]:m-0
              [&_p]:pl-2
              [&_strong]:font-bold
              [&_strong]:text-heading
            "
            dangerouslySetInnerHTML={{
              __html: whyChoose,
            }}
          />
        </article>
      </div>
    </section>
  );
}
