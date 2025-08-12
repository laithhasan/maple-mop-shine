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
    `px-3 py-2 rounded-md text-sm font-medium transition-colors story-link ${
      isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-transform ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
      aria-label="Main"
    >
      <div className="glass">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2" aria-label="Maple Mop Cleaning - Home">
            <img
              src="/images/NEGOT.png"
              alt="Maple Mop Cleaning logo"
              className="h-8 w-auto"
              decoding="async"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={getNavCls} end>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="outline">
              <a href="tel:14379917677" className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> 437-991-7677
              </a>
            </Button>
            <Button asChild variant="hero">
              <Link to="/contact#quote">Get a Quote</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="icon" aria-label="Open menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="mt-10 flex flex-col gap-2" role="menu">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end
                      className={({ isActive }) =>
                        `px-4 py-3 rounded-lg text-base ${
                          isActive
                            ? "bg-muted text-primary"
                            : "hover:bg-muted/60"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                  <Button asChild variant="hero" className="mt-2">
                    <Link to="/contact#quote">Get a Quote</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
