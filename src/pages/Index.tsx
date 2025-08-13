import Hero from "@/components/home/Hero";
import TrustBar from "@/components/common/TrustBar";

import FeaturedService from "@/components/home/FeaturedService";
import CleaningSchedules from "@/components/home/CleaningSchedules";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import FaqSection from "@/components/home/FaqSection";
import FinalCta from "@/components/home/FinalCta";

export default function Index() {
  return (
    <main id="main-content">
      <Hero />
      <TrustBar />
      <FeaturedService />
      <CleaningSchedules />
      <WhyChooseUs />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
