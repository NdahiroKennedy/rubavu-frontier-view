import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Beer, Wine, ChefHat, GlassWater, ArrowRight } from 'lucide-react';
import restaurantImage from '../assets/images/restaurant_dining_1779890263671.png';

interface RestaurantBarProps {
  onReserveTableClick: () => void;
}

export default function RestaurantBar({ onReserveTableClick }: RestaurantBarProps) {
  const [activeMenuDrawer, setActiveMenuDrawer] = useState<boolean>(false);

  return (
    <section id="restaurant" className="w-full bg-[#EDEBDF] py-24 md:py-32 border-b border-[#D9D3C7]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-16 md:mb-24">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A7468] block">
              04 — Dining & Drinks
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2C2C2C] leading-tight">
              The restaurant is the heart of the lodge.
            </h2>
            <p className="font-sans text-sm md:text-base text-[#7A7468] font-light leading-relaxed">
              The Rubavu Frontier View restaurant opens onto an unobstructed lake view. It is the place where the day begins — with coffee, fresh fruit, and the morning light on the water — and the place where it ends, over a long dinner and a slow glass of something good.
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="border border-[#D9D3C7] p-2 bg-white rounded-sm shadow-md">
              <img
                src={restaurantImage}
                alt="Candlelit bar overlooking Lake Kivu during golden sundown"
                className="w-full h-64 md:h-72 object-cover object-center filter brightness-95"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-3 -left-3 bg-[#4A5240] text-[#F5F1EB] px-3.5 py-1 text-[9px] font-mono uppercase tracking-widest rounded-sm">
              The Bar Deck
            </div>
          </div>
        </div>

        {/* Two Sub-sections: Kitchen and Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start border-t border-[#D9D3C7] pt-12">
          
          {/* Sub-section 1: The Kitchen */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-[#D9D3C7]/65">
              <ChefHat className="h-5 w-5 text-[#4A5240]" />
              <h3 className="font-serif text-2xl font-light text-[#2C2C2C]">
                The Kitchen
              </h3>
            </div>
            
            <div className="font-sans text-sm text-[#7A7468] leading-relaxed font-light space-y-4">
              <p>
                There is no imported produce and no fixed menu. The kitchen works with what the lake and the surrounding hills offer each day — fresh Kivu tilapia, hillside vegetables, locally milled grains, and fruit from farms within twenty kilometres. The food is unfussy and deeply considered.
              </p>
              <p>
                Breakfast is served when you are ready. Lunch is light, eaten outdoors when the weather allows. Dinner is the main event — three courses, unhurried, at a table that looks out over the water.
              </p>
            </div>
          </div>

          {/* Sub-section 2: The Bar */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-[#D9D3C7]/65">
              <Wine className="h-5 w-5 text-[#4A5240]" />
              <h3 className="font-serif text-2xl font-light text-[#2C2C2C]">
                The Bar
              </h3>
            </div>
            
            <div className="font-sans text-sm text-[#7A7468] leading-relaxed font-light space-y-4">
              <p>
                The bar at Rubavu Frontier View is open from mid-morning until the last guest retires. It is stocked with Rwandan craft spirits, regional wines, cold lake-brewed beers, and a considered list of whiskies and aperitifs. Cocktails are made from scratch, with local ingredients where possible.
              </p>
              <p>
                The bar terrace is the best seat in the lodge for sundowners. Two hours before sunset, it fills quietly. By the time the light drops behind the hills, no one is in a hurry to leave.
              </p>
            </div>
          </div>

        </div>

        {/* Signature Drinks Block */}
        <div className="mt-16 bg-[#F5F1EB] rounded-sm p-6 md:p-10 border border-[#D9D3C7] space-y-6">
          <div className="flex items-center gap-2 text-[#7A7468]">
            <GlassWater className="h-4.5 w-4.5 text-[#4A5240]" />
            <span className="font-mono text-[10px] uppercase tracking-wider block">
              Signature Drinks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left">
            
            <div className="space-y-1">
              <h4 className="font-serif text-lg font-normal text-[#2C2C2C]">
                Kivu Sundowner
              </h4>
              <p className="font-mono text-[11px] text-[#7A7468] leading-relaxed">
                locally distilled spirit, fresh citrus, lake-water ice, dried hibiscus
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-lg font-normal text-[#2C2C2C]">
                Hillside Sour
              </h4>
              <p className="font-mono text-[11px] text-[#7A7468] leading-relaxed">
                small-batch Rwandan whisky, honey from Rubavu farms, lemon
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-lg font-normal text-[#2C2C2C]">
                The Long Table
              </h4>
              <p className="font-mono text-[11px] text-[#7A7468] leading-relaxed">
                a communal wine served only at dinner, selected each week by the kitchen team
              </p>
            </div>

          </div>
        </div>

        {/* Expandable Menu Section for Dining */}
        <AnimatePresence>
          {activeMenuDrawer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 bg-white border border-[#D9D3C7] rounded-sm p-6 md:p-10 text-left space-y-6"
            >
              <div className="text-center font-serif text-2.5xl font-extralight text-[#4A5240] tracking-wide border-b border-[#D9D3C7] pb-4">
                SAMPLE HILLSIDE TASTING MENU
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-serif text-[#2C2C2C]">
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-[#7A7468] mb-2">First Course</span>
                  <p className="font-medium text-lg">Lake Tilapia Tartare</p>
                  <p className="text-xs text-[#7A7468] mt-1 font-sans font-light leading-normal">
                    Delicately cured from the morning catch, paired with hillside avocados, crisp wild radishes, and native lemon-grass vinaigrette.
                  </p>
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-[#7A7468] mb-2">Second Course</span>
                  <p className="font-medium text-lg">Millet-Crusted Volcanic Duck</p>
                  <p className="text-xs text-[#7A7468] mt-1 font-sans font-light leading-normal">
                    Tender local duck breast roasted over volcanic embers, rested on a bed of slow-cooked cassava greens and local honey-infused beets.
                  </p>
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-[#7A7468] mb-2">Third Course</span>
                  <p className="font-medium text-lg">Rubavu Coffee Parfait</p>
                  <p className="text-xs text-[#7A7468] mt-1 font-sans font-light leading-normal">
                    Smooth mousse highlighting dark single-origin coffee beans grown right across the bay, alongside wild mountain cape gooseberries.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Banner */}
        <div className="mt-16 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setActiveMenuDrawer(!activeMenuDrawer)}
            className="border border-[#7A7468] hover:border-[#2C2C2C] text-[#2C2C2C] px-6 py-3 text-xs font-mono uppercase tracking-widest rounded-sm transition-all"
          >
            {activeMenuDrawer ? 'Hide Sample Menu ▲' : 'Dining at Rubavu Frontier View ▼'}
          </button>
          
          <button
            onClick={onReserveTableClick}
            className="bg-[#4A5240] hover:bg-[#2E3A28] text-[#F5F1EB] px-6 py-3 text-xs font-mono uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2"
          >
            Reserve a Table
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
