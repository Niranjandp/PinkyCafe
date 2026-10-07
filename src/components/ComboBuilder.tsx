import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, ShoppingBag } from 'lucide-react';
import { MenuItem, CartItemOption } from '../types';

interface ComboBuilderProps {
  onAddComboToCart: (comboTitle: string, price: number, summary: string, image: string) => void;
}

const DRINK_OPTIONS = [
  {
    id: 'c-drink-1',
    name: 'Pink Velvet Rose Latte',
    price: 4.20,
    desc: 'Oat milk, organic rose water, edible petals',
    image: '/images/pink_signature_latte_1791181103883.jpg',
  },
  {
    id: 'c-drink-2',
    name: 'Iced Strawberry Cloud Matcha',
    price: 4.50,
    desc: 'Ceremonial Uji matcha, macerated fresh berries',
    image: '/images/pink_signature_latte_1791181103883.jpg',
  },
  {
    id: 'c-drink-3',
    name: 'Velvet Flat White',
    price: 3.40,
    desc: 'Double ristretto, silky microfoam art',
    image: '/images/hero_pinky_cafe_interior_1791181089083.jpg',
  },
  {
    id: 'c-drink-4',
    name: 'Ruby Hibiscus Spritz',
    price: 3.50,
    desc: 'Chilled floral botanicals, pink citrus',
    image: '/images/aesthetic_cafe_corner_1791181141814.jpg',
  },
];

const FOOD_OPTIONS = [
  {
    id: 'c-food-1',
    name: 'French Butter Croissant',
    price: 2.80,
    desc: '72 flaky layers, Normandy butter',
    image: '/images/strawberry_croissant_pastry_1791181128645.jpg',
  },
  {
    id: 'c-food-2',
    name: 'Strawberry Mascarpone Croissant',
    price: 3.80,
    desc: 'Fresh whipped cream & strawberries',
    image: '/images/strawberry_croissant_pastry_1791181128645.jpg',
  },
  {
    id: 'c-food-3',
    name: 'Smashed Avocado Tartine (+1.20)',
    price: 4.80,
    desc: 'Farm egg, avocado, edible blossoms',
    image: '/images/avocado_brioche_brunch_1791181115766.jpg',
    addon: 1.20,
  },
  {
    id: 'c-food-4',
    name: 'Rose & Cardamom Knot',
    price: 3.20,
    desc: 'Swedish spiced morning brioche bun',
    image: '/images/strawberry_croissant_pastry_1791181128645.jpg',
  },
];

const SWEET_TREATS = [
  {
    id: 'c-sweet-1',
    name: 'Rose & Raspberry Macaron Duo',
    price: 2.50,
    desc: 'Crisp Parisian meringue with jam filling',
  },
  {
    id: 'c-sweet-2',
    name: 'Sea Salt Dark Chocolate Nib',
    price: 2.00,
    desc: 'Single-origin Peruvian cacao',
  },
  {
    id: 'c-sweet-3',
    name: 'Chilled Pink Rosewater Spritzer',
    price: 2.20,
    desc: 'Mini glass of mineral infused refreshment',
  },
];

