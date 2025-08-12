import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroOffice from "@/assets/hero-office-clean.jpg";
import cleanSurfaces from "@/assets/clean-surfaces.jpg";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Accessible, cross-fade hero with 30s interval, pause on hover/focus, swipe on mobile
export default function Hero() {
  const slides = useMemo(
    () => [
      {
        id: "slide-1",
        img: heroOffice,
        heading: "Get Rid of Dirt, Stains & Spills.",
        sub: "We clean the hard-to-reach corners—safely and thoroughly.",
      },
      {
        id: "slide-2",
        img: cleanSurfaces,
        heading: "Cleaner | Brighter | Stain-free",
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

  const DURATION = 30000; // 30s

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goTo = (i: number) => setIndex(i);

  // Auto-rotate
  useEffect(() => {
    if (paused) return;
    intervalRef.current && window.clearInterval(intervalRef.current);
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

  // Pause on hover and focus within
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

  // Keyboard navigation and simple focus wrap among controls
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

  // Touch swipe (simple)
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
      {/* Slides container: stacked for crossfade */}
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
              alt={i === 0 ? "Bright modern office being cleaned" : "Clean, bright floors and surfaces"}
              className={`h-full w-full object-cover hero-kenburns ${paused ? "paused" : ""}`}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
            {/* 45° brand gradient overlay */}
            <div className="absolute inset-0 hero-gradient" aria-hidden />
          </div>
        ))}
      </div>

      {/* Text panel */}
      <div className="pointer-events-none absolute inset-0">
        <div className="pointer-events-auto max-w-7xl mx-auto px-6 md:px-8 py-[14vh] grid grid-cols-1 md:grid-cols-4 items-center h-full">
          <div className="md:col-span-2 lg:col-span-2 xl:col-span-2">
            <article className="glass max-w-xl p-6" aria-live="polite">
              <h1 className="heading text-4xl md:text-5xl font-bold">{slides[index].heading}</h1>
              <p className="mt-3 text-lg text-foreground/80">{slides[index].sub}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="hero" ref={(el) => { if (el) focusablesRef.current[0] = el; }}>
                  <Link to="/contact#quote">Get a Quote</Link>
                </Button>
                <Button asChild variant="outline" ref={(el) => { if (el) focusablesRef.current[1] = el; }}>
                  <a href="tel:14379917677">Call 437-991-7677</a>
                </Button>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-5 flex items-center justify-between px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous slide"
            onClick={prev}
            ref={(el) => { if (el) focusablesRef.current[2] = el; }}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next slide"
            onClick={next}
            ref={(el) => { if (el) focusablesRef.current[3] = el; }}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-controls={s.id}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
              ref={(el) => { if (el) focusablesRef.current[4 + i] = el as HTMLButtonElement; }}
              className={`h-2.5 w-2.5 rounded-full border border-primary transition-colors ${
                i === index ? "bg-primary" : "bg-background/70 hover:bg-primary/30"
              }`}
            >
              <span className="sr-only">Go to slide {i + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 30s progress bar */}
      <div className="absolute left-0 right-0 bottom-0">
        <div
          key={index}
          className={`hero-progress ${paused ? "paused" : ""}`}
          aria-hidden
        />
      </div>
    </section>
  );
}
