import FaqAccordion from "@/components/Landing/FaqAccordion";
import HeroSection from "@/components/Landing/Hero";
import TopFeatures from "@/components/Landing/TopFeatures";
import Trandingnow from "@/components/Landing/Trandingnow";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <Trandingnow />
      <TopFeatures />
      <FaqAccordion />
    </div>
  );
}
