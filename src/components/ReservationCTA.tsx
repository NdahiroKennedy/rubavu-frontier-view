interface ReservationCTAProps {
  onReserveClick: () => void;
}

export default function ReservationCTA({ onReserveClick }: ReservationCTAProps) {
  return (
    <section className="relative w-full bg-[#2E3A28] py-24 md:py-32 flex flex-col justify-center items-center text-center text-[#F5F1EB]">
      {/* Absolute micro background mesh for aesthetic quality */}
      <div className="absolute inset-0 bg-white/[0.02] mix-blend-overlay pointer-events-none" />
      
      <div className="relative max-w-3xl mx-auto px-6 md:px-12 space-y-8 z-10">
        
        {/* Overline tracker */}
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D9D3C7]/75 block">
          Secure Your Sanctuary
        </span>

        {/* Big invitation headline */}
        <h2 className="font-serif text-3.5xl sm:text-4xl md:text-5xl font-extralight tracking-wide leading-tight text-white">
          Come before the season fills.
        </h2>

        {/* Explanatory description of limited ten room capacity */}
        <p className="font-sans text-xs sm:text-sm md:text-base text-[#D9D3C7]/90 font-light max-w-2xl mx-auto leading-relaxed">
          Rubavu Frontier View accommodates a limited number of guests at any time. A minimum stay of two nights is recommended. Longer stays are warmly encouraged.
        </p>

        {/* Main CTA Reservation buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <button
            onClick={onReserveClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#4A5240] hover:bg-[#F5F1EB] hover:text-[#2C2C2C] text-white text-xs font-mono uppercase tracking-widest transition-all duration-300 rounded-sm font-semibold shadow-lg"
          >
            Reserve Your Stay
          </button>

          <button
            onClick={onReserveClick}
            className="w-full sm:w-auto px-8 py-3.5 border border-[#F5F1EB]/55 hover:border-white hover:bg-white/5 text-[#F5F1EB] text-xs font-mono uppercase tracking-widest transition-all duration-300 rounded-sm"
          >
            Send an Enquiry
          </button>
          
        </div>

      </div>
    </section>
  );
}
