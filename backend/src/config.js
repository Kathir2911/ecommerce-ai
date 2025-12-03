import dotenv from "dotenv";

dotenv.config();

export const flipkartConfig = {
  rapidApiKey: process.env.RAPIDAPI_KEY ?? "",
  rapidApiHost: process.env.FLIPKART_RAPIDAPI_HOST ?? "flipkart-apis.p.rapidapi.com",
  baseUrl: process.env.FLIPKART_RAPIDAPI_BASE_URL ?? "https://flipkart-apis.p.rapidapi.com/backend/rapidapi/category-products-list",
  defaultCount: Number(process.env.FLIPKART_RESULT_COUNT) || 12,
  currency: process.env.FLIPKART_CURRENCY ?? "INR",
  country: process.env.FLIPKART_RAPIDAPI_COUNTRY ?? "IN",
  defaultCategoryId: process.env.FLIPKART_DEFAULT_CATEGORY_ID ?? "axc",
  defaultPage: Number(process.env.FLIPKART_DEFAULT_PAGE) || 1
};

export const serverConfig = {
  port: Number(process.env.PORT) || 4000,
  corsOrigins: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim())
    : ["http://localhost:3000"]
};

