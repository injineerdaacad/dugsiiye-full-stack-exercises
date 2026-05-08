import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(currentDir, ".env"), quiet: true });

const { default: connectDB } = await import("./config/db.js");
const { default: createApp } = await import("./app.js");

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const app = createApp();

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT} -> ${BASE_URL}`);
  });
};

startServer();
