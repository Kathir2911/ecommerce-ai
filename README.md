# Ecommerce AI – Flipkart & Amazon Price Comparison (RapidAPI)

A full-stack ecommerce app with a React front-end and Node/Express backend that lets users **compare product prices between Amazon and Flipkart**. Product data is fetched in real-time from both platforms using their endpoints via [RapidAPI](https://rapidapi.com/). The original AI shopping assistant experience is retained.

---

## Features

- 🔍 Compare prices for products from Amazon and Flipkart  
- ⚡ Real-time data powered by RapidAPI  
- 🤖 Integrated AI shopping assistant  
- 🛒 Modern React-based frontend  
- 🔒 Secure backend proxy for API calls  

---

## Project Structure

```
.
├── backend/        # Express proxy for Amazon/Flipkart via RapidAPI
├── public/         # Static assets for React app
├── src/            # React app source code
└── package.json
```

---

## Requirements

- Node.js 18+
- RapidAPI keys for Amazon and Flipkart Shopping APIs  
- (Optional) OpenAI API Key for AI assistant

---

## Backend Setup

1. **Set up your backend environment variables:**  
   Copy the example .env file and add your RapidAPI credentials.
   ```bash
   cp backend/env.example backend/.env
   # Then edit backend/.env and fill in:
   # PORT=4000
   # CORS_ORIGINS=http://localhost:3000
   # RAPIDAPI_KEY=yourRapidAPIKey
   # AMAZON_API_HOST=yourAmazonHost
   # FLIPKART_API_HOST=yourFlipkartHost
   ```
   > Make sure you are subscribed to Amazon and Flipkart APIs on RapidAPI.

2. **Install dependencies & start the server:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   The backend proxy exposes:
   - `GET /api/products?keywords=...` to fetch and compare products from Amazon and Flipkart using RapidAPI.

---

## Frontend Setup

```bash
npm install
npm start
```

- The frontend uses Create React App and will forward `/api/*` requests to your backend (`http://localhost:4000`) in development.
- For production, set `REACT_APP_API_BASE` to your live backend URL.

---

## Environment Variables

**Frontend (`.env`, optional):**
```env
REACT_APP_API_BASE=https://your-backend.example.com
REACT_APP_AI_KEY=sk-...
```

**Backend:**  
See `backend/.env` configuration above.  
> ⚠️ **Never commit real credentials.** `.gitignore` already excludes `.env` files.

---

## Development Workflow

1. Run the backend:
   ```bash
   cd backend
   npm run dev
   ```
2. Run the frontend at the project root:
   ```bash
   npm start
   ```
3. Visit [http://localhost:3000](http://localhost:3000) to search and compare Amazon and Flipkart prices with AI assistant help.

---

## Production Build & Deployment

1. Build the frontend:
   ```bash
   npm run build
   ```
2. Deploy `build/` to a static host (e.g., Vercel, Netlify, S3, etc.).
3. Run/deploy the backend:
   ```bash
   cd backend
   npm start
   ```
4. Set `REACT_APP_API_BASE` on the frontend to your backend’s deployment URL.

---

## Troubleshooting

- **react-scripts: not found**  
  Run `npm install` in your project root.
- **API errors**  
  Check your RapidAPI credentials and selected endpoints for Amazon/Flipkart.
- **CORS issues**  
  Ensure your frontend URL is included in `CORS_ORIGINS` in `backend/.env`.

---

## Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to open an issue or pull request.

---

## License

This project is [MIT licensed](LICENSE).
