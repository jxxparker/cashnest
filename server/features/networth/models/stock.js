import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  shares: { type: Number, required: true },
  price: { type: Number }, // latest fetched price
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Stock", stockSchema);
