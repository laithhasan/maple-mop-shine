import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock3, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20">
      {/* Top glow line */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-[#02F1FF] via-[#C30003] to-[#4DAFFE] opacity-70" />

      {/* Main footer */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-14">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900/35 via-slate-900/20 to-slate-800/30 ring-1 ring-white/10 shadow-2xl supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150">
            <div className="grid gap-10 md:gap-12 p-8 md:p-12 lg:p-14 md:grid-cols-12 items-start">
              {/* Brand */}
              <div className="md:col-span-4">
                <Link to="/" className="inline-flex items-center gap-3 group">
                  <img
                    src="/images/NEGOT.png"
                    alt="Maple Mop Cleaning logo"
                    className="h-20 md:h-26 w-auto drop-shadow"
                    loading="lazy"
                    decoding="async"
                  />
                </Link>
                <p className="mt-4 text-sm text-foreground/70 max-w-sm">
                  Professional, reliable cleaning across the GTA — spotless results, flexible schedules, and service you can trust.
                </p>
              </div>

              {/* Nav */}
              <nav aria-label="Footer" className="md:col-span-3">
                <h3 className="text-sm font-semibold text-heading/90 tracking-wide mb-4">
                  Quick Links
                </h3>
                <ul className="grid gap-2 text-sm">
                  <li>
                    <Link
                      to="/"
                      className="text-foreground/80 hover:text-primary transition-colors"
                    >
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/commercial-cleaning"
                      className="text-foreground/80 hover:text-primary transition-colors"
                    >
                      Commercial Cleaning
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="text-foreground/80 hover:text-primary transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-foreground/80 hover:text-primary transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Contact */}
              <div className="md:col-span-3">
                <h3 className="text-sm font-semibold text-heading/90 tracking-wide mb-4">
                  Contact
                </h3>
                <address className="not-italic grid gap-2 text-sm">
                  <p className="flex items-center gap-2 text-foreground/80">
                    <Phone className="h-4 w-4 text-primary" />
                    <a className="story-link hover:text-primary transition-colors" href="tel:14379917677">
                      437-991-7777
                    </a>
                  </p>
                  <p className="flex items-center gap-2 text-foreground/80">
                    <Mail className="h-4 w-4 text-primary" />
                    <a className="story-link hover:text-primary transition-colors" href="mailto:info@maplemopcleaning.com">
                      info@negotcleaning.com
                    </a>
                  </p>
                  <p className="flex items-center gap-2 text-foreground/70">
                    <MapPin className="h-4 w-4 text-primary" />
                    GTA, Ontario
                  </p>
                  <p className="flex items-center gap-2 text-foreground/70">
                    <Clock3 className="h-4 w-4 text-primary" />
                    Mon–Sat • 8:00–20:00
                  </p>
                </address>
              </div>

              {/* Social */}
              <div className="md:col-span-2">
                <h3 className="text-sm font-semibold text-heading/90 tracking-wide mb-4">
                  Follow
                </h3>
                <div className="flex items-center gap-3">
                  {/* Replace href="#" with your profiles when ready */}
                  <a
                    href="#"
                    aria-label="Facebook (coming soon)"
                    className="group inline-flex items-center justify-center h-10 w-10 rounded-xl ring-1 ring-white/15 bg-white/5 text-white/80 hover:text-primary hover:ring-primary/40 transition-all"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram (coming soon)"
                    className="group inline-flex items-center justify-center h-10 w-10 rounded-xl ring-1 ring-white/15 bg-white/5 text-white/80 hover:text-primary hover:ring-primary/40 transition-all"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    aria-label="LinkedIn (coming soon)"
                    className="group inline-flex items-center justify-center h-10 w-10 rounded-xl ring-1 ring-white/15 bg-white/5 text-white/80 hover:text-primary hover:ring-primary/40 transition-all"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
                <p className="mt-3 text-xs text-foreground/60">More channels coming soon.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower bar */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-6 md:inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 text-center text-xs text-muted-foreground">
          <span className="text-foreground/60">
            © {year} NEGOT Cleaning. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
