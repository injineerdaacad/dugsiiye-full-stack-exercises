import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `✅ MongoDB connected (${process.env.NODE_ENV === "production" ? "🌐 Atlas DB" : "🖥️  local DB"})`
    );
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
