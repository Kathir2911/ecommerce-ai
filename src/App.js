import Home from "./components/Home";
import { CartProvider } from "./context/CartContext";
import "./styles/App.css";

function App() {
  return (
    <CartProvider>
      <div className="app-shell">
        <Home />
      </div>
    </CartProvider>
  );
}

export default App;
