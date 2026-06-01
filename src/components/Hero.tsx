import { motion } from 'motion/react';
import heroImage from '../assets/images/hero_lake_kivu_1779890198904.png';

interface HeroProps {
  onReserveClick: () => void;
}

export default function Hero({ onReserveClick }: HeroProps) {
  const scrollToOverview = () => {
    const element = document.getElementById('overview');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#1A1A1A] flex flex-col justify-center select-none">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Lake Kivu at golden hour from the ridge"
          className="w-full h-full object-cover opacity-90 scale-105 filter brightness-95"
          referrerPolicy="no-referrer"
        />
        {/* Subtle bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F1EB] via-transparent to-black/35" />
      </div>

      {/* Hero Content */}
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
            {/* Discover the Lodge button */}
            <button
              onClick={scrollToOverview}
              className="border border-white/40 text-white px-8 py-3.5 text-[11px] uppercase tracking-widest backdrop-blur-sm hover:bg-white hover:text-[#2C2C2C] transition-all duration-300 rounded-sm font-medium"
            >
              Discover the Lodge
            </button>

            {/* Reserve Your Stay button */}
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
  );
}
