// import mongoose from 'mongoose';

// const connectDb = handler => async (req, res) => {
//     if (mongoose.connections[0].readyState) {
//         return handler(req, res);
//     }

//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
    
//         });
//         console.log("MongoDB connected");
//     } catch (error) {
//         console.error("MongoDB connection error:", error);
//         return res.status(500).json({ message: "Database connection failed" });
//     }

//     return handler(req, res);
// };

// export default connectDb;






// import mongoose from "mongoose";

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// const connectDb = (handler) => async (req, res) => {
//   if (cached.conn) {
//     // Already connected
//     return handler(req, res);
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//     console.log("✅ MongoDB connected");
//     return handler(req, res);
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error);
//     return res.status(500).json({ message: "Database connection failed" });
//   }
// };

// export default connectDb;

// middleware/mongoose.js
import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDb() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected");
    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

export default connectDb;
