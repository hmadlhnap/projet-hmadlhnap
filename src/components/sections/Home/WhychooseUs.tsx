import {
  BusFront,
  ShieldCheck,
  UserRoundCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

type Advantage = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const ADVANTAGES: Advantage[] = [
  {
    title: "Local Marrakech Experts",
    description:
      "Born and raised in Morocco, our team knows the country’s hidden gems, culture, and traditions.",
    icon: UserRoundCheck,
  },
  {
    title: "Private & Shared Tours",
    description:
      "Choose between private journeys or affordable shared group tours designed for every traveler.",
    icon: UsersRound,
  },
  {
    title: "Comfortable Transport",
    description:
      "Travel in modern air-conditioned vehicles with experienced and professional drivers.",
    icon: BusFront,
  },
  {
    title: "Safe & Secure Booking",
    description:
      "Enjoy transparent pricing, secure payments, and responsive support before and during your trip.",
    icon: ShieldCheck,
  },
];



function DecorativeDivider(): React.JSX.Element {
  return (
    <div className="flex items-center justify-center gap-2" aria-hidden="true">
      <span className="h-px w-8 bg-primary/70" />

      <span className="size-1.5 rotate-45 bg-primary" />

      <span className="h-px w-8 bg-primary/70" />
    </div>
  );
}


export default function WhyChooseUs(): React.JSX.Element {
  return (
    <section className="bg-background pb-6" aria-labelledby="why-choose-us-title" >

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            id="why-choose-us-title"
            className="mt-4 font-heading text-3xl font-semibold leading-[1.05] tracking-[-0.025em] text-heading sm:text-4xl lg:text-5xl"
          >
            Why Choose <span className="text-primary">Marrakech Package</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl font-body text-sm leading-7 text-text-secondary sm:text-base lg:text-lg lg:leading-8">
            Experience Morocco with trusted local experts. We create
            unforgettable private and shared tours with authentic experiences,
            comfortable transport, and exceptional service.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-4 grid grid-cols-1 gap-5 sm:mt-8 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
          {ADVANTAGES.map((advantage) => {
            const Icon = advantage.icon;

            return (
              <article
                key={advantage.title}
                className="group flex h-full flex-col items-center rounded-xl border border-border bg-card p-4 text-center transition duration-300 hover:-translate-y-1 hover:border-primary/30"
              >
                <div className="flex size-14 items-center justify-center rounded-full bg-primary/7 transition duration-300 group-hover:bg-primary/12">
                  <Icon
                    className="size-8 text-primary"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-5 max-w-[220px] font-heading text-2xl font-semibold leading-[1.05] text-heading sm:text-[28px]">
                  {advantage.title}
                </h3>

                <div className="mt-2">
                  <DecorativeDivider />
                </div>

                <p className="mt-5 font-body text-sm leading-7 text-text-secondary sm:text-[15px]">
                  {advantage.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
