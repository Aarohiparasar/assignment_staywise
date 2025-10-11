import express from "express";
import { createProperty, getProperties, getPropertyById } from "../Controllers/propertyController";
import authMiddleware from "../Middleware/authRoute";

const router = express.Router();

// Public
router.get("/", getProperties);
router.get("/:id", getPropertyById);

// Admin only (simple check via role in token)
router.post("/", authMiddleware, (req, res, next) => {
  const role = (req as any).user?.role;
  if (role !== "admin") return res.status(403).json({ message: "Forbidden" });
  next();
}, createProperty);

export default router;

