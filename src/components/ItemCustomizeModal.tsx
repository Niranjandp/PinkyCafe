import React, { useState } from 'react';
import { X, Plus, Minus, Check, Sparkles } from 'lucide-react';
import { MenuItem, CartItemOption } from '../types';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, options: CartItemOption, finalPrice: number) => void;
}

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !item) return null;

  const isDrink = item.category === 'signature' || item.category === 'espresso' || item.category === 'matcha-tea';

  const [quantity, setQuantity] = useState(1);
  const [temperature, setTemperature] = useState<'Hot' | 'Iced'>('Hot');
  const [milk, setMilk] = useState<'Whole' | 'Oat (Free)' | 'Almond (Free)' | 'Coconut'>('Oat (Free)');
  const [sweetness, setSweetness] = useState<'Standard' | 'Half Sweet (50%)' | 'Unsweetened'>('Standard');
  const [extraShot, setExtraShot] = useState(false);
  const [extraPetals, setExtraPetals] = useState(false);
  const [notes, setNotes] = useState('');

  // Calculate dynamic unit price
  let additionalCost = 0;
  if (extraShot) additionalCost += 0.80;
  if (extraPetals) additionalCost += 0.30;

  const unitPrice = item.price + additionalCost;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    onAddToCart(
      item,
      quantity,
      {
        milk: isDrink ? milk : undefined,
        temperature: isDrink ? temperature : undefined,
        sweetness: isDrink ? sweetness : undefined,
        extraShot,
        extraPetals,
        notes: notes.trim() || undefined,
      },
      unitPrice
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#F2DCE2] overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with image & close button */}
        <div className="relative h-44 sm:h-52 w-full bg-[#FCECEF] overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#2C1E21] flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-xs uppercase tracking-wider text-[#FAD3DE] font-medium">
              {item.category.replace('-', ' ')}
            </span>
            <h3 className="font-serif-display text-2xl font-bold leading-tight">
              {item.name}
            </h3>
          </div>
        </div>

        {/* Scrollable customization options */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm text-[#2C1E21]">
          <p className="text-xs sm:text-sm text-[#6D555A] leading-relaxed">
            {item.description}
          </p>

          {isDrink && (
            <>
              {/* Temperature */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A6A71] mb-2">
                  Serving Temperature
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Hot', 'Iced'] as const).map((temp) => (
                    <button
                      key={temp}
                      type="button"
                      onClick={() => setTemperature(temp)}
                      className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                        temperature === temp
                          ? 'border-[#9E3852] bg-[#FFF2F5] text-[#9E3852] font-semibold'
                          : 'border-[#ECD0D6] bg-white text-[#4A383B] hover:border-[#DDA5B1]'
                      }`}
                    >
                      <span>{temp === 'Hot' ? 'Hot (Velvet Microfoam)' : 'Iced (Crisp Chilled)'}</span>
                      {temperature === temp && <Check className="w-3.5 h-3.5 text-[#9E3852]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Option (Zero Surcharge Highlight) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#8A6A71]">
                    Choice of Milk
                  </label>
                  <span className="text-[11px] font-medium text-[#9E3852] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Zero plant-milk fee
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(['Oat (Free)', 'Whole', 'Almond (Free)', 'Coconut'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMilk(m)}
                      className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                        milk === m
                          ? 'border-[#9E3852] bg-[#FFF2F5] text-[#9E3852] font-semibold'
                          : 'border-[#ECD0D6] bg-white text-[#4A383B] hover:border-[#DDA5B1]'
                      }`}
                    >
                      <span>{m}</span>
                      {milk === m && <Check className="w-3.5 h-3.5 text-[#9E3852]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweetness */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A6A71] mb-2">
                  Sweetness Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Standard', 'Half Sweet (50%)', 'Unsweetened'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSweetness(s)}
                      className={`py-2 px-2 text-center rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        sweetness === s
                          ? 'border-[#9E3852] bg-[#FFF2F5] text-[#9E3852] font-semibold'
                          : 'border-[#ECD0D6] bg-white text-[#4A383B] hover:border-[#DDA5B1]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A6A71] mb-2">
                  Optional Add-Ons
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-2.5 rounded-xl border border-[#ECD0D6] bg-white hover:bg-[#FFF8F9] cursor-pointer">
                    <span className="text-xs text-[#4A383B]">Extra Double Shot Espresso</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono tabular-nums text-[#6D555A]">+$0.80</span>
                      <input
                        type="checkbox"
                        checked={extraShot}
                        onChange={(e) => setExtraShot(e.target.checked)}
                        className="rounded border-[#DDA5B1] text-[#9E3852] focus:ring-[#9E3852] h-4 w-4"
                      />
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl border border-[#ECD0D6] bg-white hover:bg-[#FFF8F9] cursor-pointer">
                    <span className="text-xs text-[#4A383B]">Organic Dried Rose Petal Dust</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono tabular-nums text-[#6D555A]">+$0.30</span>
                      <input
                        type="checkbox"
                        checked={extraPetals}
                        onChange={(e) => setExtraPetals(e.target.checked)}
                        className="rounded border-[#DDA5B1] text-[#9E3852] focus:ring-[#9E3852] h-4 w-4"
                      />
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}

          {/* Special Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A6A71] mb-1.5">
              Special Barista Note
            </label>
            <input
              type="text"
              placeholder="e.g. Extra hot, light foam, separate cup..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-[#ECD0D6] focus:outline-hidden focus:border-[#9E3852] focus:ring-1 focus:ring-[#9E3852] bg-white text-[#2C1E21]"
            />
          </div>
        </div>

        {/* Footer with quantity and add to cart */}
        <div className="p-4 border-t border-[#F2DCE2] bg-[#FAF5F6] flex items-center justify-between gap-4 shrink-0">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2.5 bg-white border border-[#ECD0D6] rounded-full px-3 py-1.5 shadow-2xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="text-[#6D555A] hover:text-[#2C1E21] disabled:opacity-30 cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-xs font-bold text-[#2C1E21] tabular-nums min-w-[1.2rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-[#6D555A] hover:text-[#2C1E21] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 rounded-full bg-[#2C1E21] hover:bg-[#432A30] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-between shadow-sm cursor-pointer transition-all duration-150"
          >
            <span>Add to Order</span>
            <span className="font-mono text-sm tabular-nums text-[#FAD3DE]">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
