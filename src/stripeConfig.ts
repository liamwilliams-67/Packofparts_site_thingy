// Stripe configuration helper.
// Set these environment variables in your Vite env (.env) file
// VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
// VITE_PRICE_CAD=price_...
// VITE_PRICE_PROGRAMMING=price_...
// VITE_PRICE_ENG1=price_...
// VITE_PRICE_ENG2=price_...
// VITE_PRICE_WL=price_...
// VITE_CHECKOUT_API_URL=http://localhost:4242  (backend that creates Checkout Sessions)

export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
export const CHECKOUT_API_URL = import.meta.env.VITE_CHECKOUT_API_URL || '';

export const STRIPE_PRICE_IDS: Record<string, string> = {
  'CAD & Design': import.meta.env.VITE_PRICE_CAD || '',
  'Programming': import.meta.env.VITE_PRICE_PROGRAMMING || '',
  'Engineering 1': import.meta.env.VITE_PRICE_ENG1 || '',
  'Engineering 2': import.meta.env.VITE_PRICE_ENG2 || '',
  'Womens Leadership': import.meta.env.VITE_PRICE_WL || ''
};

export default {
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_PRICE_IDS,
};
