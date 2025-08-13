import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Leaf, Clock3, Sparkles, Building2, Star, CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <main id="main-content">
      {/* Masthead */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-800" />
        {/* soft brand orbs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#C30003]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#02F1FF]/15 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-16 lg:py-20">
          <h1 className="heading text-4xl lg:text-5xl font-extrabold leading-tight bg-gradient-to-r from-white via-primary to-accent-1 bg-clip-text text-transparent">
            Your Trusted &amp; Dependable Cleaning Company.
          </h1>

          <p className="mt-4 max-w-3xl text-white/85 text-lg">
            We started Maple Mop Cleaning with a simple promise: deliver consistent, meticulous cleaning and make it easy for clients to keep their spaces looking great. Our teams are trained, insured, and focused on the details—from glass and floors to touchpoints and restrooms—so your environment stays fresh, safe, and welcoming.
          </p>

          {/* quick trust badges */}
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { icon: Shield, label: "Insured & Bonded" },
              { icon: Leaf, label: "Eco-Friendly Products" },
              { icon: Clock3, label: "After-Hours Available" },
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

      {/* Values / Area / Assurance */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Our Values",
              desc: "Reliability, respect, and results. We show up on time and leave spaces spotless.",
              icon: Sparkles,
            },
            {
              title: "Service Area",
              desc: "Greater Toronto Area (GTA).",
              icon: Building2,
            },
            {
              title: "Assurance",
              desc: "Fully insured & bonded. Safety and accountability built-in.",
              icon: Shield,
            },
          ].map(({ title, desc, icon: Icon }) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-slate-900/25 via-slate-800/15 to-transparent ring-1 ring-white/10 shadow-2xl supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-primary/10 via-transparent to-accent-1/10" />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary/15 ring-1 ring-primary/25 text-primary mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="font-heading text-xl text-heading mb-1">{title}</h2>
                <p className="text-sm text-foreground/75">{desc}</p>
              </div>
              <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-[#02F1FF] via-[#C30003] to-[#4DAFFE] opacity-70" />
            </article>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <article className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-slate-900/25 via-slate-800/15 to-transparent ring-1 ring-white/10 shadow-2xl supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent-1/10 opacity-50" />
          <div className="relative z-10">
            <h2 className="heading text-2xl md:text-3xl font-semibold bg-gradient-to-r from-heading via-primary to-accent-1 bg-clip-text text-transparent">
              Our Story
            </h2>
            <p className="mt-2 text-foreground/85 max-w-4xl">
              From late-night clean-ups to daily service routines, we’ve grown by listening to clients and refining our process. Today, we serve offices, retail stores, clinics, schools, and more—adapting to each space while keeping our standards high.
            </p>

            {/* process chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              {["Listen", "Refine", "Deliver"].map((step) => (
                <span
                  key={step}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-white/5 ring-1 ring-white/15 text-white/90 hover:ring-primary/40 hover:text-primary transition-colors"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {step}
                </span>
              ))}
            </div>

            {/* mini stats */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { k: "500+", v: "Happy Clients" },
                { k: "24h", v: "Average Response" },
                { k: "98%", v: "Satisfaction Rate" },
              ].map((s, i) => (
                <div
                  key={s.v}
                  className="group relative overflow-hidden rounded-xl p-4 text-center bg-white/[0.03] ring-1 ring-white/10 hover:ring-accent-1/30 transition-all"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent-1 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {s.k}
                  </div>
                  <div className="mt-1 text-sm text-foreground/70">{s.v}</div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-1/5 via-transparent to-primary/5" />
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      {/* Our Tools */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-14">
        <article className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-slate-900/25 via-slate-800/15 to-transparent ring-1 ring-white/10 shadow-2xl supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-1/10 via-transparent to-primary/10 opacity-50" />
          <div className="relative z-10">
            <h2 className="heading text-2xl md:text-3xl font-semibold bg-gradient-to-r from-heading via-primary to-accent-1 bg-clip-text text-transparent">
              Our Tools
            </h2>
            <p className="mt-2 text-foreground/85 max-w-4xl">
              We use modern, well-maintained equipment and eco-friendly products that clean effectively without harsh residues.
            </p>

            {/* icon bullets */}
            <ul className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "HEPA vacuums & microfiber systems",
                "Auto-scrubbers (where required)",
                "Hospital-grade disinfectants (as appropriate)",
                "MSDS maintained & shared on request",
                "Eco-friendly, professional-grade products",
                "Equipment serviced regularly",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/25">
                    <Leaf className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="text-sm text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-700/40 ring-1 ring-white/15 shadow-2xl supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent-1/10" />
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-accent-1/20 to-transparent rounded-full blur-3xl opacity-50" />

          <div className="relative p-6 md:p-10 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left max-w-xl">
                <h3 className="heading text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-primary to-accent-1 bg-clip-text text-transparent">
                  Ready to work with a team you can count on?
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
            <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>
        </div>
      </section>
    </main>
  );
}
