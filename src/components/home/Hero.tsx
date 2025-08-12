import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroOffice from "@/assets/hero-office-clean.jpg";
import cleanSurfaces from "@/assets/clean-surfaces.jpg";

/** Slide types */
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
  h1Parts: [string, string, string]; // ["Cleaner","Brighter","Stain-Free"]
  sub: string;
};
type Slide = TwoLineSlide | OneLineSlide;

const isTwoLine = (s: Slide): s is TwoLineSlide => s.layout === "twoLine";

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

  // State
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Mark first slide as loaded initially to avoid any initial flash
  const [loaded, setLoaded] = useState<boolean[]>([true, false]);

  // Refs
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Constants
  const DURATION_MS = 7000; // rotate + kenburns duration

  // Helpers
  const scheduleNext = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!paused) {
      timerRef.current = window.setTimeout(() => {
        setPrevIndex((p) => index);
        setIndex((i) => (i + 1) % slides.length);
      }, DURATION_MS);
    }
  };

  const goTo = (i: number) => {
    setPrevIndex(index);
    setIndex(i);
  };

  // Autoplay (single-shot timeout to prevent drift)
  useEffect(() => {
    scheduleNext();
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [index, paused]);

  // Mark image loaded via onLoad
  const markLoaded = (i: number) =>
    setLoaded((arr) => (arr[i] ? arr : arr.map((v, idx) => (idx === i ? true : v))));

  // Preload the next image proactively
  useEffect(() => {
    const next = (index + 1) % slides.length;
    if (!loaded[next]) {
      const img = new Image();
      img.onload = () => markLoaded(next);
      img.src = slides[next].img;
    }
  }, [index, slides, loaded]);

  // Pause on hover/focus
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

  // Keyboard left/right
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo((index + 1) % slides.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo((index - 1 + slides.length) % slides.length);
    }
  };

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (dx > threshold) goTo((index - 1 + slides.length) % slides.length);
    else if (dx < -threshold) goTo((index + 1) % slides.length);
    touchStartX.current = null;
  };

  // Visibility logic:
  // Keep prev slide visible until the new active slide image has loaded (no white flash).
  const isVisible = (i: number) =>
    i === index ? loaded[i] : i === prevIndex && !loaded[index];

  const isActive = (i: number) => i === index;

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
      {/* Slides */}
      <div className="relative w-full h-[64vh] md:h-[78vh] overflow-hidden">
        {slides.map((s, i) => {
          const visible = isVisible(i);
          const active = isActive(i);
          return (
            <div
              key={s.id}
              id={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={!visible}
              className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ease-out will-change-[opacity] ${
                visible ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={s.img}
                alt={s.alt}
                onLoad={() => markLoaded(i)}
                className="block h-full w-full object-cover will-change-[transform] [backface-visibility:hidden] [transform:translateZ(0)]"
                style={{
                  // Toggle animation name so it restarts cleanly on each activation (no remount).
                  animationName: active && loaded[i] ? "kenburns" : "none",
                  animationDuration: `${DURATION_MS}ms`,
                  animationTimingFunction: "ease-in-out",
                  animationFillMode: "both",
                  animationPlayState: paused ? ("paused" as const) : ("running" as const),
                }}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              {/* Exact-bounds gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-[#940400]/25 via-transparent to-transparent pointer-events-none"
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
            <article className="md:col-span-8 lg:col-span-7 max-w-4xl">
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
                <h1 className="font-extrabold tracking-tight leading-tight drop-shadow-md mb-1">
                  {/* One line from md+; wraps on very small screens */}
                  <span className="flex flex-wrap md:flex-nowrap md:whitespace-nowrap items-baseline gap-x-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    <span className="gradient-text">{slides[index].h1Parts[0]}</span>
                    <span className="text-white/90">|</span>
                    <span className="gradient-text">{slides[index].h1Parts[1]}</span>
                    <span className="text-white/90">|</span>
                    <span className="gradient-text">{slides[index].h1Parts[2]}</span>
                  </span>
                </h1>
              )}

              <p className="mt-2 text-white/90 drop-shadow-sm text-lg md:text-xl">
                {slides[index].sub}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="hero">
                  <Link to="/contact#quote">Get a Quote</Link>
                </Button>
                <Button asChild variant="outline">
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
        /* Smooth zoom-out */
        @keyframes kenburns {
          0%   { transform: scale(1.06) translateY(0); }
          100% { transform: scale(1.0) translateY(-1%); }
        }
        /* Animated gradient for headings: red -> dark red -> red */
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-text {
          background-image: linear-gradient(90deg, #C30003, #940400, #C30003);
          background-size: 200% 200%;
          animation: gradientShift 6s ease-in-out infinite;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .gradient-text { animation: none; }
          .kenburns { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
