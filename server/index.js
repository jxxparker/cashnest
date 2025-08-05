import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import assetsRouter from "./features/networth/routes/assets.js";
import debtsRouter from "./features/networth/routes/debts.js";
import stocksRouter from "./features/networth/routes/stocks.js";
import expensesRouter from "./features/expenses/routes/expenses.js";
import authRouter from "./features/auth/routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/fintrackr";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/assets", assetsRouter);
app.use("/api/debts", debtsRouter);
app.use("/api/stocks", stocksRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
