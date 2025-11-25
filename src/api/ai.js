import axios from "axios";

const aiApi = axios.create({
  baseURL: "https://generativelanguage.googleapis.com/v1beta2/models/",
  params: {
    key: process.env.REACT_APP_AI_KEY
  }
});

const buildPrompt = (query, products) => {
  const summarizedCatalog = products
    .slice(0, 6)
    .map(
      (product) =>
        `${product.name} (${product.category}) at ₹${product.price} — ${product.description}`
    )
    .join("\n");

  return `You are an upbeat ecommerce stylist. Recommend up to three items based on this shopper request: "${query}". Available inventory:\n${summarizedCatalog}\nRespond with short bullet points describing why each pick is relevant.`;
};

const generateText = async (prompt) => {
  const response = await aiApi.post("gemini-1.5-flash:generateContent", {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  });

  return response.data.candidates[0].content.parts[0].text;
};

const STOP_WORDS = new Set([
  "show",
  "find",
  "give",
  "need",
  "want",
  "please",
  "items",
  "products",
  "under",
  "below",
  "cheap",
  "best",
  "good",
  "with",
  "for",
  "and",
  "the"
]);

const parseQuery = (query) => {
  const normalized = query.toLowerCase();
  const priceMatch = normalized.match(
    /(?:under|below|less than|under ₹|under rs)?\s*₹?\s*(\d[\d,]*)/i
  );
  const budget = priceMatch ? Number(priceMatch[1].replace(/,/g, "")) : null;

  const tokens = normalized
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));

  return { tokens, budget };
};

const fallbackRecommendation = (query, products) => {
  const { tokens, budget } = parseQuery(query);

  const matches = products
    .map((product) => {
      const haystack = `${product.name} ${product.category} ${product.brand} ${product.description}`.toLowerCase();
      const tokenScore = tokens.reduce(
        (score, token) => (haystack.includes(token) ? score + 1 : score),
        0
      );
      const budgetOk = !budget || !product.price || product.price <= budget;
      return {
        product,
        tokenScore,
        budgetOk
      };
    })
    .filter(({ tokenScore, budgetOk }) => {
      if (!tokens.length) {
        return budgetOk;
      }
      return tokenScore > 0 && budgetOk;
    })
    .sort((a, b) => b.tokenScore - a.tokenScore)
    .slice(0, 3)
    .map(({ product }) => product);

  if (matches.length === 0) {
    const categories = Array.from(
      new Set(products.map((product) => product.category))
    )
      .slice(0, 4)
      .join(", ");

    return `No direct matches yet. Try keywords such as ${categories}.`;
  }

  return matches
    .map(
      (product) =>
        `• ${product.name} — ₹${product.price.toLocaleString("en-IN")} | ${product.description}`
    )
    .join("\n");
};

export const getAIRecommendation = async (query, products) => {
  if (!query.trim()) {
    return "Tell me what you're shopping for and I'll share curated picks.";
  }

  if (!process.env.REACT_APP_AI_KEY) {
    return fallbackRecommendation(query, products);
  }

  try {
    const prompt = buildPrompt(query, products);
    return await generateText(prompt);
  } catch (error) {
    console.error("AI request failed", error);
    return fallbackRecommendation(query, products);
  }
};