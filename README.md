# QuickBasket — Food + Grocery Delivery & Business Intelligence Platform

QuickBasket is a next-generation unified Indian commerce platform combining **Food Delivery**, **Grocery Delivery**, **Smart Basket split fulfillment**, and **Executive Business Intelligence (BI)** analytics.

---

## 1. Core Architecture & Highlights

- **One Platform · Two Marketplaces · One Smart Basket · One BI Engine**
- **Smart Basket & Split Fulfillment**: Add hot restaurant dishes (e.g. Biryani Handi) and cold grocery essentials (e.g. Plant Milk) to the same basket with automated split fulfillment routing and independent delivery timelines.
- **Real-Time Multi-Stage Tracking**: Multi-stage stepper timeline for food and grocery with live route map simulation, GPS telemetry, rider details, in-app chat, and interactive stage advance controls.
- **Executive Business Intelligence**: Grounded in authentic transaction histories without hardcoded metrics. Filterable by date range, marketplace service, city, restaurant, and payment method:
  - Total Net GMV & Order Volume
  - Average Order Value (AOV = Total Revenue / Completed Orders)
  - Customer Lifetime Value (CLV) & RFM Segmentation (VIP, High Value, Regular, New, At Risk)
  - Monthly Cohort Retention Heatmap (Month 0 to Month 4)
  - Product Sales Velocity & SKU Rankings
  - Restaurant Performance Matrix & Peak Ordering Hours (8 AM to 10 PM)
  - Dark Store Stock Alert Monitors (GREEN Healthy, YELLOW Low, RED Critical, BLACK Out of Stock)
  - Cancellation Loss Root-Cause Breakdown
  - One-click CSV Report Export
- **5-in-1 Role Engine**: Seamless 1-click role switcher in the navbar to test:
  1. `Customer`: Browse, search, Smart Basket, multi-step checkout, live tracking, order history & reorder.
  2. `Admin`: Full SaaS control center and executive BI dashboards.
  3. `Restaurant Owner`: Kitchen console with live order tickets and menu item availability toggles.
  4. `Grocery Store Owner`: Dark store console with real-time stock refill actions.
  5. `Delivery Partner`: Rider trip dashboard with route pickup/drop navigation and live earnings.

---

## 2. Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React, Recharts, Canvas Confetti
- **State Management**: React Context API (`AppContext`) with persistent storage and domain hooks
- **Database & Aggregation**: In-Memory & LocalStorage persistent MongoDB-like aggregation engine (`dbService.ts`) executing `$match`, `$group`, `$project`, `$sort`, and temporal aggregation
- **API Service Layer**: Modular centralized API abstractions (`src/services/api.ts`)
- **Branding**: Centralized configuration (`src/config/brandConfig.ts`)

---

## 3. Demo Credentials & Instant Switching

You can switch roles directly using the top-right profile dropdown in the navigation bar:

| Role | Name | Email | Purpose |
|---|---|---|---|
| **Customer** | Rajat Chauhan | `rajat@example.com` | Shop meals & groceries, unified checkout |
| **Admin** | Ananya Sharma | `admin@quickbasket.in` | Executive BI, orders, customer directory |
| **Restaurant Owner** | Vikram Malhotra | `vikram@urbantadka.com` | Urban Tadka kitchen console |
| **Grocery Owner** | Suresh Patel | `suresh@freshmart.com` | FreshMart dark store stock refills |
| **Delivery Partner** | Karthik Raja | `karthik.rider@quickbasket.in` | EV Scooter rider trip console |

---

## 4. Key Promotional Coupons

Try applying these in the Smart Basket:
- `QUICK150`: Flat ₹150 OFF on orders above ₹600
- `FREEDEL`: Free delivery waiver on baskets above ₹399
- `FRESH20`: 20% OFF on fresh vegetables, fruits & dairy
- `TASTY50`: ₹50 OFF on restaurant food orders

---

## 5. Development & Build

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Run TypeScript compilation check
npm run lint

# Production build
npm run build
```
