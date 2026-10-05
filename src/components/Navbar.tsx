import React, { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigate,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FCF9F9]/90 backdrop-blur-md border-b border-[#F2DCE2]/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
          className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight text-[#2C1E21] hover:text-[#9E3852] transition-colors whitespace-nowrap"
        >
          Pinky Cafe
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6D555A]">
          <button
            onClick={() => handleNavClick('menu')}
            className={`transition-colors py-1 relative hover:text-[#2C1E21] ${
              activeSection === 'menu' ? 'text-[#9E3852] font-semibold' : ''
            }`}
          >
            Menu & Order
            {activeSection === 'menu' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C25470]" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('combos')}
            className={`transition-colors py-1 relative hover:text-[#2C1E21] ${
              activeSection === 'combos' ? 'text-[#9E3852] font-semibold' : ''
            }`}
          >
            Aesthetic Combos
            {activeSection === 'combos' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C25470]" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('reserve')}
            className={`transition-colors py-1 relative hover:text-[#2C1E21] ${
              activeSection === 'reserve' ? 'text-[#9E3852] font-semibold' : ''
            }`}
          >
            Book a Table
            {activeSection === 'reserve' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C25470]" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('photo-spots')}
            className={`transition-colors py-1 relative hover:text-[#2C1E21] ${
              activeSection === 'photo-spots' ? 'text-[#9E3852] font-semibold' : ''
            }`}
          >
            Photo Spots
            {activeSection === 'photo-spots' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C25470]" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('story')}
            className={`transition-colors py-1 relative hover:text-[#2C1E21] ${
              activeSection === 'story' ? 'text-[#9E3852] font-semibold' : ''
            }`}
          >
            Our Philosophy
            {activeSection === 'story' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C25470]" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="relative p-2.5 rounded-full text-[#2C1E21] hover:bg-[#FCEAEF] transition-colors flex items-center justify-center cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-[#2C1E21]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#C25470] text-white text-[11px] font-semibold rounded-full flex items-center justify-center font-mono tabular-nums shadow-sm animate-in zoom-in-50">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('menu')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#2C1E21] hover:bg-[#432A30] rounded-full transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FAD3DE]" />
            <span>Order Ahead</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 md:hidden text-[#2C1E21] rounded-lg hover:bg-[#F7E6EB] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#F2DCE2] bg-[#FCF9F9] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => handleNavClick('menu')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-[#2C1E21] hover:bg-[#F9E9ED]"
          >
            Menu & Online Order
          </button>
          <button
            onClick={() => handleNavClick('combos')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-[#2C1E21] hover:bg-[#F9E9ED]"
          >
            Aesthetic Combos (Under $9)
          </button>
          <button
            onClick={() => handleNavClick('reserve')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-[#2C1E21] hover:bg-[#F9E9ED]"
          >
            Reserve an Aesthetic Table
          </button>
          <button
            onClick={() => handleNavClick('photo-spots')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-[#2C1E21] hover:bg-[#F9E9ED]"
          >
            Instagram Photo Guide
          </button>
          <button
            onClick={() => handleNavClick('story')}
            className="block w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-[#2C1E21] hover:bg-[#F9E9ED]"
          >
            Our Philosophy & Hours
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('menu')}
              className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2C1E21] rounded-full text-center"
            >
              Order Ahead for Pickup
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
