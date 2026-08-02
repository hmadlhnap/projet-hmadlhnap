import ContactSection from "@/components/sections/Home/ContactSection";
import DesertExperienceSelector from "@/components/sections/Home/ExperienceSelector";
import FAQ from "@/components/sections/Home/FAQ";
import GoodToKnow from "@/components/sections/Home/GoodToKnow";
import HeroSection from "@/components/sections/Home/HeroSection";
import SharedGroupOffer from "@/components/sections/Home/SharedGroupOffer";
import TravelStyles from "@/components/sections/Home/TravelStyles";
import WhyChooseUs from "@/components/sections/Home/WhychooseUs";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <DesertExperienceSelector />
      <SharedGroupOffer />
      <GoodToKnow />
      <TravelStyles />
      <ContactSection />
      <FAQ />
    </>
  );
}
