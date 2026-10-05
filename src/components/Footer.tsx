import React, { useState } from 'react';
import { ArrowRight, Check, Heart, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#211618] text-[#D8C4C8] border-t border-[#3B282C] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3B282C]">
          
          {/* Brand & Ethos */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Pinky Cafe
            </h3>
            <p className="text-xs sm:text-sm text-[#B59DA2] max-w-sm leading-relaxed">
              An upscale, Instagram-worthy aesthetic sanctuary serving specialty coffee, scratch pastries, and fresh brunch tartines at refreshingly honest prices.
            </p>
            <div className="text-xs text-[#E8B4C0] font-mono">
              <span>Zero Oat Milk Tax</span>
              <span className="mx-2">·</span>
              <span>All Day Aesthetic</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigate
            </h4>
            <ul className="space-y-2 text-xs text-[#B59DA2]">
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Menu & Prices
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('combos')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  $7.90 Combos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reserve')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Table Reservations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('photo-spots')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Photo Spot Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Philosophy
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Opening Times */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Hours & Address
            </h4>
            <div className="text-xs text-[#B59DA2] space-y-1.5">
              <p className="text-white font-medium">412 Rosewood Boulevard</p>
              <p>Arts District, Rosewood Central</p>
              <div className="pt-2 text-[11px] font-mono text-[#D8C4C8]">
                <p>Mon – Fri: 7:30 AM – 8:00 PM</p>
                <p>Sat – Sun: 8:00 AM – 8:30 PM</p>
              </div>
            </div>
          </div>

          {/* VIP Secret Menu Newsletter */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Pinky Insider
            </h4>
            <p className="text-xs text-[#B59DA2]">
              Get secret menu drops, early holiday reservation slots, and weekly $5 combo vouchers.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#332025] text-white text-xs flex items-center gap-2 border border-[#4D3037]">
                <Check className="w-4 h-4 text-[#FAD3DE]" />
                <span>You're on the list! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-[#2D1D21] border border-[#462E34] text-white placeholder:text-[#8C7076] focus:outline-hidden focus:border-[#E8B4C0]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="px-3 py-2 bg-[#E8B4C0] hover:bg-[#F3C4CF] text-[#211618] rounded-xl font-semibold text-xs transition-colors shrink-0 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7278]">
          <p>© {new Date().getFullYear()} Pinky Cafe LLC. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Accessibility</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Instagram @PinkyCafe</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
