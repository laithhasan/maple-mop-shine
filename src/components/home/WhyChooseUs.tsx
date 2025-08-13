import surfaces from "@/assets/clean-surfaces.jpg";
import { Shield, Leaf, Clock3, Star, Calendar, Building2 } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div>
            <h2 className="heading text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-heading via-primary to-accent-1 bg-clip-text text-transparent">
              Why Choose NEGOT
            </h2>
            <p className="text-foreground/80 text-lg leading-relaxed">
              Dependable teams, modern equipment, and eco-friendly products. We work around your schedule and deliver consistent results you can see and feel.
            </p>
          </div>

          {/* Interactive Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Shield, title: "Insured & Bonded", desc: "Full protection guaranteed" },
              { icon: Leaf, title: "Eco-Friendly", desc: "Safe for your family" },
              { icon: Clock3, title: "Flexible Schedules", desc: "Work around your time" },
              { icon: Star, title: "Satisfaction Focused", desc: "100% satisfaction rate" },
              { icon: Calendar, title: "Same-Day Options", desc: "Emergency cleaning available" },
              { icon: Building2, title: "Commercial Specialists", desc: "Professional-grade service" },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-slate-900/20 via-slate-800/10 to-transparent ring-1 ring-white/10 transition-all duration-500 hover:ring-accent-1/30 hover:shadow-lg hover:shadow-accent-1/10 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-heading group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-foreground/70">{feature.desc}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-accent-1/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* Statistics Counter */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
            {[
              { number: "500+", label: "Happy Clients" },
              { number: "24h", label: "Response Time" },
              { number: "98%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent-1 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-foreground/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Image with Overlay */}
        <div className="relative group">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={surfaces}
              alt="Professional cleaning results"
              className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent-1/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

            {/* Floating achievement badge */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-slate-900/60 supports-[backdrop-filter]:backdrop-blur-md rounded-xl p-4 ring-1 ring-white/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Award-Winning Service</p>
                    <p className="text-white/80 text-sm">Trusted by businesses across the GTA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
