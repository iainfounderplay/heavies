# Agentic Heavy Equipment MVP

A buildable MVP that merges three ideas into one product:

1. **DealOS** — close heavy equipment deals faster
2. **Machine Graph** — machine identity + trust records
3. **Fleet Copilot** — buy / hold / sell recommendations

## What is inside

- Next.js 14 + TypeScript app
- dashboard with KPIs
- new deal intake workflow
- machine trust records view
- procurement recommendation workspace
- mock API routes for deals, machines, and procurement logic

## Main routes

- `/` — dashboard
- `/deals/new` — create a new deal brief
- `/machines` — machine identity / trust layer
- `/procurement` — fleet procurement copilot

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

## Production build

```bash
npm run build
npm start
```

## What is mocked vs real

### Implemented now
- UI flows
- typed mock data
- API contract shape
- basic decision logic for procurement
- local in-memory new deal creation during runtime

### Replace next
- real database (Supabase / Postgres)
- auth
- inspection marketplace integrations
- transport quoting integrations
- lender / escrow APIs
- real valuation and trust scoring
- telematics ingestion

## Suggested next backend shape

### Core tables
- `organizations`
- `users`
- `deals`
- `deal_documents`
- `deal_events`
- `machines`
- `machine_inspections`
- `machine_maintenance_events`
- `fleet_assets`
- `procurement_recommendations`

## Suggested positioning

**"Found a machine? Close it here."**

Then expand into:
- machine trust network
- fleet procurement agent
- full marketplace later
