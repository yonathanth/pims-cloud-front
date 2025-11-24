# PIMS Analytics Web App

Next.js web application using IBM Carbon Design System for viewing pharmacy analytics data from the cloud API.

## Features

- JWT-based authentication
- Real-time analytics dashboard
- Charts and visualizations (Category distribution, Monthly trends)
- Product tables (Fast/Slow moving, Out of stock, Expired items)
- Top suppliers and performers
- Tabbed navigation for different analytics views
- Auto-refresh every 5 minutes
- Responsive design with Carbon Design System

## Design System

This application uses **IBM Carbon Design System** (@carbon/react) for all UI components, matching the look and feel of the main PIMS desktop application.

## Setup

### Prerequisites

- Node.js 18+
- Cloud API running (back3-cloud-api)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Run development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3001` (or next available port)

## Project Structure

```
app/
├── (auth)/login/       # Login page
├── (dashboard)/        # Protected dashboard routes
├── layout.tsx          # Root layout
└── globals.scss        # Carbon Design System styles

components/
├── auth/               # Authentication components
├── analytics/          # Analytics display components
└── layout/             # Layout components (Sidebar, Header)

lib/
├── api/                # API client
├── auth/               # Auth utilities
└── utils.ts            # Utility functions

hooks/
├── use-auth.ts         # Authentication hook
└── use-analytics.ts    # Analytics data fetching hook

types/
└── analytics.ts        # TypeScript types
```

## Pages

### `/login`
Login page with username/password form using Carbon components.

### `/`
Analytics dashboard with:
- Key metrics cards
- Tabbed navigation (Inventory, Sales, Supplier, Employee analytics)
- Charts and visualizations
- Product tables
- Filters for time range and low stock threshold

## API Integration

The app connects to the cloud API at `NEXT_PUBLIC_API_URL`:
- `POST /auth/login` - Authentication
- `GET /api/pharmacy/analytics/latest` - Get analytics data
- `GET /api/pharmacy/analytics/last-updated` - Get last update timestamp

## Development

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run lint
```

## Authentication

- JWT tokens stored in localStorage
- Auto-redirect to login if not authenticated
- Auto-logout on token expiry (401 errors)

## License

UNLICENSED
