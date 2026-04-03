import dotenv from "dotenv";

const nodeEnv = process.env.NODE_ENV || "development";

dotenv.config({ path: `.env.${nodeEnv}`, quiet: true });

const { default: connectDB } = await import("./config/db.js");
const { default: createApp } = await import("./app.js");

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const app = createApp();

if (nodeEnv !== "production") {
  console.log("🖥️  Development mode - logs and debug enabled");
}

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT} in ${nodeEnv} mode -> ${BASE_URL}`);
  });
};

startServer();
