import express from "express";
import User from "../../auth/models/user.js";
import { authMiddleware } from "../../auth/utils/authMiddleware.js";
const router = express.Router();
router.use(authMiddleware);

// Get all expenses for the authenticated user
router.get("/", async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json(user.expenses || []);
});

// Add a new expense to the authenticated user
router.post("/", async (req, res) => {
  const user = await User.findById(req.user.userId);
  user.expenses.push(req.body);
  await user.save();
  res.status(201).json(user.expenses[user.expenses.length - 1]);
});

// Delete an expense from the authenticated user
router.delete("/:id", async (req, res) => {
  const user = await User.findById(req.user.userId);
  user.expenses = user.expenses.filter(
    (e) => e._id.toString() !== req.params.id
  );
  await user.save();
  res.sendStatus(204);
});

export default router;
