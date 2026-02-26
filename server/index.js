import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY is not set. Please configure it in server/.env');
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// Server-side mapping of camp keys to Stripe Price IDs and prices from environment variables.
// This avoids trusting client-sent price IDs.
const CAMP_PRICE_MAP = {
  camp_cad: { priceId: process.env.STRIPE_CAMP_CAD_PRICE_ID, amount: 250 },
  camp_programming: { priceId: process.env.STRIPE_CAMP_PROGRAMMING_PRICE_ID, amount: 250 },
  camp_engineering1: { priceId: process.env.STRIPE_CAMP_ENGINEERING1_PRICE_ID, amount: 250 },
  camp_engineering2: { priceId: process.env.STRIPE_CAMP_ENGINEERING2_PRICE_ID, amount: 250 },
};

const ADDON_PRICE_MAP = {
  addon_womens_leadership: { priceId: process.env.STRIPE_ADDON_WL_PRICE_ID, amount: 100 },
};

// Processing fee configuration (Stripe's standard rate)
const PROCESSING_FEE_RATE = 0.029; // 2.9%
const PROCESSING_FEE_FIXED = 0.30;  // 30 cents

/**
 * POST /create-checkout-session
 *
 * Accepts:
 *   selectedCamps  - array of camp key strings (e.g. ['camp_cad', 'camp_programming'])
 *   addonWL        - boolean
 *   registrantName - string
 *   registrantEmail - string
 *   childGrade     - string
 *   parentName     - string
 *   parentEmail    - string
 *   parentPhone    - string
 *   hearAboutUs    - string
 *
 * Returns: { url } – the Stripe Checkout Session URL
 */
app.post('/create-checkout-session', async (req, res) => {
  try {
    const {
      selectedCamps,
      addonWL,
      registrantName,
      registrantEmail,
      childGrade,
      parentName,
      parentEmail,
      parentPhone,
      hearAboutUs,
    } = req.body;

    if (!selectedCamps || selectedCamps.length === 0) {
      return res.status(400).json({ error: 'No camps selected' });
    }

    // Build line_items by mapping camp keys to server-side Price IDs
    const lineItems = [];
    let subtotal = 0;
    for (const campKey of selectedCamps) {
      const camp = CAMP_PRICE_MAP[campKey];
      if (!camp || !camp.priceId) {
        return res.status(400).json({ error: `Unknown camp key or missing price ID: ${campKey}` });
      }
      lineItems.push({ price: camp.priceId, quantity: 1 });
      subtotal += camp.amount;
    }

    // Add Women's Leadership add-on if selected
    if (addonWL) {
      const addon = ADDON_PRICE_MAP.addon_womens_leadership;
      if (!addon || !addon.priceId) {
        return res.status(400).json({ error: "Women's Leadership add-on price ID is not configured" });
      }
      lineItems.push({ price: addon.priceId, quantity: 1 });
      subtotal += addon.amount;
    }

    // Calculate processing fee using the inverse formula so that after Stripe
    // deducts its 2.9% + $0.30 from the total, the net equals the subtotal.
    // total = (subtotal + fixed) / (1 - rate);  fee = total - subtotal
    if (subtotal > 0) {
      const totalNeeded = (subtotal + PROCESSING_FEE_FIXED) / (1 - PROCESSING_FEE_RATE);
      const processingFee = Math.round((totalNeeded - subtotal) * 100); // in cents
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Processing Fee',
          },
          unit_amount: processingFee,
        },
        quantity: 1,
      });
    }

    // Create a helper object for the metadata so you don't have to type it twice
const registrationMetadata = {
  registrantName: registrantName || '',
  registrantEmail: registrantEmail || '',
  childGrade: childGrade || '',
  parentName: parentName || '',
  parentPhone: parentPhone || '',
  hearAboutUs: hearAboutUs || '',
  selectedCamps: selectedCamps.join(', '),
  addonWL: addonWL ? 'Yes' : 'No',
};

const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  line_items: lineItems,
  customer_email: parentEmail || undefined,
  
  // This attaches info to the 'Checkout' object
  metadata: registrationMetadata, 

  // THIS is what makes it show up in the 'Payments' tab in your Dashboard
  payment_intent_data: {
    metadata: registrationMetadata,
  },
  
  success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/summer-camps?success=true`,
  cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/summer-camps?canceled=true`,
});

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout session error:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
