import mongoose from "mongoose";

const debtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  type: { type: String, default: "debt" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Debt", debtSchema);
