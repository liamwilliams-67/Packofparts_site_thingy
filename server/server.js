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

/**
 * POST /create-checkout-session
 *
 * Accepts:
 *   selectedCamps - array of { key, stripePriceId }
 *   addonWL       - boolean
 *   addonWLPriceId - string (Stripe Price ID for Women's Leadership add-on)
 *   parentEmail   - string
 *   registrantName - string
 *   childGrade    - string
 *
 * Returns: { url } – the Stripe Checkout Session URL
 */
app.post('/create-checkout-session', async (req, res) => {
  try {
    const {
      selectedCamps,
      addonWL,
      addonWLPriceId,
      parentEmail,
      registrantName,
      childGrade,
    } = req.body;

    if (!selectedCamps || selectedCamps.length === 0) {
      return res.status(400).json({ error: 'No camps selected' });
    }

    // Build line_items from selected camps
    const lineItems = selectedCamps.map((camp) => ({
      price: camp.stripePriceId,
      quantity: 1,
    }));

    // Add Women's Leadership add-on if selected
    if (addonWL && addonWLPriceId) {
      lineItems.push({
        price: addonWLPriceId,
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      customer_email: parentEmail || undefined,
      metadata: {
        registrantName: registrantName || '',
        childGrade: childGrade || '',
        selectedCamps: selectedCamps.map((c) => c.key).join(', '),
        addonWL: addonWL ? 'Yes' : 'No',
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
