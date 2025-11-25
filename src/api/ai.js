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

const fallbackRecommendation = (query, products) => {
  const normalizedQuery = query.toLowerCase();
  const matches = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery)
    )
    .slice(0, 3);

  if (matches.length === 0) {
    return 'No direct matches yet. Try searching with a category like "electronics" or "home".';
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