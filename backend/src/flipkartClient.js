import axios from "axios";
import crypto from "node:crypto";
import { flipkartConfig } from "./config.js";

const normalizeProduct = (product) => {
  // RapidAPI returns different structure than affiliate API
  return {
    id: product?.id ?? product?.productId ?? crypto.randomUUID?.() ?? `${Date.now()}`,
    name: product?.title ?? product?.name ?? "Flipkart Product",
    category: product?.category ?? product?.categoryPath?.split(">").pop()?.trim() ?? "Flipkart Catalog",
    brand: product?.brand ?? product?.productBrand ?? "Flipkart",
    description: product?.description ?? product?.productDescription ?? "No description provided.",
    image: product?.image ?? product?.imageUrl ?? product?.thumbnail ?? "",
    price: product?.price ?? product?.currentPrice ?? product?.sellingPrice ?? 0,
    currency: product?.currency ?? flipkartConfig.currency,
    rating: product?.rating ?? product?.productRating ?? 0,
    inStock: product?.inStock ?? product?.availability ?? true,
    url: product?.url ?? product?.productUrl ?? product?.link ?? ""
  };
};

export const searchFlipkartItems = async ({
  keywords,
  resultCount = flipkartConfig.defaultCount,
  categoryId = flipkartConfig.defaultCategoryId,
  page = flipkartConfig.defaultPage
}) => {
  if (!flipkartConfig.rapidApiKey) {
    throw new Error(
      "RapidAPI key missing. Provide RAPIDAPI_KEY in environment variables."
    );
  }

  try {
    const response = await axios.get(flipkartConfig.baseUrl, {
      params: {
        categoryID: categoryId,  // Note: RapidAPI uses categoryID (uppercase ID)
        page: page
      },
      headers: {
        "x-rapidapi-key": flipkartConfig.rapidApiKey,
        "x-rapidapi-host": flipkartConfig.rapidApiHost
      }
    });


    // Handle different possible response structures from RapidAPI
    console.log("RapidAPI raw response:", JSON.stringify(response.data, null, 2));
    const items = response.data?.data?.products ?? response.data?.products ?? [];

    console.log(`Found ${Array.isArray(items) ? items.length : 0} items from RapidAPI`);

    return {
      items: Array.isArray(items) ? items.map(normalizeProduct) : [],
      raw: response.data
    };
  } catch (error) {
    console.error("RapidAPI Flipkart error:", error.response?.data ?? error.message);
    throw new Error(
      error.response?.data?.message ??
      error.message ??
      "Failed to fetch products from RapidAPI"
    );
  }
};


