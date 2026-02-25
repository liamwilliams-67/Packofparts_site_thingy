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

// Server-side mapping of camp keys to Stripe Price IDs from environment variables.
// This avoids trusting client-sent price IDs.
const CAMP_PRICE_MAP = {
  camp_cad: process.env.STRIPE_CAMP_CAD_PRICE_ID,
  camp_programming: process.env.STRIPE_CAMP_PROGRAMMING_PRICE_ID,
  camp_engineering1: process.env.STRIPE_CAMP_ENGINEERING1_PRICE_ID,
  camp_engineering2: process.env.STRIPE_CAMP_ENGINEERING2_PRICE_ID,
};

const ADDON_PRICE_MAP = {
  addon_womens_leadership: process.env.STRIPE_ADDON_WL_PRICE_ID,
};

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
    for (const campKey of selectedCamps) {
      const priceId = CAMP_PRICE_MAP[campKey];
      if (!priceId) {
        return res.status(400).json({ error: `Unknown camp key or missing price ID: ${campKey}` });
      }
      lineItems.push({ price: priceId, quantity: 1 });
    }

    // Add Women's Leadership add-on if selected
    if (addonWL) {
      const addonPriceId = ADDON_PRICE_MAP.addon_womens_leadership;
      if (!addonPriceId) {
        return res.status(400).json({ error: "Women's Leadership add-on price ID is not configured" });
      }
      lineItems.push({ price: addonPriceId, quantity: 1 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      customer_email: parentEmail || undefined,
      metadata: {
        registrantName: registrantName || '',
        registrantEmail: registrantEmail || '',
        childGrade: childGrade || '',
        parentName: parentName || '',
        parentPhone: parentPhone || '',
        hearAboutUs: hearAboutUs || '',
        selectedCamps: selectedCamps.join(', '),
        addonWL: addonWL ? 'Yes' : 'No',
      },
      custom_fields: [
        {
          key: 'studentname',
          label: { type: 'custom', custom: 'Student Name' },
          type: 'text',
          optional: true,
        },
        {
          key: 'grade',
          label: { type: 'custom', custom: 'Grade' },
          type: 'text',
          optional: true,
        },
        {
          key: 'parentname',
          label: { type: 'custom', custom: 'Parent/Guardian Name' },
          type: 'text',
          optional: true,
        },
      ],
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
