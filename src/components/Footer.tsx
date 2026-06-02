import { Link } from 'react-router-dom';

interface FooterProps {
  onReserveClick: () => void;
}

export default function Footer({ onReserveClick }: FooterProps) {
  return (
    <footer className="w-full bg-[#1A1A1A] text-[#D9D3C7]/80 pt-20 pb-12 border-t border-[#4A5240]/25 font-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-16 border-b border-white/[0.05] text-sm">

        <div className="space-y-4">
          <h4 className="font-serif text-lg tracking-widest text-white uppercase font-light">
            Rubavu Frontier View
          </h4>
          <p className="font-sans text-xs text-[#7A7468] leading-relaxed">
            Rubavu, Western Province, Rwanda <br />
            Perched overlooking the Western Rift Valley ridge.
          </p>
        </div>

        <div className="space-y-4">
          <h5 className="font-mono text-[10px] uppercase tracking-wider text-white">
            Reservations Department
          </h5>
          <div className="space-y-1.5 font-mono text-xs">
            <a href="mailto:reservations@rubavufrontierview.com" className="block text-[#D9D3C7] hover:text-white transition-colors">
              reservations@rubavufrontierview.com
            </a>
            <a href="tel:+250795551496" className="block text-[#7A7468] hover:text-white transition-colors">
              Tel: +250 795 551 496
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h5 className="font-mono text-[10px] uppercase tracking-wider text-white">
            Lodge Navigation
          </h5>
          <div className="grid grid-cols-2 gap-2 font-mono text-xs">
            <Link to="/lodge" className="text-left hover:text-white transition-colors">The Lodge</Link>
            <Link to="/rooms" className="text-left hover:text-white transition-colors">Rooms</Link>
            <Link to="/experiences" className="text-left hover:text-white transition-colors">Experiences</Link>
            <Link to="/restaurant" className="text-left hover:text-white transition-colors">The Restaurant</Link>
            <Link to="/gallery" className="text-left hover:text-white transition-colors">Gallery</Link>
            <button onClick={onReserveClick} className="text-left text-[#9BA88D] hover:text-white transition-colors font-medium">
              Reserve
            </button>
          </div>
          <Link to="/admin" className="block font-mono text-[9px] text-[#7A7468]/40 hover:text-[#7A7468] transition-colors mt-2">
            Admin
          </Link>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-[#7A7468]">
        <p>© 2026 Rubavu Frontier View. All rights reserved.</p>
        <p className="tracking-widest capitalize font-light">lake kivu • Western Rwanda</p>
      </div>
    </footer>
  );
}
