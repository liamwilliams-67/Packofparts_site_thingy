# Security Policy

## Security Measures

This project implements the following protections:

- **Rate limiting** — nginx enforces per-IP rate limits on all routes (30 req/s general, 10 req/s API) with configurable burst limits. The Express backend adds a global application-level rate limit (100 req / 15 min).
- **Content Security Policy (CSP)** — A strict CSP is served on all pages with a `/csp-violation-report` endpoint for monitoring violations.
- **Input validation** — Contact form submissions are validated server-side including RFC 5322 email format checking. Request bodies are capped at 10 KB.
- **DDoS / bot protection** — nginx blocks known bad bots, enforces connection limits, and applies slowloris mitigations (timeouts, buffer limits, method restrictions to GET/HEAD/POST/OPTIONS).
- **Environment-aware error messages** — Detailed errors are only surfaced in development; production responses are generic to avoid leaking implementation details.
- **Secure file permissions** — The deployment pipeline enforces `chmod 600` for `.env` and appropriate `644`/`755` permissions for frontend assets.
- **Zero-downtime deploys** — The backend is managed with PM2 using `pm2 reload` to avoid dropping connections during updates.
