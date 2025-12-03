import { useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showDescription, setShowDescription] = useState(false);

  return (
    <article className="product-card">
      <div className="product-card__image">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.source && (
          <span className={`product-card__source product-card__source--${product.source.toLowerCase()}`}>
            {product.source}
          </span>
        )}
        {!product.inStock && <span className="product-card__badge">Sold out</span>}

        {showDescription && (
          <div className="product-card__modal-backdrop" onClick={() => setShowDescription(false)}>
            <div className="product-card__modal" onClick={(e) => e.stopPropagation()}>
              <h4>Description</h4>
              <p>{product.description}</p>
              <button
                className="product-card__close-btn"
                onClick={() => setShowDescription(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h3>{product.name}</h3>
        <div className="product-card__meta">
          <span className="product-card__brand">{product.brand}</span>
          <span className="product-card__rating">
            Rating {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="product-card__footer">
        <div className="product-card__actions">
          <button
            className="product-card__desc-btn"
            onClick={() => setShowDescription(true)}
          >
            Description
          </button>
          <div className="product-card__price-container">
            <p className="product-card__price">₹{product.price.toLocaleString("en-IN")}</p>
            <small>incl. all taxes</small>
          </div>
        </div>
        <button
          type="button"
          className="product-card__add-btn"
          disabled={!product.inStock}
          onClick={() => addToCart(product)}
        >
          {product.inStock ? "Add to cart" : "Notify me"}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;