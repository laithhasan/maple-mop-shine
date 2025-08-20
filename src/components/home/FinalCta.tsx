import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-700/40 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150 ring-1 ring-white/20 shadow-[0_18px_60px_-20px_rgba(77,175,254,0.35)]">
        {/* background accents */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent-1/10 pointer-events-none" />
        <div className="absolute -top-16 -left-10 w-72 h-72 rounded-full bg-[#C30003]/15 blur-3xl" />
        <div className="absolute -bottom-16 -right-10 w-80 h-80 rounded-full bg-[#02F1FF]/15 blur-3xl" />
        {/* ultra-thin top glow line */}
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 bg-[#C30003] bg-clip-text text-transparent leading-tight drop-shadow-[0_1px_8px_rgba(2,241,255,0.18)]">
              We deliver reliable, excellent cleaning—first time and every time.
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-black/85 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Let&apos;s make your space look its best. Professional cleaning services that exceed expectations.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              {/* Primary CTA */}
              <Button
                asChild
                variant="hero"
                className="group h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              >
                <Link to="/contact#quote" className="inline-flex items-center justify-center gap-2">
                  Get Your Free Quote
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </Button>

              {/* Call CTA — perfectly aligned height/width/typography */}
             <Button
  asChild
  variant="outline"
  className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg whitespace-nowrap bg-white text-black border-black/10 hover:bg-sky-400 hover:text-black hover:border-transparent transition-all duration-300"
>
  <a
    href="tel:14379917677"
    className="inline-flex items-center justify-center gap-2"
    aria-label="Call 437-991-7677"
  >
    <Phone className="h-4 w-4" />
    437-991-7677
  </a>
</Button>

            </div>
          </div>
        </div>

        {/* thin bottom glow line */}
        <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
      </div>
    </section>
  );
}
