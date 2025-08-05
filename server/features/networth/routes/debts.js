import express from "express";
import User from "../../auth/models/user.js";
import { authMiddleware } from "../../auth/utils/authMiddleware.js";
const router = express.Router();
router.use(authMiddleware);

router.get("/", async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json(user.debts || []);
});

router.post("/", async (req, res) => {
  const user = await User.findById(req.user.userId);
  user.debts.push(req.body);
  await user.save();
  res.status(201).json(user.debts[user.debts.length - 1]);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findById(req.user.userId);
  user.debts = user.debts.filter((d) => d._id.toString() !== req.params.id);
  await user.save();
  res.sendStatus(204);
});

export default router;
