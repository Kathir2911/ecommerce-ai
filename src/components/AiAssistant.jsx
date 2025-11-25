import { useState } from "react";
import defaultProducts from "../data/products.json";
import { getAIRecommendation } from "../api/ai";
import "../styles/AiAssistant.css";

export default function AIAssistant({ products = defaultProducts }) {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState(
    'Ask me for curated picks. Try "Show home essentials under ₹3000".'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAI = async () => {
    if (!query.trim()) {
      setOutput("Share what you're looking for so I can help.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const recommendation = await getAIRecommendation(query, products);
      setOutput(recommendation);
    } catch (err) {
      setError("Couldn't fetch AI response, showing curated picks instead.");
      setOutput(
        "Top picks:\n• Wireless Headphones — immersive sound for work & play.\n• Travel Backpack — weather-ready weekender."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-box">
      <div className="ai-box__header">
        <h3>AI stylist</h3>
        <span>Gemini powered</span>
      </div>

      <textarea
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Recommend sports gear under ₹2000"
        rows={3}
      />
      <button onClick={handleAI} disabled={isLoading}>
        {isLoading ? "Thinking..." : "Ask AI"}
      </button>

      {error && <p className="ai-error">{error}</p>}

      <pre>{output}</pre>
    </div>
  );
}
