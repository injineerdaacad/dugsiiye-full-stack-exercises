import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

import logger from "./middlewares/logger.middleware.js";
import notFound from "./middlewares/not-found.middleware.js";
import errorHandler from "./middlewares/error-handler.middleware.js";

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(",") || "*" }));
  app.use(logger);

  app.get("/", (req, res) => {
    res.json({ message: "Rest API is running..." });
  });

  app.use("/auth", authRoutes);
  app.use("/dashboard", dashboardRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default createApp;
