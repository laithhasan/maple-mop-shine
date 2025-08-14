import heroOffice from "@/assets/hero-office-clean.jpg"; // cooler visual for this block
import { Button } from "@/components/ui/button";
import { Building2, Sparkles, Shield, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeaturedService() {
  return (
    <section className="relative">
      {/* subtle grid / orb backdrop to match theme */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-800" />
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#C30003]/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#02F1FF]/15 blur-3xl" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Feature card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/25 via-slate-800/15 to-transparent ring-1 ring-white/10 shadow-2xl supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(2,241,255,0.18)]">
            {/* glow sweep on hover */}
            <div className="pointer-events-none absolute -inset-[40%] translate-y-10 rotate-45 bg-gradient-to-r from-[#02F1FF]/0 via-[#02F1FF]/10 to-[#02F1FF]/0 opacity-0 group-hover:opacity-100 [animation:shine_2.2s_ease-in-out] rounded-[999px]" />
            <div className="relative p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 ring-1 ring-primary/20 mb-6">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Featured Service</span>
              </div>

              <h2 className="heading text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--heading))] via-primary to-accent bg-clip-text text-transparent">
                Commercial Cleaning Excellence
              </h2>

              <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                Late night/after hours or during the day—our teams deliver spotless,
                stain-free surfaces that welcome customers and energize staff.
              </p>

              {/* quick highlights */}
              <ul className="mb-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { Icon: Shield, text: "Insured & Bonded" },
                  { Icon: Leaf, text: "Eco-Friendly Products" },
                  { Icon: Sparkles, text: "Modern Equipment" },
                  { Icon: Building2, text: "Office & Retail Experts" },
                ].map(({ Icon, text }) => (
                  <li
                    key={text}
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-2 bg-white/[0.04] ring-1 ring-white/10 hover:ring-primary/30 transition-colors"
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/25">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </span>
                    <span className="text-sm text-foreground/85">{text}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4">
                <Button asChild variant="hero" className="group/btn">
                  <Link to="/commercial-cleaning" className="inline-flex items-center gap-2">
                    Explore Service
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* thin brand line */}
            <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>

          {/* Right: Interactive image panel */}
          <div className="group relative">
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl">
              <img
                src={heroOffice}
                alt="Crisp, modern office — freshly cleaned"
                className="w-full h-[420px] object-cover transform-gpu transition duration-700 group-hover:scale-[1.03] group-hover:-rotate-[0.4deg]"
              />

              {/* brand gradient tint */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20" />

              {/* shimmer sweep */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <span className="absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 [animation:shine_1.8s_ease-in-out]" />
              </div>

              {/* bottom caption chip */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-slate-900/50 supports-[backdrop-filter]:backdrop-blur-md rounded-lg p-4 ring-1 ring-white/15">
                  <p className="text-white font-semibold">Professional Finish</p>
                  <p className="text-white/80 text-sm">Immaculate floors, glass & touchpoints</p>
                </div>
              </div>
            </div>

            {/* corner orb accent */}
            <div className="pointer-events-none absolute -top-6 -right-6 h-20 w-20 rounded-full bg-[#4DAFFE]/25 blur-xl" />
          </div>
        </div>
      </div>

      {/* local keyframes for shine */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-60%) skewX(-12deg); }
          100% { transform: translateX(160%) skewX(-12deg); }
        }
      `}</style>
    </section>
  );
}
