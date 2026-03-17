# Security Analysis Report - Pack of Parts Website

**Analysis Date:** March 17, 2026
**Repository:** liamwilliams-67/Packofparts_site_thingy
**Analyzed by:** Claude Code Security Analysis

---

## Executive Summary

This report provides a comprehensive security analysis of the Pack of Parts website. The analysis covers frontend, backend, infrastructure, and deployment configurations. Overall, the website demonstrates **good security practices** with several strong protective measures already in place. However, there are **several areas for improvement** that could enhance the security posture.

### Overall Security Grade: B+ (Good)

**Strengths:**
- Strong security headers in nginx configuration
- Rate limiting on payment endpoints
- Automated security scanning with Gitleaks and npm audit
- Proper CORS configuration
- Server-side validation of payment data
- No hardcoded secrets in the repository

**Areas for Improvement:**
- Missing HTTPS enforcement on Stripe webhooks
- CSP allows 'unsafe-inline' for styles (required by Mapbox)
- No webhook signature verification implemented
- Missing request size limits on some endpoints
- Email validation could be stricter
- No Subresource Integrity (SRI) on external scripts

---

## Detailed Security Analysis

### 1. Infrastructure Security (nginx)

#### ✅ Strengths

**Security Headers** (`nginx/site.conf:31-45`)
- **HSTS (HTTP Strict Transport Security):** Configured with 2-year max-age, includeSubDomains, and preload
- **X-Frame-Options:** Set to SAMEORIGIN to prevent clickjacking
- **X-Content-Type-Options:** Set to nosniff to prevent MIME-type sniffing
- **Referrer-Policy:** Set to strict-origin-when-cross-origin
- **Permissions-Policy:** Disables camera, microphone, and geolocation
- **server_tokens off:** Hides nginx version information

**SSL/TLS Configuration**
- Uses Let's Encrypt with Certbot for SSL certificates
- Includes best-practice SSL options via Certbot

**HTTP to HTTPS Redirect**
- All HTTP traffic redirected to HTTPS (port 80 → 443)

**Dotfile Protection** (`nginx/site.conf:47-51`)
- Blocks access to .env, .git, and other dotfiles
- Allows .well-known for Certbot certificate renewal

#### ⚠️ Issues & Recommendations

**CSP allows 'unsafe-inline' for styles** (`nginx/site.conf:43`)
```nginx
style-src 'self' 'unsafe-inline' https://api.mapbox.com https://fonts.googleapis.com;
```
- **Risk:** Medium - Allows inline styles which could be exploited in XSS attacks
- **Reason:** Required by Mapbox GL JS for dynamic map rendering
- **Recommendation:**
  - Consider migrating from Mapbox to MapLibre GL (already imported in contact.tsx:12)
  - MapLibre is open-source and more CSP-friendly
  - If Mapbox is required, document the CSP exception clearly
  - Monitor for CSP violations using report-uri directive

**Missing CSP report-uri**
- **Risk:** Low - No visibility into CSP violations
- **Recommendation:** Add `report-uri` or `report-to` directive to log CSP violations

**Proxy Headers Could Be Enhanced** (`nginx/site.conf:54-71`)
- **Current:** Basic proxy headers set
- **Recommendation:** Add timeout configurations:
```nginx
proxy_connect_timeout 60s;
proxy_send_timeout 60s;
proxy_read_timeout 60s;
```

---

### 2. Backend Security (Express Server)

#### ✅ Strengths

**Security Middleware** (`server/index.js:18-22`)
- **helmet:** Adds security headers automatically
- **CORS:** Restricted to CLIENT_URL only
- **Rate Limiting:** 30 requests per 15 minutes per IP on checkout endpoint

**Input Validation** (`server/index.js:83-110`)
- Type checking for all input fields
- Field-specific length limits (registrantName: 200, email: 254, etc.)
- Email format validation using regex
- Array length validation for selected camps

**Server-Side Price Mapping** (`server/index.js:36-46`)
- Prices stored server-side (not trusted from client)
- Price IDs mapped from environment variables
- Prevents price manipulation attacks

**Safe Error Handling** (`server/index.js:182-185`)
- Generic error messages to clients
- Detailed errors logged server-side only
- Prevents information leakage

**Environment Variable Validation** (`server/index.js:8-11`)
- Checks for STRIPE_SECRET_KEY on startup
- Exits if critical config is missing

#### ⚠️ Issues & Recommendations

