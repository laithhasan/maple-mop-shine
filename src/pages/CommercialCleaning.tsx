import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, Shield, Clock3, Leaf, Star, Sparkles, CheckCircle2 } from "lucide-react";

const checklist = [
  { q: "Floors & Carpets", a: "Vacuum, mop, stain spot-treat; machine scrub where needed." },
  { q: "Desks & Touchpoints", a: "Disinfect handles, switches, keyboards (on request), phones, and rails." },
  { q: "Restrooms", a: "Deep clean fixtures, mirrors, dispensers, tiles; restock supplies." },
  { q: "Windows & Glass", a: "Interior glass, partitions, and entryways; streak-free finish." },
  { q: "Waste & Recycling", a: "Collect, bag, and stage for pick-up; liners replaced." },
  { q: "Kitchenettes", a: "Counters, sinks, appliances exterior; sanitize tables and chairs." },
];

const whatWeDo = [
  "Vacuuming all floors",
  "Steaming the carpets",
  "Dusting the furniture",
  "Mopping hard floors",
  "Disinfecting the cabins",
  "Cleaning the kitchen",
  "Vacuuming rooms",
  "Cleaning the toilets",
  "Emptying trash bins",
  "Removing garbage",
  "Tidying up the office",
  "Cleaning hand basins",
  "Polishing mirrors",
  "Wiping the benches",
];

export default function CommercialCleaning() {
  return (
    <main id="main-content">
      {/* Masthead */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-800" />
        {/* soft brand orbs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#C30003]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#02F1FF]/15 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-16 lg:py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 ring-1 ring-primary/20 mb-5">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Commercial Service</span>
          </div>

          <h1 className="heading text-4xl lg:text-5xl font-extrabold leading-tight bg-gradient-to-r from-[#FF6B6B] via-[#C30003] to-[#940400] bg-clip-text text-transparent">
            Commercial Cleaning
          </h1>

          <p className="mt-4 text-lg text-white/85 max-w-3xl">
            Late night or after hours, we clean thoroughly and discreetly—delivering stain-free surfaces that look welcoming and feel healthy. Flexible schedules to fit your operation.
          </p>

          {/* quick trust badges */}
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: Shield, label: "Insured & Bonded" },
              { icon: Clock3, label: "After-Hours Available" },
              { icon: Leaf, label: "Eco-Friendly Products" },
              { icon: Star, label: "5-Star Rated" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/15 text-white/90 hover:text-primary hover:ring-primary/40 transition-colors"
              >
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do + Checklist */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-14">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* What We Do */}
          <article className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-slate-900/25 via-slate-800/15 to-transparent ring-1 ring-white/10 shadow-2xl shadow-[0_15px_60px_rgba(77,175,254,0.20)] hover:shadow-[0_22px_90px_rgba(77,175,254,0.32)] transition-all duration-500 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-primary/10 via-transparent to-accent-1/10" />
            <header className="relative z-10 mb-4">
              <h2 className="font-heading text-2xl bg-gradient-to-r from-[#FF6B6B] via-[#C30003] to-[#940400] bg-clip-text text-transparent">
                What We Do
              </h2>
              <p className="mt-1 text-sm text-foreground/70">
                A meticulous, repeatable checklist for visibly cleaner spaces.
              </p>
            </header>

            {/* pill grid */}
            <ul className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {whatWeDo.map((item, i) => (
                <li key={item} className="h-full">
                  <span className="inline-flex items-center gap-2 w-full rounded-xl px-3 py-2 text-sm bg-white/[0.03] ring-1 ring-white/10 hover:ring-primary/40 hover:bg-white/[0.06] transition-all">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/25">
                      {i % 2 === 0 ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                      )}
                    </span>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* subtle bottom glow */}
            <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-[#02F1FF] via-[#C30003] to-[#4DAFFE] opacity-70" />
          </article>

          {/* Checklist */}
          <article className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-slate-900/25 via-slate-800/15 to-transparent ring-1 ring-white/10 shadow-2xl shadow-[0_15px_60px_rgba(77,175,254,0.20)] hover:shadow-[0_22px_90px_rgba(77,175,254,0.32)] transition-all duration-500 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-accent-1/10 via-transparent to-primary/10" />
            <h2 className="font-heading text-2xl mb-4 bg-gradient-to-r from-[#FF6B6B] via-[#C30003] to-[#940400] bg-clip-text text-transparent">
              Typical Scope & Checklist
            </h2>

            <Accordion type="single" collapsible className="w-full">
              {checklist.map((i, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-[1px] overflow-hidden data-[state=open]:ring-1 data-[state=open]:ring-primary/30 data-[state=open]:bg-white/[0.04] transition-all"
                >
                  <AccordionTrigger className="px-4 md:px-5 py-3 hover:no-underline text-left [&[data-state=open]_.chev]:rotate-180">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 text-primary text-xs font-semibold ring-1 ring-primary/25">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-heading">{i.q}</span>
                    </div>
                    <svg className="chev ml-auto h-4 w-4 shrink-0 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 md:px-5 pb-4 text-foreground/80 leading-relaxed">
                    {i.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <p className="mt-4 text-sm text-foreground/70">
              We use eco-friendly, professional-grade products and maintain MSDS where applicable.
            </p>
          </article>
        </div>
      </section>

      {/* Highlight stats */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { k: "98%", v: "Satisfaction Rate" },
            { k: "24h", v: "Avg. Response Time" },
            { k: "500+", v: "Active Clients" },
          ].map((s, i) => (
            <div
              key={s.v}
              className="group relative overflow-hidden rounded-2xl p-5 text-center bg-gradient-to-br from-slate-900/25 via-slate-800/10 to-transparent ring-1 ring-white/10 shadow-[0_8px_30px_rgba(77,175,254,0.16)] hover:shadow-[0_10px_40px_rgba(77,175,254,0.26)] hover:ring-accent-1/30 transition-all"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-[#FF6B6B] via-[#C30003] to-[#940400] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {s.k}
              </div>
              <div className="mt-1 text-sm text-foreground/70">{s.v}</div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-1/5 via-transparent to-primary/5" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-14">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-700/40 ring-1 ring-white/15 shadow-2xl shadow-[0_18px_72px_rgba(77,175,254,0.22)] hover:shadow-[0_26px_110px_rgba(77,175,254,0.34)] transition-shadow duration-300 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent-1/10" />
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-accent-1/20 to-transparent rounded-full blur-3xl opacity-50" />

          <div className="relative p-6 md:p-10 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left max-w-xl">
                <h3 className="heading text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FF6B6B] via-[#C30003] to-[#940400] bg-clip-text text-transparent">
                  Ready for dependable cleaning?
                </h3>
                <p className="text-white/85 mt-1">Call 437-991-7677 or request a quote now.</p>
              </div>
              <div className="flex gap-3">
                <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                  <a href="tel:14379917677">Call 437-991-7677</a>
                </Button>
                <Button asChild variant="hero" className="group">
                  <Link to="/contact#quote" className="inline-flex items-center gap-2">
                    Get a Quote
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* thin glow line */}
            <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>
        </div>
      </section>
    </main>
  );
}
