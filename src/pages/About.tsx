import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Shield,
  Leaf,
  Clock3,
  Sparkles,
  Building2,
  Star,
  CheckCircle2,
  User,
} from "lucide-react";

export default function About() {
  return (
    <main id="main-content">
      {/* Masthead */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-800" />
        {/* soft brand orbs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#C30003]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#02F1FF]/15 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16 lg:py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/20 mb-5">
            <User className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">About Us</span>
          </div>

          <h1 className="heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight bg-[#C30003] bg-clip-text text-transparent">
            Your Trusted &amp; Dependable Cleaning Company.
          </h1>

          <p className="mt-4 max-w-3xl text-white/85 text-base sm:text-lg">
            We started NEGOT Cleaning with a simple promise: deliver
            consistent, meticulous cleaning and make it easy for clients to keep
            their spaces looking great. Our teams are trained, insured, and
            focused on the details—from glass and floors to touchpoints and
            restrooms—so your environment stays fresh, safe, and welcoming.
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
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/15 text-white/90"
              >
                <Icon className="h-4 w-4 text-white" />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values / Area / Assurance */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-14">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-slate-900/25 via-slate-800/15 to-transparent ring-1 ring-white/10 shadow-2xl shadow-[0_12px_48px_rgba(77,175,254,0.18)] hover:shadow-[0_16px_64px_rgba(77,175,254,0.28)] transition-all duration-500 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150 hover:-translate-y-1"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-primary/10 via-transparent to-accent-1/10" />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary/15 ring-1 ring-primary/25 text-primary mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="font-heading text-xl bg-[#C30003] bg-clip-text text-transparent mb-1">
                  {title}
                </h2>
                <p className="text-sm text-foreground/75">{desc}</p>
              </div>
              <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-[#02F1FF] via-[#C30003] to-[#4DAFFE] opacity-70" />
            </article>
          ))}
        </div>
      </section>

      {/* Our Story — updated content + promise card */}
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <article className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-slate-900/25 via-slate-800/15 to-transparent ring-1 ring-white/10 shadow-2xl shadow-[0_15px_60px_rgba(77,175,254,0.20)] hover:shadow-[0_22px_90px_rgba(77,175,254,0.32)] transition-shadow duration-300 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent-1/10 opacity-50" />
          <div className="relative z-10">
            <div className="grid md:grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
              {/* Left: Story text */}
              <div className="lg:col-span-7">
                <h2 className="heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold bg-[#C30003] bg-clip-text text-transparent">
                  Our Story
                </h2>

                <div className="mt-3 space-y-4 text-foreground/85 max-w-4xl leading-relaxed">
                  <p>
                    NEGOT Cleaning is a leading commercial
                    cleaning company located in Ontario, with years of
                    experience in the cleaning industry. We take pride in the
                    hard work we put in to meet and exceed the expectations of
                    our clients. No job is too big or too small for our
                    cleaners—we have everything needed to solve your facility
                    cleaning and maintenance needs.
                  </p>
                  <p>
                    We continue to challenge ourselves to go beyond our
                    achievements, industry standards, and our clients’
                    expectations to earn and maintain a long-lasting, mutually
                    beneficial relationship with you.
                  </p>
                </div>
              </div>

              {/* Right: Promise card */}
              <aside className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-white/[0.03] ring-1 ring-white/10 shadow-[0_8px_30px_rgba(77,175,254,0.16)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent-1/10 opacity-60" />
                  <div className="relative z-10">
                    <h3 className="font-heading text-xl bg-[#C30003] bg-clip-text text-transparent">
                      Our Promise
                    </h3>
                    <p className="mt-2 text-sm text-foreground/80">
                      By relying on NEGOT Cleaning, you get a premise that
                      is crystal clean and shines bright. We’re available for
                      same-day and emergency cleaning services.
                    </p>

                    <div className="mt-4">
                      <p className="text-sm font-medium text-foreground/90">
                        Regular to periodic janitorial service:
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {["Daily", "Bi-weekly", "Weekly", "Fortnightly", "Monthly"].map(
                          (f) => (
                            <span
                              key={f}
                              className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary ring-1 ring-primary/25"
                            >
                              {f}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <div className="mt-5">
                      <Button asChild variant="hero" className="group">
                        <Link to="/contact#quote" className="inline-flex items-center gap-2">
                          Free Consultation & Quote
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            {/* mini stats */}
            <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { k: "500+", v: "Happy Clients" },
                { k: "24h", v: "Average Response" },
                { k: "98%", v: "Satisfaction Rate" },
              ].map((s, i) => (
                <div
                  key={s.v}
                  className="group relative overflow-hidden rounded-xl p-4 text-center bg-white/[0.03] ring-1 ring-white/10 shadow-[0_8px_30px_rgba(77,175,254,0.16)] hover:shadow-[0_10px_40px_rgba(77,175,254,0.26)] transition-all"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FF6B6B] via-[#C30003] to-[#940400] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
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
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-14">
        <article className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-slate-900/25 via-slate-800/15 to-transparent ring-1 ring-white/10 shadow-2xl shadow-[0_15px_60px_rgba(77,175,254,0.20)] hover:shadow-[0_22px_90px_rgba(77,175,254,0.32)] transition-shadow duration-300 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-1/10 via-transparent to-primary/10 opacity-50" />
          <div className="relative z-10">
            <h2 className="heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold bg-[#C30003] bg-clip-text text-transparent">
              Our Tools
            </h2>
            <p className="mt-2 text-foreground/85 max-w-4xl text-sm sm:text-base">
              We use modern, well-maintained equipment and eco-friendly
              products that clean effectively without harsh residues.
            </p>

            {/* icon bullets */}
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-12 md:pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-700/40 ring-1 ring-white/15 shadow-2xl shadow-[0_18px_72px_rgba(77,175,254,0.22)] hover:shadow-[0_26px_110px_rgba(77,175,254,0.34)] transition-shadow duration-300 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent-1/10" />
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-accent-1/20 to-transparent rounded-full blur-3xl opacity-50" />

            <div className="relative p-6 md:p-8 lg:p-12">
              <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between gap-4 md:gap-6">
                <div className="text-center md:text-left lg:text-left max-w-xl">
                  <h3 className="heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-[#C30003] bg-clip-text text-transparent">
                    Ready to work with a team you can count on?
                  </h3>
                  <p className="text-black/85 mt-1 text-sm sm:text-base">
                    Call 437-991-7677 or request a quote now.
                  </p>
                </div>
              <div className="flex gap-3">
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
