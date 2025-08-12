import { Helmet } from "react-helmet-async";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const checklist = [
  {
    q: "Floors & Carpets",
    a: "Vacuum, mop, stain spot-treat; machine scrub where needed."
  },
  {
    q: "Desks & Touchpoints",
    a: "Disinfect handles, switches, keyboards (on request), phones, and rails."
  },
  { q: "Restrooms", a: "Deep clean fixtures, mirrors, dispensers, tiles; restock supplies." },
  { q: "Windows & Glass", a: "Interior glass, partitions, and entryways; streak-free finish." },
  { q: "Waste & Recycling", a: "Collect, bag, and stage for pick-up; liners replaced." },
  { q: "Kitchenettes", a: "Counters, sinks, appliances exterior; sanitize tables and chairs." },
];

export default function CommercialCleaning() {
  return (
    <main id="main-content" className="">
      <Helmet>
        <title>Commercial Cleaning | Maple Mop Cleaning</title>
        <meta name="description" content="After-hours and day-time commercial cleaning for offices, retail, schools, and more across the GTA." />
        <link rel="canonical" href="/commercial-cleaning" />
      </Helmet>

      <section className="container mx-auto px-4 pt-12 pb-6 lg:pt-16">
        <h1 className="heading text-4xl lg:text-5xl font-bold">Commercial Cleaning</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
          Late night or after hours, we clean thoroughly and discreetly—delivering stain-free surfaces that look welcoming and feel healthy. Flexible schedules to fit your operation.
        </p>
      </section>

      <section className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 py-8">
        <article className="glass p-6">
          <h2 className="font-heading text-2xl mb-3">Spaces we service</h2>
          <ul className="grid grid-cols-2 gap-3 text-sm">
            <li>Offices</li>
            <li>Retail</li>
            <li>Education</li>
            <li>Medical waiting areas</li>
            <li>Restrooms</li>
            <li>Floors & Carpets</li>
            <li>Windows & Glass</li>
            <li>Desks & Touchpoints</li>
          </ul>
        </article>
        <article className="glass p-6">
          <h2 className="font-heading text-2xl mb-3">Typical Scope & Checklist</h2>
          <Accordion type="single" collapsible className="w-full">
            {checklist.map((i, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger>{i.q}</AccordionTrigger>
                <AccordionContent>{i.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-4 text-sm text-muted-foreground">
            We use eco-friendly, professional-grade products and maintain MSDS where applicable.
          </p>
        </article>
      </section>

      <section className="container mx-auto px-4 py-10 flex flex-col gap-4 items-start">
        <div className="glass w-full p-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div>
            <h3 className="font-heading text-xl heading">Ready for dependable cleaning?</h3>
            <p className="text-muted-foreground">Call 437-991-7677 or request a quote now.</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <a href="tel:14379917677">Call 437-991-7677</a>
            </Button>
            <Button asChild variant="hero">
              <a href="/contact#quote">Get a Quote</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
