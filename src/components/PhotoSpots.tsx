import React from 'react';
import { Camera, Sun, Sparkles, Heart } from 'lucide-react';
import { PHOTO_SPOTS } from '../data/menuData';

const COMMUNITY_POSTS = [
  {
    handle: '@elena.visuals',
    role: 'Photographer',
    comment: 'Most stunning aesthetic in the city and my Rose Velvet Latte was only $4.20. Zero milk markup is revolutionary.',
    time: '2 hours ago',
    likes: 342,
  },
  {
    handle: '@marcus.codes',
    role: 'Software Designer',
    comment: 'Fast 300 Mbps Wi-Fi, power outlets at every velvet booth, and artisan espresso under $3.50. Pinky is my new daily office.',
    time: 'Yesterday',
    likes: 189,
  },
  {
    handle: '@charlotte.bites',
    role: 'Food & Travel Creator',
    comment: 'The 72-layer strawberry croissant has no right being this crisp and under $4. Arrive at 10 AM for the window lighting!',
    time: '3 days ago',
    likes: 512,
  },
];

export const PhotoSpots: React.FC = () => {
  return (
    <section id="photo-spots" className="py-16 sm:py-20 bg-[#FCF8F9] border-t border-[#F2DCE2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#9E3852]">
              <Camera className="w-3.5 h-3.5" />
              <span>The Aesthetic Guide</span>
              <span aria-hidden="true" className="text-[#D4A3AE]">·</span>
              <span>Designed For Your Feed</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C1E21] tracking-tight">
              Curated Photo Corners
            </h2>
            <p className="text-sm sm:text-base text-[#6D555A] max-w-xl">
              We mapped our café’s natural daylight angles and architectural details so you can capture gorgeous content effortlessly.
            </p>
          </div>

          <div className="text-xs text-[#8A6A71] bg-white px-4 py-2.5 rounded-full border border-[#ECD0D6] shadow-2xs self-start md:self-auto flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#9E3852]" />
            <span>Tag <strong>@PinkyCafe</strong> for a chance to be featured & receive a free latte</span>
          </div>
        </div>

        {/* 3 Main Photo Spot Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {PHOTO_SPOTS.map((spot, index) => (
            <div
              key={spot.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#F2DCE2] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Spot Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FCE8ED]">
                  <img
                    src={spot.image}
                    alt={spot.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#2C1E21]/80 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded-md">
                    Spot 0{index + 1}
                  </div>
                </div>

                {/* Spot Info */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#9E3852] font-medium">
                    <Sun className="w-3.5 h-3.5 shrink-0" />
                    <span>{spot.time}</span>
                  </div>

                  <h3 className="font-serif-display text-xl font-bold text-[#2C1E21]">
                    {spot.title}
                  </h3>

                  <p className="text-xs text-[#6D555A] leading-relaxed">
                    {spot.description}
                  </p>
                </div>
              </div>

              {/* Pro Shooting Tip */}
              <div className="p-4 bg-[#FCF8F9] border-t border-[#F2DCE2] text-[11px] text-[#786166] space-y-1">
                <span className="font-semibold text-[#2C1E21] block">
                  Creator Tip:
                </span>
                <p className="italic">{spot.tip}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Community Proof & Customer Moments */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#F2DCE2] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#F2DCE2]">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#9E3852] font-semibold">
                Community Feed
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#2C1E21]">
                Loved by Creators & Locals
              </h3>
            </div>
            <p className="text-xs text-[#786166]">
              Real reviews from daily guests who appreciate good design and fair pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMMUNITY_POSTS.map((post) => (
              <div
                key={post.handle}
                className="bg-[#FCF9F9] rounded-2xl p-5 border border-[#F2DCE2] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#2C1E21]">{post.handle}</p>
                      <p className="text-[11px] text-[#8A6A71]">{post.role}</p>
                    </div>
                    <span className="text-[11px] text-[#A38289] font-mono">{post.time}</span>
                  </div>

                  <p className="text-xs text-[#523F43] leading-relaxed">
                    "{post.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#9E3852] pt-2 border-t border-[#F5E2E6]">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span className="font-mono tabular-nums text-[11px]">{post.likes} likes</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
