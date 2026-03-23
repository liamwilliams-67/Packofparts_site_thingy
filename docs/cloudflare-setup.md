# Cloudflare CDN Setup Guide

This guide walks through configuring Cloudflare's **free** tier for the Pack of Parts
site. Cloudflare acts as a reverse proxy in front of the server, providing:

- **CDN** — static assets (JS/CSS/images) served from Cloudflare's global edge,
  reducing origin load.
- **DDoS mitigation** — automatic volumetric attack absorption at the edge.
- **Bot protection** — Bot Fight Mode challenges known bad bots before they reach
  the server.

All features used here are available on the **free plan** and display no
advertisements to visitors.

---

## How the traffic layers interact

```
Visitor → Cloudflare edge (DDoS, Bot Fight Mode, CDN cache)
        → nginx (real-IP restoration, rate limiting, UA blocking, method filter)
        → Express (helmet, CORS, rate limiting, input validation)
```

Each layer is independent and complementary — turning Cloudflare on or off does
not break the server-side defences. The nginx `real_ip_module` block (already
configured in `nginx/site.conf`) ensures that `$remote_addr` is always the real
visitor IP, so rate limits and UA filtering continue to work correctly whether
traffic comes through Cloudflare or directly.

---

## Prerequisites

- A Cloudflare account (<https://dash.cloudflare.com/sign-up>) — free, no credit card.
- Access to the domain registrar for `robot-armies.com` to change nameservers.
- The origin server's public IP address.

---

## Step 1 — Add the site to Cloudflare

1. Log into the Cloudflare dashboard and click **Add a Site**.
2. Enter `robot-armies.com` and select the **Free** plan.
3. Cloudflare will scan existing DNS records. Review the import:
   - Confirm the `A` record for `1294-test-page` points to the correct server IP.
   - Make sure the **Proxy status** (orange cloud) is **Proxied** for that record.
     This enables Cloudflare's CDN and security features.
4. Copy the two Cloudflare nameservers shown and replace your registrar's
   nameservers with them. Propagation takes up to 24 hours.

---

## Step 2 — SSL/TLS mode

1. In the Cloudflare dashboard go to **SSL/TLS → Overview**.
2. Set the encryption mode to **Full (strict)**.

   > ⚠️ Do **not** use *Flexible* — it would cause an HTTP→HTTPS redirect loop
   > with the existing nginx config.  *Full (strict)* tells Cloudflare to connect
   > to the origin on HTTPS and validate the Certbot certificate.

---

## Step 3 — Enable Bot Fight Mode

1. Go to **Security → Bots**.
2. Toggle **Bot Fight Mode** to **On**.

   This challenges requests that Cloudflare classifies as automated traffic
   (scrapers, credential-stuffing bots, etc.) with a transparent JavaScript
   challenge before the request ever reaches the server.  It works alongside —
   and does not conflict with — the nginx UA-based blocking already in place.

---

## Step 4 — Cache rules for the SPA

Cloudflare will automatically cache static assets it recognises by file extension
(`.js`, `.css`, `.png`, etc.).  For the SPA HTML entry points we want
short-lived caching so deployments propagate quickly.

1. Go to **Caching → Cache Rules** and click **Create rule**.
2. **Rule name**: `HTML — short cache`
3. **If** incoming request matches:
   - *Field*: `URI Path`  *Operator*: `ends with`  *Value*: `.html`
   - Add another *OR* condition: URI Path *equals* `/` (root index)
4. **Then**:
   - Edge Cache TTL: **2 hours**
   - Browser Cache TTL: **no change** (let the existing nginx response headers control this)
5. Save and deploy.

All other assets (`/assets/*.js`, `/assets/*.css`) use Cloudflare's default
behaviour, which caches based on `Cache-Control` headers from nginx.

---

## Step 5 — Security level

1. Go to **Security → Settings**.
2. Set **Security Level** to **Medium** (default).
   - *High* may challenge legitimate users; *Essentially Off* removes protection.
   - Medium challenges IPs with a known bad reputation while letting normal
     visitors through without a CAPTCHA.

---

## Step 6 — Verify real-IP restoration

After Cloudflare is active, confirm that nginx is logging real visitor IPs
(not Cloudflare data-center IPs):

```bash
sudo tail -f /var/log/nginx/access.log
```

Each line should show a public IP that matches the visitor's location, not one
of Cloudflare's published ranges (<https://www.cloudflare.com/ips/>).

If you still see Cloudflare IPs, confirm that `ngx_http_realip_module` is
compiled into your nginx build:

```bash
nginx -V 2>&1 | grep real_ip
```

The output should include `--with-http_realip_module`.

---

## Cloudflare IP range updates

Cloudflare occasionally adds new IP ranges. When they do, the `set_real_ip_from`
directives in `nginx/site.conf` need to be updated to match. You can subscribe to
Cloudflare's IP-change notifications at
<https://www.cloudflare.com/ips/> or monitor their
[status page](https://www.cloudflarestatus.com/).
