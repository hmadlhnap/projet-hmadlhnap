import { Reason } from "@/type/contact";


export default function TravelWithConfidence({REASONS}: {REASONS: Reason[]}): React.JSX.Element {
  return (
    <section className="bg-background py-4 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Why Contact Marrakech Package?
          </span>
          <h2 className="mt-2 text-3xl font-bold text-heading sm:text-4xl">
            Travel with Confidence
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <article
              key={reason.title}
              className="flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-8 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {reason.icon}
              </span>

              <h3 className="mt-5 text-base font-bold text-heading">
                {reason.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {reason.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
