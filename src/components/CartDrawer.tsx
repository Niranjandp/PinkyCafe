import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Clock, Utensils } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onCheckout: (orderType: 'takeaway' | 'dine-in', tableNumber: string, tip: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<'takeaway' | 'dine-in'>('takeaway');
  const [tableNumber, setTableNumber] = useState('');
  const [selectedTip, setSelectedTip] = useState<number>(1.00);

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax + (items.length > 0 ? selectedTip : 0);

  const handleStartCheckout = () => {
    if (orderType === 'dine-in' && !tableNumber.trim()) {
      alert('Please enter your table number for table service.');
      return;
    }
    onCheckout(orderType, tableNumber, selectedTip);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#F2DCE2] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#F2DCE2] flex items-center justify-between bg-[#FCF8F9]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#9E3852]" />
              <h2 className="font-serif-display text-xl font-bold text-[#2C1E21]">
                Your Order Bag
              </h2>
              <span className="font-mono text-xs bg-[#FCE8ED] text-[#9E3852] font-semibold px-2 py-0.5 rounded-full">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close cart drawer"
              className="p-1.5 rounded-full text-[#6D555A] hover:bg-[#F5E6E9] hover:text-[#2C1E21] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FCF0F3] flex items-center justify-center text-[#9E3852]">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <div className="space-y-1">
                  <p className="font-serif-display text-xl font-semibold text-[#2C1E21]">
                    Your bag is empty
                  </p>
                  <p className="text-xs text-[#786166] max-w-xs">
                    Treat yourself to a velvety rose latte, fresh croissant, or build an aesthetic $7.90 combo.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#2C1E21] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#432A30] cursor-pointer"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              items.map((cartItem) => {
                const itemTotal = cartItem.unitPrice * cartItem.quantity;
                return (
                  <div
                    key={cartItem.cartId}
                    className="p-3.5 rounded-2xl border border-[#F2DCE2] bg-[#FCF8F9] space-y-3"
                  >
                    <div className="flex gap-3">
                      {/* Thumbnail */}
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover border border-[#ECD0D6] shrink-0"
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif-display text-base font-bold text-[#2C1E21] leading-tight truncate">
                            {cartItem.item.name}
                          </h4>
                          <span className="font-mono text-sm font-bold tabular-nums text-[#2C1E21] shrink-0">
                            ${itemTotal.toFixed(2)}
                          </span>
                        </div>

                        {/* Options summary */}
                        <div className="text-[11px] text-[#786166] space-y-0.5">
                          {cartItem.options.temperature && (
                            <span>{cartItem.options.temperature}</span>
                          )}
                          {cartItem.options.milk && (
                            <span> · {cartItem.options.milk}</span>
                          )}
                          {cartItem.options.sweetness && (
                            <span> · {cartItem.options.sweetness}</span>
                          )}
                          {cartItem.options.extraShot && (
                            <span> · +Shot ($0.80)</span>
                          )}
                          {cartItem.options.extraPetals && (
                            <span> · +Petals ($0.30)</span>
                          )}
                          {cartItem.options.notes && (
                            <p className="italic text-[#9E3852] mt-0.5">"{cartItem.options.notes}"</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Stepper & Delete */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#F2DDE3]">
                      <div className="flex items-center gap-2 bg-white border border-[#ECD0D6] rounded-full px-2.5 py-1">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.cartId, -1)}
                          className="text-[#6D555A] hover:text-[#2C1E21] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold text-[#2C1E21] tabular-nums min-w-[1rem] text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.cartId, 1)}
                          className="text-[#6D555A] hover:text-[#2C1E21] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(cartItem.cartId)}
                        className="text-[#9E3852] hover:text-red-700 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Order Details (if items exist) */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#F2DCE2] bg-[#FAF4F6] space-y-4">
              
              {/* Dining Style Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-white rounded-xl border border-[#ECD0D6]">
                <button
                  type="button"
                  onClick={() => setOrderType('takeaway')}
                  className={`py-2 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    orderType === 'takeaway'
                      ? 'bg-[#2C1E21] text-white shadow-xs'
                      : 'text-[#6D555A] hover:text-[#2C1E21]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Pickup (10-15m)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('dine-in')}
                  className={`py-2 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    orderType === 'dine-in'
                      ? 'bg-[#2C1E21] text-white shadow-xs'
                      : 'text-[#6D555A] hover:text-[#2C1E21]'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Dine-In Table</span>
                </button>
              </div>

              {/* Table input if Dine-in */}
              {orderType === 'dine-in' && (
                <div className="space-y-1 animate-in fade-in duration-150">
                  <label className="block text-[11px] font-semibold text-[#8A6A71] uppercase tracking-wider">
                    Table Number (See table tent)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Table 4 or Velvet Booth 2"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#ECD0D6] bg-white text-[#2C1E21] focus:ring-1 focus:ring-[#9E3852] focus:outline-hidden"
                  />
                </div>
              )}

              {/* Tip Selection */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs text-[#8A6A71]">
                  <span className="font-semibold uppercase tracking-wider text-[10px]">
                    Barista Gratitude Tip
                  </span>
                  <span>(100% goes to staff)</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 1.00, 1.50, 2.00].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTip(t)}
                      className={`py-1.5 text-xs font-mono tabular-nums rounded-lg border transition-all cursor-pointer ${
                        selectedTip === t
                          ? 'border-[#9E3852] bg-[#FFF0F3] text-[#9E3852] font-bold'
                          : 'border-[#ECD0D6] bg-white text-[#6D555A]'
                      }`}
                    >
                      {t === 0 ? 'None' : `$${t.toFixed(2)}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-[#6D555A] pt-2 border-t border-[#ECD0D6]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#2C1E21]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Local Tax (8%)</span>
                  <span className="font-mono tabular-nums text-[#2C1E21]">${tax.toFixed(2)}</span>
                </div>
                {selectedTip > 0 && (
                  <div className="flex justify-between">
                    <span>Barista Tip</span>
                    <span className="font-mono tabular-nums text-[#2C1E21]">${selectedTip.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#2C1E21] pt-1 border-t border-[#ECD0D6]">
                  <span>Estimated Total</span>
                  <span className="font-mono tabular-nums text-base text-[#9E3852]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Proceed to Checkout */}
              <button
                onClick={handleStartCheckout}
                className="w-full py-3.5 px-4 rounded-full bg-[#2C1E21] hover:bg-[#432A30] text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-between"
              >
                <span>Proceed to Checkout</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-sm text-[#FAD3DE]">${total.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4 text-[#FAD3DE]" />
                </div>
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
