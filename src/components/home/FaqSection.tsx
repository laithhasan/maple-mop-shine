import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Do you offer after-hours cleaning?", a: "Yes. We frequently clean late night or after hours to minimize disruption." },
  { q: "Are your products eco-friendly?", a: "We use professional, eco-friendly products and can provide product info on request." },
  { q: "Can we set custom schedules?", a: "Absolutely—daily, weekly, bi-weekly, fortnightly, or one-time service." },
  { q: "Are you insured and bonded?", a: "Yes, we are fully insured and bonded for your peace of mind." },
  { q: "Do you bring equipment?", a: "Yes, we bring modern, well-maintained equipment and supplies." },
  { q: "Which areas do you serve?", a: "We serve the Greater Toronto Area (GTA)." },
];

export default function FaqSection() {
  return (
    <section className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-20">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 bg-[#C30003] bg-clip-text text-transparent drop-shadow-[0_1px_8px_rgba(2,241,255,0.25)]">
          Frequently Asked Questions
        </h2>
        <p className="text-foreground/80 text-base sm:text-lg">Everything you need to know about our cleaning services</p>
      </div>

      <div className="relative">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              className="group border-none rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/20 via-slate-800/10 to-transparent ring-1 ring-white/10 transition-all duration-500 hover:ring-accent-1/30 hover:shadow-lg hover:shadow-accent-1/10 data-[state=open]:ring-primary/30 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/10"
            >
              <AccordionTrigger className="px-6 py-4 text-left font-semibold text-heading hover:text-primary transition-colors duration-300 hover:no-underline data-[state=open]:text-primary [&[data-state=open]>svg]:rotate-180">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-foreground/80 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Decorative gradient orbs */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary/5 to-accent-1/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-accent-1/5 to-primary/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
