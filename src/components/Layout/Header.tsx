"use client";

import { useEffect, useState } from "react";
import { Mail, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


type NavLink = {
  href: string;
  label: string;
};


const CONTACT = {
  phone: "+212 642 618936",
  phoneHref: "tel:+212642618936",
  email: "info@marrakechpackage.com",
  emailHref: "mailto:info@marrakechpackage.com",
};


const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/marrakech-tours", label: "Marrakech Tours" },
  { href: "/day-trips", label: "Day Trips" },
  { href: "/shared-group-tours", label: "Shared Group" },
  { href: "/destinations", label: "Destinations" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];


function isLinkActive(pathname: string, href: string): boolean {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}




export default function Header(): React.JSX.Element {
  const pathname = usePathname();
  return <HeaderContent key={pathname} pathname={pathname} />;
}




function HeaderContent({ pathname }: { pathname: string }): React.JSX.Element {

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


  const closeMobileMenu = (): void => {
    setIsOpen(false);
  };




  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);


 useEffect(() => {
   let scrolled = false;

   const handleScroll = (): void => {
     const next = window.scrollY > 8;
     if (next !== scrolled) {
       scrolled = next;
       setIsScrolled(next);
     }
   };

   handleScroll();
   window.addEventListener("scroll", handleScroll, { passive: true });

   return () => {
     window.removeEventListener("scroll", handleScroll);
   };
 }, []);



  const isSolid = isScrolled || isOpen;

  return (
    <>
      {/* Top utility bar — hidden on small screens, scrolls away with the page */}
      <TopUtilityBar />

      <header className="sticky top-0 z-[100] w-full">
        <div
          className={`transition-all duration-300 ${
            isSolid
              ? "border-b border-border bg-background/95 shadow-sm backdrop-blur-md"
              : "border-b border-transparent bg-background/80 backdrop-blur-sm"
          }`}
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-20 lg:px-8">
            <Logo onClick={closeMobileMenu} />

            <DesktopNav pathname={pathname} />

            <div className="hidden items-center lg:flex">
              <BookNowButton />
            </div>

            <MobileMenuButton
              isOpen={isOpen}
              onToggle={() => setIsOpen((current) => !current)}
            />
          </div>
        </div>

        {isOpen && (
          <MobileNav pathname={pathname} onCloseMobileMenu={closeMobileMenu} />
        )}
      </header>
    </>
  );
}




function TopUtilityBar(): React.JSX.Element {
  return (
    <div className="hidden border-b border-border/60 bg-surface-soft sm:block">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-2 text-xs text-text-secondary sm:px-6 lg:px-8">
        <a
          href={CONTACT.phoneHref}
          className="group flex items-center gap-2 transition-colors hover:text-primary"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-muted text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Phone className="h-3 w-3" aria-hidden="true" />
          </span>
          <span className="font-medium tracking-tight">{CONTACT.phone}</span>
        </a>

        <span className="h-4 w-px bg-border" aria-hidden="true" />

        <a
          href={CONTACT.emailHref}
          className="group flex items-center gap-2 transition-colors hover:text-primary"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-muted text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Mail className="h-3 w-3" aria-hidden="true" />
          </span>
          <span className="font-medium tracking-tight">{CONTACT.email}</span>
        </a>
      </div>
    </div>
  );
}



function Logo({ onClick }: { onClick?: () => void }): React.JSX.Element {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex shrink-0 items-center rounded-lg focus-visible:outline-none"
      aria-label="Marrakech Package home"
    >
      <Image
        src="/logo.png"
        alt="Marrakech Package logo"
        width={144}
        height={38}
        priority
        quality={85}
        sizes="(max-width: 1023px) 96px, 144px"
        className="h-auto w-24 lg:w-36"
      />
    </Link>
  );
}


function BookNowButton({ onClick,}: { onClick?: () => void;}): React.JSX.Element {
  return (
    <Link
      href="/contact"
      onClick={onClick}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <span className="relative z-10">Book Your Trip</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0"
      />
    </Link>
  );
}



function MobileMenuButton({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      {isOpen ? (
        <X className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Menu className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}



function DesktopNav({ pathname }: { pathname: string }): React.JSX.Element {
  return (
    <nav
      aria-label="Main navigation"
      className="hidden items-center gap-1 lg:flex"
    >
      {NAV_LINKS.map((link) => {
        const isActive = isLinkActive(pathname, link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={`relative rounded-lg px-3.5 py-2 text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              isActive
                ? "text-primary"
                : "text-foreground hover:bg-muted hover:text-primary"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

function MobileNav({
  pathname,
  onCloseMobileMenu,
}: {
  pathname: string;
  onCloseMobileMenu: () => void;
}): React.JSX.Element {
  return (
    <nav
      id="mobile-menu"
      aria-label="Mobile navigation"
      className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-card shadow-xl lg:hidden"
    >
      <ul className="flex flex-col gap-1 px-4 py-5">
        {NAV_LINKS.map((link) => {
          const isActive = isLinkActive(pathname, link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onCloseMobileMenu}
                aria-current={isActive ? "page" : undefined}
                className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-text-secondary hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Contact + bouton (top bar cachée en mobile) */}
      <div className="border-t border-border px-4 py-4">
        <div className="mb-4 flex flex-col gap-3">
          <a
            href={CONTACT.phoneHref}
            onClick={onCloseMobileMenu}
            className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-primary"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-muted text-primary">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="font-medium">{CONTACT.phone}</span>
          </a>
          <a
            href={CONTACT.emailHref}
            onClick={onCloseMobileMenu}
            className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-primary"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-muted text-primary">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="font-medium">{CONTACT.email}</span>
          </a>
        </div>
        <BookNowButton onClick={onCloseMobileMenu} />
      </div>
    </nav>
  );
}