import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChefHat, Wine, GlassWater, ArrowRight } from 'lucide-react';
import { useStore } from '../data/StoreContext';
import PageHero from '../components/PageHero';
import ReservationCTA from '../components/ReservationCTA';
import restaurantImg from '../assets/images/restaurant_dining_1779890263671.png';

interface RestaurantPageProps {
  onReserveClick: () => void;
}

export default function RestaurantPage({ onReserveClick }: RestaurantPageProps) {
  const { data } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = data.menuItems.filter((m) => m.section === 'menu');
  const drinkItems = data.menuItems.filter((m) => m.section === 'drinks');

  return (
    <div>
      <PageHero
        label="04 — Dining & Drinks"
        title="The restaurant is the heart of the lodge."
        subtitle="Where the day begins — with coffee, fresh fruit, and the morning light on the water."
        image={restaurantImg}
      />

      <section className="w-full bg-[#EDEBDF] py-24 md:py-32 border-b border-[#D9D3C7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-16 md:mb-24">
            <div className="lg:col-span-7 space-y-6">
              <p className="font-sans text-sm md:text-base text-[#7A7468] font-light leading-relaxed">
                The Rubavu Frontier View restaurant opens onto an unobstructed lake view. It is the place where the day begins and the place where it ends, over a long dinner and a slow glass of something good.
              </p>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="border border-[#D9D3C7] p-2 bg-white rounded-sm shadow-md">
                <img
                  src={restaurantImg}
                  alt="Candlelit bar overlooking Lake Kivu"
                  className="w-full h-64 md:h-72 object-cover object-center brightness-95"
                />
              </div>
              <div className="absolute -top-3 -left-3 bg-[#4A5240] text-[#F5F1EB] px-3.5 py-1 text-[9px] font-mono uppercase tracking-widest rounded-sm">
                The Bar Deck
              </div>
            </div>
          </div>

          {/* Kitchen + Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start border-t border-[#D9D3C7] pt-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#D9D3C7]/65">
                <ChefHat className="h-5 w-5 text-[#4A5240]" />
                <h3 className="font-serif text-2xl font-light text-[#2C2C2C]">The Kitchen</h3>
              </div>
              <div className="font-sans text-sm text-[#7A7468] leading-relaxed font-light space-y-4">
                <p>
                  There is no imported produce and no fixed menu. The kitchen works with what the lake and the surrounding hills offer each day — fresh Kivu tilapia, hillside vegetables, locally milled grains, and fruit from farms within twenty kilometres.
                </p>
                <p>
                  Breakfast is served when you are ready. Lunch is light, eaten outdoors when the weather allows. Dinner is the main event — three courses, unhurried, at a table that looks out over the water.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#D9D3C7]/65">
                <Wine className="h-5 w-5 text-[#4A5240]" />
                <h3 className="font-serif text-2xl font-light text-[#2C2C2C]">The Bar</h3>
              </div>
              <div className="font-sans text-sm text-[#7A7468] leading-relaxed font-light space-y-4">
                <p>
                  The bar is stocked with Rwandan craft spirits, regional wines, cold lake-brewed beers, and a considered list of whiskies and aperitifs. Cocktails are made from scratch, with local ingredients where possible.
                </p>
                <p>
                  The bar terrace is the best seat in the lodge for sundowners. Two hours before sunset, it fills quietly. By the time the light drops behind the hills, no one is in a hurry to leave.
                </p>
              </div>
            </div>
          </div>

          {/* Signature Drinks */}
          {drinkItems.length > 0 && (
            <div className="mt-16 bg-[#F5F1EB] rounded-sm p-6 md:p-10 border border-[#D9D3C7] space-y-6">
              <div className="flex items-center gap-2 text-[#7A7468]">
                <GlassWater className="h-4 w-4 text-[#4A5240]" />
                <span className="font-mono text-[10px] uppercase tracking-wider">Signature Drinks</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {drinkItems.map((d) => (
                  <div key={d.id} className="space-y-1">
                    <h4 className="font-serif text-lg font-normal text-[#2C2C2C]">{d.name}</h4>
                    <p className="font-mono text-[11px] text-[#7A7468] leading-relaxed">{d.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sample menu drawer */}
          <AnimatePresence>
            {menuOpen && menuItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 bg-white border border-[#D9D3C7] rounded-sm p-6 md:p-10 space-y-6 overflow-hidden"
              >
                <div className="text-center font-serif text-2xl font-extralight text-[#4A5240] tracking-wide border-b border-[#D9D3C7] pb-4">
                  Sample Hillside Tasting Menu
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-serif text-[#2C2C2C]">
                  {menuItems.map((item) => (
                    <div key={item.id}>
                      {item.course && (
                        <span className="block font-mono text-[9px] uppercase tracking-widest text-[#7A7468] mb-2">
                          {item.course}
                        </span>
                      )}
                      <p className="font-medium text-lg">{item.name}</p>
                      <p className="text-xs text-[#7A7468] mt-1 font-sans font-light leading-normal">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-16 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            {menuItems.length > 0 && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="border border-[#7A7468] hover:border-[#2C2C2C] text-[#2C2C2C] px-6 py-3 text-xs font-mono uppercase tracking-widest rounded-sm transition-all"
              >
                {menuOpen ? 'Hide Sample Menu ▲' : 'Dining at Rubavu Frontier View ▼'}
              </button>
            )}
            <button
              onClick={onReserveClick}
              className="bg-[#4A5240] hover:bg-[#2E3A28] text-[#F5F1EB] px-6 py-3 text-xs font-mono uppercase tracking-widest rounded-sm transition-all flex items-center gap-2"
            >
              Reserve a Table <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      <ReservationCTA onReserveClick={onReserveClick} />
    </div>
  );
}
