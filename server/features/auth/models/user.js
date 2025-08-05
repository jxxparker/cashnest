import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    name: String,
    value: Number,
  },
  { _id: true }
);

const debtSchema = new mongoose.Schema(
  {
    name: String,
    value: Number,
  },
  { _id: true }
);

const stockSchema = new mongoose.Schema(
  {
    symbol: String,
    shares: Number,
    price: Number,
  },
  { _id: true }
);

const expenseSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
  },
  { _id: true }
);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  assets: [assetSchema],
  debts: [debtSchema],
  stocks: [stockSchema],
  expenses: [expenseSchema],
});

export default mongoose.model("User", userSchema);
