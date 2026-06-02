import { useState } from 'react';
import { useStore } from '../data/StoreContext';
import PageHero from '../components/PageHero';
import ReservationCTA from '../components/ReservationCTA';
import suiteImage from '../assets/images/rooms_suite_1779890241779.png';

interface RoomsPageProps {
  onReserveClick: (type: 'room', id: string) => void;
  onReserveGeneralClick: () => void;
}

export default function RoomsPage({ onReserveClick, onReserveGeneralClick }: RoomsPageProps) {
  const { data } = useStore();
  const [expandedRoom, setExpandedRoom] = useState<string | null>(null);

  return (
    <div>
      <PageHero
        label="02 — Accommodation"
        title="Ten rooms. Each one a private world."
        subtitle="Every room faces west — toward the lake, toward the last light, toward the silence that falls after sunset."
        image={suiteImage}
      />

      <section className="w-full bg-[#EDEBDF] py-24 md:py-32 border-b border-[#D9D3C7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Intro copy */}
          <div className="max-w-3xl mb-16 md:mb-24 space-y-6">
            <div className="font-sans text-sm md:text-base text-[#7A7468] font-light leading-relaxed space-y-4">
              <p>
                Every room at Rubavu Frontier View faces west — toward the lake, toward the last light, toward the silence that falls after sunset.
              </p>
              <p>
                Rooms are finished in raw stone, hand-laid timber, and local linen. There are no televisions. There is no clutter. There is only the view, the quality of the light, and the deep comfort of a bed made for rest.
              </p>
            </div>
          </div>

          {/* Featured suite banner */}
          <div className="mb-16 rounded-sm overflow-hidden border border-[#D9D3C7] shadow-lg relative h-80 md:h-[26rem]">
            <img
              src={suiteImage}
              alt="Inside the Frontier Suite"
              className="w-full h-full object-cover brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 md:p-10 text-[#F5F1EB]">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#D9D3C7]">Featured Room</span>
              <h4 className="font-serif text-2xl md:text-3xl font-light mt-1">Inside the Frontier Suite</h4>
              <p className="text-xs md:text-sm text-[#D9D3C7] max-w-xl font-light mt-2 hidden sm:block">
                Woven together by natural linen, local volcanic clay, and fragrant mountain cedar timbers.
              </p>
            </div>
          </div>

          {/* Rooms grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {data.rooms.map((room, idx) => (
              <div
                key={room.id}
                className="bg-[#F5F1EB] border border-[#D9D3C7]/80 hover:border-[#7A7468] rounded-sm p-6 md:p-8 flex flex-col transition-all duration-300 hover:shadow-md"
              >
                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between border-b border-[#D9D3C7]/50 pb-4">
                    <span className="font-mono text-[10px] text-[#7A7468] tracking-widest uppercase">
                      0{idx + 1} — Tier
                    </span>
                    <span className="font-mono text-[10px] text-[#4A5240] font-semibold bg-[#4A5240]/10 px-2.5 py-0.5 rounded-full">
                      {room.capacity}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-normal text-[#2C2C2C]">{room.name}</h3>
                    <p className="text-[11px] font-mono text-[#7A7468] italic">{room.tagline}</p>
                  </div>
                  <p className="text-xs leading-relaxed text-[#7A7468] font-light">{room.description}</p>

                  {/* Features */}
                  <ul className="space-y-1.5 pt-3 border-t border-[#D9D3C7]/35">
                    {(expandedRoom === room.id ? room.features : room.features.slice(0, 3)).map((f, fi) => (
                      <li key={fi} className="text-[11px] font-mono text-[#7A7468] flex items-center gap-2">
                        <span className="h-1 w-1 bg-[#4A5240] rounded-full inline-block" />
                        {f}
                      </li>
                    ))}
                    {room.features.length > 3 && (
                      <button
                        onClick={() => setExpandedRoom(expandedRoom === room.id ? null : room.id)}
                        className="text-[10px] font-mono text-[#4A5240] hover:underline mt-1"
                      >
                        {expandedRoom === room.id ? '▲ Less' : `▼ +${room.features.length - 3} more`}
                      </button>
                    )}
                  </ul>
                </div>

                <div className="pt-6 mt-auto flex gap-3">
                  <button
                    onClick={() => onReserveClick('room', room.id)}
                    className="flex-1 bg-[#4A5240] hover:bg-[#2E3A28] text-[#F5F1EB] py-2.5 text-[10px] font-mono uppercase tracking-widest transition-all text-center rounded-sm"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            ))}
          </div>

          {data.rooms.length === 0 && (
            <p className="text-center text-[#7A7468] font-sans text-sm py-16">No rooms available at the moment.</p>
          )}

          <div className="mt-16 text-center">
            <button
              onClick={onReserveGeneralClick}
              className="bg-[#4A5240] hover:bg-[#2E3A28] text-[#F5F1EB] px-8 py-3 text-xs font-mono uppercase tracking-widest rounded-sm transition-all"
            >
              Reserve a Room
            </button>
          </div>
        </div>
      </section>

      <ReservationCTA onReserveClick={onReserveGeneralClick} />
    </div>
  );
}
