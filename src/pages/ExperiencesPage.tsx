import { Compass, Ship, Trees, Users, Wine, Sunrise } from 'lucide-react';
import { useStore } from '../data/StoreContext';
import PageHero from '../components/PageHero';
import ReservationCTA from '../components/ReservationCTA';
import trailImg from '../assets/images/lodge_trail_view_1779892627012.png';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Ship,
  Trees,
  Compass,
  Users,
  Wine,
  Sunrise,
};

interface ExperiencesPageProps {
  onReserveClick: (type: 'experience', id: string) => void;
  onReserveGeneralClick: () => void;
}

export default function ExperiencesPage({ onReserveClick, onReserveGeneralClick }: ExperiencesPageProps) {
  const { data } = useStore();

  return (
    <div>
      <PageHero
        label="03 — Experiences"
        title="The lake is the beginning of everything here."
        subtitle="At Rubavu Frontier View, we arrange everything, and nothing is rushed."
        image={trailImg}
      />

      <section className="w-full bg-[#F5F1EB] py-24 md:py-32 border-b border-[#D9D3C7]">
        <div className="max-w-4xl mx-auto px-6 md:px-12">

          <div className="space-y-6 text-center mb-20 md:mb-28">
            <p className="font-sans text-sm md:text-base text-[#7A7468] font-light leading-relaxed max-w-2xl mx-auto">
              Rubavu is where things start — the shore from which Lake Kivu is explored, the ridge from which the Virunga volcanoes appear at dawn, the trail head for some of Rwanda's finest walking.
            </p>
          </div>

          {data.experiences.length === 0 ? (
            <p className="text-center text-[#7A7468] font-sans text-sm py-16">No experiences listed at the moment.</p>
          ) : (
            <div className="space-y-0 border-t border-[#D9D3C7]">
              {data.experiences.map((exp) => {
                const IconComponent = ICON_MAP[exp.iconName] || Compass;
                return (
                  <div
                    key={exp.id}
                    className="group border-b border-[#D9D3C7] py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start transition-all duration-300 hover:bg-[#EDEBDF]/45 px-1 md:px-4"
                  >
                    <div className="md:col-span-2 flex items-center gap-4 md:flex-col md:items-start md:gap-1">
                      <span className="font-serif text-3xl md:text-4xl text-[#7A7468]/40 font-light group-hover:text-[#4A5240]/80 transition-colors">
                        {exp.roman}
                      </span>
                      <div className="h-px w-8 bg-[#D9D3C7] hidden md:block mt-2" />
                    </div>

                    <div className="md:col-span-7 space-y-3">
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-4 w-4 text-[#4A5240]" />
                        <h3 className="font-serif text-xl md:text-2xl font-normal text-[#2C2C2C]">{exp.title}</h3>
                      </div>
                      <p className="font-sans text-sm text-[#7A7468] font-light leading-relaxed">{exp.description}</p>
                    </div>

                    <div className="md:col-span-3 flex flex-row md:flex-col justify-between items-center md:items-end md:justify-start gap-4 h-full md:text-right">
                      <div className="font-mono text-[10px] space-y-1">
                        <span className="block text-[#7A7468] uppercase">{exp.nature}</span>
                        <span className="block text-[#4A5240] font-medium italic">{exp.duration}</span>
                      </div>
                      <button
                        onClick={() => onReserveClick('experience', exp.id)}
                        className="border border-[#7A7468] hover:border-[#4A5240] hover:bg-[#4A5240] hover:text-[#F5F1EB] text-[#2C2C2C] px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-all rounded-sm md:mt-4"
                      >
                        Arrange
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-16 text-center">
            <button
              onClick={onReserveGeneralClick}
              className="bg-[#4A5240] hover:bg-[#2E3A28] text-[#F5F1EB] px-8 py-3 text-xs font-mono uppercase tracking-widest transition-all rounded-sm"
            >
              Enquire About Experiences
            </button>
          </div>
        </div>
      </section>

      <ReservationCTA onReserveClick={onReserveGeneralClick} />
    </div>
  );
}
