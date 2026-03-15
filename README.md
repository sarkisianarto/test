# TravelByTime Platform Starter

This repository contains an MVP starter for **TravelByTime**, focused on:

- B2B partnerships and destination onboarding (including a dedicated **Link to Armenia** workflow).
- Ambassador and affiliate recruitment/management.
- AI-assisted tour creation workflows.
- Booking intake and lightweight operational management.

## What is included

- `index.html`: marketing + operations single-page app.
- `styles.css`: responsive design and admin-style UI components.
- `app.js`: client-side logic for:
  - AI tour draft generation from traveler intent.
  - Ambassador and affiliate pipeline capture.
  - Tour inventory management.
  - Booking management with status updates.
  - Local persistence via `localStorage`.
- `docs/architecture.md`: suggested production architecture and rollout plan.

## Run locally

Because this is a static MVP, you can run it with any static server.

```bash
python3 -m http.server 4173
```

Then open:

- <http://localhost:4173>

## Recommended next steps

1. Replace localStorage with a real backend (PostgreSQL + API).
2. Add role-based authentication (admin, DMC partner, ambassador, affiliate).
3. Integrate payment + live inventory APIs.
4. Connect LLM endpoints for production itinerary generation.
5. Add CRM integrations for partner and affiliate lifecycle management.
