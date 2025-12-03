import { Router } from "express";
import { searchFlipkartItems } from "../flipkartClient.js";
import { searchAmazonProducts } from "../amazonClient.js";

const router = Router();

router.get("/", async (req, res) => {
  const keywords = req.query.keywords || "laptop";
  const itemCount = Number(req.query.limit) || 12;
  const page = Number(req.query.page) || 1;

  // Split count between both APIs (roughly equal)
  const flipkartCount = Math.ceil(itemCount / 2);
  const amazonCount = Math.floor(itemCount / 2);

  try {
    // Fetch from both APIs in parallel
    const [flipkartResult, amazonResult] = await Promise.allSettled([
      searchFlipkartItems({ keywords, resultCount: flipkartCount, page }),
      searchAmazonProducts({ keywords, resultCount: amazonCount, page })
    ]);

    // Collect items from successful API calls
    const allItems = [];

    if (flipkartResult.status === "fulfilled") {
      allItems.push(...flipkartResult.value.items);
    } else {
      console.error("Flipkart API failed:", flipkartResult.reason?.message);
    }

    if (amazonResult.status === "fulfilled") {
      allItems.push(...amazonResult.value.items);
    } else {
      console.error("Amazon API failed:", amazonResult.reason?.message);
    }

    // If both APIs failed, return error
    if (allItems.length === 0) {
      return res.status(500).json({
        message: "Unable to fetch products from both APIs",
        details: {
          flipkart: flipkartResult.status === "rejected" ? flipkartResult.reason?.message : "OK",
          amazon: amazonResult.status === "rejected" ? amazonResult.reason?.message : "OK"
        }
      });
    }

    res.json({ items: allItems });
  } catch (error) {
    console.error("Products API error", error.message);
    res.status(500).json({
      message: "Unable to fetch products",
      details: error.message
    });
  }
});

export default router;
