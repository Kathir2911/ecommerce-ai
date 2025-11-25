import axios from "axios";
import crypto from "node:crypto";
import { flipkartConfig } from "./config.js";

const normalizeProduct = (product) => {
  const base = product?.productInfo?.productBaseInfoV1 ?? {};
  const price =
    base.flipkartSpecialPrice ??
    base.flipkartSellingPrice ??
    base.maximumRetailPrice ??
    {};
  const image =
    base.imageUrls?.["800x800"] ||
    base.imageUrls?.["400x400"] ||
    base.imageUrls?.["200x200"] ||
    "";

  return {
    id: base.productId ?? crypto.randomUUID?.() ?? `${Date.now()}`,
    name: base.title ?? "Flipkart Product",
    category: base.categoryPath?.split(">").pop()?.trim() ?? "Flipkart Catalog",
    brand: base.productBrand ?? "Flipkart",
    description: base.productDescription ?? "No description provided.",
    image,
    price: price.amount ?? 0,
    currency: price.currency ?? flipkartConfig.currency,
    rating: base.productRating ?? 0,
    inStock: base.inStock ?? true,
    url: base.productUrl
  };
};

export const searchFlipkartItems = async ({
  keywords,
  resultCount = flipkartConfig.defaultCount
}) => {
  if (!flipkartConfig.affiliateId || !flipkartConfig.affiliateToken) {
    throw new Error(
      "Flipkart credentials missing. Provide FLIPKART_AFFILIATE_ID and FLIPKART_AFFILIATE_TOKEN."
    );
  }

  const url = new URL(`${flipkartConfig.baseUrl}/search.json`);
  url.searchParams.append("query", keywords);
  url.searchParams.append("resultCount", resultCount);

  const response = await axios.get(url.toString(), {
    headers: {
      "Fk-Affiliate-Id": flipkartConfig.affiliateId,
      "Fk-Affiliate-Token": flipkartConfig.affiliateToken,
      Accept: "application/json"
    }
  });

  const items = response.data?.products ?? [];
  return {
    items: items.map(normalizeProduct),
    raw: response.data
  };
};

