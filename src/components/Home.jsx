import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import AIAssistant from "./AiAssistant";
import Cart from "./Cart";
import { useFlipkartProducts } from "../hooks/useFlipkartProducts";
import "../styles/Home.css";

const Home = () => {
  const {
    products,
    categories,
    priceBounds,
    isLoading,
    error
  } = useFlipkartProducts("future tech gadgets");
  const [filters, setFilters] = useState(() => ({
    query: "",
    category: "all",
    minPrice: priceBounds.min,
    maxPrice: priceBounds.max,
    inStockOnly: false,
    minRating: 0
  }));
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: priceBounds.min,
      maxPrice: priceBounds.max
    }));
  }, [priceBounds.min, priceBounds.max]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = product.name
        .toLowerCase()
        .includes(filters.query.toLowerCase());
      const matchesCategory =
        filters.category === "all" || product.category === filters.category;
      const matchesPrice =
        product.price >= filters.minPrice && product.price <= filters.maxPrice;
      const matchesStock = filters.inStockOnly ? product.inStock : true;
      const matchesRating = product.rating >= filters.minRating;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesPrice &&
        matchesStock &&
        matchesRating
      );
    });
  }, [filters, products]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];

    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [filteredProducts, sortBy]);

  return (
    <div className="home-container">
      <header className="home-hero">
        <div>
          <p className="eyebrow">REAL PICKS</p>
          <h1>Shop the future of retail.</h1>
          <p className="subtitle">
            Discover AI-assisted recommendations, quick filters, and an
            effortless checkout flow.
          </p>
        </div>
        <div className="sort-control">
          <label htmlFor="sort">Sort by</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </header>

      <section className="home-layout">
        <aside className="home-sidebar">
          <div className="home-sidebar-stack">
            <FilterBar
              filters={filters}
              onFilterChange={setFilters}
              categories={categories}
              priceRange={priceBounds}
            />
            <AIAssistant products={sortedProducts} />
          </div>
        </aside>

        <main className="products-section">
          <div className="products-header">
            <h2>Products</h2>
            <p>
              {isLoading
                ? "Fetching live Flipkart data..."
                : `${sortedProducts.length} results`}
            </p>
          </div>
          {error && (
            <p className="products-error">
              Couldn&apos;t reach Flipkart right now. Showing curated picks instead.
            </p>
          )}
          <div className="products-grid">
            {isLoading && <p className="loading-state">Loading...</p>}
            {!isLoading &&
              sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            {!isLoading && sortedProducts.length === 0 && (
              <div className="empty-state">
                <p>No products match the selected filters.</p>
                <button
                  onClick={() =>
                    setFilters({
                      query: "",
                      category: "all",
                      minPrice: priceBounds.min,
                      maxPrice: priceBounds.max,
                      inStockOnly: false,
                      minRating: 0
                    })
                  }
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </main>

        <aside className="home-cart">
          <Cart />
        </aside>
      </section>
    </div>
  );
};

export default Home;
