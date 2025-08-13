import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Calendar, Building2, Home, MapPin } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone"),
  propertyType: z.enum(["Home", "Office"]).default("Office"),
  serviceType: z.string().default("Commercial Cleaning"),
  frequency: z.enum(["Daily", "Weekly", "Bi-Weekly", "Fortnightly", "One-time"]).default("One-time"),
  rooms: z.string().optional(),
  size: z.string().optional(),
  datetime: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    // Mock submit - mailto fallback
    const params = new URLSearchParams({
      subject: "Quote Request",
      body: JSON.stringify(data, null, 2),
    });
    window.open(`mailto:info@maplemopcleaning.com?${params.toString()}`);
    reset();
  };

  return (
    <main id="main-content">
      {/* Masthead */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-800" />
        {/* brand orbs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#C30003]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#02F1FF]/15 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-16 lg:py-20">
          <h1 className="heading text-4xl lg:text-5xl font-extrabold leading-tight bg-gradient-to-r from-white via-primary to-accent-1 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="mt-2 text-white/85">
            Call <a className="underline-offset-2 hover:underline" href="tel:14379917677">437-991-7677</a> •{" "}
            <a className="underline-offset-2 hover:underline" href="mailto:info@maplemopcleaning.com">info@maplemopcleaning.com</a>
          </p>

          {/* quick chips */}
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="tel:14379917677"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/15 text-white/90 hover:text-primary hover:ring-primary/40 transition-colors"
            >
              <Phone className="h-4 w-4 text-primary" /> Call Us
            </a>
            <a
              href="mailto:info@maplemopcleaning.com"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/15 text-white/90 hover:text-primary hover:ring-primary/40 transition-colors"
            >
              <Mail className="h-4 w-4 text-primary" /> Email Us
            </a>
            <a
              href="#quote"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/15 text-white/90 hover:text-primary hover:ring-primary/40 transition-colors"
            >
              <Calendar className="h-4 w-4 text-primary" /> Request a Quote
            </a>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section id="quote" className="max-w-7xl mx-auto px-6 md:px-8 py-14 grid lg:grid-cols-2 gap-8 items-start">
        {/* Form card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="group relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-slate-900/25 via-slate-800/15 to-transparent ring-1 ring-white/10 shadow-2xl supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150 space-y-5"
          aria-label="Quote form"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-primary/10 via-transparent to-accent-1/10" />

          <div className="grid md:grid-cols-2 gap-4 relative z-10">
            <div>
              <label className="text-sm font-medium flex items-center gap-2" htmlFor="name">
                <SparklesDot /> Name <span className="text-destructive">*</span>
              </label>
              <Input id="name" {...register("name")} aria-invalid={!!errors.name} />
              {errors.name && (
                <p id="name-err" className="text-sm text-destructive mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium flex items-center gap-2" htmlFor="email">
                <Mail className="h-4 w-4 text-primary" /> Email <span className="text-destructive">*</span>
              </label>
              <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
              {errors.email && (
                <p id="email-err" className="text-sm text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium flex items-center gap-2" htmlFor="phone">
                <Phone className="h-4 w-4 text-primary" /> Phone <span className="text-destructive">*</span>
              </label>
              <Input id="phone" type="tel" {...register("phone")} aria-invalid={!!errors.phone} />
              {errors.phone && (
                <p id="phone-err" className="text-sm text-destructive mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium flex items-center gap-2" htmlFor="propertyType">
                <Building2 className="h-4 w-4 text-primary" /> Property Type
              </label>
              <select
                id="propertyType"
                className="w-full h-10 rounded-md border bg-background px-3 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                {...register("propertyType")}
              >
                <option>Home</option>
                <option>Office</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium flex items-center gap-2" htmlFor="serviceType">
                <SparklesDot /> Service Type
              </label>
              <select
                id="serviceType"
                className="w-full h-10 rounded-md border bg-background px-3 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                {...register("serviceType")}
              >
                <option>Commercial Cleaning</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium flex items-center gap-2" htmlFor="frequency">
                <Calendar className="h-4 w-4 text-primary" /> Frequency
              </label>
              <select
                id="frequency"
                className="w-full h-10 rounded-md border bg-background px-3 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                {...register("frequency")}
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Bi-Weekly</option>
                <option>Fortnightly</option>
                <option>One-time</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium flex items-center gap-2" htmlFor="rooms">
                <Home className="h-4 w-4 text-primary" /> Rooms/Offices
              </label>
              <Input id="rooms" placeholder="e.g., 6 offices" {...register("rooms")} />
            </div>

            <div>
              <label className="text-sm font-medium flex items-center gap-2" htmlFor="size">
                <MapPin className="h-4 w-4 text-primary" /> Approx. size
              </label>
              <Input id="size" placeholder="e.g., 2,500 sq ft" {...register("size")} />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium flex items-center gap-2" htmlFor="datetime">
                <Calendar className="h-4 w-4 text-primary" /> Preferred date/time
              </label>
              <Input id="datetime" placeholder="e.g., Tue 3pm" {...register("datetime")} />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium" htmlFor="message">
                Message
              </label>
              <Textarea id="message" rows={4} {...register("message")} />
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap gap-3 pt-1">
            <Button type="submit" variant="hero" className="group">
              <span className="inline-flex items-center gap-2">
                Request Quote <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Button>
            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
              <a href="tel:14379917677">Call 437-991-7677</a>
            </Button>
          </div>

          {isSubmitSuccessful && (
            <div role="status" aria-live="polite" className="relative z-10 mt-2 text-sm text-foreground/85">
              Thanks! Your request was prepared in your email client. We’ll get back to you shortly.
            </div>
          )}

          {/* thin glow line */}
          <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </form>

        {/* Sidebar info */}
        <aside className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-slate-900/25 via-slate-800/15 to-transparent ring-1 ring-white/10 shadow-2xl supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent-1/10 opacity-50" />
            <div className="relative z-10">
              <div className="font-heading heading">Hours</div>
              <p className="text-sm text-foreground/80">Mon–Sat 8:00–20:00</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-slate-900/25 via-slate-800/15 to-transparent ring-1 ring-white/10 shadow-2xl supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-1/10 via-transparent to-primary/10 opacity-50" />
            <div className="relative z-10">
              <div className="font-heading heading">Service Area</div>
              <p className="text-sm text-foreground/80">Greater Toronto Area (GTA)</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-slate-900/25 via-slate-800/15 to-transparent ring-1 ring-white/10 shadow-2xl supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent-1/10 opacity-50" />
            <div className="relative z-10">
              <div className="font-heading heading">Map</div>
              <div className="mt-2 aspect-[16/9] w-full rounded-lg bg-white/5 ring-1 ring-white/15 grid place-items-center text-sm text-foreground/70">
                Map embed
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

/** Small sparkle dot for labels (keeps imports light) */
function SparklesDot() {
  return (
    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/25">
      <span className="block h-2 w-2 rounded-full bg-primary" />
    </span>
  );
}
