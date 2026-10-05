import React, { useMemo } from 'react';
import { MapPin, Clock, Wifi, Sparkles, Dog, BatteryCharging, Check } from 'lucide-react';
import { VALUE_PILLARS } from '../data/menuData';

export const StoryAndHours: React.FC = () => {
  // Determine if open right now (7:30 AM to 8:00 PM local)
  const openStatus = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTimeInMinutes = hours * 60 + minutes;
    const openTime = 7 * 60 + 30; // 7:30 AM
    const closeTime = 20 * 60; // 8:00 PM

    const isOpen = currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime;
    return {
      isOpen,
      text: isOpen ? 'Open Now · Closes at 8:00 PM' : 'Closed Now · Reopens tomorrow at 7:30 AM',
    };
  }, []);

  return (
    <section id="story" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Brand Philosophy (4 Pillars) */}
        <div className="mb-20">
          <div className="max-w-2xl mb-12 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#9E3852]">
              <span>The Pinky Cafe Manifesto</span>
              <span aria-hidden="true" className="text-[#D4A3AE]">·</span>
              <span>Democratizing Taste</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C1E21] tracking-tight">
              Why should good design cost $12 a coffee?
            </h2>
            <p className="text-sm sm:text-base text-[#6D555A] leading-relaxed">
              We started Pinky Cafe with a simple, stubborn conviction: an upscale, architect-designed space 
              and single-origin ingredients shouldn't be reserved for luxury splurges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUE_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="bg-[#FCF9F9] rounded-2xl p-6 border border-[#F2DCE2] space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="font-serif-display text-2xl font-bold text-[#C25470]">
                    {pillar.number}.
                  </span>
                  <h3 className="font-serif-display text-lg font-bold text-[#2C1E21] leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#664F54] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location, Hours & Amenities Split Module */}
        <div className="bg-[#FAF4F6] rounded-3xl border border-[#F2DCE2] p-7 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Location & Hours details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                {/* Live Status indicator */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#ECD0D6] text-xs font-medium text-[#2C1E21] mb-3 shadow-2xs">
                  <span className={`w-2 h-2 rounded-full ${openStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  <span>{openStatus.text}</span>
                </div>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2C1E21]">
                  Find Us in the Arts District
                </h3>
              </div>

              <div className="space-y-3 text-sm text-[#4A383B]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#9E3852] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#2C1E21]">412 Rosewood Boulevard</p>
                    <p className="text-xs text-[#786166]">Central Arts District · 2 min walk from Rosewood Metro Station</p>
                    <p className="text-xs text-[#786166] mt-0.5">Complimentary 2-hour validated parking behind building</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Clock className="w-5 h-5 text-[#9E3852] shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between gap-6">
                      <span className="text-[#786166]">Monday – Friday:</span>
                      <span className="font-mono tabular-nums font-semibold text-[#2C1E21]">7:30 AM – 8:00 PM</span>
                    </div>
                    <div className="flex justify-between gap-6">
                      <span className="text-[#786166]">Saturday – Sunday:</span>
                      <span className="font-mono tabular-nums font-semibold text-[#2C1E21]">8:00 AM – 8:30 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amenities Grid */}
              <div className="pt-4 border-t border-[#ECD0D6]">
                <p className="text-xs font-bold uppercase tracking-wider text-[#8A6A71] mb-3">
                  Café Amenities & Culture
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#4A383B]">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-[#9E3852]" />
                    <span>300 Mbps Fiber Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BatteryCharging className="w-4 h-4 text-[#9E3852]" />
                    <span>Dual Power Outlets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dog className="w-4 h-4 text-[#9E3852]" />
                    <span>Dog-Friendly Patio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#9E3852]" />
                    <span>Edible Petal Bar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#9E3852]" />
                    <span>Wheelchair Accessible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#9E3852]" />
                    <span>Apple & Google Pay</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Architectural Quote & Snapshot */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#ECD0D6] shadow-xs space-y-4">
              <span className="text-xs uppercase tracking-wider text-[#9E3852] font-semibold">
                Daily Scratch Bakery
              </span>
              <h4 className="font-serif-display text-xl font-bold text-[#2C1E21]">
                "Baked at 5 AM. Sold at honest prices."
              </h4>
              <p className="text-xs text-[#6D555A] leading-relaxed">
                Every croissant is laminated with Normandy AOP butter and baked in our glass oven right behind the counter. 
                When the morning batch finishes at 7:15 AM, the scent of caramelizing butter fills the whole boulevard.
              </p>
              <div className="pt-3 border-t border-[#F2DCE2] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#2C1E21]">Head Baker:</span>
                  <span className="text-[#786166] ml-1">Chef Amélie Chen</span>
                </div>
                <span className="font-mono text-[11px] text-[#9E3852]">Pastries from $2.80</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
