import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();

// Trust the first proxy hop (nginx) so express-rate-limit uses the real
// client IP from X-Forwarded-For rather than nginx's loopback address.
app.set('trust proxy', 1);

// Security headers
app.use(helmet());

// Restrict CORS to the configured client origin
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin }));

// Global rate limiting for all API endpoints
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // 100 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

// Apply global rate limiting to all requests
app.use(globalLimiter);

app.use(express.json({ limit: '10kb' }));

/**
 * POST /csp-violation-report
 *
 * Endpoint for receiving CSP violation reports from browsers.
 * Logs violations for security monitoring.
 */
app.post('/csp-violation-report', express.json({ type: 'application/csp-report' }), (req, res) => {
  try {
    if (req.body && req.body['csp-report']) {
      console.warn('CSP Violation:', JSON.stringify(req.body['csp-report'], null, 2));
    }
    res.status(204).end(); // No content response
  } catch (err) {
    console.error('Error processing CSP report:', err);
    res.status(500).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
