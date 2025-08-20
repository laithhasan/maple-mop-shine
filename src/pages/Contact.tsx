import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  Mail,
  Calendar,
  Home,
  MapPin,
  Clock3,
  Sparkles,
} from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone"),
  frequency: z
    .enum(["Daily", "Weekly", "Bi-Weekly", "Fortnightly", "One-time"])
    .default("One-time"),
  rooms: z.string().optional(),
  size: z.string().optional(),
  date: z.string().optional(), // calendar selector
  time: z.string().optional(), // time selector
  message: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // today for min date on the calendar
  const today = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const onSubmit = (data: FormData) => {
    const params = new URLSearchParams({
      subject: "Quote Request",
      body: JSON.stringify(data, null, 2),
    });
    window.open(`mailto:info@maplemopcleaning.com?${params.toString()}`);
    reset();
  };

  const messageVal = watch("message") ?? "";
  const freq = watch("frequency");

  return (
    <main id="main-content">
      {/* Masthead */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-800" />
        {/* brand orbs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#C30003]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#02F1FF]/15 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-16 lg:py-20">
          <h1 className="heading text-4xl lg:text-5xl font-extrabold leading-tight bg-[#C30003] bg-clip-text text-transparent">
            Contact Us
          </h1>

          {/* quick chips */}
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="tel:14379917677"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/15 text-white/90 hover:text-primary hover:ring-primary/40 transition-colors"
            >
              <Phone className="h-4 w-4 text-white hover:text-primary" /> Call Us
            </a>
            <a
              href="mailto:info@maplemopcleaning.com"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/15 text-white/90 hover:text-primary hover:ring-primary/40 transition-colors"
            >
              <Mail className="h-4 w-4 text-white hover:text-primary" /> Email Us
            </a>
            <a
              href="#quote"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/15 text-white/90 hover:text-primary hover:ring-primary/40 transition-colors"
            >
              <Calendar className="h-4 w-4 text-white hover:text-primary" /> Request a Quote
            </a>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section
        id="quote"
        className="max-w-7xl mx-auto px-6 md:px-8 py-14 grid lg:grid-cols-2 gap-8 items-start"
      >
        {/* Form card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="group relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-slate-900/25 via-slate-800/15 to-transparent ring-1 ring-white/10 shadow-2xl shadow-[0_15px_60px_rgba(77,175,254,0.20)] hover:shadow-[0_22px_90px_rgba(77,175,254,0.32)] transition-shadow duration-300 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150 space-y-8"
          aria-label="Quote form"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-primary/10 via-transparent to-accent-1/10" />

          {/* Section: Contact Info */}
          <FormSection title="Contact Information" />
          <div className="grid md:grid-cols-2 gap-6 relative z-10">
            <FieldWrapper label="Name" required Icon={Sparkles}>
              <Input
                id="name"
                {...register("name")}
                aria-invalid={!!errors.name}
                className="h-11 ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              />
              <ErrorText msg={errors.name?.message} />
            </FieldWrapper>

            <FieldWrapper label="Email" required Icon={Mail}>
              <Input
                id="email"
                type="email"
                {...register("email")}
                aria-invalid={!!errors.email}
                className="h-11 ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              />
              <ErrorText msg={errors.email?.message} />
            </FieldWrapper>

            <FieldWrapper
              label="Phone"
              required
              Icon={Phone}
              className="md:col-span-2"
            >
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                aria-invalid={!!errors.phone}
                className="h-11 ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              />
              <ErrorText msg={errors.phone?.message} />
            </FieldWrapper>
          </div>

          {/* Section: Service Details */}
          <FormSection title="Service Details" />
          <div className="grid md:grid-cols-2 gap-6 relative z-10">
            {/* Frequency chips + select fallback */}
            <FieldWrapper label="Frequency" Icon={Calendar}>
              <div className="flex flex-wrap gap-2">
                {["Daily", "Weekly", "Bi-Weekly", "Fortnightly", "One-time"].map(
                  (f) => (
                    <button
                      type="button"
                      key={f}
                      onClick={() => setValue("frequency", f as FormData["frequency"])}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ring-1 transition ${
                        freq === f
                          ? "bg-primary/20 text-primary ring-primary/30"
                          : "bg-white/5 text-white/85 ring-white/10 hover:bg-white/10"
                      }`}
                      aria-pressed={freq === f}
                    >
                      {f}
                    </button>
                  )
                )}
              </div>
              {/* accessible select for screen readers / fallback */}
              <select
                id="frequency"
                className="sr-only"
                {...register("frequency")}
                aria-hidden
                tabIndex={-1}
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Bi-Weekly</option>
                <option>Fortnightly</option>
                <option>One-time</option>
              </select>
            </FieldWrapper>

            <FieldWrapper label="Rooms/Offices" Icon={Home}>
              <Input
                id="rooms"
                placeholder="e.g., 6 offices"
                {...register("rooms")}
                className="h-11 ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              />
            </FieldWrapper>

            <FieldWrapper label="Approx. size" Icon={MapPin}>
              <Input
                id="size"
                placeholder="e.g., 2,500 sq ft"
                {...register("size")}
                className="h-11 ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              />
            </FieldWrapper>

            <FieldWrapper label="Preferred date" Icon={Calendar}>
              <Input
                id="date"
                type="date"
                min={today}
                {...register("date")}
                className="h-11 ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              />
            </FieldWrapper>

            <FieldWrapper label="Preferred time" Icon={Clock3}>
              <div className="flex flex-col gap-2">
                <Input
                  id="time"
                  type="time"
                  step={900}
                  {...register("time")}
                  className="h-11 ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                />
              </div>
            </FieldWrapper>

            <FieldWrapper
              label="Message"
              className="md:col-span-2"
              noIcon
            >
              <Textarea
                id="message"
                rows={5}
                {...register("message")}
                className="ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              />
              <div className="mt-1 text-xs text-white/60">{messageVal.length} / 1000</div>
            </FieldWrapper>
          </div>

          <div className="relative z-10 flex flex-wrap gap-3 pt-2">
            <Button type="submit" variant="hero" className="group">
              <span className="inline-flex items-center gap-2">
                Request Quote{" "}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Button>
          </div>

          {isSubmitSuccessful && (
            <div
              role="status"
              aria-live="polite"
              className="relative z-10 mt-1 text-sm text-foreground/85"
            >
              Thanks! Your request was prepared in your email client. We’ll get back to you shortly.
            </div>
          )}

          {/* thin glow line */}
          <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </form>

        {/* Sidebar info */}
        <aside className="space-y-4">
          {/* Hours */}
          <InfoCard tint="primary">
            <div className="relative z-10">
              <div className="font-heading heading">Hours</div>
              <p className="text-sm text-foreground/80">Mon–Sat 8:00–20:00</p>
            </div>
          </InfoCard>

          {/* Service Area */}
          <InfoCard tint="accent">
            <div className="relative z-10">
              <div className="font-heading heading">Service Area</div>
              <p className="text-sm text-foreground/80">Greater Toronto Area (GTA)</p>
            </div>
          </InfoCard>

          {/* Map */}
          <InfoCard tint="primary">
            <div className="relative z-10">
              <div className="font-heading heading">Map</div>
              <div className="mt-2 aspect-[16/9] w-full rounded-lg bg-white/5 ring-1 ring-white/15 grid place-items-center text-sm text-foreground/70">
                Map embed
              </div>
            </div>
          </InfoCard>
        </aside>
      </section>
    </main>
  );
}

/* ---------- Reusable bits ---------- */

function FormSection({ title }: { title: string }) {
  return (
    <div className="relative z-10 mb-1 flex items-center gap-2">
      <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(2,241,255,0.35)]" />
      <h2 className="text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-[#FF6B6B] via-[#C30003] to-[#940400] bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="ml-2 h-px flex-1 bg-white/10" />
    </div>
  );
}

function FieldWrapper({
  label,
  required,
  Icon,
  children,
  className = "",
  noIcon = false,
}: {
  label: string;
  required?: boolean;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
  className?: string;
  noIcon?: boolean;
}) {
  return (
    <div className={className}>
      <label className="text-sm font-medium flex items-center gap-2 mb-1.5">
        {noIcon ? (
          <Sparkles className="h-4 w-4 text-primary" />
        ) : Icon ? (
          <Icon className="h-4 w-4 text-primary" />
        ) : (
          <Sparkles className="h-4 w-4 text-primary" />
        )}
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
    </div>
  );
}

function ErrorText({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-sm text-destructive mt-1">{msg}</p>;
}

function InfoCard({
  children,
  tint = "primary",
}: {
  children: React.ReactNode;
  tint?: "primary" | "accent";
}) {
  const overlay =
    tint === "primary"
      ? "from-primary/10 via-transparent to-accent-1/10"
      : "from-accent-1/10 via-transparent to-primary/10";

  const shadow =
    tint === "primary"
      ? "shadow-[0_12px_48px_rgba(2,241,255,0.18)] hover:shadow-[0_16px_64px_rgba(2,241,255,0.28)]"
      : "shadow-[0_12px_48px_rgba(77,175,254,0.18)] hover:shadow-[0_16px_64px_rgba(77,175,254,0.28)]";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-slate-900/25 via-slate-800/15 to-transparent ring-1 ring-white/10 ${shadow} transition-shadow duration-300 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150`}
    >
      <div className={`absolute inset-0 bg-gradient-to-tr ${overlay} opacity-50`} />
      {children}
    </div>
  );
}
