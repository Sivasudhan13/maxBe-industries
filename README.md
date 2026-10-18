# MAXBE PUMPS — Website

A complete full-stack website for **MAXBE PUMPS** built with React + Vite (frontend) and Node.js + Express + MongoDB (backend).

---

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

---

## 1. Backend Setup

```bash
cd backend

# Copy environment file and fill in your values
cp .env.example .env
# Edit .env: set MONGO_URI, JWT_SECRET, ADMIN_PASSWORD

# Install dependencies
npm install

# Create the admin user (run once)
npm run seed

# Start development server
npm run dev
```

Backend runs on **http://localhost:5000**

---

## 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on **http://localhost:5173**

The Vite dev server proxies `/api` calls to `http://localhost:5000`.

---

## 3. Product Images

Place product photos inside:

```
frontend/public/images/products/
```

File naming matches the slugs in `frontend/src/data/products.js`:

| Model      | Expected filenames                              |
|------------|------------------------------------------------|
| MB-0.5HP   | mb-0-5hp-1.jpg, mb-0-5hp-2.jpg                 |
| MB-1HP     | mb-1hp-1.jpg, mb-1hp-2.jpg                     |
| MB-2HP     | mb-2hp-1.jpg, mb-2hp-2.jpg                     |
| OW-0.5HP   | ow-0-5hp-1.jpg, ow-0-5hp-2.jpg                 |
| OW-1HP     | ow-1hp-1.jpg, ow-1hp-2.jpg                     |
| OW-2HP     | ow-2hp-1.jpg, ow-2hp-2.jpg                     |
| V4-1HP     | v4-1hp-1.jpg, v4-1hp-2.jpg                     |
| V4-2HP     | v4-2hp-1.jpg, v4-2hp-2.jpg                     |
| V4-3HP     | v4-3hp-1.jpg, v4-3hp-2.jpg                     |

Also add:
- `frontend/public/images/hero-pump.jpg` — hero section image
- `frontend/public/images/about-team.jpg` — about page
- `frontend/public/images/app-agriculture.jpg` — applications section
- `frontend/public/images/app-residential.jpg`
- `frontend/public/images/app-industrial.jpg`
- `frontend/public/images/facility-1.jpg` through `facility-3.jpg`
- `frontend/public/images/og-image.jpg` — Open Graph / social share

---

## 4. Configure Company Details

Edit `frontend/src/data/siteConfig.js`:

```js
phone:          '+91-XXXXXXXXXX',
email:          'info@maxbepumps.com',
address:        '...',
whatsappNumber: '91XXXXXXXXXX',   // digits only with country code
instagram:      'https://instagram.com/...',
facebook:       'https://facebook.com/...',
googleMapsEmbed: 'https://www.google.com/maps/embed?...',
siteUrl:        'https://www.maxbepumps.com',
```

---

## 5. Admin Dashboard

Visit: **http://localhost:5173/admin**

Login with the credentials you set in `.env` (`ADMIN_USERNAME` / `ADMIN_PASSWORD`) before running `npm run seed`.

Features:
- Dashboard with enquiry stats
- Add / edit / delete products
- View and update enquiry statuses
- Change admin password

---

## 6. Production Build

```bash
# Frontend
cd frontend && npm run build
# Output: frontend/dist/

# Backend — set NODE_ENV=production in your server .env
cd backend && npm start
```

Serve `frontend/dist/` with nginx or any static host. Point all routes to `index.html`.

---

## Project Structure

```
mix-pupms/
├── frontend/
│   ├── public/
│   │   ├── images/          ← product + site images (local assets)
│   │   ├── favicon.svg
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   └── src/
│       ├── components/
│       │   ├── layout/      ← Navbar, Footer, Layout
│       │   └── ui/          ← ProductCard, SectionHeading, WhatsAppButton
│       ├── context/         ← AuthContext
│       ├── data/            ← products.js, siteConfig.js
│       ├── pages/
│       │   ├── admin/       ← AdminLogin, AdminLayout, Dashboard, Products, Enquiries, Settings
│       │   ├── HomePage.jsx
│       │   ├── ProductsPage.jsx
│       │   ├── ProductDetailPage.jsx
│       │   ├── AboutPage.jsx
│       │   ├── ContactPage.jsx
│       │   └── NotFoundPage.jsx
│       └── App.jsx
└── backend/
    └── src/
        ├── config/          ← db.js, seed.js
        ├── controllers/     ← adminController.js, enquiryController.js
        ├── middleware/       ← auth.js, errorHandler.js
        ├── models/          ← Admin.js, Product.js, Enquiry.js
        ├── routes/          ← adminRoutes.js, enquiryRoutes.js
        └── server.js
```

---

## Notes

- **No third-party image storage** — all product images are local assets in `public/images/`.
- **No fabricated specs** — placeholder specs are labelled as representative. Replace with verified data before publishing.
- **Admin credentials** — never commit `.env` with real secrets. `.env.example` is safe to commit.
- **SEO** — update `sitemap.xml` with your real domain, and fill `siteConfig.js` with the correct `siteUrl`.
