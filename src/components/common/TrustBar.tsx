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
      <div className="container mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {items.map(({ Icon, label }) => (
          <div key={label} className="flex items-center gap-2 justify-center text-sm">
            <Icon className="h-4 w-4 text-primary" aria-hidden />
            <span className="text-foreground/80">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
