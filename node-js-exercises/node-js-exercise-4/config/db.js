import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const dbLabel = process.env.NODE_ENV === "production" ? "🌐 Atlas DB" : "🖥️  local DB";
    console.log(`✅ MongoDB connected (${dbLabel})`);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
