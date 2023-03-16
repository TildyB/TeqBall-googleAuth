import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", false);

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async (): Promise<boolean> => {
  try {
    await mongoose.connect(MONGO_URI as string);
    console.log("Connected to the DB".green);
    return true;
  } catch (error: Error | any) {
    console.log(error.message.red);
    return false;
  }
};

export default connectDB;
