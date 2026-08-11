import Image from "next/image";
import { ArrowRight, Check, UsersRound } from "lucide-react";
import Link from "next/link";

const GROUP_BENEFITS = [
  "Shared experience and lasting memories",
  "Meet new people from around the world",
  "Comfortable transport and quality service",
  "Best price guaranteed",
];

export default function SharedGroupOffer(): React.JSX.Element {
  return (
    <section
      className="bg-background py-4"
      aria-labelledby="shared-group-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* HERO */}
        <div className="relative min-h-[330px] overflow-hidden lg:min-h-[360px]">
          <Image
            src="/images/groupe.jpeg"
            alt="Friends enjoying a shared group tour in Morocco at sunset"
            fill
            priority={false}
            sizes="(max-width: 1024px) 100vw, 1280px"
            className="object-cover object-center"
          />

          {/* Overlay mobile */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/55 to-background/0 lg:via-background/30" />

          <div className="relative z-10 flex min-h-[330px] items-center px-6 sm:px-10 lg:min-h-[360px] lg:px-14">
            <div className="max-w-xl">
              <h2
                id="shared-group-title"
                className="mt-3 font-heading text-5xl font-semibold leading-[0.9] tracking-[-0.035em] text-heading sm:text-6xl lg:text-7xl"
              >
                Better Together,
                <span className="m block text-primary">Better Price</span>
              </h2>

              <p className="mt-4 max-w-sm font-body text-base leading-8 text-text-main sm:text-lg">
                Traveling in a group is more than just fun — it&apos;s smart.
                Enjoy exclusive benefits, special group rates, and unforgettable
                journeys across Morocco.
              </p>
            </div>
          </div>
        </div>

        {/* ORANGE OFFER HEADER */}
        <div className="bg-primary px-6 py-4 text-center text-primary-foreground sm:px-10">
          <h3 className="font-body text-xl font-extrabold uppercase tracking-[0.04em] sm:text-2xl lg:text-3xl">
            Special Offer for Shared Groups
          </h3>

          <p className="mx-auto mt-2 max-w-2xl font-body text-sm leading-6 text-primary-foreground/90 sm:text-base">
            Join a shared group tour and enjoy exclusive savings while meeting
            travelers from around the world.
          </p>
        </div>

        {/* OFFER DETAILS */}
        <div className="grid grid-cols-1 bg-card lg:grid-cols-[1fr_0.8fr_1.35fr]">
          {/* Group size */}
          <div className="flex flex-col items-center justify-center border-b border-border px-7 py-10 text-center lg:border-b-0 lg:border-r">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/8">
              <UsersRound
                className="size-10 text-primary"
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </div>

            <p className="mt-4 font-body text-sm font-extrabold uppercase tracking-[0.06em] text-heading">
              Groups of
            </p>

            <p className="mt-1 font-body text-3xl font-extrabold text-primary">
              6+ People
            </p>

            <p className="mt-4 max-w-[260px] text-sm leading-6 text-text-secondary">
              Travel together and enjoy exclusive benefits and special group
              rates.
            </p>
          </div>

          {/* Discount */}
          <div className="flex flex-col items-center justify-center border-b border-border px-7 py-10 text-center lg:border-b-0 lg:border-r">
            <p className="font-body text-lg font-extrabold uppercase tracking-[0.05em] text-heading">
              Up to
            </p>

            <p className="mt-1 font-body text-5xl font-black leading-none text-primary sm:text-6xl">
              15%
            </p>

            <p className="font-body text-4xl font-extrabold uppercase text-primary">
              Off
            </p>

            <Link
              href="/shared-group-tours"
              className=" group mt-3 inline-flex items-center justify-center gap-2 rounded-lg border border-primary/20 p-3 font-body text-sm font-bold uppercase tracking-[0.04em] hover:border-primary/40 bg-primary text-primary-foreground"
            >
              View Shared Tours
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Benefits */}
          <div className="flex items-center px-7 py-10 sm:px-10">
            <ul className="w-full space-y-5">
              {GROUP_BENEFITS.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 font-body text-sm leading-6 text-text-main sm:text-base"
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-primary text-primary">
                    <Check className="size-3.5 stroke-[3]" aria-hidden="true" />
                  </span>

                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
