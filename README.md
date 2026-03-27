# Jevendsmavoiture by AUTO24

A modern, mobile-first web application for selling vehicles to AUTO24. Built as a conversion-optimized funnel that collects vehicle information, provides indicative estimates, and enables showroom appointment booking.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js App Router + API Routes
- **Database**: PostgreSQL + Prisma ORM
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Railway-ready

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/pierrej-cloud/jevendsmavoiture-by-auto24.git
cd jevendsmavoiture-by-auto24

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL and other settings

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database (creates admin user + showrooms)
npm run db:seed

# Start development server
npm run dev
```

### Default Admin Credentials

After seeding, log in at `/admin/login`:
- **Email**: admin@auto24.africa
- **Password**: admin123

> Change these credentials immediately in production.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── sell/page.tsx         # Sell funnel (multi-step)
│   ├── admin/
│   │   ├── page.tsx          # Lead management dashboard
│   │   ├── login/page.tsx    # Admin login
│   │   └── leads/[id]/      # Lead detail view
│   └── api/
│       ├── estimation/       # Price estimation endpoint
│       ├── showrooms/        # Showroom listing
│       ├── leads/            # Lead creation
│       └── admin/            # Admin API (auth + lead management)
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── funnel/               # Funnel step components
│   ├── layout/               # Header, footer, layouts
│   └── admin/                # Admin-specific components
├── lib/
│   ├── db.ts                 # Prisma client
│   ├── auth.ts               # Admin authentication
│   ├── estimation.ts         # Price estimation logic
│   ├── validations.ts        # Zod schemas
│   ├── constants.ts          # App constants
│   ├── funnel-store.ts       # Client-side funnel state
│   └── utils.ts              # Utility functions
├── i18n/                     # Internationalization (en, fr)
└── prisma/
    ├── schema.prisma         # Database schema
    └── seed.ts               # Seed data
```

## User Flow

1. **Landing Page** - Hero + CTA to start selling
2. **Vehicle Info** - Brand, model, year, mileage, etc.
3. **Vehicle Condition** - General state, accident history, etc.
4. **Photo Upload** - Front, rear, side, interior photos
5. **Analysis** - Loading screen with progress indicators
6. **Estimation** - Indicative price range display
7. **Contact Info** - Name, email, phone, consent
8. **Showroom Selection** - Choose nearest AUTO24 showroom
9. **Appointment Booking** - Pick date and time slot
10. **Confirmation** - Summary with all details

## Admin Back-Office

Access at `/admin` (requires authentication):
- View all leads with status badges
- Filter by lead status
- View full lead details (vehicle, condition, photos, appointment)
- Update lead status
- Add internal notes
- Track status change history

### Lead Statuses
New → Contacted → Appointment Booked → Inspected → Offer Made → Purchased / Lost / Rejected

## Deploy to Railway

### 1. Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Create a new project
3. Add a **PostgreSQL** service
4. Add a **GitHub Repo** service (connect this repo)

### 2. Environment Variables

Set these in Railway:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Auto-set by Railway PostgreSQL |
| `NEXT_PUBLIC_APP_URL` | Your Railway app URL |
| `ADMIN_SECRET` | A secure random string |

### 3. Build & Deploy

Railway auto-detects Next.js. The build command runs:
```bash
prisma generate && next build
```

After first deploy, run the seed via Railway CLI:
```bash
railway run npm run db:seed
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXT_PUBLIC_APP_URL` | Yes | Public app URL |
| `ADMIN_SECRET` | Yes | Secret for admin auth |

## Estimation Logic

The V1 estimation uses a rule-based algorithm considering:
- Brand tier (premium vs. standard)
- Vehicle age depreciation
- Mileage factor
- Condition rating
- Accident/mechanical penalties
- Country market multiplier

Returns a ±15% range. Always displayed as **indicative** — final offer requires physical inspection.

## Future Roadmap

### V2
- AI photo analysis (damage detection, vehicle verification)
- AI lead scoring and prioritization
- Email/SMS notifications
- Cloud storage for photos (S3)
- Enhanced estimation with market data

### V3
- Multi-language support (FR, EN, AR)
- CRM integration
- WhatsApp Business API integration
- Analytics dashboard
- Mobile app (React Native)

## License

Proprietary - AUTO24
