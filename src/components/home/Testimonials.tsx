import { useRef, useState, useEffect } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah M.",
    role: "Office Manager",
    company: "Tech Startup",
    text:
      "They keep our space spotless. Reliable and easy to work with. Our office has never looked better!",
    rating: 5,
  },
  {
    name: "Mike R.",
    role: "Retail Owner",
    company: "Downtown Store",
    text:
      "After-hours cleaning is terrific—store looks new every morning. Customers always comment on how clean everything is.",
    rating: 5,
  },
  {
    name: "Dr. Lisa K.",
    role: "Clinic Admin",
    company: "Medical Center",
    text:
      "Professional, thorough, and respectful of our schedule. They understand the importance of hygiene in healthcare.",
    rating: 5,
  },
  // Add more—scroll area adapts automatically
];

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  const scrollByCards = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLDivElement>("[data-card]");
    const cardWidth = card ? card.getBoundingClientRect().width : el.clientWidth * 0.8;
    const gap = 24; // match gap-6
    const delta = (cardWidth + gap) * (dir === "next" ? 1 : -1);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const p = el.scrollLeft / (el.scrollWidth - el.clientWidth || 1);
      setProgress(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="heading text-3xl md:text-4xl font-bold mb-4 text-heading supports-[background-clip:text]:bg-clip-text supports-[background-clip:text]:text-transparent bg-gradient-to-r from-[#C30003] via-[#940400] to-[#02F1FF] drop-shadow-[0_1px_8px_rgba(2,241,255,0.25)]">
          What Our Clients Say
        </h2>
        <p className="text-foreground/80 text-lg">Real experiences from satisfied customers</p>
      </div>

      <div className="relative" role="region" aria-label="Testimonials carousel">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Track */}
        <div
          ref={trackRef}
          className="hide-scrollbar relative flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
          aria-live="polite"
        >
          {TESTIMONIALS.map((t, idx) => (
            <article
              key={`${t.name}-${idx}`}
              data-card
              className="
                group relative overflow-hidden snap-center shrink-0
                min-w-[85%] sm:min-w-[60%] md:min-w-[45%] xl:min-w-[33%]
                rounded-2xl p-6
                bg-gradient-to-br from-slate-900/20 via-slate-800/10 to-transparent
                ring-1 ring-white/10
                transition-all duration-500
                hover:ring-accent-1/30 hover:shadow-2xl hover:shadow-accent-1/10 hover:-translate-y-1
              "
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground/90 text-lg leading-relaxed mb-6 relative">
                <span className="text-4xl text-primary/30 absolute -top-2 -left-2">"</span>
                {t.text}
                <span className="text-4xl text-primary/30 absolute -bottom-4 -right-2">"</span>
              </blockquote>

              {/* Author */}
              <footer className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent-1/20 flex items-center justify-center ring-2 ring-white/10">
                  <span className="text-lg font-semibold text-primary">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <cite className="font-semibold text-heading not-italic">{t.name}</cite>
                  <p className="text-sm text-foreground/70">{t.role}</p>
                  <p className="text-xs text-foreground/50">{t.company}</p>
                </div>
              </footer>

              {/* Hover overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-1/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </article>
          ))}
        </div>

        {/* Controls */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-1 z-20">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => scrollByCards("prev")}
            className="
              pointer-events-auto inline-flex items-center justify-center
              h-10 w-10 rounded-full
              bg-slate-900/60 ring-1 ring-white/20 backdrop-blur
              hover:bg-slate-900/80 transition
              disabled:opacity-50
            "
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => scrollByCards("next")}
            className="
              pointer-events-auto inline-flex items-center justify-center
              h-10 w-10 rounded-full
              bg-slate-900/60 ring-1 ring-white/20 backdrop-blur
              hover:bg-slate-900/80 transition
              disabled:opacity-50
            "
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary via-[#4DAFFE] to-[#02F1FF] transition-[width] duration-200"
            style={{ width: `${progress * 100}%` }}
            aria-hidden
          />
        </div>

        {/* Decorative orbs */}
        <div className="pointer-events-none absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent-1/10 rounded-full blur-2xl" />
        <div className="pointer-events-none absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-accent-1/10 to-primary/10 rounded-full blur-2xl" />
      </div>

      {/* local utilities */}
      <style>{`
        .hide-scrollbar {
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
