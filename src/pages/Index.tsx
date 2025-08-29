import { lazy, Suspense } from "react";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/common/TrustBar";

// Lazy load below-the-fold components for better initial page load
const FeaturedService = lazy(() => import("@/components/home/FeaturedService"));
const CleaningSchedules = lazy(() => import("@/components/home/CleaningSchedules"));
const WhyChooseUs = lazy(() => import("@/components/home/WhyChooseUs"));
const Testimonials = lazy(() => import("@/components/home/Testimonials"));
const FaqSection = lazy(() => import("@/components/home/FaqSection"));
const FinalCta = lazy(() => import("@/components/home/FinalCta"));

// Optimized loading component
const SectionLoading = () => (
  <div className="py-16 flex items-center justify-center">
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-primary/20 h-4 w-4"></div>
      <div className="rounded-full bg-primary/20 h-4 w-4"></div>
      <div className="rounded-full bg-primary/20 h-4 w-4"></div>
    </div>
  </div>
);

export default function Index() {
  return (
    <main id="main-content">
      <Hero />
      <TrustBar />
      <Suspense fallback={<SectionLoading />}>
        <FeaturedService />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <CleaningSchedules />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <WhyChooseUs />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <FaqSection />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <FinalCta />
      </Suspense>
    </main>
  );
}
