import { Router } from "express";
import { searchFlipkartItems } from "../flipkartClient.js";

const router = Router();

router.get("/", async (req, res) => {
  const keywords = req.query.keywords || "smart home gadgets";
  const itemCount = Number(req.query.limit) || 12;

  try {
    const { items } = await searchFlipkartItems({ keywords, resultCount: itemCount });
    res.json({ items });
  } catch (error) {
    console.error("Flipkart API error", error.message);
    res.status(500).json({
      message: "Unable to fetch Flipkart products",
      details: error.response?.data ?? error.message
    });
  }
});

export default router;

