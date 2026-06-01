interface FooterProps {
  onReserveClick: () => void;
}

export default function Footer({ onReserveClick }: FooterProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#1A1A1A] text-[#D9D3C7]/80 pt-20 pb-12 border-t border-[#4A5240]/25 font-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-16 border-b border-white/[0.05] text-sm">
        
        {/* Column 1: Lodge Core Branding & Address */}
        <div className="space-y-4">
          <h4 className="font-serif text-lg tracking-widest text-white uppercase font-light">
            Rubavu Frontier View
          </h4>
          <p className="font-sans text-xs text-[#7A7468] leading-relaxed">
            Rubavu, Western Province, Rwanda <br />
            Perched overlooking the Western Rift Valley ridge.
          </p>
        </div>

        {/* Column 2: Direct Contact Mechanics */}
        <div className="space-y-4">
          <h5 className="font-mono text-[10px] uppercase tracking-wider text-white">
            Reservations Department
          </h5>
          <div className="space-y-1.5 font-mono text-xs">
            <a
              href="mailto:reservations@rubavufrontierview.com"
              className="block text-[#D9D3C7] hover:text-white transition-colors"
            >
              reservations@rubavufrontierview.com
            </a>
            <a
              href="tel:+250795551496"
              className="block text-[#7A7468] hover:text-white transition-colors"
            >
              Tel: +250 795 551 496
            </a>
          </div>
        </div>

        {/* Column 3: Site Map Links */}
        <div className="space-y-4">
          <h5 className="font-mono text-[10px] uppercase tracking-wider text-white">
            Lodge Navigation
          </h5>
          <div className="grid grid-cols-2 gap-2 font-mono text-xs">
            <button
              onClick={() => scrollToSection('overview')}
              className="text-left hover:text-white transition-colors"
            >
              The Lodge
            </button>
            <button
              onClick={() => scrollToSection('rooms')}
              className="text-left hover:text-white transition-colors"
            >
              Rooms
            </button>
            <button
              onClick={() => scrollToSection('experiences')}
              className="text-left hover:text-white transition-colors"
            >
              Experiences
            </button>
            <button
              onClick={() => scrollToSection('restaurant')}
              className="text-left hover:text-white transition-colors"
            >
              The Restaurant
            </button>
            <button
              onClick={() => scrollToSection('sustainability')}
              className="text-left hover:text-white transition-colors"
            >
              Sustainability
            </button>
            <button
              onClick={onReserveClick}
              className="text-left text-[#9BA88D] hover:text-white transition-colors font-medium"
            >
              Reserve
            </button>
          </div>
        </div>

      </div>

      {/* Under Footer Credit Row */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-[#7A7468]">
        <p>© 2026 Rubavu Frontier View. All rights reserved.</p>
        <p className="tracking-widest capitalize font-light">
          lake kivu • Western Rwanda
        </p>
      </div>
    </footer>
  );
}