**1. Missing Webhook Signature Verification**
- **Risk:** HIGH - If webhooks are used in the future
- **Current State:** No webhook endpoint implemented
- **Recommendation:** When implementing webhooks, MUST verify Stripe signatures:
```javascript
const sig = request.headers['stripe-signature'];
const event = stripe.webhooks.constructEvent(request.body, sig, webhookSecret);
```

**2. Request Body Size Limit Too Small** (`server/index.js:33`)
```javascript
app.use(express.json({ limit: '1kb' }));
```
- **Risk:** Low - May reject legitimate requests
- **Current:** 1KB limit
- **Issue:** Registration forms with longer "hearAboutUs" text may be rejected
- **Recommendation:** Increase to 10kb with proper validation:
```javascript
app.use(express.json({ limit: '10kb' }));
```

**3. Email Validation Could Be Stricter** (`server/index.js:104`)
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```
- **Risk:** Low - Allows some invalid email formats
- **Recommendation:** Use a more robust email validation library like `validator.js`:
```javascript
import validator from 'validator';
if (!validator.isEmail(parentEmail)) { ... }
```

**4. No HTTPS Enforcement Check**
- **Risk:** Medium - If proxy headers are spoofed
- **Recommendation:** Add middleware to verify HTTPS:
```javascript
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'HTTPS required' });
  }
  next();
});
```

**5. No Request ID for Tracing**
- **Risk:** Low - Harder to trace malicious requests
- **Recommendation:** Add request ID middleware for logging and debugging

**6. Processing Fee Calculation Could Overflow**
- **Risk:** Very Low - Large numbers could cause precision issues
- **Current:** Uses floating-point arithmetic (`server/index.js:138-139`)
- **Recommendation:** Use integer arithmetic (cents) throughout

**7. No Rate Limiting on General API Endpoints**
- **Risk:** Medium - Only `/create-checkout-session` is rate-limited
- **Recommendation:** Add global rate limiting:
```javascript
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', globalLimiter);
```

---

### 3. Frontend Security (React/Vite)

#### ✅ Strengths

**No XSS Vulnerabilities**
- No use of `dangerouslySetInnerHTML` found in codebase
- No use of `eval()` or `new Function()` found
- React's automatic escaping prevents XSS

**Proper Secret Management**
- All API keys loaded from environment variables
- `.env` files properly gitignored
- Only example files committed to repository

**Client-Side Validation** (`src/SummerCamps.tsx:148-160`)
- Form validation before submission
- Required field checks
- Clear error messages to users

**Secure API Communication** (`src/SummerCamps.tsx:168-182`)
- Uses HTTPS in production (enforced by nginx)
- Proper error handling
- No sensitive data in URLs (uses POST body)

**No Local Storage of Sensitive Data**
- No use of localStorage or sessionStorage found for sensitive data
- Session managed by Stripe Checkout

#### ⚠️ Issues & Recommendations

**1. Missing Subresource Integrity (SRI)**
- **Risk:** Medium - External scripts could be compromised
- **Current:** Stripe script loaded without SRI (`index.html:8`)
```html
<script async src="https://js.stripe.com/v3/buy-button.js"></script>
```
- **Issue:** Stripe doesn't provide SRI hashes (CDN content changes)
- **Recommendation:**
  - Document this as an accepted risk
  - Use CSP to restrict script sources
  - Monitor Stripe's security advisories

**2. Mapbox Token Exposed in Client** (`src/contact.tsx:19`)
```javascript
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
```
- **Risk:** Low - Public tokens are meant to be public
- **Current State:** Token should have URL restrictions (documented in SECURITY.md:20-24)
- **Recommendation:**
  - Verify URL restrictions are configured in Mapbox dashboard
  - Add rate limits to prevent abuse
  - Rotate token if abuse detected

**3. No CSRF Protection**
- **Risk:** Low - Using Stripe Checkout which handles this
- **Current:** Stateless API, no session cookies
- **Recommendation:** If adding stateful features, implement CSRF tokens

**4. Form Validation Only Client-Side Initially**
- **Risk:** Low - Server validates everything
- **Current:** Client validates, server re-validates
- **Recommendation:** Current approach is correct (defense in depth)

**5. Error Messages May Leak Information** (`src/SummerCamps.tsx:206-215`)
```javascript
if (isNetworkError) {
  alert('Could not connect to the checkout server.\n\n' +
        'Make sure the backend is running:\n' +
        '  cd server && npm install && npm start\n\n' +
        'See server/.env.example for required environment variables.');
}
```
- **Risk:** Low - Development guidance in production
- **Recommendation:** Make error messages environment-aware:
```javascript
if (process.env.NODE_ENV === 'development') {
  // Detailed error
} else {
  // Generic error
}
```

**6. No Content Security Policy Meta Tag Fallback**
- **Risk:** Low - Nginx CSP should always apply
- **Recommendation:** Add CSP meta tag as fallback in HTML files

---

### 4. Dependency Security

#### ✅ Strengths

**Automated Scanning** (`.github/workflows/security-scan.yml`)
- Gitleaks scans for secrets on every push and PR
- npm audit runs on frontend and backend daily
- Audit level set to 'critical'

**No Known Vulnerabilities**
- Frontend: 0 vulnerabilities found (confirmed)
- Backend: 0 vulnerabilities found (confirmed)

**Dependency Pinning**
- package-lock.json committed for reproducible builds
- Specific version ranges in package.json

**Security Override** (`package.json:85-87`)
```json
"overrides": {
  "minimatch": "^10.2.1"
}
```
- Shows proactive security patching

#### ⚠️ Issues & Recommendations

**1. Audit Level Could Be Stricter** (`.github/workflows/security-scan.yml:43`)
```yaml
run: npm audit --audit-level=critical
```
- **Current:** Only fails on critical vulnerabilities
- **Recommendation:** Consider `--audit-level=high` for earlier detection

**2. No Dependabot or Renovate**
- **Risk:** Medium - Manual dependency updates required
- **Recommendation:** Enable GitHub Dependabot:
```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
  - package-ecosystem: "npm"
    directory: "/server"
    schedule:
      interval: "weekly"
