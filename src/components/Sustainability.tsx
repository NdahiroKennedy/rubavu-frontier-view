import { Landmark, Footprints, ShieldCheck, HeartPulse } from 'lucide-react';

export default function Sustainability() {
  const pillars = [
    {
      title: 'Crafted Locally',
      desc: 'Formed from Western Province basalt, local volcanic clay, and plantation timber. Constructed entirely by our immediate neighbors.',
      icon: Landmark
    },
    {
      title: 'Short Food Miles',
      desc: '90%+ of all kitchen inputs originate from agricultural cooperatives within 15 kilometers of the ridge, ensuring hyper-seasonal dishes.',
      icon: Footprints
    },
    {
      title: 'True Accountability',
      desc: 'We support local schools, clean spring water points, and micro-loan groups. Our books are open to direct guest audits.',
      icon: ShieldCheck
    }
  ];

  return (
    <section id="sustainability" className="w-full bg-[#F5F1EB] py-24 md:py-32 border-b border-[#D9D3C7]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Structure split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Main Title Left */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A7468] block">
                Our Responsibility
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2C2C2C] leading-tight">
                Built here. Rooted here. Accountable here.
              </h2>
            </div>

            {/* Micro visual accent lines */}
            <div className="hidden lg:block space-y-3 max-w-[12rem] pt-6">
              <div className="h-0.5 bg-[#4A5240] w-full" />
              <div className="h-0.5 bg-[#D9D3C7] w-3/4" />
              <div className="h-0.5 bg-[#D9D3C7]/40 w-1/2" />
            </div>
          </div>

          {/* Body and pillars Right */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-10">
            <div className="font-sans text-sm md:text-base text-[#7A7468] font-light leading-relaxed space-y-5">
              <p>
                Rubavu Frontier View was built by local hands from local materials. Our staff are Rubavu residents. Our produce comes from farms within fifteen kilometres. Our architecture was designed not to dominate the hillside but to be absorbed by it.
              </p>
              <p>
                We operate a guest-funded community programme that supports schools, clean water access, and smallholder farmers along the lake's western shore. Every night you stay contributes directly.
              </p>
              <p className="font-semibold text-[#4A5240]">
                This is not charity. It is the only sensible way to build something meant to last.
              </p>
            </div>

            {/* Pillars list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#D9D3C7]">
              {pillars.map((p, idx) => {
                const IconComp = p.icon;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[#2C2C2C]">
                      <IconComp className="h-4 w-4 text-[#4A5240]" />
                      <h4 className="font-serif font-medium text-sm">
                        {p.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-[#7A7468] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
