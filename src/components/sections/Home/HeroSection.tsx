import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import TrustFeatures from "./TrustFeatures";

export default function HeroSection(): React.JSX.Element {
  return (
    <section className="relative w-full">
      <div className="relative min-h-[560px] w-full  overflow-hidden lg:min-h-[620px]">
        <Image
          src="/images/benhdou.jpeg"
          alt="Koutoubia Mosque and Jemaa el-Fnaa square in Marrakech at sunset"
          fill
          priority
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          className="object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-secondary/2 via-secondary/40 to-secondary/2"
        />

        {/* Content */}
        <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col items-center justify-center lg:min-h-[620px]">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-center leading-tight text-white sm:text-5xl lg:text-6xl">
              Marrakech Package
            </h1>

            <p className="mt-4 text-lg text-center font-bold text-white sm:text-xl">
              Private &amp; Shared Morocco Tours Crafted by Local Experts
            </p>

            <p className="mt-3 max-w-xl text-center text-sm leading-relaxed text-white/80 sm:text-base">
              Your Morocco itinerary, built from scratch by locals who grew up
              here. Desert tours, mountain day trips, imperial cities—private or
              shared group, every detail handled.
            </p>

            {/* CTA buttons */}
            <div className="mt-16 flex items-center justify-center gap-4">
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-hover p-3 sm:px-7 sm:py-3.5  text-sm font-bold text-primary-foreground shadow-lg transition-colors "
              >
                <Users className="h-4 w-4" aria-hidden="true" />
                Private Tours
              </Link>

              <Link
                href="/shared-group-tours"
                className="inline-flex items-center gap-2 rounded-lg border border-white/70 bg-white/5 p-3 sm:px-7 sm:py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Users className="h-4 w-4" aria-hidden="true" />
                Share Groups
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar (client component) */}
      <div className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SearchBar />
      </div>
      <TrustFeatures />
    </section>
  );
}
