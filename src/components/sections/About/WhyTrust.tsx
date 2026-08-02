import { Quote } from "lucide-react";
import Image from "next/image";
import { Photo } from "@/type/about";


export default function WhyTrust({ GALLERY }: { GALLERY: Photo[] }): React.JSX.Element {
  return (
    <section className="bg-background py-4 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-heading sm:text-4xl">
            Why Travelers Trust{" "}
            <span className="text-primary">Marrakech Package</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Founder photo */}
          <div className="relative h-72 overflow-hidden lg:h-auto">
            <Image
              src="/personnels/hmad.jpeg"
              alt="Ahmed, founder of Marrakech Package, in the Moroccan mountains"
              fill
              quality={80}
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            {GALLERY.map((photo) => (
              <div
                key={photo.src}
                className="relative h-40 overflow-hidden sm:h-48 lg:h-auto lg:flex-1"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  quality={75}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-card p-8">
            <Quote className="h-4 w-4 text-primary" aria-hidden="true" />

            <h3 className="mt-4 text-lg font-bold text-heading">
              A Personal Commitment
            </h3>

            <div className="mt-4 space-y-4 text-sm leading-relaxed text-heading">
              <p>
                When you travel with Marrakech Package, you&apos;re not just
                booking a tour—you&apos;re choosing a local team that genuinely
                cares about your experience.
              </p>
              <p>
                From your first inquiry until the end of your journey,
                we&apos;re here to make every moment smooth, memorable, and
                authentic.
              </p>
              <p>
                Our goal is simple: to help you discover Morocco with confidence
                while creating memories that last a lifetime.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-6">
              <p className="font-heading text-2xl font-bold text-primary">
                Ahmed
              </p>
              <p className="mt-0.5 text-xs text-text-muted">
                Founder of Marrakech Package
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
