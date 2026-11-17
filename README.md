# RÉGIS ELECTRONICS

An electronics sales and repair services web application built for customers in the **Dominican Republic** and **Haiti**, featuring dual-currency pricing (**DOP / RD$** and **USD / $**), multilingual support (**English**, **Spanish**, **Haitian Creole**), WhatsApp-based checkout and repair inquiries, and an owner-configurable admin dashboard.

---

## Business Overview

- **Business Name:** RÉGIS ELECTRONICS
- **Business Type:** Electronics Sales & Repair Services
- **Official WhatsApp:** `+1 829 653 4437` (`https://wa.me/18296534437`)
- **Markets Served:** Dominican Republic & Haiti
- **Brand Palette:** Deep Navy (`#101039`), Indigo (`#27248E`), Off White (`#F5F6FA`), Black (`#111111`)

---

## Key Features

### 1. Electronics Storefront & Catalog
- **Routes:** `/`, `/shop`, `/smartphones`, `/laptops`, `/accessories`, `/product/:slug`, `/wishlist`, `/about`, `/contact`
- **Features:** Search, brand filtering, price sorting, product variants, technical specifications, wishlist persistence, and slide-over shopping cart drawer.

### 2. Dual-Currency System (`DOP / RD$` & `USD / $`)
- Header selector allows switching between **Dominican Pesos (`DOP / RD$`)** and **US Dollars (`USD / $`)**.
- Selected currency is saved in `localStorage`.
- Base product prices are stored in USD and converted consistently across product cards, product detail pages, cart totals, checkout summaries, and WhatsApp order messages using the **administrator-configured exchange rate** (no invented live market feed).
- Single-currency totals are displayed without mixing `RD$` and `USD` in one total, alongside an explicit notice that final payment currency and exchange rate must be confirmed with the owner before payment.

### 3. Country-Specific WhatsApp Checkout (`/checkout`)
- **Country Selector:** Switches destination fields dynamically:
  - **Dominican Republic:** Full name, WhatsApp number, Province, Municipality / City, Street address, Delivery notes.
  - **Haiti:** Full name, WhatsApp number, Department, Commune / City, Delivery address, Delivery notes.
- **Delivery & Store Pickup:**
  - Delivery availability and fees display as **"To be confirmed"** unless specific zones and rates are configured in the Admin Dashboard.
  - **Store Pickup** appears only when at least one valid store location is configured for the selected country.
- **WhatsApp Order Generation:** Generates an order reference (`RE-YYYY-XXXX`), formats a localized itemized summary, and opens `https://wa.me/18296534437?text=...` using `encodeURIComponent()`. No online card/payment gateways are integrated, and orders are never marked paid or confirmed prematurely.

### 4. Dedicated Repair Services Page (`/repairs`)
- Displays **"Expert Electronics Repair Services"** and the transparent pricing policy (*"Repair costs depend on the device, problem, and parts required. Contact us for an estimate."*).
- Only displays repair service categories that have been explicitly **enabled by the owner** in the Admin Dashboard (all 10 proposed categories start disabled by default).
- **Repair Request Form:** Collects customer name, WhatsApp phone, country (DR or Haiti), city/location, device category, brand, model, problem description, optional start time, preferred contact method, optional photo selection, and additional notes.
- Generates a prefilled WhatsApp inquiry for `+1 829 653 4437`. Because WhatsApp text links cannot automatically attach local image files, the form clearly instructs customers to attach selected photos manually after WhatsApp opens and never claims an inquiry has been received before the user sends it.

### 5. Multilingual Support (`EN` / `ES` / `HT`)
- Supports **English** (default), **Spanish**, and **Haitian Creole** across navigation, product descriptions, checkout fields, repair forms, validation messages, and WhatsApp message templates.

### 6. Admin Dashboard (`/admin`)
- **Repairs Management:** Enable/disable individual service categories, add/remove categories, edit descriptions, configure pricing modes (estimate, starting at, or fixed price), update repair policies and homepage repair banner content, and configure supported DR/Haiti service locations.
- **Products & Pricing:** Add/remove products, edit base USD prices, and toggle featured/in-stock status.
- **Currency, Zones & Pickup:** Configure the manual DOP/USD exchange rate, DR/Haiti delivery zones, and store pickup locations.
- **Firebase-Ready Architecture:** Includes a typed `RepairTicketSchema` and a modular `src/services/repository.ts` persistence layer ready for future Firebase Firestore and Storage integration. (WhatsApp inquiries are not automatically saved in the dashboard until a backend/Firebase integration is connected.)

---

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons:** `lucide-react`
- **Persistence:** `localStorage` via modular repository (`src/services/repository.ts`)

---

## Project Structure

```text
├── index.html
├── metadata.json
├── package.json
├── public/
│   └── assets/aistudio/          # Official RÉGIS ELECTRONICS logo asset
└── src/
    ├── App.tsx                   # Client-side router & root layout
    ├── index.css                 # Tailwind import, fonts, brand CSS tokens
    ├── main.tsx                  # React entry point
    ├── assets/images/            # Generated storefront & repair photography
    ├── components/
    │   ├── CartDrawer.tsx        # Slide-over shopping cart drawer
    │   ├── Footer.tsx            # Site footer with WhatsApp & links
    │   ├── Navbar.tsx            # Header navigation, currency/language & search
    │   ├── ProductCard.tsx       # Reusable catalog product card
    │   └── ResilientImage.tsx    # Image wrapper with CSS/SVG fallback
    ├── context/
    │   └── StoreContext.tsx      # Global store, cart, wishlist & admin state
    ├── data/
    │   └── seed.ts               # Official info, catalog seed, DR/HT regions
    ├── i18n/
    │   └── translations.ts       # EN / ES / HT dictionaries
    ├── pages/
    │   ├── AboutPage.tsx
    │   ├── AdminPage.tsx         # Store, currency, delivery & repairs admin
    │   ├── CheckoutPage.tsx      # DR/HT conditional WhatsApp checkout
    │   ├── ContactPage.tsx
    │   ├── HomePage.tsx          # Hero, featured catalog & repair spotlight
    │   ├── ProductDetailPage.tsx
    │   ├── RepairsPage.tsx       # /repairs services & inquiry form
    │   ├── ShopPage.tsx
    │   └── WishlistPage.tsx
    ├── services/
    │   └── repository.ts         # LocalStorage persistence (Firebase-ready)
    ├── types/
    │   └── store.ts              # Domain & RepairTicketSchema types
    └── utils/
        ├── currency.ts           # Single-currency conversion & formatting
        └── whatsapp.ts           # Localized WhatsApp message & URL builders
```

---

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server** (runs on port `3000`)
   ```bash
   npm run dev
   ```

3. **Type-check**
   ```bash
   npm run lint
   ```

4. **Build for production**
   ```bash
   npm run build
   ```
