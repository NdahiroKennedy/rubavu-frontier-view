export default function GuestQuote() {
  return (
    <section className="w-full bg-[#F5F1EB] py-32 md:py-44 flex items-center justify-center border-b border-[#D9D3C7]" id="quotes">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center space-y-8 select-none">
        
        {/* Large custom quotations styling */}
        <span className="font-serif text-5xl md:text-7xl text-[#4A5240]/25 block h-4">
          “
        </span>

        {/* The beautiful quote itself */}
        <blockquote className="font-serif text-2xl sm:text-3xl md:text-4.5xl leading-[1.3] font-light text-[#2C2C2C] italic tracking-wide max-w-3xl mx-auto">
          There is nowhere else in Rwanda with a view like this, and nowhere that makes you feel less like a visitor and more like you belong.
        </blockquote>

        {/* Signature */}
        <cite className="block font-mono text-xs uppercase tracking-[0.2em] text-[#7A7468] not-italic pt-4">
          — A guest, 2025
        </cite>

      </div>
    </section>
  );
}
