import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onReserveClick: () => void;
}

const navLinks = [
  { to: '/lodge', label: 'The Lodge' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/restaurant', label: 'The Restaurant' },
  { to: '/gallery', label: 'Gallery' },
];

export default function Navigation({ onReserveClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileMenuOpen(false), [location.pathname]);

  const solid = !isHome || isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        solid
          ? "bg-[#F2ECE4]/95 backdrop-blur-md border-b border-[#D9D3C7]/40 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link
          to="/"
          className="font-serif text-xl font-bold tracking-tight text-[#2C2C2C] hover:opacity-85 transition-opacity"
        >
          Rubavu Frontier View
        </Link>

        <nav className="hidden lg:flex items-center space-x-8 text-[11px] uppercase tracking-[0.2em] font-medium font-sans">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-[#4A5240] font-semibold"
                    : "text-[#7A7468] hover:text-[#4A5240]"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <button
            onClick={onReserveClick}
            className="bg-[#4A5240] hover:bg-[#2E3A28] text-white px-6 py-2.5 text-[11px] uppercase tracking-widest transition-colors font-medium rounded-sm"
          >
            Reserve
          </button>
        </nav>

        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#2C2C2C] p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#F5F1EB] border-b border-[#D9D3C7] shadow-lg py-6 px-6 space-y-4 flex flex-col items-center">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-mono tracking-widest uppercase transition-colors ${
                  isActive ? "text-[#4A5240] font-semibold" : "text-[#7A7468] hover:text-[#2C2C2C]"
                }`
              }
            >
              [ {label} ]
            </NavLink>
          ))}
          <button
            onClick={() => { setMobileMenuOpen(false); onReserveClick(); }}
            className="text-sm font-mono tracking-widest uppercase text-[#4A5240] font-semibold"
          >
            [ Reserve ]
          </button>
        </div>
      )}
    </header>
  );
}
