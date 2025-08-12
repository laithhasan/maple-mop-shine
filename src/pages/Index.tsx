import hero from "@/assets/hero-office-clean.jpg";
import surfaces from "@/assets/clean-surfaces.jpg";
import TrustBar from "@/components/common/TrustBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Building2, Calendar, Clock3, Leaf, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  { q: "Do you offer after-hours cleaning?", a: "Yes. We frequently clean late night or after hours to minimize disruption." },
  { q: "Are your products eco-friendly?", a: "We use professional, eco-friendly products and can provide product info on request." },
  { q: "Can we set custom schedules?", a: "Absolutely—daily, weekly, bi-weekly, fortnightly, or one-time service." },
  { q: "Are you insured and bonded?", a: "Yes, we are fully insured and bonded for your peace of mind." },
  { q: "Do you bring equipment?", a: "Yes, we bring modern, well-maintained equipment and supplies." },
  { q: "Which areas do you serve?", a: "We serve the Greater Toronto Area (GTA)." },
];

export default function Index() {
  return (
    <main id="main-content">

      {/* Hero */}
      <section className="relative isolate">
        <img src={hero} alt="Pristine modern office interior" className="w-full h-[56vh] md:h-[72vh] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        <div className="container mx-auto px-4 absolute inset-x-0 bottom-8">
          <div className="max-w-2xl animate-enter">
            <h1 className="heading text-4xl md:text-5xl font-bold">Get Rid of Dirt, Stains & Spills.</h1>
            <p className="mt-3 text-lg text-foreground/80">We clean the hard-to-reach corners—safely and thoroughly.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="hero">
                <Link to="/contact#quote">Get a Quote</Link>
              </Button>
              <Button asChild variant="outline">
                <a href="tel:14379917677">Call 437-991-7677</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Featured Service */}
      <section className="container mx-auto px-4 py-12 grid lg:grid-cols-2 gap-8 items-stretch">
        <Card className="glass overflow-hidden">
          <CardHeader>
            <CardTitle className="heading">Commercial Cleaning</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-foreground/80">
                Late night/after hours or during the day—we deliver spotless, stain-free surfaces that look welcoming to customers and staff.
              </p>
              <Button asChild variant="link" className="mt-2 px-0">
                <Link to="/commercial-cleaning">Read More →</Link>
              </Button>
            </div>
            <img src={surfaces} alt="Sparkling clean glass and steel surfaces" className="rounded-lg border" loading="lazy" />
          </CardContent>
        </Card>

        {/* Our Approach */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="heading">Our Cleaning Approach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Daily', 'Weekly', 'Bi-Weekly', 'Fortnightly'].map((f) => (
                <div key={f} className="rounded-xl border border-accent/30 bg-background/60 text-center py-3">
                  <span className="font-medium">{f}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-6 lg:py-12 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="heading text-3xl font-bold">Why Choose Us</h2>
          <p className="mt-3 text-foreground/80">
            Dependable teams, modern equipment, and eco-friendly products. We work around your schedule and deliver consistent results you can see and feel.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2"><Shield className="text-primary" />Insured & Bonded</div>
            <div className="flex items-center gap-2"><Leaf className="text-primary" />Eco-Friendly</div>
            <div className="flex items-center gap-2"><Clock3 className="text-primary" />Flexible Schedules</div>
            <div className="flex items-center gap-2"><Star className="text-primary" />Satisfaction Focused</div>
            <div className="flex items-center gap-2"><Calendar className="text-primary" />Same-Day Options</div>
            <div className="flex items-center gap-2"><Building2 className="text-primary" />Commercial Specialists</div>
          </div>
        </div>
        <div className="glass p-4">
          <img src={surfaces} alt="Clean commercial surfaces" className="rounded-lg border" loading="lazy" />
        </div>
      </section>

      {/* Testimonials: swipeable */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="heading text-2xl font-semibold mb-4">What clients say</h2>
        <div className="overflow-x-auto snap-x snap-mandatory flex gap-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="region" aria-label="Testimonials">
          {[{
            name: 'Office Manager', text: 'They keep our space spotless. Reliable and easy to work with.'
          },{
            name: 'Retail Owner', text: 'After-hours cleaning is terrific—store looks new every morning.'
          },{
            name: 'Clinic Admin', text: 'Professional, thorough, and respectful of our schedule.'
          }].map((t, i) => (
            <article key={i} className="snap-start min-w-[280px] sm:min-w-[360px] glass p-5">
              <p className="text-foreground/90">“{t.text}”</p>
              <div className="mt-3 text-sm text-muted-foreground">— {t.name}</div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="heading text-2xl font-semibold mb-4">FAQs</h2>
        <Accordion type="single" collapsible>
          {faqs.map((f, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Promo CTA */}
      <section className="container mx-auto px-4 py-10">
        <div className="glass p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="heading text-xl font-semibold">We deliver reliable, excellent cleaning—first time and every time.</h3>
            <p className="text-muted-foreground">Let’s make your space look its best.</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <a href="tel:14379917677">Call 437-991-7677</a>
            </Button>
            <Button asChild variant="hero">
              <Link to="/contact#quote">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
