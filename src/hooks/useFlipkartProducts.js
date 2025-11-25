import { useEffect, useMemo, useState } from "react";
import fallbackProducts from "../data/products.json";

const API_BASE = process.env.REACT_APP_API_BASE ?? "";

const mapFlipkartItem = (item) => ({
  id: item.id,
  name: item.name,
  price: item.price,
  category: item.category,
  brand: item.brand,
  rating: item.rating ?? 0,
  inStock: item.inStock ?? true,
  image: item.image,
  description: item.description ?? "No description available."
});

export const useFlipkartProducts = (keywords = "smart gadgets") => {
  const [products, setProducts] = useState(fallbackProducts);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_BASE}/api/products?keywords=${encodeURIComponent(keywords)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Flipkart API request failed");
        }

        const data = await response.json();
        const normalized = data.items?.map(mapFlipkartItem);

        if (normalized?.length) {
          setProducts(normalized);
        } else {
          setProducts(fallbackProducts);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setProducts(fallbackProducts);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [keywords]);

  const meta = useMemo(() => {
    if (!products.length) {
      return { categories: [], priceBounds: { min: 0, max: 0 } };
    }

    const categories = Array.from(
      new Set(products.map((product) => product.category).filter(Boolean))
    );

    const prices = products.map((product) => product.price || 0);
    const priceBounds = {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };

    return { categories, priceBounds };
  }, [products]);

  return {
    products,
    isLoading,
    error,
    categories: meta.categories,
    priceBounds: meta.priceBounds
  };
};

