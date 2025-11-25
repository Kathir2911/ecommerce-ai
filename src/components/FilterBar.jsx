import "../styles/FilterBar.css";

const ratingOptions = [
  { label: "Any rating", value: 0 },
  { label: "4+ rating", value: 4 },
  { label: "4.5+ rating", value: 4.5 }
];

const FilterBar = ({ filters, onFilterChange, categories, priceRange }) => {
  const handleChange = (field, value) => {
    let nextValue = value;

    if (field === "minPrice") {
      nextValue = Math.max(
        priceRange.min,
        Math.min(value, filters.maxPrice)
      );
    }

    if (field === "maxPrice") {
      nextValue = Math.min(
        priceRange.max,
        Math.max(value, filters.minPrice)
      );
    }

    onFilterChange({
      ...filters,
      [field]: nextValue
    });
  };

  return (
    <div className="filter-bar">
      <h3>Filters</h3>

      <label className="filter-block">
        <span>Search</span>
        <input
          type="search"
          value={filters.query}
          onChange={(event) => handleChange("query", event.target.value)}
          placeholder='Try "wireless headphones"'
        />
      </label>

      <label className="filter-block">
        <span>Category</span>
        <select
          value={filters.category}
          onChange={(event) => handleChange("category", event.target.value)}
        >
          <option value="all">All products</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <div className="filter-block inline">
        <label>
          <span>Min price</span>
          <input
            type="number"
            min={priceRange.min}
            max={filters.maxPrice}
            value={filters.minPrice}
            onChange={(event) =>
              handleChange("minPrice", Number(event.target.value))
            }
          />
        </label>
        <label>
          <span>Max price</span>
          <input
            type="number"
            min={filters.minPrice}
            max={priceRange.max}
            value={filters.maxPrice}
            onChange={(event) =>
              handleChange("maxPrice", Number(event.target.value))
            }
          />
        </label>
      </div>

      <label className="filter-block">
        <span>Rating</span>
        <select
          value={filters.minRating}
          onChange={(event) =>
            handleChange("minRating", Number(event.target.value))
          }
        >
          {ratingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="filter-checkbox">
        <input
          type="checkbox"
          checked={filters.inStockOnly}
          onChange={(event) => handleChange("inStockOnly", event.target.checked)}
        />
        <span>In stock only</span>
      </label>
    </div>
  );
};

export default FilterBar;

