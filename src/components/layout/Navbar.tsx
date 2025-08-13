import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "HOME", to: "/" },
  { label: "Commercial Cleaning", to: "/commercial-cleaning" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      setHidden(y > 80 && delta > 0);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm font-medium transition-colors story-link
     ${isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"}`;

  return (
    <header
      className={`sticky top-0 z-50 transition-transform ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
      aria-label="Main"
    >
      <div className="glass">
        <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between h-16 md:h-20">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0"
            aria-label="Maple Mop Cleaning - Home"
          >
            <img
              src="/images/NEGOT.png"
              alt="Maple Mop Cleaning logo"
              className="h-12 md:h-14 lg:h-16 w-auto object-contain"
              decoding="async"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-5" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={getNavCls} end>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <Button asChild variant="outline" className="whitespace-nowrap">
              <a href="tel:14379917677" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                437-991-7677
              </a>
            </Button>
            <Button asChild variant="hero" className="whitespace-nowrap">
              <Link to="/contact#quote">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="icon"
              className="h-10 w-10"
              aria-label="Call 437-991-7677"
            >
              <a href="tel:14379917677">
                <Phone className="h-5 w-5" />
              </a>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="icon" className="h-10 w-10" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-80">
                <div className="mt-6">
                  <Link
                    to="/"
                    className="flex items-center gap-3"
                    aria-label="Maple Mop Cleaning - Home"
                  >
                    <img
                      src="/images/NEGOT.png"
                      alt="Maple Mop Cleaning logo"
                      className="h-10 w-auto object-contain"
                      decoding="async"
                    />
                  </Link>
                </div>

                <div className="mt-6 flex flex-col gap-2" role="menu" aria-label="Mobile navigation">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end
                      className={({ isActive }) =>
                        `px-4 py-3 text-base transition-colors ${
                          isActive ? "bg-muted text-primary" : "hover:bg-muted/60"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Button asChild variant="outline" className="w-full">
                      <a href="tel:14379917677" className="flex items-center justify-center gap-2">
                        <Phone className="h-4 w-4" />
                        Call
                      </a>
                    </Button>
                    <Button asChild variant="hero" className="w-full">
                      <Link to="/contact#quote">Get a Quote</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