export const ComboBuilder: React.FC<ComboBuilderProps> = ({ onAddComboToCart }) => {
  const [selectedDrink, setSelectedDrink] = useState(DRINK_OPTIONS[0]);
  const [selectedFood, setSelectedFood] = useState(FOOD_OPTIONS[1]);
  const [selectedSweet, setSelectedSweet] = useState(SWEET_TREATS[0]);

  // Base bundle price is fixed at $7.90 + any premium item upgrade
  const addonCharge = (selectedFood as any).addon || 0;
  const comboPrice = 7.90 + addonCharge;
  const retailValue = selectedDrink.price + selectedFood.price + selectedSweet.price;
  const totalSavings = retailValue - comboPrice;

  const handleAddCombo = () => {
    const title = `Aesthetic Power Combo (${selectedDrink.name} + ${selectedFood.name})`;
    const summary = `${selectedDrink.name} · ${selectedFood.name} · ${selectedSweet.name}`;
    onAddComboToCart(title, comboPrice, summary, selectedFood.image);
  };

  return (
    <section id="combos" className="py-16 sm:py-20 bg-[#FAF4F6] border-y border-[#F2DCE2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#9E3852]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Aesthetic Combo Builder</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C1E21] tracking-tight">
            Craft Your $7.90 Dream Break
          </h2>
          <p className="text-sm sm:text-base text-[#6D555A]">
            Select 1 drink, 1 fresh bakery item, and 1 sweet bite. Enjoy upscale café luxury with up to 40% savings.
          </p>
        </div>

        {/* 3 Step Interactive Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
          {/* Step 1: Drink */}
          <div className="bg-white rounded-2xl p-5 border border-[#F2DCE2] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F2DCE2]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#2C1E21] text-white text-xs font-mono font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-serif-display text-lg font-bold text-[#2C1E21]">
                    Pick Your Drink
                  </h3>
                </div>
                <span className="text-[11px] text-[#8A6A71]">Step 1 of 3</span>
              </div>

              <div className="space-y-2.5">
                {DRINK_OPTIONS.map((drink) => {
                  const isSelected = selectedDrink.id === drink.id;
                  return (
                    <button
                      key={drink.id}
                      onClick={() => setSelectedDrink(drink)}
                      className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-[#9E3852] bg-[#FFF2F5] shadow-xs'
                          : 'border-[#ECD0D6] bg-white hover:border-[#DDA5B1] hover:bg-[#FCF9F9]'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <p className={`text-xs font-bold ${isSelected ? 'text-[#9E3852]' : 'text-[#2C1E21]'}`}>
                          {drink.name}
                        </p>
                        <p className="text-[11px] text-[#786166]">{drink.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-xs text-[#8A6A71] line-through">
                          ${drink.price.toFixed(2)}
                        </span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'bg-[#9E3852] border-[#9E3852] text-white' : 'border-[#ECD0D6]'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step 2: Bakery / Brunch */}
          <div className="bg-white rounded-2xl p-5 border border-[#F2DCE2] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F2DCE2]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#2C1E21] text-white text-xs font-mono font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-serif-display text-lg font-bold text-[#2C1E21]">
                    Pick Your Bite
                  </h3>
                </div>
                <span className="text-[11px] text-[#8A6A71]">Step 2 of 3</span>
              </div>

              <div className="space-y-2.5">
                {FOOD_OPTIONS.map((food) => {
                  const isSelected = selectedFood.id === food.id;
                  return (
                    <button
                      key={food.id}
                      onClick={() => setSelectedFood(food)}
                      className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-[#9E3852] bg-[#FFF2F5] shadow-xs'
                          : 'border-[#ECD0D6] bg-white hover:border-[#DDA5B1] hover:bg-[#FCF9F9]'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <p className={`text-xs font-bold ${isSelected ? 'text-[#9E3852]' : 'text-[#2C1E21]'}`}>
                          {food.name}
                        </p>
                        <p className="text-[11px] text-[#786166]">{food.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-xs text-[#8A6A71] line-through">
                          ${food.price.toFixed(2)}
                        </span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'bg-[#9E3852] border-[#9E3852] text-white' : 'border-[#ECD0D6]'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step 3: Complimentary Sweet */}
          <div className="bg-white rounded-2xl p-5 border border-[#F2DCE2] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F2DCE2]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#2C1E21] text-white text-xs font-mono font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="font-serif-display text-lg font-bold text-[#2C1E21]">
                    Complimentary Sweet
                  </h3>
                </div>
                <span className="text-[11px] text-[#8A6A71]">Included</span>
              </div>

              <div className="space-y-2.5">
                {SWEET_TREATS.map((sweet) => {
                  const isSelected = selectedSweet.id === sweet.id;
                  return (
                    <button
                      key={sweet.id}
                      onClick={() => setSelectedSweet(sweet)}
                      className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-[#9E3852] bg-[#FFF2F5] shadow-xs'
                          : 'border-[#ECD0D6] bg-white hover:border-[#DDA5B1] hover:bg-[#FCF9F9]'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <p className={`text-xs font-bold ${isSelected ? 'text-[#9E3852]' : 'text-[#2C1E21]'}`}>
                          {sweet.name}
                        </p>
                        <p className="text-[11px] text-[#786166]">{sweet.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-semibold text-[#9E3852] uppercase tracking-wider">
                          Free
                        </span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'bg-[#9E3852] border-[#9E3852] text-white' : 'border-[#ECD0D6]'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Live Combo Savings Bar & Add to Cart */}
        <div className="bg-[#2C1E21] text-white rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-[#FAD3DE]">
              <span>Selected: {selectedDrink.name}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedFood.name}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedSweet.name}</span>
            </div>
            <div className="flex items-baseline justify-center md:justify-start gap-3">
              <span className="font-serif-display text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono tabular-nums">
                ${comboPrice.toFixed(2)}
              </span>
              <span className="font-mono text-sm line-through text-[#C4A6AD] tabular-nums">
                Regular ${retailValue.toFixed(2)}
              </span>
              <span className="text-xs font-semibold bg-[#C25470] text-white px-2.5 py-0.5 rounded-full">
                Save ${totalSavings.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={handleAddCombo}
            className="w-full md:w-auto px-7 py-3.5 rounded-full bg-[#FFF0F3] hover:bg-white text-[#2C1E21] text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4 text-[#9E3852]" />
            <span>Add Combo to Order</span>
          </button>
        </div>

      </div>
    </section>
  );
};
