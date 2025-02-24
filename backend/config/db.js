import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let gridFSBucket;

const connectDB = async () => {
  try {
    const db = mongoose.connection;
    db.once("open", () => {
      gridFSBucket = new GridFSBucket(db.db, { bucketName: "uploads" });
      console.log("DB Connected");
      console.log("GridFSBucket initialized");
    });
    await mongoose.connect(process.env.CONNECTION_STRING);
  } catch (error) {
    console.error(`Connection error: ${error.message}`);
  }
};

export { connectDB, gridFSBucket };
