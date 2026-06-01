import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onReserveClick: () => void;
}

export default function Navigation({ onReserveClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F2ECE4]/90 backdrop-blur-md border-b border-[#D9D3C7]/40 py-4 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-serif text-xl font-bold tracking-tight text-[#2C2C2C] hover:opacity-85 transition-opacity"
        >
          Rubavu Frontier View
        </button>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-[11px] uppercase tracking-[0.2em] font-medium font-sans">
          <button
            onClick={() => scrollToSection('overview')}
            className="text-[#7A7468] hover:text-[#4A5240] transition-colors"
          >
            The Lodge
          </button>
          <button
            onClick={() => scrollToSection('rooms')}
            className="text-[#7A7468] hover:text-[#4A5240] transition-colors"
          >
            Rooms
          </button>
          <button
            onClick={() => scrollToSection('experiences')}
            className="text-[#7A7468] hover:text-[#4A5240] transition-colors"
          >
            Experiences
          </button>
          <button
            onClick={() => scrollToSection('restaurant')}
            className="text-[#7A7468] hover:text-[#4A5240] transition-colors"
          >
            The Restaurant
          </button>
          <button
            onClick={() => scrollToSection('gallery')}
            className="text-[#7A7468] hover:text-[#4A5240] transition-colors"
          >
            Gallery
          </button>
          <button
            onClick={onReserveClick}
            className="bg-[#4A5240] hover:bg-[#2E3A28] text-white px-6 py-2.5 text-[11px] uppercase tracking-widest transition-colors font-medium rounded-sm"
          >
            Reserve
          </button>
        </nav>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#2C2C2C] p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#F5F1EB] border-b border-[#D9D3C7] shadow-lg py-6 px-6 space-y-4 flex flex-col items-center">
          <button
            onClick={() => scrollToSection('overview')}
            className="text-sm font-mono tracking-widest uppercase text-[#7A7468] hover:text-[#2C2C2C]"
          >
            [ The Lodge ]
          </button>
          <button
            onClick={() => scrollToSection('rooms')}
            className="text-sm font-mono tracking-widest uppercase text-[#7A7468] hover:text-[#2C2C2C]"
          >
            [ Rooms ]
          </button>
          <button
            onClick={() => scrollToSection('experiences')}
            className="text-sm font-mono tracking-widest uppercase text-[#7A7468] hover:text-[#2C2C2C]"
          >
            [ Experiences ]
          </button>
          <button
            onClick={() => scrollToSection('restaurant')}
            className="text-sm font-mono tracking-widest uppercase text-[#7A7468] hover:text-[#2C2C2C]"
          >
            [ The Restaurant ]
          </button>
          <button
            onClick={() => scrollToSection('gallery')}
            className="text-sm font-mono tracking-widest uppercase text-[#7A7468] hover:text-[#2C2C2C]"
          >
            [ Gallery ]
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onReserveClick();
            }}
            className="text-sm font-mono tracking-widest uppercase text-[#4A5240] font-semibold"
          >
            [ Reserve ]
          </button>
        </div>
      )}
    </header>
  );
}
