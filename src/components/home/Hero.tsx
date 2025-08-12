import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroOffice from "@/assets/hero-office-clean.jpg";
import cleanSurfaces from "@/assets/clean-surfaces.jpg";

type Slide =
  | {
      id: string;
      img: string;
      alt: string;
      layout: "twoLine";
      h1Top: string;
      h1Bottom: string;
      sub: string;
    }
  | {
      id: string;
      img: string;
      alt: string;
      layout: "oneLine";
      h1: string;
      sub: string;
    };

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
        h1: "Cleaner | Brighter | Stain-Free",
        sub: "Make Your Home Shine Crystal Clear!",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const focusablesRef = useRef<HTMLButtonElement[]>([]);
  const intervalRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  // 7s rotation
  const DURATION = 7000;

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goTo = (i: number) => setIndex(i);

  // Auto-rotate
  useEffect(() => {
    if (paused) return;
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, DURATION);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [paused, slides.length]);

  // Prefetch next image
  useEffect(() => {
    const nextIndex = (index + 1) % slides.length;
    const img = new Image();
    img.src = slides[nextIndex].img;
  }, [index, slides]);

  // Pause on hover/focus
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMouseEnter = () => setPaused(true);
    const onMouseLeave = () => setPaused(false);
    const onFocusIn = () => setPaused(true);
    const onFocusOut = () => setPaused(false);
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    return () => {
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  // Keyboard + simple focus wrap
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "Tab" && focusablesRef.current.length) {
      const focusables = focusablesRef.current;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      }
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
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    touchStartX.current = null;
  };

  return (
    <section
      ref={containerRef}
      className="relative isolate"
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero"
      onKeyDown={handleKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      tabIndex={0}
    >
      {/* Slides (stacked for crossfade) */}
      <div className="relative w-full h-[64vh] md:h-[78vh]">
        {slides.map((s, i) => (
          <div
            key={s.id}
            id={s.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.img}
              alt={s.alt}
              className="h-full w-full object-cover"
              style={{
                animation: `kenburns ${DURATION}ms ease-in-out both`,
                animationPlayState: paused ? "paused" : "running",
              }}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
            {/* Brand gradient overlay for contrast */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-[#940400]/35 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        ))}
      </div>

      {/* Text (aligned, no glass) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="pointer-events-auto max-w-7xl mx-auto px-6 md:px-8 h-full">
          <div className="h-full grid grid-cols-1 md:grid-cols-12 items-center">
            <article className="md:col-span-6 lg:col-span-5 max-w-2xl">
              {slides[index].layout === "twoLine" ? (
                <h1 className="font-extrabold tracking-tight leading-tight drop-shadow-md">
                  <span className="block text-4xl md:text-5xl gradient-text">
                    {(slides[index] as any).h1Top}
                  </span>
                  <span className="block text-4xl md:text-5xl mt-1 gradient-text">
                    {(slides[index] as any).h1Bottom}
                  </span>
                </h1>
              ) : (
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-md gradient-text">
                  {(slides[index] as any).h1}
                </h1>
              )}

              <p className="mt-4 text-white/90 drop-shadow-sm text-lg md:text-xl">
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

      {/* Dots only (centered) */}
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

      {/* Local styles for animations */}
      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1.05) translateY(0); }
          100% { transform: scale(1.0) translateY(-1%); }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-text {
          /* Animated red->white->red gradient text */
          background-image: linear-gradient(90deg, #C30003, #ffffff, #C30003);
          background-size: 200% 200%;
          animation: gradientShift 6s ease-in-out infinite;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </section>
  );
}
