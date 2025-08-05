import express from "express";
import User from "../../auth/models/user.js";
import { authMiddleware } from "../../auth/utils/authMiddleware.js";
import axios from "axios";
const router = express.Router();
router.use(authMiddleware);

const TWELVE_API_URL = "https://api.twelvedata.com/price";
const API_KEY = "1480e33d66c94f0ab0e152fe8d081709";
console.log("Using Twelve Data API key:", API_KEY);

router.get("/", async (req, res) => {
  const user = await User.findById(req.user.userId);
  const stocks = user.stocks || [];
  const updatedStocks = await Promise.all(
    stocks.map(async (stock) => {
      let price = stock.price;
      try {
        const response = await axios.get(TWELVE_API_URL, {
          params: {
            symbol: stock.symbol,
            apikey: API_KEY,
          },
        });
        console.log(`Twelve Data response for ${stock.symbol}:`, response.data);
        // If API returns error or quota exceeded, fallback to last recorded price
        if (
          response.data.status === "error" ||
          response.data.price === undefined
        ) {
          // keep old price
        } else {
          const parsedPrice = parseFloat(response.data.price);
          price = isNaN(parsedPrice) ? stock.price : parsedPrice;
        }
      } catch (err) {
        console.error(`Error fetching price for ${stock.symbol}:`, err);
        // keep old price if API fails
      }
      return { ...stock.toObject(), price };
    })
  );
  res.json(updatedStocks);
});

router.post("/", async (req, res) => {
  let { symbol, shares } = req.body;
  symbol = symbol.toUpperCase();
  let price = null;
  try {
    const response = await axios.get(TWELVE_API_URL, {
      params: {
        symbol,
        apikey: API_KEY,
      },
    });
    console.log(`Twelve Data response for ${symbol}:`, response.data);
    const parsedPrice = parseFloat(response.data.price);
    price = isNaN(parsedPrice) ? null : parsedPrice;
  } catch (err) {
    console.error(`Error fetching price for ${symbol}:`, err);
    price = null;
  }
  const user = await User.findById(req.user.userId);
  // Merge shares if symbol already exists (case-insensitive)
  const existing = user.stocks.find((s) => s.symbol.toUpperCase() === symbol);
  if (existing) {
    existing.shares += shares;
    existing.price = price;
    await user.save();
    res.status(201).json(existing);
  } else {
    user.stocks.push({ symbol, shares, price });
    await user.save();
    res.status(201).json(user.stocks[user.stocks.length - 1]);
  }
});

router.delete("/:id", async (req, res) => {
  const user = await User.findById(req.user.userId);
  user.stocks = user.stocks.filter((s) => s._id.toString() !== req.params.id);
  await user.save();
  res.sendStatus(204);
});

export default router;
