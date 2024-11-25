import mongoose from "mongoose";

const peopleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Peoples", peopleSchema);
