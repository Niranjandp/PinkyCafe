import React, { useState } from 'react';
import { ArrowRight, Sparkles, Clock, Coffee, Heart, Camera } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenCombo: () => void;
  onReserve: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onOpenCombo,
  onReserve,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#FCF9F9] via-[#FDF5F7] to-[#FCF9F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Brand Statement & Intent */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Quiet Unboxed Metadata Kicker (Anti-Pill Rule) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide uppercase text-[#9E3852]">
              <span>Specialty Coffee & Scratch Bakery</span>
              <span aria-hidden="true" className="text-[#D4A3AE]">·</span>
              <span className="font-mono tabular-nums">Drinks from $3.20</span>
              <span aria-hidden="true" className="text-[#D4A3AE]">·</span>
              <span>Zero Oat Milk Tax</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2C1E21] leading-[1.08] text-balance">
              Upscale Parisian aesthetic. <br />
              <span className="italic font-normal text-[#9E3852]">Everyday honest prices.</span>
            </h1>

            {/* Subheading with editorial clarity */}
            <p className="text-base sm:text-lg text-[#664F54] max-w-xl leading-relaxed font-normal">
              Step into our soft blush sanctuary of fluted velvet, glowing brass, and terrazzo stone. 
              Enjoy single-origin rose lattes, warm butter croissants, and organic tartines crafted to elevate your day without the luxury markup.
            </p>

            {/* Actions Cluster */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 rounded-full text-sm font-semibold tracking-wide text-white bg-[#2C1E21] hover:bg-[#432A30] active:scale-[0.99] transition-all duration-200 shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Menu & Order</span>
                <ArrowRight className="w-4 h-4 text-[#FAD3DE]" />
              </button>

              <button
                onClick={onOpenCombo}
                className="px-5 py-3.5 rounded-full text-sm font-medium text-[#2C1E21] bg-white border border-[#EAC2CD] hover:bg-[#FFF0F3] hover:border-[#D99BAA] active:scale-[0.99] transition-all duration-200 shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#9E3852]" />
                <span>Build $7.90 Aesthetic Combo</span>
              </button>

              <button
                onClick={onReserve}
                className="text-sm font-medium text-[#664F54] hover:text-[#2C1E21] underline underline-offset-4 decoration-[#E5BAC4] py-2 px-1 transition-colors cursor-pointer"
              >
                Reserve a Booth
              </button>
            </div>

            {/* Adjacent Proof Badges (Claim-to-Proof Adjacency) */}
            <div className="pt-6 border-t border-[#F2DCE2] grid grid-cols-3 gap-4 text-[#2C1E21]">
              <div>
                <p className="font-mono text-xl sm:text-2xl font-bold tracking-tight tabular-nums text-[#2C1E21]">
                  $3.80
                </p>
                <p className="text-xs text-[#7B6267] mt-0.5">Average specialty drink</p>
              </div>

              <div>
                <p className="font-mono text-xl sm:text-2xl font-bold tracking-tight tabular-nums text-[#2C1E21]">
                  +$0.00
                </p>
                <p className="text-xs text-[#7B6267] mt-0.5">Oat & almond milk upgrade</p>
              </div>

              <div>
                <p className="font-mono text-xl sm:text-2xl font-bold tracking-tight tabular-nums text-[#2C1E21]">
                  4.9 <span className="text-xs font-sans text-[#9E3852]">★</span>
                </p>
                <p className="text-xs text-[#7B6267] mt-0.5">Over 2,400+ happy visitors</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative soft glow aura */}
              <div 
                className="absolute -inset-4 bg-gradient-to-tr from-[#FAD6DF]/60 to-[#FCEEF2]/40 rounded-3xl blur-2xl -z-10" 
                aria-hidden="true" 
              />

              {/* Main Imagery Frame with architectural curvature */}
              <div className="relative rounded-2xl overflow-hidden border border-[#F0D5DB] shadow-xl bg-white aspect-[4/3] lg:aspect-[4/3.4]">
                {!imageError ? (
                  <img
                    src="/src/assets/images/hero_pinky_cafe_interior_1791181089083.jpg"
                    alt="Pinky Cafe aesthetic interior with soft blush velvet fluted banquettes, terrazzo tables, and glowing brass lights"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#FFF5F7] to-[#FCEAEF] text-center">
                    <Coffee className="w-12 h-12 text-[#9E3852] mb-3 stroke-1" />
                    <span className="font-serif-display text-xl font-semibold text-[#2C1E21]">The Pink Sanctuary</span>
                    <span className="text-xs text-[#664F54] mt-1">412 Rosewood Blvd · Open Daily 7:30 AM</span>
                  </div>
                )}

                {/* Quiet Floating In-photo Feature Callout */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/90 backdrop-blur-md rounded-xl p-3 sm:p-3.5 border border-[#F2DDE2] shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FCE8ED] flex items-center justify-center text-[#9E3852] shrink-0">
                      <Heart className="w-4 h-4 fill-current text-[#C25470]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#2C1E21] leading-tight">Velvet Fluted Booths</p>
                      <p className="text-[11px] text-[#786166] mt-0.5">Complimentary fast Wi-Fi & power outlets</p>
                    </div>
                  </div>
                  <button 
                    onClick={onReserve}
                    className="text-xs font-medium text-[#9E3852] hover:text-[#2C1E21] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Hold Table →
                  </button>
                </div>
              </div>

              {/* Little lifestyle sticker */}
              <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-1.5 bg-[#2C1E21] text-white px-3 py-1.5 rounded-full shadow-md text-xs font-medium tracking-wide">
                <Camera className="w-3.5 h-3.5 text-[#FAD3DE]" />
                <span>Tag #PinkyCafe</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
