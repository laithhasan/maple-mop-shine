import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 border-t">
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="font-heading text-lg heading">Maple Mop Cleaning</div>
          <p className="text-sm text-muted-foreground mt-2">
            Reliable, excellent cleaning—first time and every time.
          </p>
        </div>
        <nav aria-label="Footer" className="grid gap-2">
          <Link to="/">HOME</Link>
          <Link to="/commercial-cleaning">Commercial Cleaning</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
        <div className="text-sm">
          <div className="font-medium mb-2">Contact</div>
          <p>
            <a className="story-link" href="tel:14379917677">
              437-991-7677
            </a>
          </p>
          <p>
            <a className="story-link" href="mailto:info@maplemopcleaning.com">
              info@maplemopcleaning.com
            </a>
          </p>
          <p className="mt-2 text-muted-foreground">GTA • Mon–Sat 8:00–20:00</p>
        </div>
        <div className="text-sm">
          <div className="font-medium mb-2">Follow</div>
          <p className="text-muted-foreground">Coming soon</p>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Maple Mop Cleaning. All rights reserved.
      </div>
    </footer>
  );
}
