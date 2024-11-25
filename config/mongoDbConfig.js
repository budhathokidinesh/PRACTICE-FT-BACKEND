import mongoose from "mongoose";

const MONGO_URL = "mongodb://localhost:27017/people_tracker";
export const conMongoDb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    conn && console.log("mongoDb connected");
  } catch (error) {}
};
