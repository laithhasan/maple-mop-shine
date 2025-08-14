import { useEffect, useMemo, useRef, useState } from "react";
import surfaces from "@/assets/clean-surfaces.jpg";
import { Shield, Leaf, Clock3, Star, Calendar, Building2, Sparkles } from "lucide-react";

/* ---------- helpers: motion + in-view + countup ---------- */
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

function CountUp({
  target,
  duration = 1400,
  suffix = "",
  className = "",
  ariaLabel,
  start = 0,
}: {
  target: number;
  duration?: number;
  suffix?: string;
  className?: string;
  ariaLabel?: string;
  start?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  const [val, setVal] = useState(start);
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
      const current = Math.round(start + (target - start) * eased);
      setVal(current);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduced, start]);

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
      { icon: Leaf, title: "Eco-Friendly", desc: "Safe for your people & pets" },
      { icon: Clock3, title: "Flexible Schedules", desc: "Daytime or after-hours" },
      { icon: Star, title: "5-Star Quality", desc: "Consistent, meticulous results" },
      { icon: Calendar, title: "Same-Day Options", desc: "Urgent cleans available" },
      { icon: Building2, title: "Commercial Specialists", desc: "Professional-grade service" },
    ],
    []
  );

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-stretch">
        {/* LEFT — Glass gradient card (mirrors Featured Service styling) */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/25 via-slate-800/15 to-transparent ring-1 ring-white/10 shadow-2xl supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150 transition-all duration-500 hover:shadow-[0_0_40px_rgba(2,241,255,0.25)] hover:ring-accent-1/30">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent-1/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative p-8">
            {/* pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 ring-1 ring-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Why Choose Us</span>
            </div>

            <h2 className="heading text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--heading))] via-primary to-accent-1 bg-clip-text text-transparent">
              Reliable. Meticulous. Effortless.
            </h2>
            <p className="text-foreground/80 text-lg leading-relaxed mb-6">
              We bring trained teams, modern equipment, and eco-friendly products—scheduled around
              your operation—so your space always looks its best.
            </p>

            {/* feature chips (clean, tactile) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="relative overflow-hidden rounded-xl p-4 bg-white/[0.04] ring-1 ring-white/10 transition-all duration-400 hover:-translate-y-1 hover:ring-accent-1/30 hover:shadow-lg hover:shadow-accent-1/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/12 text-primary ring-1 ring-primary/20 shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-heading">{title}</div>
                      <p className="text-sm text-foreground/70">{desc}</p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-1/5 via-transparent to-primary/5" />
                </div>
              ))}
            </div>

            {/* subtle bottom glow line */}
            <div className="pointer-events-none mt-8 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>
        </div>

        {/* RIGHT — Interactive image with floating count-up badges */}
        <div className="relative group">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
            <img
              src={surfaces}
              alt="Professional commercial cleaning results"
              className="w-full h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent-1/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

            {/* Floating top-left badge */}
            <div className="absolute top-5 left-5">
              <div className="rounded-xl bg-slate-900/60 ring-1 ring-white/20 px-4 py-3 supports-[backdrop-filter]:backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="text-white/85 text-sm">Satisfaction</span>
                </div>
                <CountUp
                  target={98}
                  suffix="%"
                  duration={1400}
                  className="mt-1 text-2xl font-bold bg-gradient-to-r from-primary to-accent-1 bg-clip-text text-transparent"
                  ariaLabel="Satisfaction Rate 98 percent"
                />
              </div>
            </div>

            {/* Floating bottom-right badge */}
            <div className="absolute bottom-5 right-5">
              <div className="rounded-xl bg-slate-900/60 ring-1 ring-white/20 px-4 py-3 supports-[backdrop-filter]:backdrop-blur-md text-right">
                <div className="flex items-center gap-2 justify-end">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-white/85 text-sm">Happy Clients</span>
                </div>
                <CountUp
                  target={500}
                  suffix="+"
                  duration={1600}
                  className="mt-1 text-2xl font-bold bg-gradient-to-r from-primary to-accent-1 bg-clip-text text-transparent"
                  ariaLabel="Happy Clients 500 plus"
                />
              </div>
            </div>
          </div>

          {/* corner orb accent */}
          <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-[#4DAFFE]/25 blur-xl" />
        </div>
      </div>

      {/* Bottom stat bar (mirrors card styling + interactive) */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { n: 24, sfx: "h", label: "Average Response", aria: "Average Response Time 24 hours" },
          { n: 100, sfx: "%", label: "Eco-Friendly Products*", aria: "Eco friendly products 100 percent" },
          { n: 15, sfx: "+", label: "Industries Served", aria: "Industries served 15 plus" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl p-5 text-center bg-gradient-to-br from-slate-900/25 via-slate-800/10 to-transparent ring-1 ring-white/10 hover:ring-accent-1/30 hover:shadow-xl hover:shadow-accent-1/10 transition-all"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <CountUp
              target={stat.n}
              suffix={stat.sfx}
              duration={1200 + i * 200}
              className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-1 bg-clip-text text-transparent inline-block group-hover:scale-110 transition-transform duration-300"
              ariaLabel={stat.aria}
            />
            <div className="mt-1 text-sm text-foreground/70">{stat.label}</div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-1/5 via-transparent to-primary/5" />
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-foreground/50">* On request we’ll share MSDS / product info.</p>
    </section>
  );
}
