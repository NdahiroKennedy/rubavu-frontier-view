import { Compass, Ship, Sunrise, Trees, Users, Wine } from 'lucide-react';

interface ExperiencesProps {
  onReserveExpClick: (expId: string) => void;
}

export default function Experiences({ onReserveExpClick }: ExperiencesProps) {
  const experiences = [
    {
      id: 'boat-trip',
      roman: 'I',
      title: 'Lake Kivu by Boat',
      icon: Ship,
      description: 'A private vessel, a cooler of wine, and two hours on one of Africa\'s most beautiful bodies of water. Morning departures available. Sunset sailings by arrangement.',
      duration: '2 Hours',
      nature: 'Private Outing'
    },
    {
      id: 'congo-nile',
      roman: 'II',
      title: 'The Congo-Nile Trail',
      icon: Trees,
      description: 'One of East Africa\'s finest long-distance trails. Walk sections of the 227-kilometre route through hillside villages, tea estates, and ridge-top forests. We arrange guides, transfers, and packed lunches.',
      duration: 'Half or Full Day',
      nature: 'Active Exploration'
    },
    {
      id: 'town-walk',
      roman: 'III',
      title: 'Rubavu Town Walk',
      icon: Compass,
      description: 'The town is older than most realize. A working fishing harbour, lakeside markets, and colonial-era architecture make for a walk that is as much history as landscape. We take you through all of it.',
      duration: '3 Hours',
      nature: 'Heritage Walk'
    },
    {
      id: 'community-visit',
      roman: 'IV',
      title: 'Visits to Nearby Communities',
      icon: Users,
      description: 'The hills behind Rubavu are farmed by generations of families. We arrange visits to local cooperatives — tea, coffee, and cassava — and direct your spending where it matters.',
      duration: '3 - 4 Hours',
      nature: 'Responsible Travel'
    },
    {
      id: 'lodge-evening',
      roman: 'V',
      title: 'In-Lodge Evenings',
      icon: Wine,
      description: 'Fireside conversation. A tasting of locally brewed drinks from the Kivu region. Nothing scheduled. Nothing performed. Simply good company and a very clear sky.',
      duration: 'Evenings',
      nature: 'Social Gathering'
    }
  ];

  return (
    <section id="experiences" className="w-full bg-[#F5F1EB] py-24 md:py-32 border-b border-[#D9D3C7]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Intro */}
        <div className="space-y-6 text-center mb-20 md:mb-28">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A7468]">
            03 — Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2C2C2C] max-w-2xl mx-auto leading-tight">
            The lake is the beginning of everything here.
          </h2>
          <p className="font-sans text-sm md:text-base text-[#7A7468] font-light leading-relaxed max-w-2xl mx-auto">
            Rubavu is where things start — the shore from which Lake Kivu is explored, the ridge from which the Virunga volcanoes appear at dawn, the trail head for some of Rwanda's finest walking. At Rubavu Frontier View, we arrange everything, and nothing is rushed.
          </p>
        </div>

        {/* Vertical Stacked List with Generous Padding */}
        <div className="space-y-0 border-t border-[#D9D3C7]">
          {experiences.map((exp) => {
            const IconComponent = exp.icon;
            return (
              <div
                key={exp.id}
                className="group border-b border-[#D9D3C7] py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start transition-all duration-300 hover:bg-[#EDEBDF]/45 px-1 md:px-4"
              >
                {/* Number column */}
                <div className="md:col-span-2 flex items-center gap-4 md:flex-col md:items-start md:gap-1">
                  <span className="font-serif text-3xl md:text-4xl text-[#7A7468]/40 font-light group-hover:text-[#4A5240]/80 transition-colors">
                    {exp.roman}
                  </span>
                  <div className="h-px w-8 bg-[#D9D3C7] hidden md:block mt-2" />
                </div>

                {/* Detail column */}
                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-4.5 w-4.5 text-[#4A5240] stroke-[1.5]" />
                    <h3 className="font-serif text-xl md:text-2xl font-normal text-[#2C2C2C]">
                      {exp.title}
                    </h3>
                  </div>
                  <p className="font-sans text-sm text-[#7A7468] font-light leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                {/* Meta & Button column */}
                <div className="md:col-span-3 flex flex-row md:flex-col justify-between items-center md:items-end md:justify-start gap-4 h-full md:text-right">
                  <div className="font-mono text-[10px] space-y-1">
                    <span className="block text-[#7A7468] uppercase">{exp.nature}</span>
                    <span className="block text-[#4A5240] font-medium italic">{exp.duration}</span>
                  </div>
                  <button
                    onClick={() => onReserveExpClick(exp.id)}
                    className="border border-[#7A7468] hover:border-[#4A5240] hover:bg-[#4A5240] hover:text-[#F5F1EB] text-[#2C2C2C] px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-all rounded-sm md:mt-4"
                  >
                    Arrange
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => onReserveExpClick('')}
            className="bg-[#4A5240] hover:bg-[#2E3A28] text-[#F5F1EB] px-8 py-3 text-xs font-mono uppercase tracking-widest transition-all rounded-sm"
          >
            All Experiences
          </button>
        </div>

      </div>
    </section>
  );
}
