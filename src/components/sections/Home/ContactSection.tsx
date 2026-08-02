import React from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";

const CONTACTS = [
  {
    icon: Mail,
    label: "Email Us",
    value: "info@marrakechpackage.com",
    href: "mailto:info@marrakechpackage.com",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+212 642 618 936",
    href: "tel:+212642618936",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "0642618936",
    href: "https://wa.me/212642618936",
    iconBg: "bg-whatsapp-soft",
    iconColor: "text-whatsapp",
  },
];


function ContactSection(): React.JSX.Element {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-6 sm:px-6 lg:px-8 lg:pt-8">
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <div className="flex items-center justify-center gap-3 text-primary">
          <span className="text-xs font-bold uppercase tracking-[0.2em] sm:text-sm">
            Ready to Start Your Adventure?
          </span>
        </div>

        <h2 className="mt-3 text-2xl font-extrabold leading-[1.15] tracking-tight text-heading sm:text-3xl lg:text-4xl">
          Let’s Plan Your Perfect{" "}
          <span className="text-primary">Marrakech Package</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          Contact us today and let’s create your unforgettable Moroccan journey.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:gap-8 sm:grid-cols-3">
          {CONTACTS.map(
            ({ icon: Icon, label, value, href, iconBg, iconColor }) => (
              <a
                key={label}
                href={href}
                className="rounded-xl border border-border bg-card p-8 shadow-sm"
              >
                <span
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${iconBg} ${iconColor}`}
                >
                  <Icon size={22} />
                </span>
                <p className="mt-4 font-semibold text-heading">{label}</p>
                <p className="mt-1 text-sm text-primary">{value}</p>
              </a>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
