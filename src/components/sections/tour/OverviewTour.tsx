
interface OverviewTourProps {
  overviewTitle: string;
  overviewContent: string;
}

export default function OverviewTour({
  overviewTitle,
  overviewContent,
}: OverviewTourProps) {
  return (
    <section
      aria-labelledby="tour-overview"
      className="bg-background py- sm:py-6"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center">
          {/* Content */}
          <div>
            <h2
              id="tour-overview"
              className="text-3xl font-bold leading-tight text-heading sm:text-4xl"
            >
              {overviewTitle}
            </h2>

            <div
              className="
                mt-6
                space-y-4
                text-base
                leading-8
                text-text-secondary

                [&_p]:m-0
                [&_strong]:font-semibold
                [&_strong]:text-text-main
              "
              dangerouslySetInnerHTML={{
                __html: overviewContent,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
