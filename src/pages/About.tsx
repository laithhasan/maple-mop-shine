

export default function About() {
  return (
    <main id="main-content" className="container mx-auto px-4 py-12">

      <h1 className="heading text-4xl font-bold">Your Trusted & Dependable Cleaning Company.</h1>
      <p className="mt-4 max-w-3xl text-foreground/80">
        We started Maple Mop Cleaning with a simple promise: deliver consistent, meticulous cleaning and make it easy for clients to keep their spaces looking great. Our teams are trained, insured, and focused on the details—from glass and floors to touchpoints and restrooms—so your environment stays fresh, safe, and welcoming.
      </p>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="glass p-5 rounded-xl">
          <div className="font-heading">Our Values</div>
          <p className="text-sm text-muted-foreground mt-2">Reliability, respect, and results. We show up on time and leave spaces spotless.</p>
        </div>
        <div className="glass p-5 rounded-xl">
          <div className="font-heading">Service Area</div>
          <p className="text-sm text-muted-foreground mt-2">Greater Toronto Area (GTA).</p>
        </div>
        <div className="glass p-5 rounded-xl">
          <div className="font-heading">Assurance</div>
          <p className="text-sm text-muted-foreground mt-2">Fully insured & bonded. Safety and accountability built-in.</p>
        </div>
      </div>

      <section className="mt-10 glass p-6">
        <h2 className="heading text-2xl font-semibold">Our Story</h2>
        <p className="mt-2 text-foreground/80">
          From late-night clean-ups to daily service routines, we’ve grown by listening to clients and refining our process. Today, we serve offices, retail stores, clinics, schools, and more—adapting to each space while keeping our standards high.
        </p>
      </section>

      <section className="mt-10 glass p-6">
        <h2 className="heading text-2xl font-semibold">Our Tools</h2>
        <p className="mt-2 text-foreground/80">We use modern, well-maintained equipment and eco-friendly products that clean effectively without harsh residues.</p>
      </section>
    </main>
  );
}
