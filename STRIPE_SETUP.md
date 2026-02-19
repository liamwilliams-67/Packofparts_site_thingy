# Stripe payment setup (Summer Camps checkout)

To make the Summer Camps Stripe payment flow work end-to-end, do the following.

## 1. Stripe Dashboard

1. **Sign up / log in** at [dashboard.stripe.com](https://dashboard.stripe.com).
2. **Create Products and Prices** (or use existing ones):
   - **Products**: One product per camp and one for the add-on, e.g.  
     - CAD & Design, Programming, Engineering 1, Engineering 2, Women's Leadership
   - **Prices**: For each product, create a one-time **Price** (e.g. $250 or $100). Copy each **Price ID** (starts with `price_...`).
3. **API keys**: In [Developers → API keys](https://dashboard.stripe.com/test/apikeys):
   - Copy **Publishable key** (starts with `pk_test_` or `pk_live_`).
   - Copy **Secret key** (starts with `sk_test_` or `sk_live_`). Never put this in frontend code.

Use **Test mode** (test keys and test cards like `4242 4242 4242 4242`) until you’re ready for live payments.

## 2. Environment variables

### Frontend (Vite) – `.env` in project root

Used by the React app (and by the server if you share the same `.env`).

```env
# Stripe (required for checkout)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
VITE_CHECKOUT_API_URL=http://localhost:4242

# Price IDs (must match products in Stripe)
VITE_PRICE_CAD=price_xxxxx
VITE_PRICE_PROGRAMMING=price_xxxxx
VITE_PRICE_ENG1=price_xxxxx
VITE_PRICE_ENG2=price_xxxxx
VITE_PRICE_WL=price_xxxxx
```

- **Production**: Set `VITE_CHECKOUT_API_URL` to your deployed backend URL (e.g. `https://api.yoursite.com`).

### Backend (Checkout server)

The server reads from the same `.env` in the project root (via `dotenv`). It needs:

```env
STRIPE_SECRET_KEY=sk_test_xxxxx
```

The server gets line items (price IDs) from the frontend request; it does not need the price ID env vars unless you change the server to build line items itself.

## 3. Install and run

```bash
npm install
```

**Terminal 1 – backend (Checkout Session API):**

```bash
npm run server
```

Runs the server at `http://localhost:4242` (or `PORT` from env).

**Terminal 2 – frontend:**

```bash
npm run dev
```

Open the Summer Camps page, fill the form, select camps, and click the checkout button. You should be redirected to Stripe Checkout and back to your site on success/cancel.

## 4. Success and cancel URLs

- After payment, Stripe redirects to your `success_url` (e.g. same page with `?checkout=success`). You can show a “Thank you” message when that query param is present.
- If the user cancels, Stripe redirects to `cancel_url` (e.g. `?checkout=canceled`).

## 5. Production checklist

- Use **live** Stripe keys and live Price IDs in production env.
- Deploy the **server** (`server/index.js`) to a host that runs Node (e.g. Railway, Render, Fly.io, or a VPS). Do not expose `STRIPE_SECRET_KEY` to the browser.
- Set **VITE_CHECKOUT_API_URL** in your production build env to the deployed backend URL.
- (Optional) Add a **webhook** in Stripe (e.g. `checkout.session.completed`) to your backend to record registrations or send confirmation emails. Use `STRIPE_WEBHOOK_SECRET` to verify webhook signatures.

## 6. Optional: webhooks

To confirm payments and fulfill orders (e.g. save registration, send email):

1. In Stripe Dashboard → [Webhooks](https://dashboard.stripe.com/webhooks), add an endpoint pointing to your backend (e.g. `https://api.yoursite.com/webhook`).
2. Subscribe to `checkout.session.completed`.
3. In the server, add a POST route that uses `stripe.webhooks.constructEvent` with `STRIPE_WEBHOOK_SECRET` and then handles the event.

This ensures you only fulfill after Stripe confirms the payment.
