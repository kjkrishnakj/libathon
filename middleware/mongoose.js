// middleware/mongoose.js
import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = (handler) => async (req, res) => {
  if (cached.conn) {
    return handler(req, res);
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, opts)
      .then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected");
    return handler(req, res);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    return res.status(500).json({ message: "Database connection failed" });
  }
};

export default connectDb;
