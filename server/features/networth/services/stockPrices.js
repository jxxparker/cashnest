// Service to fetch live stock prices
import axios from "axios";

const STOCK_API_URL = "https://www.alphavantage.co/query";
const API_KEY = process.env.ALPHA_VANTAGE_KEY;

export async function fetchStockPrice(symbol) {
  try {
    const response = await axios.get(STOCK_API_URL, {
      params: {
        function: "GLOBAL_QUOTE",
        symbol,
        apikey: API_KEY,
      },
    });
    return parseFloat(response.data["Global Quote"]["05. price"]);
  } catch (err) {
    return null;
  }
}
