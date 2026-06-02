import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../data/StoreContext';
import ReservationCTA from '../components/ReservationCTA';
import GuestQuote from '../components/GuestQuote';
import heroImage from '../assets/images/hero_lake_kivu_1779890198904.png';
import suiteImage from '../assets/images/rooms_suite_1779890241779.png';

interface HomePageProps {
  onReserveClick: () => void;
}

export default function HomePage({ onReserveClick }: HomePageProps) {
  const { data } = useStore();
  const featuredRooms = data.rooms.slice(0, 3);
  const featuredGallery = data.gallery.slice(0, 4);
  const quote = data.quotes[0];

  return (
    <div>
      {/* Hero */}
      <section className="relative w-full h-screen overflow-hidden bg-[#1A1A1A] flex flex-col justify-center select-none">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Lake Kivu at golden hour from the ridge"
            className="w-full h-full object-cover opacity-90 scale-105 brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F1EB] via-transparent to-black/35" />
        </div>
        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-12 pt-16 z-10 text-[#F5F1EB]">
          <div className="max-w-4xl space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[#D9D3C7] text-xs uppercase tracking-[0.4em] mb-4 font-sans font-medium"
            >
              Western Rwanda — Lake Kivu
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.05] text-white drop-shadow-sm"
            >
              Where the lake holds the last light.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/lodge"
                className="border border-white/40 text-white px-8 py-3.5 text-[11px] uppercase tracking-widest backdrop-blur-sm hover:bg-white hover:text-[#2C2C2C] transition-all duration-300 rounded-sm font-medium"
              >
                Discover the Lodge
              </Link>
              <button
                onClick={onReserveClick}
                className="bg-white text-[#2C2C2C] hover:bg-[#F5F1EB] px-8 py-3.5 text-[11px] uppercase tracking-widest transition-all duration-300 rounded-sm font-medium shadow-md"
              >
                Reserve Your Stay
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brief Lodge Intro */}
      <section className="w-full bg-[#F5F1EB] py-24 md:py-32 border-b border-[#D9D3C7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A7468] block">
                Rubavu Frontier View
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2C2C2C] leading-tight">
                Rwanda's Western Retreat
              </h2>
              <p className="text-[#4A5240] text-lg leading-relaxed italic font-serif">
                A point of stillness at the edge of something beautiful. Built not to interrupt the landscape, but to inhabit it.
              </p>
              <p className="font-sans text-sm md:text-base text-[#7A7468] font-light leading-relaxed">
                Rubavu Frontier View sits on the western edge of Rwanda, where the Virunga mountains descend toward Lake Kivu and the horizon opens into open water and shifting light. Conceived as a sanctuary for the discerning traveller, every detail here is deliberate.
              </p>
              <Link
                to="/lodge"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#4A5240] hover:text-[#2E3A28] border-b border-[#4A5240]/40 pb-0.5 transition-colors"
              >
                Read the full story <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="relative">
              <div className="border border-[#D9D3C7] p-2 bg-white rounded-sm shadow-md">
                <img
                  src={suiteImage}
                  alt="Frontier Suite interior"
                  className="w-full h-72 md:h-80 object-cover brightness-[0.98]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Preview */}
      <section className="w-full bg-[#EDEBDF] py-24 md:py-32 border-b border-[#D9D3C7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A7468] block">
                Accommodation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#2C2C2C]">
                Ten rooms. Each one a private world.
              </h2>
            </div>
            <Link
              to="/rooms"
              className="flex-shrink-0 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#4A5240] hover:text-[#2E3A28] transition-colors"
            >
              View all rooms <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRooms.map((room, idx) => (
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
                  <ul className="space-y-1.5 pt-3 border-t border-[#D9D3C7]/35">
                    {room.features.slice(0, 3).map((f, fi) => (
                      <li key={fi} className="text-[11px] font-mono text-[#7A7468] flex items-center gap-2">
                        <span className="h-1 w-1 bg-[#4A5240] rounded-full inline-block" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 mt-auto">
                  <Link
                    to="/rooms"
                    className="block w-full bg-[#4A5240] hover:bg-[#2E3A28] text-[#F5F1EB] py-2.5 text-[10px] font-mono uppercase tracking-widest transition-all text-center rounded-sm"
                  >
                    View {room.name.split(' ')[0]}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Strip */}
      <section className="w-full bg-[#F5F1EB] py-24 md:py-32 border-b border-[#D9D3C7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A7468] block">
                Visual Journal
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#2C2C2C]">
                A documentation of stillness.
              </h2>
            </div>
            <Link
              to="/gallery"
              className="flex-shrink-0 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#4A5240] hover:text-[#2E3A28] transition-colors"
            >
              Full gallery <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredGallery.map((item) => (
              <Link to="/gallery" key={item.id} className="group relative overflow-hidden rounded-sm aspect-square block">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-3">
                  <span className="text-white text-xs font-mono uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Quote */}
      {quote && (
        <section className="w-full bg-[#F5F1EB] py-32 md:py-44 flex items-center justify-center border-b border-[#D9D3C7]">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center space-y-8 select-none">
            <span className="font-serif text-5xl md:text-7xl text-[#4A5240]/25 block h-4">"</span>
            <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl leading-[1.3] font-light text-[#2C2C2C] italic tracking-wide max-w-3xl mx-auto">
              {quote.text}
            </blockquote>
            <cite className="block font-mono text-xs uppercase tracking-[0.2em] text-[#7A7468] not-italic pt-4">
              {quote.attribution}
            </cite>
          </div>
        </section>
      )}

      <ReservationCTA onReserveClick={onReserveClick} />
    </div>
  );
}
