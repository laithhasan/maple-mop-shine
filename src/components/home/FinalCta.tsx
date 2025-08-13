import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Star, Clock3, Leaf } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-700/40 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150 ring-1 ring-white/20 shadow-2xl">
        {/* Background gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent-1/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-accent-1/20 to-transparent rounded-full blur-3xl opacity-50" />

        <div className="relative p-8 md:p-12 lg:p-16">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main heading with gradient */}
            <h2 className="heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-primary to-accent-1 bg-clip-text text-transparent leading-tight">
              We deliver reliable, excellent cleaning—first time and every time.
            </h2>

            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let's make your space look its best. Professional cleaning services that exceed expectations.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                variant="hero"
                size="lg"
                className="group text-lg px-8 py-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              >
                <Link to="/contact#quote" className="inline-flex items-center gap-2">
                  Get Your Free Quote
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="group text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                <a href="tel:14379917677" className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs">
                    📞
                  </span>
                  Call 437-991-7677
                </a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap justify-center items-center gap-8 text-white/60">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm">Fully Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span className="text-sm">5-Star Rated</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock3 className="h-5 w-5 text-primary" />
                  <span className="text-sm">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  <span className="text-sm">Eco-Friendly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
