import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../data/StoreContext';
import PageHero from '../components/PageHero';
import heroImg from '../assets/images/hero_lake_kivu_1779890198904.png';

export default function GalleryPage() {
  const { data } = useStore();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const items = data.gallery;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) setActiveIdx(activeIdx === 0 ? items.length - 1 : activeIdx - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) setActiveIdx(activeIdx === items.length - 1 ? 0 : activeIdx + 1);
  };

  return (
    <div>
      <PageHero
        label="05 — Narrative Gallery"
        title="A visual documentation of stillness."
        subtitle="Every vista is original, and every corner of the property is crafted from materials that have existed on this western Rubavu hillside for generations."
        image={heroImg}
      />

      <section className="w-full bg-[#EDEBDF] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {items.length === 0 ? (
            <p className="text-center text-[#7A7468] font-sans text-sm py-16">
              No gallery images available.
            </p>
          ) : (
            <>
              {/* Masonry-style grid */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {items.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    className="break-inside-avoid bg-[#F5F1EB] border border-[#D9D3C7] p-2 rounded-sm cursor-pointer group shadow-sm relative overflow-hidden"
                    onClick={() => setActiveIdx(idx)}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="relative overflow-hidden rounded-sm">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
                      />
                      <span className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm p-1.5 text-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="h-3.5 w-3.5" />
                      </span>
                      <span className="absolute bottom-3 left-3 bg-[#2C2C2C] text-[#F5F1EB] font-mono text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-[2px]">
                        {item.category}
                      </span>
                    </div>
                    <div className="pt-3 pb-1 px-1">
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

              <p className="text-center font-mono text-[10px] text-[#7A7468] uppercase tracking-widest mt-16">
                {items.length} images — Click any to enlarge
              </p>
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {activeIdx !== null && (
          <div
            className="fixed inset-0 z-50 flex flex-col bg-[#1A1A1A]/95 p-4 md:p-8 justify-center items-center"
            onClick={() => setActiveIdx(null)}
          >
            <button
              onClick={() => setActiveIdx(null)}
              className="absolute top-6 right-6 text-[#D9D3C7]/80 hover:text-white transition-colors p-2 z-10"
            >
              <X className="h-7 w-7" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl w-full max-h-[75vh] flex flex-col items-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={items[activeIdx].src}
                alt={items[activeIdx].title}
                className="max-w-full max-h-[65vh] object-contain rounded border border-white/10 shadow-2xl"
              />
              <div className="text-center text-white mt-4 space-y-1 max-w-2xl">
                <span className="font-mono text-[9px] text-[#D9D3C7]/60 tracking-[0.25em] uppercase block">
                  {items[activeIdx].category} — {activeIdx + 1} / {items.length}
                </span>
                <h3 className="font-serif text-xl font-light text-[#F5F1EB]">{items[activeIdx].title}</h3>
                <p className="text-xs text-[#D9D3C7]/80 font-sans font-light leading-relaxed px-4">
                  {items[activeIdx].desc}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
