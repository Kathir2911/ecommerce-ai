import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

const Cart = () => {
  const {
    cartItems,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useCart();

  return (
    <div className="cart-panel">
      <div className="cart-header">
        <div>
          <p className="cart-title">Your bag</p>
          <small>{cartCount} item{cartCount === 1 ? "" : "s"}</small>
        </div>
        {cartItems.length > 0 && (
          <button className="cart-clear" onClick={clearCart}>
            Clear
          </button>
        )}
      </div>

      <div className="cart-items">
        {cartItems.length === 0 && (
          <p className="cart-empty">
            Your bag is empty. Add products to see them here.
          </p>
        )}

        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div>
              <p className="cart-item__name">{item.name}</p>
              <small>₹{item.price.toLocaleString("en-IN")}</small>
            </div>
            <div className="cart-item__actions">
              <div className="cart-quantity">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="cart-remove"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p>Total</p>
        <strong>₹{cartTotal.toLocaleString("en-IN")}</strong>
      </div>

      <button
        type="button"
        className="cart-checkout"
        disabled={cartItems.length === 0}
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
