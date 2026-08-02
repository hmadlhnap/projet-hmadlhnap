import ContactForm from '@/components/sections/Contact/ContactForm';
import ContactHero from '@/components/sections/Contact/ContactHero'
import ContactInformation from '@/components/sections/Contact/ContactInformation';
import { Clock, MapPin,Phone,Mail, ShieldCheck, Users, Zap,Map} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import React from 'react'
 import type { Metadata } from "next";
import { ContactItem, Faq, Reason } from '@/type/contact';
import TravelWithConfidence from '@/components/sections/Contact/TravelWithConfidence';
import FaqSection from '@/components/sections/Contact/FaqSection';
import ContactJsonLd from '@/components/seo/ContactJsonLd';
import FindUs from '@/components/sections/Contact/FindUs';



const WHATSAPP_NUMBER = "212642618936";

const SITE = {
  name: "Marrakech Package",
  url: "https://marrakechpackage.com",
  email: "info@marrakechpackage.com",
  phone: "+212642618936",
  city: "Marrakech",
  region: "Marrakech-Safi",
  country: "Morocco",
  countryCode: "MA",
  latitude: 31.6337885,
  longitude: -8.0165977,
  opens: "00:00",
  closes: "23:59",
};


 const ITEMS: ContactItem[] = [
   {
     icon: <FaWhatsapp className="h-5 w-5" aria-hidden="true" />,
     label: "WhatsApp",
     value: "+212 6 42 61 89 36",
     note: "Chat with us for a quick reply!",
     href: `https://wa.me/${WHATSAPP_NUMBER}`,
   },
   {
     icon: <Phone className="h-5 w-5" aria-hidden="true" />,
     label: "Phone",
     value: "+212 6 42 61 89 36",
     href: "tel:+212642618936",
   },
   {
     icon: <Mail className="h-5 w-5" aria-hidden="true" />,
     label: "Email",
     value: "info@marrakechpackage.com",
     href: "mailto:info@marrakechpackage.com",
   },
   {
     icon: <MapPin className="h-5 w-5" aria-hidden="true" />,
     label: "Location",
     value: "Marrakech, Morocco",
   },
   {
     icon: <Clock className="h-5 w-5" aria-hidden="true" />,
     label: "Available 7 Days a Week",
     value: "Monday – Sunday: 24/7",
   },
 ];


 const REASONS: Reason[] = [
   {
     icon: <Zap className="h-6 w-6" aria-hidden="true" />,
     title: "Fast Response",
     description: "We reply quickly to every inquiry.",
   },
   {
     icon: <Users className="h-6 w-6" aria-hidden="true" />,
     title: "Local Experts",
     description: "Get advice directly from people who know Morocco.",
   },
   {
     icon: <Map className="h-6 w-6" aria-hidden="true" />,
     title: "Tailor-Made Tours",
     description: "Every itinerary is customized for your travel style.",
   },
   {
     icon: <ShieldCheck className="h-6 w-6" aria-hidden="true" />,
     title: "Honest & Transparent",
     description: "No hidden fees. Just clear communication and fair pricing.",
   },
 ];


 const FAQS: Faq[] = [
   {
     question: "How do I book a tour?",
     answer:
       "Send us a message via WhatsApp or the contact form with your preferred destination, dates, and group size. We'll reply with a tailored quote and confirm once you're happy with the plan.",
   },
   {
     question: "Can I customize my itinerary?",
     answer:
       "Absolutely. Every tour is fully customizable. Tell us your interests, pace, and budget, and our local team will design an itinerary just for you.",
   },
   {
     question: "How long does it take to receive a reply?",
     answer:
       "We respond to all inquiries as quickly as possible, 7 days a week. For time-sensitive requests, WhatsApp remains the quickest way to reach our team directly.",
   },
   {
     question: "Do you organize airport transfers?",
     answer:
       "Yes. We arrange private airport transfers in comfortable, air-conditioned vehicles with professional drivers for your arrival and departure.",
   },
   {
     question: "Which payment methods do you accept?",
     answer:
       "We accept cash, bank transfers, and major credit cards. A small deposit secures your booking, with the balance payable before or at the start of your tour.",
   },
   {
     question: "Which languages do your guides speak?",
     answer:
       "Our local guides speak Arabic, English, and French fluently, and several also speak Spanish, German, or Italian. Let us know your preferred language when booking and we'll match you with the right guide.",
   },
 ];



export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Contact Marrakech Package | Plan Your Morocco Tour Today",
  description:
    "Contact Marrakech Package to plan your private Morocco tour, shared group trip, or custom desert itinerary. WhatsApp our local Marrakech team — fast replies, 7 days a week.",
  keywords: [
    "contact Marrakech tours",
    "Morocco travel agency",
    "Marrakech desert tours",
    "private Morocco tours",
    "WhatsApp Morocco travel",
    "Sahara desert package",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    url: `${SITE.url}/contact`,
    siteName: SITE.name,
    title: "Contact Marrakech Package | Plan Your Morocco Tour",
    description:
      "Get in touch with our local Marrakech team. Private tours, shared groups, and tailor-made Morocco itineraries. Fast WhatsApp replies, 7 days a week.",
    locale: "en_US",
    images: [
      {
        url: "/images/hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Marrakech skyline with the Koutoubia Mosque at sunset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Marrakech Package",
    description:
      "Plan your Morocco tour with local experts. Fast WhatsApp replies, 7 days a week.",
    images: ["/images/hero.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function page() : React.JSX.Element {
  return (
    <>
      <ContactJsonLd faqs={FAQS} site={SITE} />
      <ContactHero numero={WHATSAPP_NUMBER} />
      <section className="bg-background py-8 lg:py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <ContactInformation ITEMS={ITEMS} />
          <ContactForm numero={WHATSAPP_NUMBER} />
        </div>
      </section>
      <TravelWithConfidence REASONS={REASONS} />
      <FindUs />
      <FaqSection faqs={FAQS} />
    </>
  );
}

export default page