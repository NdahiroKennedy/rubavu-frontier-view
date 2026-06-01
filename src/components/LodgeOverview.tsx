import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import lodgeImage from '../assets/images/lodge_exterior_1779890222114.png';

export default function LodgeOverview() {
  const [activeStory, setActiveStory] = useState<'none' | 'story' | 'awaits'>('none');

  const scrollToExperiences = () => {
    const element = document.getElementById('experiences');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="overview" className="w-full bg-[#F5F1EB] py-24 md:py-32 border-b border-[#D9D3C7]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7A7468] block">
              01 — Overview
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2C2C2C] leading-tight">
              Rwanda's Western Retreat
            </h2>

            <p className="text-[#4A5240] text-lg leading-relaxed italic font-serif">
              A point of stillness at the edge of something beautiful. Built not to interrupt the landscape, but to inhabit it.
            </p>

            <div className="h-[1px] w-12 bg-[#4A5240] my-6"></div>

            <div className="font-sans text-sm md:text-base text-[#7A7468] space-y-4 leading-relaxed font-light">
              <p>
                Rubavu Frontier View sits on the western edge of Rwanda, where the Virunga mountains descend toward Lake Kivu and the horizon opens into open water and shifting light.
              </p>
              <p>
                Conceived as a sanctuary for the discerning traveller, every detail here is deliberate. The architecture speaks in stone, timber, and open sky. The service speaks without noise.
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-6 flex flex-wrap gap-4 font-mono text-xs">
              <button
                onClick={() => setActiveStory(activeStory === 'story' ? 'none' : 'story')}
                className="px-5 py-2.5 border border-[#D9D3C7] hover:border-[#2C2C2C] text-[#2C2C2C] transition-all rounded-sm flex items-center gap-2"
              >
                The Lodge Story
                <span className="text-[9px] text-[#7A7468]">{activeStory === 'story' ? '▲' : '▼'}</span>
              </button>
              
              <button
                onClick={() => setActiveStory(activeStory === 'awaits' ? 'none' : 'awaits')}
                className="px-5 py-2.5 bg-[#4A5240] hover:bg-[#2E3A28] text-[#F5F1EB] transition-all rounded-sm flex items-center gap-2"
              >
                What Awaits You
                <span className="text-[9px] text-[#D9D3C7]">{activeStory === 'awaits' ? '▲' : '▼'}</span>
              </button>
            </div>

            {/* Inline expandable drawer context */}
            <AnimatePresence mode="wait">
              {activeStory === 'story' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-4 bg-[#EDEBDF] border border-[#D9D3C7] rounded-sm text-xs text-[#7A7468] space-y-2 leading-relaxed"
                >
                  <strong className="text-[#2C2C2C] block font-serif">A Craft of Generation</strong>
                  <p>
                    Founded in 2021 by a cooperative of local architects and conservationists, Rubavu Frontier View was created to celebrate Western Rwanda's volcanic stone masons. Over 80% of our building blocks were carved by local craftsmen directly from the hills behind Rubavu town. Our layout mirrors the ancient contours of the volcanic ridges, blending organically with the native shrubbery and tea trees.
                  </p>
                </motion.div>
              )}
              {activeStory === 'awaits' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-4 bg-[#EDEBDF] border border-[#D9D3C7] rounded-sm text-xs text-[#7A7468] space-y-2 leading-relaxed"
                >
                  <strong className="text-[#2C2C2C] block font-serif">Tailored Simplicity</strong>
                  <p>
                    Upon entering our gates, you are greeted with lukewarm Lake-Kivu-grown herbal infusion. There are no schedules, and check-in occurs directly in the comfort of your suite rather than at a front desk. Every day features unhurried guided hikes, customized meal hours, and fully prepared cold baths tailored to your needs. Ready to seek more? Explore our rooms below.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 relative group">
            <div className="border border-[#D9D3C7] p-2 bg-white rounded-sm shadow-md transition-transform duration-500 group-hover:scale-[1.01]">
              <img
                src={lodgeImage}
                alt="Architecture heightening the hill at Rubavu"
                className="w-full h-auto object-cover filter brightness-[0.98]"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Minimal label overlay */}
            <div className="absolute -bottom-4 right-4 bg-[#2C2C2C] text-[#F5F1EB] px-3 py-1 text-[9px] font-mono uppercase tracking-widest rounded-sm">
              Lodge Ridge Vista
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
