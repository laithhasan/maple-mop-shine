import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

/* ------- Data -------- */
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
];

/* ------- Component -------- */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const touchStartX = useRef<number | null>(null);

  const next = () => {
    setPrev(index);
    setDir("next");
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
  };
  const prevFn = () => {
    setPrev(index);
    setDir("prev");
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prevFn();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Touch swipe (mobile)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (dx < -threshold) next();
    else if (dx > threshold) prevFn();
    touchStartX.current = null;
  };

  const active = TESTIMONIALS[index];
  const previous = TESTIMONIALS[prev];

  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="heading text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#C30003] via-[#940400] to-[#02F1FF] bg-clip-text text-transparent drop-shadow-[0_1px_8px_rgba(2,241,255,0.25)]">
          What Our Clients Say
        </h2>
        <p className="text-foreground/80 text-lg">Real experiences from satisfied customers</p>
      </div>

      {/* Stage (single card) */}
      <div
        className="relative mx-auto max-w-4xl"
        role="region"
        aria-roledescription="carousel"
        aria-label="Testimonials"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Previous + Current stacked for animation */}
        {[{ t: previous, key: prev, type: "prev" }, { t: active, key: index, type: "curr" }].map(
          ({ t, key, type }) => {
            const isCurr = type === "curr";
            // slide direction
            const fromX = isCurr ? (dir === "next" ? "translate-x-6" : "-translate-x-6") : "translate-x-0";
            const toX = isCurr ? "translate-x-0" : dir === "next" ? "-translate-x-6" : "translate-x-6";
            const fromOpacity = isCurr ? "opacity-0" : "opacity-100";
            const toOpacity = isCurr ? "opacity-100" : "opacity-0";

            return (
              <article
                key={key + type}
                className={`
                  absolute inset-0
                  rounded-2xl p-6 md:p-8
                  bg-white/70 dark:bg-white/[0.04]
                  ring-1 ring-white/15
                  shadow-[0_16px_40px_-14px_rgba(77,175,254,0.28)]
                  backdrop-blur-md
                  transition-all duration-500 ease-out
                  ${fromX} ${fromOpacity}
                  ${isCurr ? "z-20" : "z-10"}
                `}
                style={{ willChange: "transform, opacity" }}
                // trigger end frame on mount
                onAnimationEnd={() => void 0}
              >
                {/* Animate to end state via a tiny reflow */}
                <style>{`
                  article.${isCurr ? "z-20" : "z-10"} { transform: none }
                `}</style>

                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-[#C30003] text-[#C30003]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="relative text-[1.08rem] md:text-[1.125rem] leading-relaxed text-foreground/90 mb-6">
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
            );
          }
        )}

        {/* Gradient halo behind card for depth */}
        <div className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 bg-gradient-to-b from-transparent via-[#02F1FF]/10 to-transparent blur-2xl" />

        {/* Arrows */}
        <div className="mt-60 md:mt-0 pointer-events-none absolute inset-0 flex items-center justify-between px-2 md:px-4">
          <NeoArrow label="Previous testimonial" onClick={prevFn} dir="left" />
          <NeoArrow label="Next testimonial" onClick={next} dir="right" />
        </div>

        {/* Dots */}
        <div className="relative mt-6 flex items-center justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => {
                setPrev(index);
                setDir(i > index ? "next" : "prev");
                setIndex(i);
              }}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-[#C30003]" : "w-2.5 bg-black/15 dark:bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Pretty, on-brand arrow with gradient border + glass center */
function NeoArrow({
  onClick,
  label,
  dir,
}: {
  onClick: () => void;
  label: string;
  dir: "left" | "right";
}) {
  const Icon = dir === "left" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="
        pointer-events-auto
        p-[2px] rounded-full
        bg-gradient-to-br from-[#02F1FF] to-[#C30003]
        shadow-[0_0_24px_rgba(2,241,255,0.28)]
        transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#02F1FF]/50
      "
    >
      <span
        className="
          inline-flex h-12 w-12 items-center justify-center
          rounded-full bg-slate-900/80 text-white
          ring-1 ring-white/15 backdrop-blur
        "
      >
        <Icon className="h-5 w-5" />
      </span>
    </button>
  );
}
