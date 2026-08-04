import ContactSection from "@/components/sections/Home/ContactSection";
import DesertExperienceSelector from "@/components/sections/Home/ExperienceSelector";
import FAQ from "@/components/sections/Home/FAQ";
import GoodToKnow from "@/components/sections/Home/GoodToKnow";
import HeroSection from "@/components/sections/Home/HeroSection";
import SharedGroupOffer from "@/components/sections/Home/SharedGroupOffer";
import Topblogs from "@/components/sections/Home/Topblogs";
import TravelStyles from "@/components/sections/Home/TravelStyles";
import WhyChooseUs from "@/components/sections/Home/WhychooseUs";
import { getBlogPosts } from "@/lib/blogs";

export default async function Home() {
  
  const topBlogPosts =await getBlogPosts(1, 3).then((data) => data.posts);

  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <DesertExperienceSelector />
      <SharedGroupOffer />
      <GoodToKnow />
      <Topblogs posts={topBlogPosts} />
      <TravelStyles />
      <ContactSection />
      <FAQ />
    </>
  );
}
