import { useEffect, useMemo, useRef, useState } from "react";
import GTA from "@/assets/GTA.png";
import { Shield, Leaf, Clock3, Star, Calendar, Building2 } from "lucide-react";

/* ---------- tiny utilities ---------- */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mql.matches);
    onChange();
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35, ...options }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [options]);
  return { ref, inView };
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/* Counts 0 -> target when inView. Suffixes like "+", "%", "h" supported */
function CountUp({
  target,
  duration = 1400,
  suffix = "",
  className = "",
  ariaLabel,
}: {
  target: number;
  duration?: number;
  suffix?: string;
  className?: string;
  ariaLabel?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current || !inView) return;
    started.current = true;

    if (reduced) {
      setVal(target);
      return;
    }

    let raf = 0;
    const t0 = performance.now();

    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = easeOutCubic(p);
      const current = Math.round(target * eased);
      setVal(current);
      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduced]);

  return (
    <div
      ref={ref}
      className={className}
      aria-label={ariaLabel ?? `${target}${suffix}`}
    >
      {val.toLocaleString()}
      {suffix}
    </div>
  );
}

/* ---------- component ---------- */
export default function WhyChooseUs() {
  const features = useMemo(
    () => [
      { icon: Shield, title: "Insured & Bonded", desc: "Full protection guaranteed" },
      { icon: Leaf, title: "Eco-Friendly", desc: "Safe for your family" },
      { icon: Clock3, title: "Flexible Schedules", desc: "Work around your time" },
      { icon: Star, title: "Satisfaction Focused", desc: "100% satisfaction rate" },
      { icon: Calendar, title: "Same-Day Options", desc: "Emergency cleaning available" },
      { icon: Building2, title: "Commercial Specialists", desc: "Professional-grade service" },
    ],
    []
  );

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left column */}
        <div className="space-y-8">
          <div>
            <h2 className="heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--heading))] via-primary to-primary bg-clip-text text-transparent">
              Why Choose NEGOT
            </h2>
            <p className="text-foreground/80 text-base sm:text-lg leading-relaxed">
              Dependable teams, modern equipment, and eco-friendly products. We work around your
              schedule and deliver consistent results you can see and feel.
            </p>
          </div>

          {/* Interactive Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-slate-900/20 via-slate-800/10 to-transparent ring-1 ring-white/10 transition-all duration-500 hover:ring-accent-1/30 hover:shadow-lg hover:shadow-accent-1/10 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-heading group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-foreground/70">{feature.desc}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-accent-1/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* Statistics Counter (count up when in view) */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
            <div className="text-center group">
              <CountUp
                target={500}
                suffix="+"
                duration={1400}
                className="text-xl sm:text-2xl md:text-3xl font-bold bg-[#C30003] bg-clip-text text-transparent inline-block group-hover:scale-110 transition-transform duration-300"
                ariaLabel="Happy Clients: 500 plus"
              />
              <div className="text-sm text-foreground/70 mt-1">Happy Clients</div>
            </div>

            <div className="text-center group">
              <CountUp
                target={24}
                suffix="h"
                duration={1200}
                className="text-xl sm:text-2xl md:text-3xl font-bold bg-[#C30003] bg-clip-text text-transparent inline-block group-hover:scale-110 transition-transform duration-300"
                ariaLabel="Average Response Time: 24 hours"
              />
              <div className="text-sm text-foreground/70 mt-1">Response Time</div>
            </div>

            <div className="text-center group">
              <CountUp
                target={98}
                suffix="%"
                duration={1600}
                className="text-xl sm:text-2xl md:text-3xl font-bold bg-[#C30003] bg-clip-text text-transparent inline-block group-hover:scale-110 transition-transform duration-300"
                ariaLabel="Satisfaction Rate: 98 percent"
              />
              <div className="text-sm text-foreground/70 mt-1">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Right column — Enhanced Image with Overlay */}
        <div className="relative group">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
            <img
              src={GTA}
              alt="Professional GTA cleaning"
              className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent-1/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

            {/* Floating achievement badge */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-slate-900/60 supports-[backdrop-filter]:backdrop-blur-md rounded-xl p-4 ring-1 ring-white/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Award-Winning Service</p>
                    <p className="text-white/80 text-sm">Trusted by businesses across the GTA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Corner orb accent */}
          <div className="pointer-events-none absolute -top-6 -right-6 h-20 w-20 rounded-full bg-[#4DAFFE]/25 blur-xl" />
        </div>
      </div>
    </section>
  );
}
