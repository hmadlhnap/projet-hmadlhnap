import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MissionCta(): React.JSX.Element {
  return (
    <section
      aria-label="Our mission and contact call to action"
      className="grid grid-cols-1 lg:grid-cols-2"
    >
      <div className="bg-background px-4 py-6 sm:px-6 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-xl lg:ml-auto lg:mr-0">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Our Mission
          </span>

          <h2 className="mt-3 text-3xl font-bold leading-tight text-heading sm:text-4xl">
            Creating Authentic{" "}
            <span className="text-primary">Moroccan Experiences</span>
          </h2>

          <p className="mt-6 text-sm leading-relaxed text-text-secondary sm:text-base">
            Our mission is to connect travelers with the beauty, culture, and
            traditions of Morocco through carefully designed journeys led by
            passionate local experts.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
            We believe every trip should be personal, meaningful, and
            unforgettable.
          </p>
        </div>
      </div>

      {/* Ready to Discover (CTA) — même fond clair, séparé par une bordure */}
      <div className="relative flex items-center overflow-hidden bg-background px-4 py-6 sm:px-6 lg:px-12 lg:py-12">
        {/* Accent décoratif subtil (doré très léger) */}
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-muted/40"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -left-6 h-56 w-56 rounded-full bg-gold-muted/30"
        />

        <div className="relative mx-auto max-w-xl lg:mx-0">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Start Your Journey
          </span>

          <h2 className="mt-3 text-2xl font-bold text-heading sm:text-3xl lg:text-4xl">
            Ready to Discover Morocco?
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
            Let&apos;s plan your perfect Moroccan adventure together. Reach out
            today and our local team will craft an itinerary just for you.
          </p>

          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground"
          >
            Contact Us
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
