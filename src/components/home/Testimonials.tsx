import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 bg-[#C30003] bg-clip-text text-transparent drop-shadow-[0_1px_8px_rgba(2,241,255,0.25)]">
          What Our Clients Say
        </h2>
        <p className="text-foreground/80 text-base sm:text-lg">Real experiences from satisfied customers</p>
      </div>

      <div className="relative">
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              name: "Sarah M.",
              role: "Office Manager",
              company: "Tech Startup",
              text:
                "They keep our space spotless. Reliable and easy to work with. Our office has never looked better!",
              rating: 5,
            },
            {
              name: "Mike R.",
              role: "Retail Owner",
              company: "Downtown Store",
              text:
                "After-hours cleaning is terrific—store looks new every morning. Customers always comment on how clean everything is.",
              rating: 5,
            },
            {
              name: "Dr. Lisa K.",
              role: "Clinic Admin",
              company: "Medical Center",
              text:
                "Professional, thorough, and respectful of our schedule. They understand the importance of hygiene in healthcare.",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <article
              key={index}
              className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-slate-900/20 via-slate-800/10 to-transparent ring-1 ring-white/10 transition-all duration-500 hover:ring-accent-1/30 hover:shadow-2xl hover:shadow-accent-1/10 hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground/90 text-lg leading-relaxed mb-6 relative">
                <span className="text-4xl text-primary/30 absolute -top-2 -left-2">"</span>
                {testimonial.text}
                <span className="text-4xl text-primary/30 absolute -bottom-4 -right-2">"</span>
              </blockquote>

              {/* Author */}
              <footer className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent-1/20 flex items-center justify-center ring-2 ring-white/10">
                  <span className="text-lg font-semibold text-primary">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <cite className="font-semibold text-heading not-italic">{testimonial.name}</cite>
                  <p className="text-sm text-foreground/70">{testimonial.role}</p>
                  <p className="text-xs text-foreground/50">{testimonial.company}</p>
                </div>
              </footer>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-1/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </article>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent-1/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-accent-1/10 to-primary/10 rounded-full blur-2xl" />
      </div>
    </section>
  );
}
