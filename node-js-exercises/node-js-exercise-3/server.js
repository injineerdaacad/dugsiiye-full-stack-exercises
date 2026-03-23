import dotenv from "dotenv";
import connectDB from "./config/db.js";
import createApp from "./app.js";

const nodeEnv = process.env.NODE_ENV || "development";

dotenv.config({ path: `.env.${nodeEnv}`, quiet: true });

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const app = createApp();

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT} in ${nodeEnv} mode-> ${BASE_URL}`);
  });
};

startServer();
