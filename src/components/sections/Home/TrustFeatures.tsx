import { Car, Map, ShieldCheck, Tag, Users } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: <Users className="h-6 w-6" aria-hidden="true" />,
    title: "100% Local Experts",
    description: "Local guides, authentic experiences",
  },
  {
    icon: <Tag className="h-6 w-6" aria-hidden="true" />,
    title: "Best Price Guarantee",
    description: "The best prices with no hidden fees",
  },
  {
    icon: <FaWhatsapp className="h-6 w-6" aria-hidden="true" />,
    title: "24/7 WhatsApp Support",
    description: "We're here for you anytime, anywhere",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" aria-hidden="true" />,
    title: "Secure Booking",
    description: "Your booking is safe and protected",
  },
  {
    icon: <Car className="h-6 w-6" aria-hidden="true" />,
    title: "Comfortable Transport",
    description: "Modern vehicles with professional drivers",
  },
  {
    icon: <Map className="h-6 w-6" aria-hidden="true" />,
    title: "Flexible Itineraries",
    description: "Tailor-made tours just for you",
  },
];

export default function TrustFeatures(): React.JSX.Element {
  return (
    <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-border bg-card px-4 py-2 sm:px-6">
        <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {FEATURES.map((feature, index) => (
            <li
              key={feature.title}
              className={`flex items-start gap-3 xl:px-4 ${
                index !== 0 ? "xl:border-l xl:border-border" : ""
              }`}
            >
              <span className="shrink-0 text-primary">{feature.icon}</span>
              <div className="min-w-0">
                <h3 className="font-body text-lg font-bold text-heading">
                  {feature.title}
                </h3>
                <p className="mt-0.5 text-xs leading-relaxed text-text-muted">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
