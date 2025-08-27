import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone"),
  address: z.string().min(5, "Please enter your address"),
  serviceType: z.string().min(1, "Please select a service type"),
  frequency: z
    .enum(["Daily", "Weekly", "Bi-Weekly", "Fortnightly", "One-time"])
    .default("One-time"),
  preferredDate: z.string().optional(),
  message: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      serviceType: "",
      frequency: "One-time",
      preferredDate: "",
      message: "",
    }
  });

  const today = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const { data: result, error } = await supabase.functions.invoke('send-contact-email', {
        body: data
      });

      if (error) {
        throw error;
      }

      reset();
      toast({
        title: "Quote request sent!",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error sending request",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16 lg:py-20">
         <h1 className="heading text-4xl lg:text-5xl font-extrabold leading-snug bg-[#C30003] bg-clip-text text-transparent">
            Contact Us
          </h1>

          {/* quick chips */}
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="tel:14379917677"
              className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/15 text-white/90 transition-colors hover:text-[#C30003] hover:ring-[#C30003]/40"
            >
              <Phone className="h-4 w-4 text-white transition-colors group-hover:text-[#C30003]" />
              Call Us
            </a>
            <a
              href="mailto:negotcleaning@gmail.com"
              className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/15 text-white/90 transition-colors hover:text-[#C30003] hover:ring-[#C30003]/40"
            >
              <Mail className="h-4 w-4 text-white transition-colors group-hover:text-[#C30003]" />
              Email Us
            </a>
            <a
              href="#quote"
              className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/15 text-white/90 transition-colors hover:text-[#C30003] hover:ring-[#C30003]/40"
            >
              <Calendar className="h-4 w-4 text-white transition-colors group-hover:text-[#C30003]" />
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section
        id="quote"
        className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-14 grid md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start"
      >
        {/* Form card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="group relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-slate-900/25 via-slate-800/15 to-transparent ring-1 ring-white/10 shadow-2xl shadow-[0_15px_60px_rgba(77,175,254,0.20)] hover:shadow-[0_22px_90px_rgba(77,175,254,0.32)] transition-shadow duration-300 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150 space-y-8"
          aria-label="Quote form"
        >
          {/* Section: Contact Info (plain red text, no icon/gradient) */}
          <FormSection title="Contact Information" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10">
            <FieldWrapper label="Name" required>
              <Input
                id="name"
                {...register("name")}
                aria-invalid={!!errors.name}
                className="h-11 ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              />
              <ErrorText msg={errors.name?.message} />
            </FieldWrapper>

            <FieldWrapper label="Email" required>
              <Input
                id="email"
                type="email"
                {...register("email")}
                aria-invalid={!!errors.email}
                className="h-11 ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              />
              <ErrorText msg={errors.email?.message} />
            </FieldWrapper>

            <FieldWrapper label="Phone" required>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                aria-invalid={!!errors.phone}
                className="h-11 ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              />
              <ErrorText msg={errors.phone?.message} />
            </FieldWrapper>

            <FieldWrapper label="Address" required>
              <Input
                id="address"
                placeholder="Your service address"
                {...register("address")}
                aria-invalid={!!errors.address}
                className="h-11 ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              />
              <ErrorText msg={errors.address?.message} />
            </FieldWrapper>
          </div>

          {/* Section: Service Details (plain red text, no icon/gradient) */}
          <FormSection title="Service Details" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10">
            <FieldWrapper label="Service Type" required>
              <select
                id="serviceType"
                {...register("serviceType")}
                className="h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a service</option>
                <option value="Office Cleaning">Office Cleaning</option>
                <option value="Commercial Deep Clean">Commercial Deep Clean</option>
                <option value="Post-Construction">Post-Construction</option>
                <option value="Regular Maintenance">Regular Maintenance</option>
                <option value="Other">Other</option>
              </select>
              <ErrorText msg={errors.serviceType?.message} />
            </FieldWrapper>
            
            {/* Frequency chips */}
            <FieldWrapper label="Frequency">
              <div className="flex flex-wrap gap-2">
                {["Daily", "Weekly", "Bi-Weekly", "Fortnightly", "One-time"].map(
                  (f) => (
                    <button
                      type="button"
                      key={f}
                      onClick={() => setValue("frequency", f as FormData["frequency"])}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ring-1 transition
                      ${
                        freq === f
                          ? "bg-primary/20 text-primary ring-primary/30"
                          : "bg-white text-black ring-black hover:bg-white/90"
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

            <FieldWrapper label="Preferred date">
              <Input
                id="preferredDate"
                type="date"
                min={today}
                {...register("preferredDate")}
                className="h-11 ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              />
            </FieldWrapper>

            <FieldWrapper label="Message" className="md:col-span-2">
              <Textarea
                id="message"
                rows={5}
                placeholder="Tell us about your cleaning needs..."
                {...register("message")}
                className="ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
              />
              <div className="mt-1 text-xs text-white/60">{messageVal.length} / 1000</div>
            </FieldWrapper>
          </div>

          <div className="relative z-10 flex flex-wrap gap-3 pt-2">
            <Button type="submit" variant="hero" className="group" disabled={isSubmitting}>
              <span className="inline-flex items-center gap-2">
                {isSubmitting ? "Sending..." : "Request Quote"}{" "}
                {!isSubmitting && <span className="transition-transform group-hover:translate-x-1">→</span>}
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
              <p className="text-sm text-foreground/80">Mon - Sat • 8:00 AM - 5:00 PM</p>
            </div>
          </InfoCard>

          {/* Service Area */}
          <InfoCard tint="accent">
            <div className="relative z-10">
              <div className="font-heading heading">Service Area</div>
              <p className="text-sm text-foreground/80">Greater Toronto Area (GTA)</p>
            </div>
          </InfoCard>

          {/* Map card removed as requested */}
        </aside>
      </section>
    </main>
  );
}

/* ---------- Reusable bits ---------- */

function FormSection({ title }: { title: string }) {
  // Plain red heading, no gradient or icons
  return (
    <div className="relative z-10 mb-1 flex items-center gap-2">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-[#C30003]">
        {title}
      </h2>
      <div className="ml-2 h-px flex-1 bg-white/10" />
    </div>
  );
}

function FieldWrapper({
  label,
  required,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-1.5">
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
