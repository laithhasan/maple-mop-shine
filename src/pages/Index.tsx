import Hero from "@/components/home/Hero";
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
      <Hero />

      <TrustBar />

      {/* Featured Service - Enhanced with interactive before/after slider */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Commercial Cleaning Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/20 via-slate-800/15 to-slate-700/20 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150 ring-1 ring-white/10 shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(2,241,255,0.25)] hover:ring-accent-1/30">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 ring-1 ring-primary/20 mb-6">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Featured Service</span>
              </div>
              <h2 className="heading text-3xl font-bold mb-4 bg-gradient-to-r from-heading via-primary to-accent-1 bg-clip-text text-transparent">
                Commercial Cleaning Excellence
              </h2>
              <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                Late night/after hours or during the day—we deliver spotless, stain-free surfaces that look welcoming to customers and staff.
              </p>
              <div className="flex items-center gap-4">
                <Button asChild variant="hero" className="group/btn">
                  <Link to="/commercial-cleaning" className="inline-flex items-center gap-2">
                    Explore Service
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Interactive Before/After Slider */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={surfaces} 
                alt="Sparkling clean glass and steel surfaces" 
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent-1/10" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-slate-900/40 supports-[backdrop-filter]:backdrop-blur-md rounded-lg p-4 ring-1 ring-white/20">
                  <p className="text-white font-medium">Professional Results</p>
                  <p className="text-white/80 text-sm">Transform your workspace</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Cleaning Approach */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="heading text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-heading via-primary to-accent-1 bg-clip-text text-transparent">
            Flexible Cleaning Schedules
          </h2>
          <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
            Choose the perfect cleaning frequency that fits your lifestyle and budget
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { freq: 'Daily', desc: 'Ultimate maintenance', popular: false },
            { freq: 'Weekly', desc: 'Most popular choice', popular: true },
            { freq: 'Bi-Weekly', desc: 'Balanced approach', popular: false },
            { freq: 'Fortnightly', desc: 'Budget-friendly', popular: false }
          ].map((item) => (
            <div key={item.freq} className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 cursor-pointer ${
              item.popular 
                ? 'bg-gradient-to-br from-primary/10 via-accent-1/5 to-transparent ring-2 ring-primary/30 shadow-lg shadow-primary/20' 
                : 'bg-gradient-to-br from-slate-900/20 via-slate-800/10 to-transparent ring-1 ring-white/10 hover:ring-accent-1/30'
            } hover:shadow-2xl hover:shadow-accent-1/10 hover:-translate-y-2`}>
              {item.popular && (
                <div className="absolute top-3 right-3">
                  <div className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                    Popular
                  </div>
                </div>
              )}
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-all duration-500 ${
                  item.popular 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-accent-1/10 text-accent-1 group-hover:bg-accent-1/20'
                }`}>
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

      {/* Enhanced Why Choose Us with Statistics */}
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
                { icon: Shield, title: 'Insured & Bonded', desc: 'Full protection guaranteed' },
                { icon: Leaf, title: 'Eco-Friendly', desc: 'Safe for your family' },
                { icon: Clock3, title: 'Flexible Schedules', desc: 'Work around your time' },
                { icon: Star, title: 'Satisfaction Focused', desc: '100% satisfaction rate' },
                { icon: Calendar, title: 'Same-Day Options', desc: 'Emergency cleaning available' },
                { icon: Building2, title: 'Commercial Specialists', desc: 'Professional-grade service' }
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
                { number: '500+', label: 'Happy Clients' },
                { number: '24h', label: 'Response Time' },
                { number: '98%', label: 'Satisfaction Rate' }
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

      {/* Enhanced Testimonials with Auto-rotating Carousel */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="heading text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-heading via-primary to-accent-1 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-foreground/80 text-lg">Real experiences from satisfied customers</p>
        </div>

        <div className="relative">
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                role: 'Office Manager',
                company: 'Tech Startup',
                text: 'They keep our space spotless. Reliable and easy to work with. Our office has never looked better!',
                rating: 5
              },
              {
                name: 'Mike R.',
                role: 'Retail Owner',
                company: 'Downtown Store',
                text: 'After-hours cleaning is terrific—store looks new every morning. Customers always comment on how clean everything is.',
                rating: 5
              },
              {
                name: 'Dr. Lisa K.',
                role: 'Clinic Admin',
                company: 'Medical Center',
                text: 'Professional, thorough, and respectful of our schedule. They understand the importance of hygiene in healthcare.',
                rating: 5
              }
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

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-1/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </article>
            ))}
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent-1/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-accent-1/10 to-primary/10 rounded-full blur-2xl" />
        </div>
      </section>

      {/* Enhanced FAQ with Gradient Styling */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="heading text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-heading via-primary to-accent-1 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-foreground/80 text-lg">Everything you need to know about our cleaning services</p>
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

      {/* Enhanced Final CTA with Gradient Background */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-700/40 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150 ring-1 ring-white/20 shadow-2xl">
          {/* Background gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent-1/10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-accent-1/20 to-transparent rounded-full blur-3xl opacity-50" />
          
          <div className="relative p-8 md:p-12 lg:p-16">
            <div className="text-center max-w-4xl mx-auto">
              {/* Main heading with gradient */}
              <h2 className="heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-primary to-accent-1 bg-clip-text text-transparent leading-tight">
                We deliver reliable, excellent cleaning—first time and every time.
              </h2>
              
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Let's make your space look its best. Professional cleaning services that exceed expectations.
              </p>

              {/* Enhanced CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild variant="hero" size="lg" className="group text-lg px-8 py-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                  <Link to="/contact#quote" className="inline-flex items-center gap-2">
                    Get Your Free Quote
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="group text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                  <a href="tel:14379917677" className="inline-flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-xs">📞</span>
                    Call 437-991-7677
                  </a>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex flex-wrap justify-center items-center gap-8 text-white/60">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="text-sm">Fully Insured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    <span className="text-sm">5-Star Rated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-5 w-5 text-primary" />
                    <span className="text-sm">24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    <span className="text-sm">Eco-Friendly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}