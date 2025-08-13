import surfaces from "@/assets/clean-surfaces.jpg";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeaturedService() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Commercial Cleaning Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/20 via-slate-800/15 to-slate-700/20 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150 ring-1 ring-white/10 shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(2,241,255,0.25)] hover:ring-accent-1/30">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 ring-1 ring-primary/20 mb-6">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Featured Service</span>
            </div>
            <h2 className="heading text-3xl font-bold mb-4 bg-gradient-to-r from-heading via-primary to-accent-1 bg-clip-text text-transparent">
              Commercial Cleaning Excellence
            </h2>
            <p className="text-foreground/80 text-lg leading-relaxed mb-6">
              Late night/after hours or during the day—we deliver spotless, stain-free surfaces that look welcoming to customers and staff.
            </p>
            <div className="flex items-center gap-4">
              <Button asChild variant="hero" className="group/btn">
                <Link to="/commercial-cleaning" className="inline-flex items-center gap-2">
                  Explore Service
                  <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Interactive Before/After Slider (static image block as in your code) */}
        <div className="relative group">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={surfaces}
              alt="Sparkling clean glass and steel surfaces"
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent-1/10" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-slate-900/40 supports-[backdrop-filter]:backdrop-blur-md rounded-lg p-4 ring-1 ring-white/20">
                <p className="text-white font-medium">Professional Results</p>
                <p className="text-white/80 text-sm">Transform your workspace</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
