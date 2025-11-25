import { useCart } from "../context/CartContext";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <div className="product-card__image">
        <img src={product.image} alt={product.name} loading="lazy" />
        {!product.inStock && <span className="product-card__badge">Sold out</span>}
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__meta">
          <span className="product-card__brand">{product.brand}</span>
          <span className="product-card__rating">
            Rating {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="product-card__footer">
        <div>
          <p className="product-card__price">₹{product.price.toLocaleString("en-IN")}</p>
          <small>incl. all taxes</small>
        </div>
        <button
          type="button"
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