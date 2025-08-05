import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  type: { type: String, default: "asset" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Asset", assetSchema);
