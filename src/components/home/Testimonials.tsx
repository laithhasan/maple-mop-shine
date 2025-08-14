import { useEffect, useRef, useState } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

/* --- Data --------------------------------------------------------------- */
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
    name: "Sarah M.",
    role: "Office Manager",
    company: "Tech Startup",
    text:
      "They keep our space spotless. Reliable and easy to work with. Our office has never looked better!",
    rating: 5,
  },
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
  // Add more as needed
];

/* --- Component ---------------------------------------------------------- */
export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const gapPx = 24; // matches gap-6
  const scrollByCard = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLDivElement>("[data-card]");
    const cardWidth = card ? card.getBoundingClientRect().width : el.clientWidth * 0.8;
    el.scrollBy({
      left: (cardWidth + gapPx) * (dir === "next" ? 1 : -1),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      const card = el.querySelector<HTMLDivElement>("[data-card]");
      if (!card) return;
      const cardWidth = card.getBoundingClientRect().width;
      const idx = Math.round(el.scrollLeft / (cardWidth + gapPx));
      setActive(Math.max(0, Math.min(TESTIMONIALS.length - 1, idx)));
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="heading text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#C30003] via-[#940400] to-[#02F1FF] bg-clip-text text-transparent drop-shadow-[0_1px_8px_rgba(2,241,255,0.25)]">
          What Our Clients Say
        </h2>
        <p className="text-foreground/80 text-lg">Real experiences from satisfied customers</p>
      </div>

      {/* Carousel */}
      <div className="relative" role="region" aria-roledescription="carousel" aria-label="Testimonials">
        {/* Edge fade masks for a clean professional look */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-12 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-12 z-10 bg-gradient-to-l from-background to-transparent" />

        {/* Track */}
        <div
          ref={trackRef}
          className="
            hide-scrollbar
            flex gap-6 overflow-x-auto scroll-smooth pb-2
            snap-x snap-mandatory
            mask-edges
          "
        >
          {TESTIMONIALS.map((t, i) => (
            <article
              key={`${t.name}-${i}`}
              data-card
              className="
                snap-center shrink-0
                min-w-[88%] sm:min-w-[70%] md:min-w-[55%] lg:min-w-[45%] xl:min-w-[38%]
                rounded-2xl p-6 md:p-7
                bg-white/70 dark:bg-white/[0.04]
                ring-1 ring-white/15
                shadow-[0_12px_32px_-12px_rgba(77,175,254,0.25)]
                backdrop-blur-md
                transition-all duration-300
                hover:-translate-y-1
              "
            >
              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-[#C30003] text-[#C30003]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="relative text-[1.05rem] leading-relaxed text-foreground/90 mb-6">
                <span className="absolute -left-3 -top-3 text-3xl text-[#C30003]/25">“</span>
                {t.text}
                <span className="absolute -right-3 -bottom-6 text-3xl text-[#C30003]/25">”</span>
              </blockquote>

              {/* Author */}
              <footer className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C30003]/20 to-[#4DAFFE]/20 flex items-center justify-center ring-2 ring-white/10">
                  <span className="text-lg font-semibold text-[#C30003]">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <cite className="not-italic font-semibold text-heading">{t.name}</cite>
                  <div className="text-sm text-foreground/70">{t.role}</div>
                  <div className="text-xs text-foreground/50">{t.company}</div>
                </div>
              </footer>
            </article>
          ))}
        </div>

        {/* Arrow controls */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-1 z-20">
          <button
            type="button"
            onClick={() => scrollByCard("prev")}
            aria-label="Previous testimonials"
            className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/70 ring-1 ring-white/20 backdrop-blur hover:bg-slate-900/90 transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard("next")}
            aria-label="Next testimonials"
            className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/70 ring-1 ring-white/20 backdrop-blur hover:bg-slate-900/90 transition"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <span
              key={i}
              aria-hidden
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-8 bg-[#C30003]" : "w-2.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Local utilities */}
      <style>{`
        .hide-scrollbar { scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }

        /* Soft edge masking so cards don't look chopped at the sides */
        .mask-edges {
          -webkit-mask-image: linear-gradient(90deg, transparent 0, black 24px, black calc(100% - 24px), transparent 100%);
                  mask-image: linear-gradient(90deg, transparent 0, black 24px, black calc(100% - 24px), transparent 100%);
        }
      `}</style>
    </section>
  );
}
