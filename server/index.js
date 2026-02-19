/**
 * Minimal backend to create Stripe Checkout Sessions.
 * Run: node server/index.js
 * Requires: STRIPE_SECRET_KEY and price IDs in env (or .env in project root).
 */
import 'dotenv/config';
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { lineItems, successUrl, cancelUrl, customerEmail, metadata } = req.body;
    if (!lineItems?.length || !successUrl || !cancelUrl) {
      return res.status(400).json({ error: 'Missing lineItems, successUrl, or cancelUrl' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems.map(({ price, quantity }) => ({ price, quantity: quantity || 1 })),
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail || undefined,
      metadata: metadata && typeof metadata === 'object' ? metadata : undefined
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Checkout session error:', err);
    res.status(500).json({ error: err.message || 'Failed to create checkout session' });
  }
});

// Health check
app.get('/health', (_, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('Warning: STRIPE_SECRET_KEY not set. Set it in .env to enable checkout.');
  }
  console.log(`Checkout server running at http://localhost:${PORT}`);
});
