# Ecommerce AI + Flipkart Affiliate Feed

React front-end + Node/Express backend that surfaces realtime product data from Flipkart’s Affiliate Product Feed API while keeping the AI shopping assistant UX from the original design. The frontend falls back to curated JSON if credentials are missing so you can develop without live API keys.

## Project structure

```
.
├── backend/        # Express proxy that authenticates Flipkart API calls
├── public/
├── src/            # React app
└── package.json
```

## Requirements

- Node 18+
- Flipkart Affiliate ID + Token

## Backend setup

1. Copy `backend/env.example` to `backend/.env` and fill in your keys:
   ```
   PORT=4000
   CORS_ORIGINS=http://localhost:3000
   FLIPKART_AFFILIATE_ID=yourAffiliateId
   FLIPKART_AFFILIATE_TOKEN=yourAffiliateToken
   FLIPKART_BASE_URL=https://affiliate-api.flipkart.net/affiliate/1.0
   FLIPKART_RESULT_COUNT=12
   FLIPKART_CURRENCY=INR
   ```
2. Install deps and start the server:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   The proxy exposes `GET /api/products?keywords=...` and forwards the request to Flipkart’s Affiliate search feed with the correct headers.

## Frontend setup

```bash
cd /home/kathir/Documents/ecommerce-ai
npm install
npm start
```

`package.json` is configured with `"proxy": "http://localhost:4000"`, so CRA automatically forwards `/api/*` calls to the backend during development. For production builds set `REACT_APP_API_BASE` to the deployed backend URL.

## Environment variables

Frontend:

```bash
# .env (optional)
REACT_APP_API_BASE=https://your-backend.example.com
REACT_APP_AI_KEY=sk-...
```

Backend: see the `.env` snippet above. **Never** commit real keys; `.gitignore` already excludes `.env`.

## Development workflow

1. Run the backend: `npm run dev` inside `backend/`
2. Run the frontend: `npm start` at the project root
3. Visit `http://localhost:3000` to interact with live Flipkart data, filters, cart, and AI assistant.

## Production build

```bash
npm run build
cd backend && npm start   # or deploy both services separately
```

Serve the `build/` folder via any static host (Netlify, S3 + CloudFront, etc.) and point it at the deployed backend via `REACT_APP_API_BASE`.

## Troubleshooting

- **`react-scripts: not found`** – run `npm install` in the frontend root.
- **Flipkart API errors** – verify your Affiliate ID/Token are correct and whitelisted.
- **CORS issues** – add your frontend origin to `CORS_ORIGINS` in `backend/.env`.
