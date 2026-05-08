import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import homeRoutes from "./routes/home.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import userRoutes from "./routes/user.routes.js";

import corsOptions from "./config/cors.js";
import logger from "./middlewares/logger.middleware.js";
import rateLimiter from "./middlewares/rate-limiter.middleware.js";
import notFound from "./middlewares/not-found.middleware.js";
import errorHandler from "./middlewares/error-handler.middleware.js";
import { swaggerSpec } from "./utility/swagger.js";

const createApp = () => {
  const app = express();

  if (process.env.TRUST_PROXY) {
    app.set("trust proxy", process.env.TRUST_PROXY || 1);
  }

  app.use(express.json());
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(logger);
  app.use(rateLimiter);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/", homeRoutes);
  app.use("/admin", adminRoutes);
  app.use("/auth", authRoutes);
  app.use("/categories", categoryRoutes);
  app.use("/dashboard", dashboardRoutes);
  app.use("/transactions", transactionRoutes);
  app.use("/upload", uploadRoutes);
  app.use("/users", userRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default createApp;
