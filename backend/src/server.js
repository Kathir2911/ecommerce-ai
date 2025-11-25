import express from "express";
import cors from "cors";
import morgan from "morgan";
import productsRoute from "./routes/products.js";
import { serverConfig } from "./config.js";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (serverConfig.corsOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    }
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/products", productsRoute);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(error.status || 500).json({ message: error.message });
});

app.listen(serverConfig.port, () => {
  console.log(`Flipkart proxy API running on http://localhost:${serverConfig.port}`);
});