```

**3. No License Scanning**
- **Risk:** Low - Legal risk, not security
- **Recommendation:** Add license compliance check if required by organization

---

### 5. Deployment & CI/CD Security

#### ✅ Strengths

**Secrets Management** (`.github/workflows/deploy.yml:28-38`)
- All secrets stored in GitHub Secrets
- Secrets injected at build time (not runtime for frontend)
- Backend secrets written to .env on server (not in repository)

**Secure Deployment**
- SSH key-based authentication
- Deployment to specific server IP only
- Production environment configured in GitHub

**Build Isolation**
- Frontend built in CI (reproducible)
- Backend dependencies installed on server with `--production` flag

**Automated nginx Deployment** (`.github/workflows/deploy.yml:91-93`)
- Config validated with `nginx -t` before reload
- Prevents broken configs from being deployed

#### ⚠️ Issues & Recommendations

**1. Backend .env Written in Plain Text** (`.github/workflows/deploy.yml:74-83`)
```yaml
cat > /home/ubuntu/backend/server/.env <<EOF
STRIPE_SECRET_KEY=${{ secrets.STRIPE_SECRET_KEY }}
```
- **Risk:** Medium - Secrets stored unencrypted on server
- **Current:** Standard practice for many deployments
- **Recommendations:**
  - File permissions should be 600 (only owner can read)
  - Consider using secrets management service (AWS Secrets Manager, HashiCorp Vault)
  - Add to deployment script:
```bash
chmod 600 /home/ubuntu/backend/server/.env
```

**2. No Deploy Key Rotation Policy**
- **Risk:** Low - Static SSH key in GitHub Secrets
- **Recommendation:** Document key rotation schedule (e.g., annually)

**3. No Deployment Rollback Strategy**
- **Risk:** Medium - Failed deployments may require manual intervention
- **Recommendation:**
  - Use blue-green deployment or implement rollback script
  - Keep previous version backup before deploying

**4. PM2 Restart May Drop Connections**
- **Risk:** Low - Brief downtime during deploys
- **Current:** `pm2 restart backend`
- **Recommendation:** Use `pm2 reload backend` for zero-downtime:
```bash
pm2 reload backend || pm2 start /home/ubuntu/backend/server/index.js --name backend
```

**5. No Build Artifact Verification**
- **Risk:** Low - No checksum verification after SCP
- **Recommendation:** Add checksum verification in deploy workflow

**6. Broad File Permissions in SCP** (`.github/workflows/deploy.yml:46-47`)
```yaml
source: "dist/*"
target: "/var/www/html/"
```
- **Risk:** Low - Default file permissions may be too permissive
- **Recommendation:** Add permission setting in post-deploy script:
```bash
find /var/www/html/dist -type f -exec chmod 644 {} \;
find /var/www/html/dist -type d -exec chmod 755 {} \;
```

---

### 6. Data Protection & Privacy

#### ✅ Strengths

**Minimal Data Collection**
- Only collects necessary registration information
- No tracking cookies or analytics identified
- Data sent directly to Stripe (PCI compliant)

**Photo Consent Required** (`src/SummerCamps.tsx:47,158`)
- Explicit media release checkbox required
- Prevents unauthorized use of participant photos

**Secure Data Transmission**
- All data sent over HTTPS
- TLS enforced by nginx

**No Data Storage**
- Backend doesn't store registration data
- All data passed to Stripe (PCI compliant processor)

#### ⚠️ Issues & Recommendations

**1. No Privacy Policy**
- **Risk:** Medium - Legal requirement in many jurisdictions
- **Recommendation:** Create privacy policy page covering:
  - What data is collected
  - How data is used
  - Who data is shared with (Stripe)
  - User rights (GDPR, CCPA compliance if applicable)
  - Cookie policy (if any cookies are used)

**2. No Data Retention Policy**
- **Risk:** Low - Stripe handles storage
- **Recommendation:** Document data retention in privacy policy

**3. No Option to Delete Data**
- **Risk:** Low - Data stored by Stripe
- **Recommendation:** Provide instructions for data deletion requests

**4. Metadata Sent to Stripe Contains PII** (`server/index.js:153-162`)
```javascript
metadata: {
  registrantName: registrantName || '',
  registrantEmail: registrantEmail || '',
  parentName: parentName || '',
  parentPhone: parentPhone || '',
  // ...
}
```
- **Risk:** Low - Stripe is PCI compliant
- **Current:** Necessary for camp administration
- **Recommendation:** Document in privacy policy

---

### 7. Authentication & Authorization

#### ✅ Current State

**No Authentication Required**
- Public website with payment processing
- Appropriate for current use case

**Stripe Handles Payment Authentication**
- 3D Secure support built into Stripe Checkout
- SCA (Strong Customer Authentication) compliant

#### ⚠️ Future Considerations

**If Adding Admin Panel or Member Portal:**

1. **Implement Proper Authentication**
   - Use proven libraries (Passport.js, NextAuth, Auth0)
   - Implement MFA for admin accounts
   - Use secure session management

2. **Role-Based Access Control (RBAC)**
   - Define roles: admin, mentor, member, parent
   - Restrict sensitive operations to admin only

3. **Account Security**
   - Enforce strong password policies
   - Implement account lockout after failed attempts
   - Add password reset functionality with secure tokens

---

### 8. Third-Party Integrations

#### ✅ Stripe Integration

**Strengths:**
- Uses official Stripe SDK
- Price IDs stored server-side
- Checkout Sessions created server-side
- No card data touches your servers (PCI compliant)

**Issues:**
- No webhook signature verification (if webhooks added later)
- Test mode keys should be replaced with live keys in production

#### ✅ Mapbox Integration

**Strengths:**
- Token loaded from environment variable
- Read-only token (not secret key)

**Issues:**
- Token exposed in client (expected, but should have URL restrictions)
- CSP requires 'unsafe-inline' for Mapbox styles

**Recommendation:**
- Migrate to MapLibre GL (already imported) to remove CSP unsafe-inline requirement

---

## High-Priority Recommendations

### Critical (Fix Immediately)

1. **Implement Webhook Signature Verification** (when webhooks are added)
   - Without this, anyone can send fake webhook events
   - Priority: HIGH (if webhooks are used)

2. **Add File Permission Settings in Deployment**
   - Backend .env should be chmod 600
   - Prevents other users from reading secrets

### High Priority (Fix Within 1 Month)

3. **Increase Request Body Size Limit**
   - Current 1KB may reject valid forms
   - Change to 10KB with validation

4. **Add Privacy Policy**
   - Legal requirement in many jurisdictions
   - Required for GDPR/CCPA compliance

5. **Add Global Rate Limiting**
   - Currently only checkout endpoint is rate-limited
   - Prevents DoS attacks

6. **Enable Dependabot**
   - Automates security updates
   - Reduces manual maintenance burden

### Medium Priority (Fix Within 3 Months)

7. **Enhance Email Validation**
   - Use validator.js for robust email checking

8. **Add CSP Report URI**
   - Provides visibility into CSP violations
   - Helps detect attacks

9. **Use pm2 reload Instead of restart**
   - Enables zero-downtime deployments

10. **Add Environment-Aware Error Messages**
    - Prevent information leakage in production

### Low Priority (Consider for Future)

11. **Migrate from Mapbox to MapLibre**
    - Removes need for CSP unsafe-inline
    - Open-source alternative

12. **Add Request ID Middleware**
    - Improves logging and debugging

13. **Implement Blue-Green Deployment**
    - Enables instant rollback

14. **Add License Scanning**
    - Ensures license compliance

---

## Security Testing Recommendations

### Automated Testing

1. **OWASP ZAP Baseline Scan**
```bash
docker run -t zaproxy/zap-stable zap-baseline.py \
  -t https://1294-test-page.robot-armies.com
