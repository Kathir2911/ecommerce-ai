<<<<<<< HEAD
# Ecommerce AI - Multi-Source Shopping Assistant

A modern e-commerce application that aggregates real-time product data from **Flipkart** and **Amazon** using RapidAPI. It features an **AI Stylist** powered by Google Gemini to provide personalized shopping recommendations.

![Project Screenshot](https://via.placeholder.com/800x400?text=Ecommerce+AI+Dashboard)

## 🚀 Features

- **Multi-Source Aggregation**: Fetches products from both Flipkart and Amazon simultaneously.
- **AI Shopping Assistant**: "AI Stylist" powered by Gemini API helps users find products based on natural language queries.
- **Real-time Currency Conversion**: Automatically converts Amazon prices (USD) to INR.
- **Smart UI**:
    - **Source Badges**: Distinct badges for Flipkart (Orange) and Amazon (Blue) products.
    - **Modal Descriptions**: Clean, centered modal dialogs for product details.
    - **Pagination**: "Load More" functionality to browse endless products.
- **Responsive Design**: Fully responsive grid layout with glassmorphism effects.

## 🛠️ Tech Stack

- **Frontend**: React, CSS Modules, Context API
- **Backend**: Node.js, Express
- **APIs**: RapidAPI (Real-time Amazon Data, Flipkart Scraper), Google Gemini AI
- **Deployment**: Vercel (Serverless)

## 📋 Prerequisites

- Node.js 18+
- [RapidAPI Account](https://rapidapi.com/) (Subscribe to "Real-time Amazon Data" and "Flipkart Scraper")
- [Google Gemini API Key](https://ai.google.dev/)

## ⚙️ Local Setup

### 1. Backend Setup

The backend acts as a proxy to hide API keys and handle data normalization.

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file based on `env.example` (or use the keys below):
    ```env
    PORT=4000
    CORS_ORIGINS=http://localhost:3000
    
    # RapidAPI Configuration
    RAPIDAPI_KEY=your_rapidapi_key
    
    # Flipkart API
    FLIPKART_RAPIDAPI_HOST=flipkart-scraper-api.p.rapidapi.com
    FLIPKART_RAPIDAPI_BASE_URL=https://flipkart-scraper-api.p.rapidapi.com/products/search
    
    # Amazon API
    AMAZON_RAPIDAPI_HOST=realtime-amazon-data.p.rapidapi.com
    AMAZON_RAPIDAPI_BASE_URL=https://realtime-amazon-data.p.rapidapi.com/product-search
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```

### 2. Frontend Setup

1.  Navigate to the project root:
    ```bash
    cd ..
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root:
    ```env
    REACT_APP_API_BASE=http://localhost:4000
    REACT_APP_AI_KEY=your_gemini_api_key
    ```
4.  Start the React app:
    ```bash
    npm start
    ```
5.  Open [http://localhost:3000](http://localhost:3000) to view the app.

## ☁️ Deployment (Vercel)

This project is configured for easy deployment on Vercel.

### Backend Deployment
1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Select **Root Directory** as `backend`.
4.  Add Environment Variables (`RAPIDAPI_KEY`, etc.) from your backend `.env`.
5.  Deploy.

### Frontend Deployment
1.  Import the project in Vercel (create a **new** project).
2.  Leave **Root Directory** as `./`.
3.  Add Environment Variables:
    - `REACT_APP_API_BASE`: Your deployed backend URL (e.g., `https://your-backend.vercel.app`)
    - `REACT_APP_AI_KEY`: Your Gemini API Key
4.  Deploy.

## 📂 Project Structure

```
.
├── backend/                # Node.js/Express Backend
│   ├── api/                # Vercel Serverless Entry Point
│   ├── src/
│   │   ├── routes/         # API Routes
│   │   ├── amazonClient.js # Amazon API Logic
│   │   ├── flipkartClient.js # Flipkart API Logic
│   │   └── app.js          # Express App Setup
│   └── vercel.json         # Backend Vercel Config
├── src/                    # React Frontend
│   ├── components/         # UI Components (ProductCard, Home, etc.)
│   ├── hooks/              # Custom Hooks (useFlipkartProducts)
│   └── styles/             # CSS Styles
├── public/                 # Static Assets
├── vercel.json             # Frontend Vercel Config
└── README.md               # Documentation
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📄 License

MIT
=======
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
>>>>>>> bc7d50a0877ee0504a3d6a16ab04190aba42744e
