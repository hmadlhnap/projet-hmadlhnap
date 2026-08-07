import {
  Heart,
  Palmtree,
  ShieldCheck,
  UserRound,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";


type TravelStyle = {
  title: string;
  description: string;
  icon: LucideIcon;
};


const TRAVEL_STYLES: TravelStyle[] = [
  {
    title: "Couples",
    description:
      "Romantic getaways and unforgettable moments in the heart of Marrakech.",
    icon: Heart,
  },
  {
    title: "Families",
    description:
      "Family-friendly tours and activities for all ages to enjoy together.",
    icon: UsersRound,
  },
  {
    title: "Friends",
    description:
      "Share amazing adventures and create memories that last a lifetime.",
    icon: UserRound,
  },
  {
    title: "Shared Group Tours",
    description:
      "Join other travelers and explore Morocco with fun, comfort, and great company.",
    icon: Users,
  },
  {
    title: "Desert Adventures",
    description:
      "From camel treks to luxury camps, experience the magic of the Moroccan Sahara.",
    icon: Palmtree,
  },
  {
    title: "Private Tours",
    description:
      "Enjoy a fully personalized experience with your own private driver and vehicle.",
    icon: ShieldCheck,
  },
];



export default function TravelStyles(): React.JSX.Element {
  return (
    <section
      className="bg-background px-4 py-4 sm:px-6 lg:px-8 lg:py-8" aria-labelledby="travel-styles-title">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mx-auto max-w-5xl text-center">
          <h2
            id="travel-styles-title"
            className="font-heading text-3xl font-semibold leading-[0.98] tracking-[-0.025em] text-heading sm:text-4xl lg:text-5xl"
          >
            Find the Perfect Marrakech Package
            <span className="text-primary"> for Every Travel Style</span>
          </h2>
          <p className="mx-auto mt-5 max-w-4xl font-body text-sm leading-7 text-text-secondary sm:text-base lg:text-lg lg:leading-8">
            Every Marrakech Package is carefully designed by local experts to
            help couples, families, friends, and shared groups discover the best
            of Marrakech and Morocco through unforgettable travel experiences.
          </p>
        </div>

        {/* Travel style cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {TRAVEL_STYLES.map((style) => {
            const Icon = style.icon;

            return (
              <article
                key={style.title}
                className="group flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-border bg-card p-3 text-center"
              >
                <div className="flex size-14 items-center justify-center rounded-full bg-primary/5 transition-colors duration-300 group-hover:bg-primary/10">
                  <Icon
                    className="size-8 text-primary"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-4 font-heading text-2xl font-semibold leading-tight text-heading sm:text-[28px]">
                  {style.title}
                </h3>

                <p className="mt-4 max-w-[330px] font-body text-sm leading-6 text-text-secondary sm:text-[15px]">
                  {style.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
