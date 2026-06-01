import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

import heroImage from '../assets/images/hero_lake_kivu_1779890198904.png';
import exteriorImage from '../assets/images/lodge_exterior_1779890222114.png';
import suiteImage from '../assets/images/rooms_suite_1779890241779.png';
import restaurantImage from '../assets/images/restaurant_dining_1779890263671.png';
import trailImage from '../assets/images/lodge_trail_view_1779892627012.png';
import detailsImage from '../assets/images/artisan_details_1779892647213.png';

interface GalleryItem {
  id: number;
  src: string;
  category: string;
  title: string;
  desc: string;
  aspect: string;
}

export default function Gallery() {
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);

  const items: GalleryItem[] = [
    {
      id: 1,
      src: heroImage,
      category: "Landscape",
      title: "Lake Kivu Horizon",
      desc: "Warm copper ripples and volcanic mountain ridges visible over the rift valley as the sun dips below the horizon.",
      aspect: "lg:col-span-8 md:col-span-2"
    },
    {
      id: 2,
      src: detailsImage,
      category: "Details",
      title: "Artisanal Textures",
      desc: "Hand-loomed native linen fabrics, volcanic basalt bowls, and a fragrant, freshly ground cup of Rwandan coffee.",
      aspect: "lg:col-span-4 md:col-span-1"
    },
    {
      id: 3,
      src: exteriorImage,
      category: "Architecture",
      title: "The Volcanic Stone Lodge",
      desc: "Our structural lines mimic the hillside, constructed sequentially using basalt hewn directly by Rubavu stone masons.",
      aspect: "lg:col-span-4 md:col-span-1"
    },
    {
      id: 4,
      src: suiteImage,
      category: "Interiors",
      title: "Frontier Suite Sanctum",
      desc: "Calm mornings filtered through floor-to-ceiling glass, opening directly over a wide private cedar terrace.",
      aspect: "lg:col-span-4 md:col-span-1"
    },
    {
      id: 5,
      src: trailImage,
      category: "Experiences",
      title: "The Congo-Nile Ridge Trail",
      desc: "Fleshy green tea plantations falling down the Lakeside shores through centuries-old farming villages.",
      aspect: "lg:col-span-4 md:col-span-1"
    },
    {
      id: 6,
      src: restaurantImage,
      category: "Dining",
      title: "Lounge Sunset Terrace",
      desc: "Fireside gathering overlooking the water, holding a glass of regional wine as twilight covers Lake Kivu.",
      aspect: "lg:col-span-12 md:col-span-3"
    }
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIdx !== null) {
      setActiveImageIdx(activeImageIdx === 0 ? items.length - 1 : activeImageIdx - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIdx !== null) {
      setActiveImageIdx(activeImageIdx === items.length - 1 ? 0 : activeImageIdx + 1);
    }
  };

  return (
    <section id="gallery" className="w-full bg-[#EDEBDF] py-24 md:py-32 border-b border-[#D9D3C7]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24 space-y-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A7468] block">
            05 — Narrative Gallery
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2C2C2C] leading-tight">
            A visual documentation of stillness.
          </h2>
          <p className="font-sans text-sm md:text-base text-[#7A7468] font-light leading-relaxed">
            Every vista is original, and every corner of the property is crafted from materials that have existed on this western Rubavu hillside for generations. Preview the light, the stone, and the lake.
          </p>
        </div>

        {/* Dynamic Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6 lg:gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              className={`${item.aspect} bg-[#F5F1EB] border border-[#D9D3C7] p-2 flex flex-col justify-between group rounded-sm cursor-pointer shadow-sm relative overflow-hidden`}
              onClick={() => setActiveImageIdx(idx)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {/* Aspect-controlled image holder */}
              <div className="relative overflow-hidden w-full h-64 sm:h-72 lg:h-80 rounded-sm">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                
                {/* Maximize Icon Tool Tip */}
                <span className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm p-2 text-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="h-4 w-4" />
                </span>

                {/* Overline category tag */}
                <span className="absolute bottom-4 left-4 bg-[#2C2C2C] text-[#F5F1EB] font-mono text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-[2px]">
                  {item.category}
                </span>
              </div>

              {/* Title and metadata details at bottom */}
              <div className="pt-4 pb-2 px-1">
                <h4 className="font-serif text-lg font-light text-[#2C2C2C] group-hover:text-[#4A5240] transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#7A7468] font-sans font-light leading-relaxed mt-1">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* FULL SCREEN LIGHTBOX INTERACTIVE COMPONENT */}
      <AnimatePresence>
        {activeImageIdx !== null && (
          <div
            id="gallery-lightbox"
            className="fixed inset-0 z-50 flex flex-col bg-[#1A1A1A]/95 p-4 md:p-8 justify-center items-center"
            onClick={() => setActiveImageIdx(null)}
          >
            {/* Close trigger */}
            <button
              onClick={() => setActiveImageIdx(null)}
              className="absolute top-6 right-6 text-[#D9D3C7]/80 hover:text-white transition-colors cursor-pointer p-2 z-10"
              aria-label="Close Lightbox"
            >
              <X className="h-7 w-7" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Central Slide */}
            <motion.div
              key={activeImageIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl w-full max-h-[75vh] flex flex-col items-center justify-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={items[activeImageIdx].src}
                alt={items[activeImageIdx].title}
                className="max-w-full max-h-[70vh] object-contain rounded border border-white/10 shadow-2xl"
                referrerPolicy="no-referrer"
              />

              {/* Title & Description of image */}
              <div className="text-center text-white mt-4 space-y-1 max-w-2xl">
                <span className="font-mono text-[9px] text-[#D9D3C7]/60 tracking-[0.25em] uppercase block">
                  {items[activeImageIdx].category} — Image {activeImageIdx + 1} of {items.length}
                </span>
                <h3 className="font-serif text-xl font-light tracking-wide text-[#F5F1EB]">
                  {items[activeImageIdx].title}
                </h3>
                <p className="text-xs text-[#D9D3C7]/80 font-sans font-light leading-relaxed px-4">
                  {items[activeImageIdx].desc}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
