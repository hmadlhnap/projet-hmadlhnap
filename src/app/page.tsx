import type { Metadata } from "next";
import ContactSection from "@/components/sections/Home/ContactSection";
import DesertExperienceSelector from "@/components/sections/Home/ExperienceSelector";
import FAQ from "@/components/sections/Home/FAQ";
import GoodToKnow from "@/components/sections/Home/GoodToKnow";
import HeroSection from "@/components/sections/Home/HeroSection";
import SharedGroupOffer from "@/components/sections/Home/SharedGroupOffer";
import Topblogs from "@/components/sections/Home/Topblogs";
import Topdaytrips from "@/components/sections/Home/Topdaytrips";
import Toptours from "@/components/sections/Home/Toptours";
import TravelStyles from "@/components/sections/Home/TravelStyles";
import WhyChooseUs from "@/components/sections/Home/WhychooseUs";
import { getActivitiesCards } from "@/data/activities";
import { getBlogPosts } from "@/lib/blogs";
import { getCarteDayTrip } from "@/lib/daytrips";
import { getToursByDepartureAndType } from "@/lib/tours";
import {Heart,Palmtree,ShieldCheck,UserRound,Users,UsersRound,} from "lucide-react";
import { createHomeJsonLd } from "@/components/seo/homeSeoJson";
import TripAdvisorReviews from "@/components/sections/Home/TripAdvisorReviews";

const TRAVEL_STYLES = [
  {
    title: "Couples",
    description:
      "Romantic getaways and unforgettable moments in the heart of Marrakech.",
    icon: Heart,
  },
  {
    title: "Families",
    description:
      "Family-friendly tours and activities for all ages to enjoy together.",
    icon: UsersRound,
  },
  {
    title: "Friends",
    description:
      "Share amazing adventures and create memories that last a lifetime.",
    icon: UserRound,
  },
  {
    title: "Shared Group Tours",
    description:
      "Join other travelers and explore Morocco with fun, comfort, and great company.",
    icon: Users,
  },
  {
    title: "Desert Adventures",
    description:
      "From camel treks to luxury camps, experience the magic of the Moroccan Sahara.",
    icon: Palmtree,
  },
  {
    title: "Private Tours",
    description:
      "Enjoy a fully personalized experience with your own private driver and vehicle.",
    icon: ShieldCheck,
  },
];

const FAQ_IDS = [
  {
    q: "What is included in a Marrakech Package?",
    a: "Most Marrakech packages include transportation, accommodation, guided sightseeing, and selected activities. The exact inclusions depend on the package you choose.",
  },
  {
    q: "What's the difference between a private tour and a shared tour?",
    a: "A private tour is reserved exclusively for you and your group, offering greater flexibility and a personalized itinerary. A shared tour includes other travelers and follows a fixed schedule.",
  },
  {
    q: "What is the best Marrakech Package for first-time visitors?",
    a: "For first-time visitors, a package combining Marrakech's main attractions, a guided Medina tour, local cultural experiences, and a nearby day trip is usually the best option.",
  },
  {
    q: "Is Morocco safe for tourists?",
    a: "Morocco is generally considered a safe destination for tourists. Travelers should follow standard precautions, protect their belongings, and use trusted guides and transportation services.",
  },
  {
    q: "What should I pack for a Morocco Desert Tour?",
    a: "Pack comfortable clothing, walking shoes, sunscreen, sunglasses, a hat, a reusable water bottle, and warm layers for the evening, as desert temperatures can drop after sunset.",
  },
  {
    q: "Do I need a visa to visit Morocco?",
    a: "Visa requirements depend on your nationality and the length of your stay. Check the latest entry requirements with the Moroccan embassy or official authorities before traveling.",
  },
];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || "https://marrakechpackage.com";

const HOME_TITLE = "Marrakech Package | Morocco Tour Guide";
const HOME_DESCRIPTION = "Marrakech Package offers private Morocco tours, shared group tours, Sahara desert trips, day trips from Marrakech and local activities across Morocco.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: HOME_TITLE,
  },
  description: HOME_DESCRIPTION,
  applicationName: "Marrakech Package",
  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Marrakech Package",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: "/images/groupe.jpeg",
        alt: "Marrakech Package Morocco tours and travel experiences",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/images/groupe.jpeg"],
  },
};

export default async function Home() {
  const activities = getActivitiesCards();

  const [blogData, toptours, dayTrips] = await Promise.all([
    getBlogPosts(1, 3),
    getToursByDepartureAndType("marrakech", "private", 3),
    getCarteDayTrip(3),
  ]);

  const topBlogPosts = blogData.posts;
   const jsonLd = createHomeJsonLd(FAQ_IDS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HeroSection />
      <Toptours tours={toptours} />
      <WhyChooseUs />
      <TripAdvisorReviews />
      <DesertExperienceSelector />
      <Topdaytrips dayTrips={dayTrips} activities={activities} />
      <SharedGroupOffer />
      <GoodToKnow />
      <TravelStyles TRAVEL_STYLES={TRAVEL_STYLES} />
      <Topblogs posts={topBlogPosts} />
      <FAQ FAQ_IDS={FAQ_IDS} />
      <ContactSection />
    </>
  );
}
