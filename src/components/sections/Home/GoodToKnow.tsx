import { Backpack, Coins, Globe, Languages, Wifi } from "lucide-react";
import Image from "next/image";

type InfoCard = {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

const CARDS: InfoCard[] = [
  {
    icon: <Globe className="h-6 w-6" aria-hidden="true" />,
    title: "Visa Information",
    description:
      "Most travelers from Europe, the UK, the USA, Canada, Australia, and many other countries can visit Morocco visa-free for up to 90 days.",
    image: "/Before/passport.webp",
    imageAlt: "Passport on a Moroccan travel map",
  },
  {
    icon: <Coins className="h-6 w-6" aria-hidden="true" />,
    title: "Currency (MAD)",
    description:
      "The local currency is the Moroccan Dirham (MAD). Credit cards are accepted in many places, but carrying some cash is recommended.",
    image: "/Before/money.webp",
    imageAlt: "Moroccan Dirham banknotes and coins",
  },
  {
    icon: <Wifi className="h-6 w-6" aria-hidden="true" />,
    title: "Wi-Fi & eSIM",
    description:
      "Stay connected easily. Buy a local SIM card at the airport or use an eSIM to enjoy internet access throughout your trip.",
    image: "/Before/sim.webp",
    imageAlt: "Smartphone showing an eSIM setup in Marrakech",
  },
  {
    icon: <Backpack className="h-6 w-6" aria-hidden="true" />,
    title: "What to Pack",
    description:
      "Comfortable walking shoes, sunglasses, sunscreen, a light jacket for evenings, and modest clothing for cultural visits.",
    image: "/Before/pack.webp",
    imageAlt: "Travel essentials: hat, sunglasses, and camera",
  },
  {
    icon: <Languages className="h-6 w-6" aria-hidden="true" />,
    title: "Languages",
    description:
      "Arabic and Amazigh are official languages. French and English are widely spoken in tourist areas.",
    image: "/Before/languages.webp",
    imageAlt: "Traditional carved Moroccan doorway",
  },
];

export default function GoodToKnow(): React.JSX.Element {
  return (
    <section className="bg-background py-2 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
       

        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-heading sm:text-5xl">
            Good to Know Before Your <span className="text-primary">Marrakech Package</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-secondary sm:text-lg">
            Everything you need to know before exploring Marrakech and the
            Sahara Desert, from travel tips and local customs to practical
            information for a smooth and unforgettable journey.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card "
            >
              {/* Icon + text */}
              <div className="flex flex-1 flex-col items-center px-3 pt-4 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-muted text-primary">
                  {card.icon}
                </span>

                <h3 className="mt-3 text-lg font-bold text-heading">
                  {card.title}
                </h3>

                <p className="mt-4 pb-6 text-sm leading-relaxed text-text-secondary">
                  {card.description}
                </p>
              </div>

              {/* Photo */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  quality={75}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
