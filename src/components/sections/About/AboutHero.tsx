import Image from "next/image";

export default function AboutHero(): React.JSX.Element {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto grid max-w-7xl min-h-[620px] grid-cols-1 items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Text side */}
        <div>
          {/* Eyebrow */}
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Meet the Founder
          </span>

          <h1 className="mt-3 text-4xl font-bold leading-[1.1] text-heading sm:text-5xl lg:text-6xl">
            The Story Behind Marrakech<span className="text-primary"> Package</span>
          </h1>

          <p className="mt-5 text-base font-bold text-heading sm:text-lg">
            Hi, I&apos;m <span className="text-primary">Ahmed</span>, the
            founder of Marrakech Package.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
            I founded Marrakech Package with a clear purpose: to help travelers
            discover the authentic Morocco through carefully crafted journeys,
            deep local expertise, and truly personalized service.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
            With years of experience across every region of the country, my team
            and I design each itinerary to reveal Morocco&apos;s remarkable
            landscapes, rich heritage, and genuine hospitality—ensuring every
            guest feels welcome, cared for, and completely at ease.
          </p>
        </div>

        {/* Image side */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src="/personnels/founder.jpeg"
            alt="Marrakech Package travelers together in the Moroccan desert"
            fill
            priority
            quality={85}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
