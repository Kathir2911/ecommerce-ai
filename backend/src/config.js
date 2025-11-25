import dotenv from "dotenv";

dotenv.config();

export const flipkartConfig = {
  affiliateId: process.env.FLIPKART_AFFILIATE_ID ?? "",
  affiliateToken: process.env.FLIPKART_AFFILIATE_TOKEN ?? "",
  baseUrl:
    process.env.FLIPKART_BASE_URL ??
    "https://affiliate-api.flipkart.net/affiliate/1.0",
  defaultCount: Number(process.env.FLIPKART_RESULT_COUNT) || 12,
  currency: process.env.FLIPKART_CURRENCY ?? "INR"
};

export const serverConfig = {
  port: Number(process.env.PORT) || 4000,
  corsOrigins: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim())
    : ["http://localhost:3000"]
};

