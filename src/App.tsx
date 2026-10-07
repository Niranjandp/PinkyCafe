import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ComboBuilder } from './components/ComboBuilder';
import { ReservationSection } from './components/ReservationSection';
import { PhotoSpots } from './components/PhotoSpots';
import { StoryAndHours } from './components/StoryAndHours';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { MenuItem, CartItem, CartItemOption, PlacedOrder } from './types';
import { Check, ShoppingBag, Sparkles } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutOrderType, setCheckoutOrderType] = useState<'takeaway' | 'dine-in'>('takeaway');
  const [checkoutTableNumber, setCheckoutTableNumber] = useState('');
  const [checkoutTip, setCheckoutTip] = useState(1.00);
  const [activeSection, setActiveSection] = useState('home');
  // Track whether the user clicked a nav link so scroll-spy doesn't
  // immediately override the click-selected section during the smooth scroll.
  const clickedSectionRef = useRef<string | null>(null);

  // Scroll-spy: watch section visibility with IntersectionObserver
  useEffect(() => {
    const sectionIds = ['menu', 'combos', 'reserve', 'photo-spots', 'story'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Only update if no programmatic click navigation is in flight
            if (!clickedSectionRef.current) {
              setActiveSection(id);
            }
          }
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    // Clear the clicked-section lock once the user starts scrolling manually
    const handleScroll = () => {
      if (clickedSectionRef.current) {
        clickedSectionRef.current = null;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Subtle floating toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (
    item: MenuItem,
    quantity: number,
    options: CartItemOption,
    unitPrice: number
  ) => {
    // Generate unique key based on item id and selected options
    const optionsHash = JSON.stringify(options);
    const existingIndex = cartItems.findIndex(
      (c) => c.item.id === item.id && JSON.stringify(c.options) === optionsHash
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const newCartItem: CartItem = {
        cartId: `${item.id}-${Date.now()}-${Math.random()}`,
        item,
        quantity,
        options,
        unitPrice,
      };
      setCartItems((prev) => [...prev, newCartItem]);
    }

    showToast(`Added ${quantity}x ${item.name} to your order bag`);
  };

  const handleAddComboToCart = (
    comboTitle: string,
    price: number,
    summary: string,
    image: string
  ) => {
    const comboMenuItem: MenuItem = {
      id: `combo-${Date.now()}`,
      name: comboTitle,
      category: 'combos',
      price,
      description: summary,
      image,
      tags: ['Aesthetic Power Combo'],
    };

    const newCartItem: CartItem = {
      cartId: `combo-${Date.now()}`,
      item: comboMenuItem,
      quantity: 1,
      options: {
        notes: summary,
      },
      unitPrice: price,
    };

    setCartItems((prev) => [...prev, newCartItem]);
    showToast(`Added ${comboTitle} to your bag ($${price.toFixed(2)})`);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleStartCheckout = (
    orderType: 'takeaway' | 'dine-in',
    tableNumber: string,
    tip: number
  ) => {
    setCheckoutOrderType(orderType);
    setCheckoutTableNumber(tableNumber);
    setCheckoutTip(tip);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: PlacedOrder) => {
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    clickedSectionRef.current = id;
    setActiveSection(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FCF9F9] text-[#2C1E21] flex flex-col font-sans selection:bg-[#F3C4CF]">
      
      {/* Top Banner Notice (Slim single-line announcement, <40px) */}
      <div className="bg-[#2C1E21] text-white py-1.5 px-4 text-center text-xs tracking-wider flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-[#FAD3DE]" />
        <span>Fresh Morning Bake: French butter croissants & rose morning knots served warm daily from $2.80</span>
        <Sparkles className="w-3 h-3 text-[#FAD3DE] hidden sm:inline" />
      </div>

      {/* Top Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMenu={() => scrollToSection('menu')}
          onOpenCombo={() => scrollToSection('combos')}
          onReserve={() => scrollToSection('reserve')}
        />

        {/* Interactive Menu Section */}
        <MenuSection onAddToCart={handleAddToCart} />

        {/* Aesthetic Combo Builder Section */}
        <ComboBuilder onAddComboToCart={handleAddComboToCart} />

        {/* Table & Booth Reservation Section */}
        <ReservationSection />

        {/* Instagram Photo Spot Guide & Community Feed */}
        <PhotoSpots />

        {/* Brand Philosophy, Hours & Location */}
        <StoryAndHours />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleStartCheckout}
      />

      {/* Checkout and Order Tracking Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        orderType={checkoutOrderType}
        tableNumber={checkoutTableNumber}
        tip={checkoutTip}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C1E21] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#432A30] flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <div className="w-6 h-6 rounded-full bg-[#9E3852] text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-xs font-medium">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-xs font-bold text-[#FAD3DE] hover:underline ml-2 cursor-pointer whitespace-nowrap"
          >
            View Bag
          </button>
        </div>
      )}

      {/* Floating Bottom Quick Bar on Mobile if items in cart */}
      {totalCartCount > 0 && !isCartOpen && !isCheckoutOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:hidden z-30 animate-in slide-in-from-bottom-2">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3 px-4 rounded-full bg-[#2C1E21] text-white text-xs font-semibold uppercase tracking-wider shadow-xl flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#FAD3DE]" />
              <span>View Order ({totalCartCount})</span>
            </div>
            <span className="font-mono text-xs text-[#FAD3DE]">
              ${cartItems.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0).toFixed(2)}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
