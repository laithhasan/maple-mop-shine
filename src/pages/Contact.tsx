import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone"),
  propertyType: z.enum(["Home", "Office"]).default("Office"),
  serviceType: z.string().default("Commercial Cleaning"),
  frequency: z.enum(["Daily","Weekly","Bi-Weekly","Fortnightly","One-time"]).default("One-time"),
  rooms: z.string().optional(),
  size: z.string().optional(),
  datetime: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    // Mock submit - mailto fallback
    const params = new URLSearchParams({
      subject: "Quote Request",
      body: JSON.stringify(data, null, 2)
    });
    window.open(`mailto:info@maplemopcleaning.com?${params.toString()}`);
    reset();
  };

  return (
    <main id="main-content" className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Contact Us | Maple Mop Cleaning</title>
        <meta name="description" content="Call 437-991-7677 or request a quote. Quick, dependable commercial cleaning across the GTA." />
        <link rel="canonical" href="/contact" />
      </Helmet>

      <h1 className="heading text-4xl font-bold">Contact Us</h1>
      <p className="mt-2 text-muted-foreground">Call 437-991-7677 • info@maplemopcleaning.com</p>

      <section id="quote" className="mt-8 grid lg:grid-cols-2 gap-8 items-start">
        <form onSubmit={handleSubmit(onSubmit)} className="glass p-6 space-y-4" aria-label="Quote form">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium" htmlFor="name">Name *</label>
              <Input id="name" {...register("name")} aria-invalid={!!errors.name} />
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="email">Email *</label>
              <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="phone">Phone *</label>
              <Input id="phone" {...register("phone")} aria-invalid={!!errors.phone} />
              {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="propertyType">Property Type</label>
              <select id="propertyType" className="w-full h-10 rounded-md border bg-background px-3" {...register("propertyType")}>
                <option>Home</option>
                <option>Office</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="serviceType">Service Type</label>
              <select id="serviceType" className="w-full h-10 rounded-md border bg-background px-3" {...register("serviceType")}>
                <option>Commercial Cleaning</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="frequency">Frequency</label>
              <select id="frequency" className="w-full h-10 rounded-md border bg-background px-3" {...register("frequency")}>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Bi-Weekly</option>
                <option>Fortnightly</option>
                <option>One-time</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="rooms">Rooms/Offices</label>
              <Input id="rooms" {...register("rooms")} />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="size">Approx. size</label>
              <Input id="size" placeholder="e.g., 2,500 sq ft" {...register("size")} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium" htmlFor="datetime">Preferred date/time</label>
              <Input id="datetime" placeholder="e.g., Tue 3pm" {...register("datetime")} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium" htmlFor="message">Message</label>
              <Textarea id="message" rows={4} {...register("message")} />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="hero">Request Quote</Button>
            <Button asChild variant="outline">
              <a href="tel:14379917677">Call 437-991-7677</a>
            </Button>
          </div>
          {isSubmitSuccessful && (
            <div role="status" className="mt-3 text-sm text-foreground/80">
              Thanks! Your request was prepared in your email client. We’ll get back to you shortly.
            </div>
          )}
        </form>

        <aside className="space-y-4">
          <div className="glass p-6">
            <div className="font-heading heading">Hours</div>
            <p className="text-sm text-muted-foreground">Mon–Sat 8:00–20:00</p>
          </div>
          <div className="glass p-6">
            <div className="font-heading heading">Service Area</div>
            <p className="text-sm text-muted-foreground">Greater Toronto Area (GTA)</p>
          </div>
          <div className="glass p-6">
            <div className="font-heading heading">Map</div>
            <div className="aspect-[16/9] w-full bg-muted grid place-items-center text-sm text-muted-foreground">Map embed</div>
          </div>
        </aside>
      </section>
    </main>
  );
}
