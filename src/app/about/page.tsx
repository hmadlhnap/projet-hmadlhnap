import AboutHero from '@/components/sections/About/AboutHero'
import MissionCta from '@/components/sections/About/MissionCta'
import OurStory from '@/components/sections/About/OurStory'
import WhyTrust from '@/components/sections/About/WhyTrust'
import { Difference, Photo } from '@/type/about'
import { Camera, MapPin, Tag ,Map} from 'lucide-react'
import React from 'react'


import type { Metadata } from "next";
import AboutJsonLd from '@/components/seo/AboutJsonLd'


const SITE_URL = "https://marrakechpackage.com";
const SITE_EMAIL = "info@marrakechpackage.com";
const SITE_PHONE = "+212642618936";


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "About Marrakech Package | Meet Ahmed, Your Local Morocco Expert",
  description:
    "Discover the story behind Marrakech Package. Founded by Ahmed, a local Morocco expert, we craft private tours, shared group trips, and tailor-made desert itineraries across Morocco.",
  keywords: [
    "about Marrakech Package",
    "Morocco travel agency",
    "local Morocco tour guide",
    "Marrakech tour company",
    "authentic Morocco experiences",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/about`,
    siteName: "Marrakech Package",
    title: "About Marrakech Package | Meet Ahmed, Your Local Morocco Expert",
    description:
      "The story behind Marrakech Package—authentic Morocco journeys crafted by a passionate local team.",
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
    title: "About Marrakech Package",
    description:
      "Meet Ahmed and the local team crafting authentic Morocco journeys.",
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



const DIFFERENCES: Difference[] = [
  {
    icon: <MapPin className="h-6 w-6" aria-hidden="true" />,
    title: "Local Expertise",
    description: "Created by locals who know Morocco inside and out.",
  },
  {
    icon: <Map className="h-6 w-6" aria-hidden="true" />,
    title: "Tailor-Made Experiences",
    description:
      "Every itinerary is customized to your travel style, interests, and budget.",
  },
  {
    icon: <Tag className="h-6 w-6" aria-hidden="true" />,
    title: "Honest Pricing",
    description: "Transparent prices with no hidden costs or surprises.",
  },
  {
    icon: <Camera className="h-6 w-6" aria-hidden="true" />,
    title: "Authentic Morocco",
    description:
      "Discover local traditions, culture, and unforgettable landscapes.",
  },
];


const GALLERY: Photo[] = [
  {
    src: "/personnels/groupe.jpeg",
    alt: "Group of happy travelers on a Marrakech Package desert tour",
  },
  {
    src: "/personnels/founder.jpeg",
    alt: "Ahmed, founder of Marrakech Package, with travelers in Morocco",
  },
  {
    src: "/personnels/lhnap.jpeg",
    alt: "Travelers exploring the Moroccan desert with a local guide",
  },
];




function page(): React.JSX.Element {
  return (
    <>
      <AboutJsonLd
        siteUrl={SITE_URL}
        email={SITE_EMAIL}
        phone={SITE_PHONE}
        founderName="Ahmed"
        city="Marrakech"
        region="Marrakech-Safi"
        countryCode="MA"
        latitude={31.6337885}
        longitude={-8.0165977}
        opens="00:00"
        closes="23:59"
      />
      <AboutHero />
      <OurStory DIFFERENCES={DIFFERENCES} />
      <WhyTrust GALLERY={GALLERY} />
      <MissionCta />
    </>
  );
}


export default page