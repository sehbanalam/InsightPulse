import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";

const PORT = process.env["PORT"] || 5000;
const MONGO_URI = process.env["MONGO_URI"] || "";

const clientOptions = {
  serverApi: { version: "1" as const, strict: true, deprecationErrors: true },
};

const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, clientOptions);
    console.log("✅ Connected to MongoDB");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

startServer();
