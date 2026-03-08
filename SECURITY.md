# Security & Production Readiness

## Production Checklist

### Stripe: Transition from Test Keys to Live Keys

1. In the Stripe Dashboard, switch to **Live mode** and copy the new keys.
2. Update the following **GitHub Repository Secrets** (Settings → Secrets and variables → Actions):
   - `VITE_STRIPE_PUBLISHABLE_KEY` → your **live** publishable key (`pk_live_…`)
   - `STRIPE_SECRET_KEY` → your **live** secret key (`sk_live_…`)
   - `VITE_STRIPE_BUY_BUTTON_ID` → the live Buy Button ID
   - `VITE_STRIPE_PAYMENT_LINK` → the live Payment Link URL
   - All `VITE_STRIPE_CAMP_*_PRICE_ID` and `STRIPE_CAMP_*_PRICE_ID` → live Price IDs
   - `VITE_STRIPE_ADDON_WL_PRICE_ID` / `STRIPE_ADDON_WL_PRICE_ID` → live Price IDs
3. Re-run the **Deploy to Ubuntu Server** workflow to rebuild with live keys.
4. Verify a real test payment succeeds in Stripe's live dashboard.

### Mapbox: Token Restrictions

1. In the Mapbox account dashboard, go to **Tokens**.
2. For the production token (`VITE_MAPBOX_TOKEN`), add a **URL restriction**:
   - Allowed URLs: `https://1294-test-page.robot-armies.com/*`
3. Create a **separate token** for local development (unrestricted) — never share it.
4. Consider setting **rate limits** on the production token via Mapbox's usage controls.

### Nginx Configuration

A production-ready Nginx config is included in `nginx/site.conf`. It includes:
- HTTP → HTTPS redirect
- HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy headers
- `server_tokens off` to suppress version information
- Proxy pass to the Node.js backend
- Dotfile blocking (`.env`, `.git`, etc.)

To deploy:
```bash
sudo cp nginx/site.conf /etc/nginx/sites-available/packofparts
sudo ln -sf /etc/nginx/sites-available/packofparts /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### Backend Security

The Express server (`server/index.js`) includes:
- **helmet** — sets security headers (X-Content-Type-Options, X-DNS-Prefetch-Control, etc.)
- **CORS restriction** — only allows requests from the configured `CLIENT_URL`
- **Rate limiting** — 30 requests per 15 minutes per IP on the checkout endpoint
- **Input validation** — type checks, length limits, and email format validation
- **Safe error responses** — internal errors are not leaked to clients

### Environment Variables

All secrets are managed via **GitHub Repository Secrets** and injected at build/deploy time.
Never commit `.env` files — they are git-ignored.

See `.env.example` (frontend) and `server/.env.example` (backend) for the full list of required variables.

## Automated Security Scanning

The repository includes a **Security Scan** workflow (`.github/workflows/security-scan.yml`) that runs:

- **Gitleaks** — scans for accidentally committed secrets on every push and PR
- **npm audit** — checks frontend and backend dependencies for known vulnerabilities
- **Daily schedule** — runs at 06:00 UTC to catch newly disclosed vulnerabilities

## Manual Security Testing

### DAST Scan (Dynamic Application Security Testing)

```bash
# Using OWASP ZAP (Docker)
docker run -t zaproxy/zap-stable zap-baseline.py \
  -t https://1294-test-page.robot-armies.com

# Using Nikto
nikto -h https://1294-test-page.robot-armies.com
```

### Local Secret Scanning

```bash
# Install Gitleaks
brew install gitleaks   # macOS
# or: sudo apt install gitleaks

# Scan the repo
gitleaks detect --source . --verbose
```

### Dependency Auditing

```bash
# Frontend
npm audit

# Backend
cd server && npm audit
```
