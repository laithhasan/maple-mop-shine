import { Calendar } from "lucide-react";

export default function CleaningSchedules() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-20">
      <div className="text-center mb-12">
        <h2
  className="
    heading text-3xl md:text-4xl font-bold mb-4
    text-heading
    supports-[background-clip:text]:bg-clip-text
    supports-[background-clip:text]:text-transparent
    bg-[#C30003]
    drop-shadow-[0_1px_8px_rgba(2,241,255,0.25)]
  "
>
  Flexible Cleaning Schedules
</h2>
        <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
          Choose the perfect cleaning frequency that fits your lifestyle and budget
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { freq: "Daily", desc: "Ultimate maintenance", popular: false },
          { freq: "Weekly", desc: "Most popular choice", popular: true },
          { freq: "Bi-Weekly", desc: "Balanced approach", popular: false },
          { freq: "Fortnightly", desc: "Budget-friendly", popular: false },
        ].map((item) => (
          <div
            key={item.freq}
            className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 cursor-pointer ${
              item.popular
                ? "bg-gradient-to-br from-primary/10 via-accent-1/5 to-transparent ring-2 ring-primary/30 shadow-lg shadow-primary/20"
                : "bg-gradient-to-br from-slate-900/20 via-slate-800/10 to-transparent ring-1 ring-white/10 hover:ring-accent-1/30"
            } hover:shadow-2xl hover:shadow-accent-1/10 hover:-translate-y-2`}
          >
            {item.popular && (
              <div className="absolute top-3 right-3">
                <div className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                  Popular
                </div>
              </div>
            )}
            <div className="relative z-10">
              <div
                className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-all duration-500 ${
                  item.popular
                    ? "bg-primary/20 text-primary"
                    : "bg-accent-1/10 text-accent-1 group-hover:bg-accent-1/20"
                }`}
              >
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-heading">{item.freq}</h3>
              <p className="text-foreground/70 text-sm">{item.desc}</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-accent-1/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
}
