import { useEffect, useMemo, useState, useCallback } from "react";
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
  description: item.description ?? "No description available.",
  source: item.source
});

export const useFlipkartProducts = (keywords = "smart gadgets") => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Reset state when keywords change
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [keywords]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_BASE}/api/products?keywords=${encodeURIComponent(keywords)}&page=${page}&limit=12`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();
        const normalized = data.items?.map(mapFlipkartItem) || [];

        if (normalized.length === 0) {
          setHasMore(false);
          if (page === 1) setProducts(fallbackProducts);
        } else {
          setProducts(prev => {
            // Filter out duplicates based on ID
            const existingIds = new Set(prev.map(p => p.id));
            const newProducts = normalized.filter(p => !existingIds.has(p.id));
            return [...prev, ...newProducts];
          });
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
          setError(err.message);
          if (page === 1 && products.length === 0) {
            setProducts(fallbackProducts);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [keywords, page]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [isLoading, hasMore]);

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
    priceBounds: meta.priceBounds,
    loadMore,
    hasMore
  };
};
