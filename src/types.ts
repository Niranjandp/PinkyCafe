export type MenuCategory = 
  | 'all' 
  | 'signature' 
  | 'espresso' 
  | 'matcha-tea' 
  | 'pastries' 
  | 'brunch' 
  | 'combos';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  image: string;
  tags: string[]; // e.g. 'Bestseller', 'Vegan Option', 'Gluten-Free'
  isSignature?: boolean;
  calories?: string;
  caffeineLevel?: 'None' | 'Low' | 'Medium' | 'High';
  customizable?: boolean;
}

export interface CartItemOption {
  milk?: 'Whole' | 'Oat (Free)' | 'Almond (Free)' | 'Coconut';
  temperature?: 'Hot' | 'Iced';
  sweetness?: 'Standard' | 'Half Sweet (50%)' | 'Unsweetened';
  extraShot?: boolean;
  extraPetals?: boolean;
  notes?: string;
}

export interface CartItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  options: CartItemOption;
  unitPrice: number;
}

export interface ComboSelection {
  drink: MenuItem | null;
  food: MenuItem | null;
  treat: MenuItem | null;
}

export interface TableReservation {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'The Velvet Arch' | 'Terrazzo Window Booth' | 'Neon Blossom Lounge' | 'Garden Terrace';
  specialRequest?: string;
}

export interface PlacedOrder {
  orderNumber: string;
  items: CartItem[];
  orderType: 'dine-in' | 'takeaway';
  tableNumber?: string;
  pickupTime?: string;
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  timestamp: string;
  status: 'Received' | 'Preparing' | 'Ready for Pickup';
}
