import heroImage from '../assets/images/hero_lake_kivu_1779890198904.png';

export default function TheSetting() {
  return (
    <section id="setting" className="w-full bg-[#F5F1EB] pb-24 md:pb-32">
      {/* Full-bleed panoramic image */}
      <div className="w-full h-80 sm:h-96 md:h-[30rem] overflow-hidden relative border-b border-[#D9D3C7] shadow-inner">
        <img
          src={heroImage}
          alt="Panoramic panoramic setting of Lake Kivu and western ridge"
          className="w-full h-full object-cover filter brightness-90 contrast-[1.02]"
          referrerPolicy="no-referrer"
        />
        {/* Caption in the corner of image */}
        <div className="absolute bottom-4 left-6 md:left-12 bg-black/40 backdrop-blur-sm px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white/95 rounded-sm">
          Spectra over Western Ridge
        </div>
      </div>

      {/* Text below */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
          
          {/* Section Overline and Heading */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A7468] block">
              The Location
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#2C2C2C] leading-snug">
              The western ridge. Lake Kivu below. Open sky beyond.
            </h3>
          </div>

          {/* Body Content */}
          <div className="lg:col-span-7 font-sans text-sm md:text-base text-[#7A7468] leading-relaxed font-light space-y-6">
            <p>
              Rubavu sits at Rwanda's most dramatic western edge — a lakeside town pressed between volcanic hills and one of Africa's great Rift Valley lakes. The view from Rubavu Frontier View is one of unbroken water, layered mountain ranges, and perpetual golden light.
            </p>
            <p>
              The Virunga volcanoes frame the northern horizon. Tea estates climb the hillsides to the south. Below, the lake stretches wide and still — changing colour through the day from silver at dawn to deep copper at dusk.
            </p>
            <p className="border-l border-[#4A5240] pl-4 text-[#2C2C2C] italic">
              There is no other view quite like it in Rwanda.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
