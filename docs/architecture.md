# TravelByTime + Link to Armenia System Architecture

## 1) Product goals

TravelByTime should operate as a dual-sided platform:

- **Demand side**: travelers discover, configure, and book curated experiences.
- **Supply side**: destination partners, local operators, ambassadors, and affiliates create and distribute those experiences.

The "Link to Armenia" component is modeled as a strategic destination partner program with dedicated onboarding, campaigns, and tour catalog governance.

## 2) Capability map

### Core booking platform

- Search and discovery by destination, travel style, duration, budget.
- Product detail pages with itineraries, inclusions, exclusions, and policy.
- Checkout + payment + booking confirmation.
- Post-booking operations (vouchering, status tracking, support).

### Partner operations (B2B)

- Partner onboarding workflow.
- Contract and commission configuration.
- Tour supply upload, approval, and publishing.
- SLA and quality monitoring.

### Ambassador + affiliate growth engine

- Application funnel.
- Approval and tiering (starter/pro/elite).
- Unique tracking links and attribution.
- Payout and performance reporting.

### AI tour builder

- Prompt templates for itinerary generation.
- Guardrails (cost range, logistics, accessibility, seasonality).
- Human QA before publication.
- Continuous optimization from booking and review data.

## 3) Suggested production architecture

- **Frontend**: Next.js/React for marketing, traveler booking flow, and partner dashboard.
- **API layer**: Node.js or Python service for auth, booking, catalog, and partner operations.
- **Database**: PostgreSQL for transactional data.
- **Search**: OpenSearch/Algolia for fast discovery.
- **Queue/events**: Redis + queue worker for notifications and sync jobs.
- **AI orchestration**: dedicated service wrapping LLM providers, policy checks, and template library.
- **Integrations**:
  - Payment (Stripe/Adyen).
  - CRM (HubSpot/Salesforce).
  - Email/marketing automation.
  - Optional OTA/feed ingestion APIs.

## 4) Rollout phases

1. **MVP**
   - Single destination + few curated tours.
   - Basic affiliate intake.
   - Manual approval flow.
2. **Operational maturity**
   - Multi-partner inventory ingestion.
   - Automated payouts and analytics.
   - AI-assisted itinerary personalization.
3. **Scale**
   - Multi-destination expansion.
   - Dynamic packaging.
   - Revenue optimization and LTV modeling.

## 5) KPIs

- Booking conversion rate.
- Gross booking value (GBV).
- Partner activation rate.
- Affiliate-to-booking conversion.
- Repeat booking rate.
- CSAT/NPS and cancellation ratio.
