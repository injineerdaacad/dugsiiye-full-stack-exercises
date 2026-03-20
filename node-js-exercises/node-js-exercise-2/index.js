import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app = express();


// Global middlewares
app.use(express.json());

app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "*"
}));


// Routes
app.get("/", (req, res) => {
    res.json({ message: "Rest API is running..." });
});

app.use("/books", bookRoutes);


// DB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("❌ DB Connection Error:", err.message);
        process.exit(1);
    }
};


// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
