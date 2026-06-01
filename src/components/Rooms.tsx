import { motion } from 'motion/react';
import { BedDouble, Trees, Bath, Compass, SquareArrowUpRight } from 'lucide-react';
import suiteImage from '../assets/images/rooms_suite_1779890241779.png';

interface RoomsProps {
  onReserveRoomClick: (roomId: string) => void;
}

export default function Rooms({ onReserveRoomClick }: RoomsProps) {
  const rooms = [
    {
      id: 'frontier-suite',
      name: 'Frontier Suite',
      tagline: 'The Ultimate Lakeside Sanctuary',
      description: 'A single-room retreat with a private terrace extending over the hillside. Floor-to-ceiling glazing frames the lake. A freestanding bath sits beside the window.',
      capacity: '2 Adults',
      features: ['Private cantilevered terrace', 'Freestanding window bath', 'Volcanic stone fireplace', 'West-facing sunset views'],
    },
    {
      id: 'lake-view',
      name: 'Lake View Room',
      tagline: 'Handcrafted Organic Solitude',
      description: 'Spacious, calm, and crafted entirely from locally sourced materials. A private terrace with two chairs and a low table — the only furniture you will need.',
      capacity: '2 Adults',
      features: ['Hand-loomed linen linens', 'Locally carved cedar frames', 'Outdoor lounging terrace', 'Direct shoreline vistas'],
    },
    {
      id: 'ridge-room',
      name: 'Ridge Room',
      tagline: 'Elevated Double Perspective',
      description: 'Positioned slightly higher on the property, the Ridge Rooms offer an elevated perspective across both the lake and the town below. Intimate and deeply private.',
      capacity: '2 Adults',
      features: ['Elevated panoramic tier', 'Private mountain-view garden', 'Open timber rafters', 'Writing desk facing Virunga'],
    }
  ];

  return (
    <section id="rooms" className="w-full bg-[#EDEBDF] py-24 md:py-32 border-b border-[#D9D3C7]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16 md:mb-24 space-y-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A7468] block">
            02 — Accommodation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2C2C2C]">
            Ten rooms. Each one a private world.
          </h2>
          <div className="font-sans text-sm md:text-base text-[#7A7468] font-light leading-relaxed space-y-4">
            <p>
              Every room at Rubavu Frontier View faces west — toward the lake, toward the last light, toward the silence that falls after sunset.
            </p>
            <p>
              Rooms are finished in raw stone, hand-laid timber, and local linen. There are no televisions. There is no clutter. There is only the view, the quality of the light, and the deep comfort of a bed made for rest.
            </p>
          </div>
        </div>

        {/* Big Photographic Hero for the Rooms Section */}
        <div className="mb-16 rounded-sm overflow-hidden border border-[#D9D3C7] shadow-lg relative h-80 md:h-[26rem]">
          <img
            src={suiteImage}
            alt="The handworked timber and stone interior suite"
            className="w-full h-full object-cover filter brightness-95"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 md:p-10 text-[#F5F1EB]">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#D9D3C7]">Featured Room</span>
            <h4 className="font-serif text-2xl md:text-3xl font-light mt-1">Inside the Frontier Suite</h4>
            <p className="text-xs md:text-sm text-[#D9D3C7] max-w-xl font-light mt-2 hidden sm:block">
              Woven together by natural linen, local volcanic clay, and fragrant mountain cedar timbers that fill the air with native fragrance.
            </p>
          </div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {rooms.map((room, idx) => (
            <div
              key={room.id}
              className="bg-[#F5F1EB] border border-[#D9D3C7]/80 hover:border-[#7A7468] rounded-sm p-6 md:p-8 flex flex-col justify-between transition-all duration-300 relative group text-[#2C2C2C] hover:shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#D9D3C7]/50 pb-4">
                  <span className="font-mono text-[10px] text-[#7A7468] tracking-widest uppercase">
                    0{idx + 1} — Tier
                  </span>
                  <span className="font-mono text-[10px] text-[#4A5240] font-semibold bg-[#4A5240]/10 px-2.5 py-0.5 rounded-full">
                    {room.capacity}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-normal text-[#2C2C2C]">
                    {room.name}
                  </h3>
                  <p className="text-[11px] font-mono text-[#7A7468] italic">
                    {room.tagline}
                  </p>
                </div>

                <p className="text-xs leading-relaxed text-[#7A7468] font-light">
                  {room.description}
                </p>

                {/* Features Checklist */}
                <ul className="space-y-1.5 pt-3 border-t border-[#D9D3C7]/35">
                  {room.features.map((feature, fIdx) => (
                    <li key={fIdx} className="text-[11px] font-mono text-[#7A7468] flex items-center gap-2">
                      <span className="h-1 w-1 bg-[#4A5240] rounded-full inline-block" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="pt-8 mt-auto flex items-center justify-between gap-4">
                <button
                  onClick={() => onReserveRoomClick(room.id)}
                  className="w-full bg-[#4A5240] hover:bg-[#2E3A28] text-[#F5F1EB] py-2.5 text-[10px] font-mono uppercase tracking-widest transition-all text-center rounded-sm"
                >
                  Reserve {room.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Actions */}
        <div className="mt-16 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onReserveRoomClick('')} // general reservation
            className="border border-[#7A7468] hover:border-[#2C2C2C] text-[#2C2C2C] px-6 py-3 text-xs font-mono uppercase tracking-widest rounded-sm transition-all"
          >
            View All Rooms
          </button>
          
          <button
            onClick={() => onReserveRoomClick('')}
            className="bg-[#4A5240] hover:bg-[#2E3A28] text-[#F5F1EB] px-6 py-3 text-xs font-mono uppercase tracking-widest rounded-sm transition-all"
          >
            Reserve a Room
          </button>
        </div>

      </div>
    </section>
  );
}
