import { BadgeCheck, Leaf, Sparkles, Clock, ShieldCheck, Zap } from "lucide-react";

const items = [
  { Icon: BadgeCheck, label: "Skilled Cleaners" },
  { Icon: Leaf, label: "Eco-Friendly Products" },
  { Icon: Sparkles, label: "Modern Equipment" },
  { Icon: ShieldCheck, label: "Long-Lasting Cleaning" },
  { Icon: Zap, label: "Same-Day Service" },
  { Icon: Clock, label: "Customer Satisfaction" },
];

export default function TrustBar() {
  return (
    <section aria-label="Trust bar" className="border-y bg-secondary/40">
      <div className="container mx-auto px-4 py-6">
        {/* Mobile: horizontal scroll */}
        <div className="relative md:hidden -mx-4 px-4">
          {/* subtle edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-secondary/40 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-secondary/40 to-transparent" />

          <div
            role="list"
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar"
          >
            {items.map(({ Icon, label }) => (
              <div
                role="listitem"
                key={label}
                className="snap-center shrink-0 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-3 ring-1 ring-white/10 bg-white/5"
              >
                <Icon className="h-4 w-4 text-primary" aria-hidden />
                <span className="text-sm text-foreground/80">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: keep original grid layout */}
        <div className="hidden md:grid grid-cols-6 gap-4">
          {items.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-2 text-sm whitespace-nowrap"
            >
              <Icon className="h-4 w-4 text-primary" aria-hidden />
              <span className="text-foreground/80">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* local style to hide scrollbar on mobile */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
