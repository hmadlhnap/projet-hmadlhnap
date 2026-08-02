import Image from "next/image";
import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import ReseauxSociaux from "@/components/ui/ReseauxSociaux";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/marrakech-tours", label: "Marrakech Package" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

const CONTACT_INFO = [
  { icon: Phone, label: "+212642618936", href: "tel:+212642618936" },
  {
    icon: MessageCircle,
    label: "+212642618936",
    href: "https://wa.me/212642618936",
  },
  {
    icon: Mail,
    label: "info@marrakechpackage.com",
    href: "mailto:info@marrakechpackage.com",
  },
  { icon: MapPin, label: "Marrakech, Morocco 40000", href: undefined },
  { icon: Clock, label: "Monday – Sunday: 24/7", href: undefined },
];


export default function Footer() {
  return (
    <footer className="w-full bg-footer text-footer-foreground">
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 sm:gap-14 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr] lg:gap-10">
          {/* BRAND */}
          <div>
            <Link
              href="/"
              aria-label="Marrakech Package - Home"
              className="group inline-flex items-center gap-4"
            >
              <span className="relative flex size-[66px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary shadow-sm ring-1 ring-white/10">
                <Image
                  src="/images/logofooter.jpeg"
                  alt="Marrakech Package logo"
                  width={66}
                  height={66}
                  priority
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </span>

              <span className="flex flex-col leading-none">
                <span className="font-heading text-[34px] font-semibold tracking-[-0.02em] text-footer-foreground">
                  Marrakech
                </span>

                <span className="mt-1 font-body text-[25px] font-extrabold uppercase leading-none tracking-[0.02em] text-primary">
                  Package
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-footer-muted sm:text-[15px] sm:leading-8">
              Marrakech Package is a local and trusted travel company in
              Morocco. We create authentic and unforgettable travel experiences
              across the country with a passionate local team.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-footer-foreground sm:text-sm">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-1">
              {QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-footer-foreground/90 transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <ChevronRight className="h-4 w-4 text-primary" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-footer-foreground sm:text-sm">
              Contact Info
            </h3>

            <ul className="mt-6 space-y-5">
              {CONTACT_INFO.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-footer-foreground/90 transition hover:text-primary"
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="text-sm text-footer-foreground/90">
                      {label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* PAYMENT METHODS */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-footer-foreground sm:text-sm">
              Payment Methods
            </h3>

            <div className="my-8">
              <Image
                src="/images/payement.webp"
                alt="Accepted payment methods"
                quality={90}
                width={140}
                height={44}
                className="h-20 w-auto object-contain"
              />
            </div>

            <p className="mt-10 text-sm leading-6 text-footer-muted">
              We accept secure payments worldwide
            </p>

            <p className="mt-4 flex items-center gap-2 text-xs text-footer-muted">
              🔒 100% Secure Payment
            </p>
          </div>
        </div>

        {/* FOLLOW US */}
        <div className="mx-auto mt-6 max-w-7xl border-t border-footer-border pt-2 text-center">
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-footer-foreground">
            Follow Us
          </h3>
          <div className="mx-auto mt-1 h-0.5 w-10 bg-primary" />
          <div className="mt-6 flex justify-center">
            <ReseauxSociaux />
          </div>
        </div>
      </section>

      {/* COPYRIGHT */}
      <section className="border-t border-footer-border px-4 py-3 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-footer-muted/80">
          © {new Date().getFullYear()} Marrakech Package. All Rights Reserved.
        </p>
      </section>
    </footer>
  );
}
