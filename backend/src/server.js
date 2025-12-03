import app from "./app.js";
import { serverConfig } from "./config.js";

app.listen(serverConfig.port, () => {
  console.log(`Flipkart proxy API running on http://localhost:${serverConfig.port}`);
});

