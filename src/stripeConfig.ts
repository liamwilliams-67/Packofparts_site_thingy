// Stripe Payment Link – set in .env: VITE_STRIPE_PAYMENT_LINK=https://buy.stripe.com/...
export const STRIPE_PAYMENT_LINK = import.meta.env.VITE_STRIPE_PAYMENT_LINK || '';

// Stripe Buy Button – set in .env
export const STRIPE_BUY_BUTTON_ID = import.meta.env.VITE_STRIPE_BUY_BUTTON_ID || '';
export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

// --- Summer Camp Products ---
// Each camp/add-on has its own Stripe Buy Button ID (set via VITE_STRIPE_CAMP_*_BUY_BUTTON_ID)
export interface StripeProduct {
  key: string;
  label: string;
  dates?: string;
  time: string;
  price: number;
  buyButtonId: string;
}

export const STRIPE_CAMP_PRODUCTS: StripeProduct[] = [
  {
    key: 'camp_cad',
    label: 'CAD & Design',
    dates: 'August 17-21, 2025',
    time: '9:00 AM - 12:00 PM',
    price: 250,
    buyButtonId: import.meta.env.VITE_STRIPE_CAMP_CAD_BUY_BUTTON_ID || '',
  },
  {
    key: 'camp_programming',
    label: 'Programming',
    dates: 'August 24-28, 2025',
    time: '9:00 AM - 12:00 PM',
    price: 250,
    buyButtonId: import.meta.env.VITE_STRIPE_CAMP_PROGRAMMING_BUY_BUTTON_ID || '',
  },
  {
    key: 'camp_engineering1',
    label: 'Engineering 1',
    dates: 'August 17-21, 2025',
    time: '9:00 AM - 12:00 PM',
    price: 250,
    buyButtonId: import.meta.env.VITE_STRIPE_CAMP_ENGINEERING1_BUY_BUTTON_ID || '',
  },
  {
    key: 'camp_engineering2',
    label: 'Engineering 2',
    dates: 'August 24-28, 2025',
    time: '9:00 AM - 12:00 PM',
    price: 250,
    buyButtonId: import.meta.env.VITE_STRIPE_CAMP_ENGINEERING2_BUY_BUTTON_ID || '',
  },
];

export const STRIPE_ADDON_PRODUCTS: StripeProduct[] = [
  {
    key: 'addon_womens_leadership',
    label: "Women's Leadership Add-on",
    time: '8:00 AM - 9:00 AM',
    price: 100,
    buyButtonId: import.meta.env.VITE_STRIPE_ADDON_WL_BUY_BUTTON_ID || '',
  },
];
