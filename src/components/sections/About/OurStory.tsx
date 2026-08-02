import { Difference } from "@/type/about";


export default function OurStory({DIFFERENCES}: { DIFFERENCES: Difference[] }): React.JSX.Element {

  return (
    <section id="our-story" className="bg-background py-4 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text side */}
          <div>
            <h2 className="text-3xl font-bold text-heading sm:text-4xl">
              How <span className="text-primary">Marrakech Package</span>{" "}
              Started
            </h2>

            <div className="mt-6 space-y-9">
              <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                Years of working with travelers from around the world taught me
                that many visitors were looking for more than ordinary tours.
                They wanted authentic experiences, honest advice, and someone
                they could trust.
              </p>

              <p className="text-base font-bold leading-relaxed text-heading sm:text-lg">
                That&apos;s why I founded Marrakech Package.
              </p>

              <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                Today, we proudly create private tours, shared group tours, and
                customized itineraries that allow travelers to discover Morocco
                beyond the typical tourist routes.
              </p>

              <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                Every journey is planned with attention to detail and a passion
                for creating unforgettable memories.
              </p>
            </div>
          </div>


          <div>
            <h3 className="flex min-h-[2rem] items-center text-xs font-bold uppercase tracking-widest text-primary sm:min-h-[2.25rem] lg:justify-center">
              What Makes Marrakech Package Different
            </h3>
            <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {DIFFERENCES.map((item) => (
                <li
                  key={item.title}
                  className="group flex flex-col items-center rounded-2xl border border-border bg-card p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-muted text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {item.icon}
                  </span>

                  <h4 className="mt-4 text-base font-bold text-heading">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>


        </div>
      </div>
    </section>
  );
}
