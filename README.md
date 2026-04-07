# Pack of Parts — Website

The official website for **Pack of Parts**, a student robotics organization. Built with React, TypeScript, and Vite.

## Pages

- **Home** — Introduction and overview
- **Community** — Community programs and involvement
- **Summer Camps** — Summer camp registration and info
- **STEM Kits** — STEM kit orders
- **Recycling** — Electronics recycling program
- **Donate** — Support the organization
- **Join** — Join the team
- **Members** — Member portal
- **Meet the Team** — Team bios
- **Contact** — Contact form and location

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Radix UI, Framer Motion
- **Backend:** Node.js / Express (serves API routes and contact form)
- **Proxy:** nginx (reverse proxy, rate limiting, Cloudflare real-IP support)

## Getting Started

### Prerequisites

- Node.js (v18+) and npm

### Development

```bash
git clone https://github.com/liamwilliams-67/Packofparts_site_thingy.git
cd Packofparts_site_thingy
npm install
npm run dev
```

The dev server will print a local URL (e.g. `http://localhost:5173`).

### Production Build

```bash
npm run build
```

Output is placed in `dist/`. Serve it with the included nginx config and Express backend:

```bash
# Start the API server
node server/index.js

# Reload nginx after updating nginx/site.conf
sudo nginx -s reload
```

### Environment Variables

Create a `.env` file in the project root (never commit it). Required keys are documented in `server/index.js`.

## Project Structure

```
├── src/            # React components and pages
├── server/         # Express API server
├── nginx/          # nginx configuration
├── public/         # Static assets
└── index.html      # HTML entry point
```

## License

All rights reserved © Pack of Parts.