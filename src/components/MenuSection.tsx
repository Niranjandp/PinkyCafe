import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, Filter, Check } from 'lucide-react';
import { MenuItem, MenuCategory, CartItemOption } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { ItemCustomizeModal } from './ItemCustomizeModal';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, quantity: number, options: CartItemOption, finalPrice: number) => void;
}

const CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: 'all', label: 'All Offerings' },
  { id: 'signature', label: 'Signature Rose & Pink' },
  { id: 'espresso', label: 'Espresso & Brews' },
  { id: 'matcha-tea', label: 'Matcha & Tea' },
  { id: 'pastries', label: 'Artisan Pastries' },
  { id: 'brunch', label: 'Tartines & Brunch' },
  { id: 'combos', label: 'Value Combos' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  
  // Customization modal state
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesTags) return false;
      }
      // Max price match
      if (maxPrice !== null && item.price > maxPrice) {
        return false;
      }
      // Dietary tag match
      if (selectedDietary !== 'all') {
        if (!item.tags.some((t) => t.toLowerCase().includes(selectedDietary.toLowerCase()))) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, searchQuery, maxPrice, selectedDietary]);

  const handleOpenCustomize = (item: MenuItem) => {
    setCustomizingItem(item);
    setModalOpen(true);
  };

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    if (item.customizable) {
      handleOpenCustomize(item);
    } else {
      onAddToCart(item, 1, {}, item.price);
    }
  };

  return (
    <section id="menu" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#F2DCE2]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#9E3852]">
              <span>Handcrafted in Small Batches</span>
              <span aria-hidden="true" className="text-[#D4A3AE]">·</span>
              <span>Available All Day</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#2C1E21]">
              The Aesthetic Menu
            </h2>
            <p className="text-sm sm:text-base text-[#6D555A] max-w-xl">
              Specialty beans roasted locally, organic floral infusions, and pastries baked fresh every morning at 6:00 AM.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#A88890] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search drinks, pastries, tartines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-full border border-[#ECD0D6] bg-[#FCF9F9] focus:bg-white focus:outline-hidden focus:border-[#9E3852] focus:ring-1 focus:ring-[#9E3852] transition-all text-[#2C1E21] placeholder:text-[#9A7F85]"
            />
          </div>
        </div>

        {/* Filter Controls Row (Interactive button segmented tabs) */}
        <div className="space-y-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-[#2C1E21] text-white shadow-xs'
                    : 'bg-[#FAF2F4] text-[#6D555A] hover:bg-[#F5E6E9] hover:text-[#2C1E21]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Quick Budget & Dietary Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#6D555A] pt-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#8A6A71] uppercase tracking-wider text-[11px]">
                Budget:
              </span>
              <button
                onClick={() => setMaxPrice(null)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  maxPrice === null ? 'bg-[#FCE8ED] text-[#9E3852] font-semibold' : 'hover:text-[#2C1E21]'
                }`}
              >
                Any Price
              </button>
              <button
                onClick={() => setMaxPrice(4.00)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  maxPrice === 4.00 ? 'bg-[#FCE8ED] text-[#9E3852] font-semibold' : 'hover:text-[#2C1E21]'
                }`}
              >
                Under $4.00
              </button>
              <button
                onClick={() => setMaxPrice(6.00)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  maxPrice === 6.00 ? 'bg-[#FCE8ED] text-[#9E3852] font-semibold' : 'hover:text-[#2C1E21]'
                }`}
              >
                Under $6.00
              </button>
              <button
                onClick={() => setMaxPrice(8.00)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  maxPrice === 8.00 ? 'bg-[#FCE8ED] text-[#9E3852] font-semibold' : 'hover:text-[#2C1E21]'
                }`}
              >
                Under $8.00
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#8A6A71] uppercase tracking-wider text-[11px]">
                Dietary:
              </span>
              <button
                onClick={() => setSelectedDietary('all')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  selectedDietary === 'all' ? 'bg-[#FCE8ED] text-[#9E3852] font-semibold' : 'hover:text-[#2C1E21]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedDietary('vegan')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  selectedDietary === 'vegan' ? 'bg-[#FCE8ED] text-[#9E3852] font-semibold' : 'hover:text-[#2C1E21]'
                }`}
              >
                Vegan
              </button>
              <button
                onClick={() => setSelectedDietary('vegetarian')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  selectedDietary === 'vegetarian' ? 'bg-[#FCE8ED] text-[#9E3852] font-semibold' : 'hover:text-[#2C1E21]'
                }`}
              >
                Vegetarian
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-[#FAF5F6] rounded-2xl border border-dashed border-[#ECD0D6] p-8">
            <Sparkles className="w-8 h-8 text-[#9E3852] mx-auto mb-3" />
            <p className="font-serif-display text-xl font-medium text-[#2C1E21]">No items match your criteria</p>
            <p className="text-xs text-[#6D555A] mt-1 max-w-sm mx-auto">
              Try adjusting your price ceiling or search term to discover other handcrafted drinks and bakery treats.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setMaxPrice(null);
                setSelectedDietary('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#2C1E21] rounded-full cursor-pointer hover:bg-[#432A30]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenCustomize(item)}
                className="group relative bg-[#FCF9F9] rounded-2xl overflow-hidden border border-[#F2DCE2] hover:border-[#E8B4C0] hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Product Image Frame (65-75% visual lead) */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F8E7EB]">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Clean unboxed tag in photo corner */}
                  {item.isSignature && (
                    <div className="absolute top-3 left-3 bg-[#2C1E21]/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                      Signature House Special
                    </div>
                  )}

                  {/* Quick Add Floating Button on Image */}
                  <button
                    onClick={(e) => handleQuickAdd(e, item)}
                    aria-label={`Add ${item.name} to order`}
                    className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/95 text-[#2C1E21] hover:bg-[#2C1E21] hover:text-white shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Content Block */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    {/* Quiet metadata line (Anti-pill text) */}
                    <div className="flex items-center gap-2 text-xs text-[#8A6A71]">
                      <span className="capitalize">{item.category.replace('-', ' ')}</span>
                      {item.calories && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">{item.calories}</span>
                        </>
                      )}
                      {item.tags.length > 0 && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{item.tags[0]}</span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif-display text-xl font-bold text-[#2C1E21] group-hover:text-[#9E3852] transition-colors leading-snug">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#664F54] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Action row */}
                  <div className="pt-3 border-t border-[#F2DCE2] flex items-center justify-between">
                    <div>
                      <span className="font-mono text-lg font-bold tabular-nums text-[#2C1E21]">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.customizable && (
                        <span className="block text-[10px] text-[#8A6A71]">Customizable</span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCustomize(item);
                      }}
                      className="text-xs font-semibold uppercase tracking-wider text-[#9E3852] hover:text-[#2C1E21] py-1 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{item.customizable ? 'Customize' : 'Add'}</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Item Customization Modal */}
      <ItemCustomizeModal
        item={customizingItem}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
};
