import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import bookRoutes from "./routes/bookRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

// CORS configuration
app.use(
  cors({
    origin: allowedOrigins
  })
);

app.use("/books", bookRoutes);

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log(`MongoDB connected on ${MONGO_URI}`))
  .catch(err => console.error(err));


const NODE_ENV = process.env.NODE_ENV || 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT} and URL: http://${HOST}:${PORT}`);
});
