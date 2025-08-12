import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroOffice from "@/assets/hero-office-clean.jpg";
import cleanSurfaces from "@/assets/clean-surfaces.jpg";

/** Slide types for safer JSX */
type TwoLineSlide = {
  id: string;
  img: string;
  alt: string;
  layout: "twoLine";
  h1Top: string;
  h1Bottom: string;
  sub: string;
};
type OneLineSlide = {
  id: string;
  img: string;
  alt: string;
  layout: "oneLine";
  h1Parts: [string, string, string]; // e.g., ["Cleaner","Brighter","Stain-Free"]
  sub: string;
};
type Slide = TwoLineSlide | OneLineSlide;

function isTwoLine(s: Slide): s is TwoLineSlide {
  return s.layout === "twoLine";
}

export default function Hero() {
  const slides = useMemo<Slide[]>(
    () => [
      {
        id: "slide-1",
        img: heroOffice,
        alt: "Bright modern office being cleaned",
        layout: "twoLine",
        h1Top: "Get Rid of Dirt,",
        h1Bottom: "Stains & Spills.",
        sub: "We clean the hard-to-reach corners—safely and thoroughly.",
      },
      {
        id: "slide-2",
        img: cleanSurfaces,
        alt: "Clean, bright floors and surfaces",
        layout: "oneLine",
        h1Parts: ["Cleaner", "Brighter", "Stain-Free"],
        sub: "Make Your Home Shine Crystal Clear!",
      },
    ],
    []
  );

  /** State */
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  /** Refs */
  const containerRef = useRef<HTMLDivElement | null>(null);
  const focusablesRef = useRef<HTMLButtonElement[]>([]);
  const timerRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  /** Constants */
  const DURATION_MS = 7000; // 7s rotate + kenburns duration

  /** Helpers */
  const scheduleNext = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!paused) {
      timerRef.current = window.setTimeout(() => {
        setIndex((i) => (i + 1) % slides.length);
      }, DURATION_MS);
    }
  };

  const goTo = (i: number) => setIndex(i);

  /** Autoplay: schedule on index/paused change (prevents drift + double intervals) */
  useEffect(() => {
    scheduleNext();
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [index, paused]);

  /** Prefetch upcoming image */
  useEffect(() => {
    const nextIndex = (index + 1) % slides.length;
    const img = new Image();
    img.src = slides[nextIndex].img;
  }, [index, slides]);

  /** Pause on hover/focus */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onEnter = () => setPaused(true);
    const onLeave = () => setPaused(false);
    const onFocusIn = () => setPaused(true);
    const onFocusOut = () => setPaused(false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  /** Keyboard: left/right for slide change */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setIndex((i) => (i + 1) % slides.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setIndex((i) => (i - 1 + slides.length) % slides.length);
    }
  };

  /** Touch swipe */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (dx > threshold) setIndex((i) => (i - 1 + slides.length) % slides.length);
    else if (dx < -threshold) setIndex((i) => (i + 1) % slides.length);
    touchStartX.current = null;
  };

  return (
    <section
      ref={containerRef}
      className="relative isolate"
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides (cross-fade). overflow-hidden ensures overlay matches image bounds */}
      <div className="relative w-full h-[64vh] md:h-[78vh] overflow-hidden">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.id}
              id={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={!active}
              className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ease-in-out ${
                active ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Re-key active image so Ken Burns restarts each switch */}
              <img
                key={active ? `${s.id}-${index}` : s.id}
                src={s.img}
                alt={s.alt}
                className="block h-full w-full object-cover"
                style={{
                  animation: active
                    ? `kenburns ${DURATION_MS}ms ease-in-out both`
                    : undefined,
                  animationPlayState: paused ? "paused" : "running",
                }}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <div
                className="absolute inset-0 bg-gradient-to-tr from-[#940400]/35 via-transparent to-transparent pointer-events-none"
                aria-hidden
              />
            </div>
          );
        })}
      </div>

      {/* Text block */}
      <div className="pointer-events-none absolute inset-0">
        <div className="pointer-events-auto max-w-7xl mx-auto px-6 md:px-8 h-full">
          <div className="h-full grid grid-cols-1 md:grid-cols-12 items-center">
            <article className="md:col-span-7 lg:col-span-6 max-w-3xl">
              {isTwoLine(slides[index]) ? (
                <h1 className="font-extrabold tracking-tight leading-tight drop-shadow-md mb-1">
                  <span className="block gradient-text text-4xl md:text-5xl">
                    {slides[index].h1Top}
                  </span>
                  <span className="block gradient-text mt-1 text-4xl md:text-5xl">
                    {slides[index].h1Bottom}
                  </span>
                </h1>
              ) : (
                <>
                  {/* SECOND HERO (one line, Tailwind sizes only) */}
                  <h1 className="font-extrabold tracking-tight leading-tight drop-shadow-md mb-1">
                    <span className="flex flex-wrap md:flex-nowrap items-baseline gap-x-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                      <span className="gradient-text">{slides[index].h1Parts[0]}</span>
                      <span className="text-white/90">|</span>
                      <span className="gradient-text">{slides[index].h1Parts[1]}</span>
                      <span className="text-white/90">|</span>
                      <span className="gradient-text">{slides[index].h1Parts[2]}</span>
                    </span>
                  </h1>
                </>
              )}

              <p className="mt-2 text-white/90 drop-shadow-sm text-lg md:text-xl">
                {slides[index].sub}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  asChild
                  variant="hero"
                  ref={(el) => {
                    if (el) focusablesRef.current[0] = el;
                  }}
                >
                  <Link to="/contact#quote">Get a Quote</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  ref={(el) => {
                    if (el) focusablesRef.current[1] = el;
                  }}
                >
                  <a href="tel:14379917677">Call 437-991-7677</a>
                </Button>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Dots (centered) */}
      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2 px-6">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-controls={s.id}
            aria-current={i === index ? "true" : undefined}
            onClick={() => goTo(i)}
            ref={(el) => {
              if (el) focusablesRef.current[2 + i] = el as HTMLButtonElement;
            }}
            className={`h-2.5 rounded-full border border-primary transition-all duration-300 ${
              i === index
                ? "w-8 bg-primary shadow-[0_0_0_3px_rgba(2,241,255,0.25)]"
                : "w-2.5 bg-background/70 hover:bg-primary/30"
            }`}
          >
            <span className="sr-only">Go to slide {i + 1}</span>
          </button>
        ))}
      </div>

      {/* Local styles */}
      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1.06) translateY(0); }
          100% { transform: scale(1.0) translateY(-1%); }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-text {
          background-image: linear-gradient(90deg, #C30003, #ffffff, #C30003);
          background-size: 200% 200%;
          animation: gradientShift 6s ease-in-out infinite;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        @media (prefers-reduced-motion: reduce) {
          .gradient-text { animation: none; }
          img[style*="kenburns"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
