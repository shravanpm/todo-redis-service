import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_DB } = process.env;
let mongoURI =
  MONGO_USERNAME && MONGO_PASSWORD
    ? `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`
    : `mongodb://${MONGO_HOST}/${MONGO_DB}`;
export const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
