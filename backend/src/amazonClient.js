import axios from "axios";
import crypto from "node:crypto";
import { amazonConfig } from "./config.js";

const normalizeProduct = (product) => {
  // Amazon RapidAPI field mapping
  // Extract price - could be in ProductPrice, price, or other fields
  const priceStr = product?.ProductPrice ?? product?.price ?? "0";
  const priceNum = typeof priceStr === 'string' ? parseFloat(priceStr.replace(/[^0-9.]/g, '')) : priceStr;

  return {
    id: product?.ASIN ?? product?.asin ?? crypto.randomUUID?.() ?? `${Date.now()}`,
    name: product?.ProductTitle ?? product?.title ?? "Amazon Product",
    category: product?.CategoryName ?? product?.category ?? "Electronics",
    brand: product?.Brand ?? product?.brand ?? "Amazon",
    description: product?.ProductTitle ?? product?.description ?? "No description provided.",
    image: product?.ProductImage ?? product?.productImage ?? product?.image ?? product?.thumbnail ?? "",
    price: (priceNum || 0) * 84, // Convert USD to INR (approx rate)
    currency: "INR",
    rating: parseFloat(product?.ProductRating ?? product?.rating ?? 0),
    inStock: product?.ProductAvailability !== "Out of Stock",
    url: product?.ProductUrl ?? product?.productUrl ?? product?.url ?? "",
    source: "Amazon"
  };
};

export const searchAmazonProducts = async ({
  keywords,
  resultCount = amazonConfig.defaultCount,
  country = amazonConfig.defaultCountry,
  sort = amazonConfig.defaultSort,
  page = 1
}) => {
  if (!amazonConfig.rapidApiKey) {
    throw new Error(
      "RapidAPI key missing. Provide RAPIDAPI_KEY in environment variables."
    );
  }

  try {
    const response = await axios.get(amazonConfig.baseUrl, {
      params: {
        keyword: keywords,
        country: country,
        page: page,
        sort: sort
      },
      headers: {
        "x-rapidapi-key": amazonConfig.rapidApiKey,
        "x-rapidapi-host": amazonConfig.rapidApiHost
      }
    });

    console.log("Amazon RapidAPI raw response:", JSON.stringify(response.data, null, 2));

    // Amazon API returns products in 'details' array at top level
    const items = response.data?.details ?? [];

    console.log(`Found ${Array.isArray(items) ? items.length : 0} items from Amazon RapidAPI`);

    // Limit results to requested count
    const limitedItems = Array.isArray(items) ? items.slice(0, resultCount) : [];

    return {
      items: limitedItems.map(normalizeProduct),
      raw: response.data
    };
  } catch (error) {
    console.error("Amazon RapidAPI error:", error.response?.data ?? error.message);
    throw new Error(
      error.response?.data?.message ??
      error.message ??
      "Failed to fetch products from Amazon RapidAPI"
    );
  }
};