```

2. **Nikto Web Server Scan**
```bash
nikto -h https://1294-test-page.robot-armies.com
```

3. **SSL Labs Test**
   - Visit: https://www.ssllabs.com/ssltest/
   - Test: 1294-test-page.robot-armies.com
   - Target: A+ rating

### Manual Testing

4. **Content Security Policy Testing**
   - Use browser DevTools to check for CSP violations
   - Test with https://csp-evaluator.withgoogle.com/

5. **Rate Limit Testing**
```bash
for i in {1..35}; do
  curl -X POST https://1294-test-page.robot-armies.com/create-checkout-session \
    -H "Content-Type: application/json" \
    -d '{"selectedCamps":["camp_cad"]}'
done
# Should see rate limit error after 30 requests
```

6. **Input Validation Testing**
   - Test with oversized inputs
   - Test with special characters
   - Test with SQL injection payloads (should be safe)
   - Test with XSS payloads (should be safe)

---

## Compliance Checklist

### Payment Card Industry (PCI) DSS

- ✅ **No card data touches your servers** - Stripe Checkout handles all card processing
- ✅ **HTTPS enforced** - All traffic encrypted in transit
- ✅ **Secure secrets management** - Stripe keys stored in GitHub Secrets
- ⚠️ **Webhook signature verification** - Not implemented (if webhooks added)

**PCI Compliance Level:** SAQ A (Stripe handles card processing)

### General Data Protection Regulation (GDPR)

- ⚠️ **Privacy policy** - Missing
- ⚠️ **Data deletion** - No process documented
- ✅ **Minimal data collection** - Only necessary data collected
- ✅ **Explicit consent** - Photo consent checkbox
- ⚠️ **Data processing agreement** - Should verify Stripe BAA

**Recommendation:** Add privacy policy and data deletion process if serving EU users

### California Consumer Privacy Act (CCPA)

- ⚠️ **Privacy policy** - Missing
- ⚠️ **Do Not Sell disclosure** - Not applicable (no data selling)
- ✅ **Minimal data collection** - Only necessary data

---

## Security Metrics & Monitoring

### Current Metrics

- **Dependency vulnerabilities:** 0 (frontend and backend)
- **Automated security scans:** Daily via GitHub Actions
- **Secret scanning:** On every push and PR
- **HTTPS grade:** Not yet tested (recommend SSL Labs test)

### Recommended Monitoring

1. **Add Application Monitoring**
   - Consider: Sentry, DataDog, New Relic
   - Track: Error rates, response times, failed requests

2. **Add Security Monitoring**
   - Log all rate limit violations
   - Alert on repeated failed requests
   - Monitor for unusual traffic patterns

3. **Add Uptime Monitoring**
   - Consider: UptimeRobot, Pingdom
   - Check every 5 minutes
   - Alert on downtime

---

## Conclusion

The Pack of Parts website demonstrates **strong security fundamentals** with proper use of HTTPS, security headers, rate limiting, and input validation. The separation of frontend and backend, combined with server-side price mapping, prevents common payment manipulation attacks.

**Key Strengths:**
- No hardcoded secrets
- Automated security scanning
- PCI compliant payment processing
- Strong nginx security configuration
- Proper CORS and rate limiting

**Key Improvements Needed:**
- Add privacy policy (legal requirement)
- Increase request body size limit (may reject valid forms)
- Add webhook signature verification (if webhooks used)
- Implement global rate limiting
- Add proper file permissions in deployment

**Overall Risk Level:** LOW to MEDIUM

The website is suitable for production use with the understanding that the medium-priority recommendations should be addressed soon. The critical and high-priority issues should be addressed before processing live payments or handling significant user traffic.

---

## Additional Resources

- **OWASP Top 10:** https://owasp.org/www-project-top-ten/
- **Stripe Security Best Practices:** https://stripe.com/docs/security/guide
- **Express Security Best Practices:** https://expressjs.com/en/advanced/best-practice-security.html
- **nginx Security:** https://nginx.org/en/docs/http/ngx_http_secure_link_module.html
- **PCI DSS Requirements:** https://www.pcisecuritystandards.org/

---

**Report End**
