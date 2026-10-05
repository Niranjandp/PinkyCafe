import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, CreditCard, Smartphone, Store, Clock, QrCode, Sparkles } from 'lucide-react';
import { CartItem, PlacedOrder } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  orderType: 'takeaway' | 'dine-in';
  tableNumber: string;
  tip: number;
  onOrderSuccess: (order: PlacedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  orderType,
  tableNumber,
  tip,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'counter'>('apple-pay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<PlacedOrder | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax + tip;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newOrder: PlacedOrder = {
        orderNumber: `#PK-${Math.floor(1000 + Math.random() * 9000)}`,
        items: [...items],
        orderType,
        tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
        pickupTime: orderType === 'takeaway' ? '12 - 15 minutes' : 'Immediate table delivery',
        subtotal,
        tax,
        tip,
        total,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Preparing',
      };
      setCompletedOrder(newOrder);
      onOrderSuccess(newOrder);
    }, 1200);
  };

  const handleDone = () => {
    setCompletedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#F2DCE2] overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-[#F2DCE2] flex items-center justify-between bg-[#FCF8F9]">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#9E3852] font-semibold">
              {completedOrder ? 'Order Confirmed' : 'Checkout & Payment'}
            </span>
            <h3 className="font-serif-display text-2xl font-bold text-[#2C1E21]">
              {completedOrder ? 'Preparing Your Order' : 'Pinky Cafe Express'}
            </h3>
          </div>

          <button
            onClick={handleDone}
            aria-label="Close checkout"
            className="p-1.5 rounded-full text-[#6D555A] hover:bg-[#F5E6E9] hover:text-[#2C1E21] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {completedOrder ? (
            /* Order Success Digital Ticket */
            <div className="text-center space-y-6 animate-in fade-in duration-300">
              <div className="w-14 h-14 bg-[#FCE8ED] text-[#9E3852] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <p className="font-serif-display text-3xl font-bold text-[#2C1E21]">
                  Order {completedOrder.orderNumber}
                </p>
                <p className="text-xs text-[#786166]">
                  Thank you, {customerName}! Your handcrafted items are now in progress.
                </p>
              </div>

              {/* Status Tracker */}
              <div className="bg-[#FAF4F6] rounded-2xl p-4 border border-[#F2DCE2]">
                <div className="flex items-center justify-between text-xs font-semibold text-[#2C1E21] mb-2">
                  <span>Estimated Time:</span>
                  <span className="font-mono text-[#9E3852]">{completedOrder.pickupTime}</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#E8D0D6] rounded-full h-2 mb-3">
                  <div className="bg-[#9E3852] h-2 rounded-full w-2/3 animate-pulse" />
                </div>

                <div className="flex justify-between text-[11px] text-[#786166]">
                  <span className="text-[#9E3852] font-semibold">1. Order Placed</span>
                  <span className="text-[#9E3852] font-semibold">2. Handcrafting</span>
                  <span>3. Ready for You</span>
                </div>
              </div>

              {/* Digital Pick-up Pass */}
              <div className="bg-white rounded-2xl p-4 border border-dashed border-[#ECD0D6] text-left space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-[#F2DCE2]">
                  <div>
                    <p className="text-xs font-bold text-[#2C1E21]">Fulfillment Type</p>
                    <p className="text-[11px] text-[#786166]">
                      {completedOrder.orderType === 'dine-in' ? `Dine-In (${completedOrder.tableNumber})` : 'Counter Pickup'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-[#2C1E21]">Paid Total</p>
                    <p className="font-mono text-sm font-bold text-[#9E3852] tabular-nums">
                      ${completedOrder.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-[#523F43] space-y-1">
                  {completedOrder.items.map((it) => (
                    <div key={it.cartId} className="flex justify-between">
                      <span>{it.quantity}x {it.item.name}</span>
                      <span className="font-mono tabular-nums">${(it.unitPrice * it.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleDone}
                className="w-full py-3.5 px-6 rounded-full bg-[#2C1E21] hover:bg-[#432A30] text-white text-xs font-semibold uppercase tracking-wider shadow-md cursor-pointer"
              >
                Back to Pinky Cafe
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-5">
              {/* Order Quick Summary */}
              <div className="bg-[#FAF4F6] rounded-2xl p-4 border border-[#F2DCE2] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#2C1E21]">
                    {items.length} {items.length === 1 ? 'item' : 'items'} in bag
                  </p>
                  <p className="text-[11px] text-[#786166]">
                    {orderType === 'dine-in' ? `Dine-in at ${tableNumber || 'Table'}` : 'Pickup in 10-15 mins'}
                  </p>
                </div>
                <span className="font-mono text-lg font-bold text-[#9E3852] tabular-nums">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Customer Info */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8A6A71]">
                  Contact & Order Name
                </label>
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name (for order callout) *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#ECD0D6] bg-[#FCF8F9] text-[#2C1E21] focus:bg-white focus:outline-hidden focus:border-[#9E3852] focus:ring-1 focus:ring-[#9E3852]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Mobile Phone (for optional SMS ready alert)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#ECD0D6] bg-[#FCF8F9] text-[#2C1E21] focus:bg-white focus:outline-hidden focus:border-[#9E3852] focus:ring-1 focus:ring-[#9E3852]"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8A6A71]">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple-pay')}
                    className={`p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'apple-pay'
                        ? 'border-[#9E3852] bg-[#FFF2F5] text-[#9E3852] font-semibold'
                        : 'border-[#ECD0D6] bg-white text-[#6D555A] hover:border-[#DDA5B1]'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Apple / Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'border-[#9E3852] bg-[#FFF2F5] text-[#9E3852] font-semibold'
                        : 'border-[#ECD0D6] bg-white text-[#6D555A] hover:border-[#DDA5B1]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('counter')}
                    className={`p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'counter'
                        ? 'border-[#9E3852] bg-[#FFF2F5] text-[#9E3852] font-semibold'
                        : 'border-[#ECD0D6] bg-white text-[#6D555A] hover:border-[#DDA5B1]'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>Pay at Counter</span>
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-full bg-[#2C1E21] hover:bg-[#432A30] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Brewing & Confirming...</span>
                  </div>
                ) : (
                  <span>Authorize & Place Order (${total.toFixed(2)})</span>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
