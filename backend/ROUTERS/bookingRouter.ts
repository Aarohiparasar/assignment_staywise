import express from "express";
import { createBooking, getAllBookings, getMyBookings } from "../Controllers/bookingController";
import authMiddleware from "../Middleware/authRoute";

const router = express.Router();

// Authenticated users
router.post("/", authMiddleware, createBooking);
router.get("/me", authMiddleware, getMyBookings);

// Admin
router.get("/", authMiddleware, (req, res, next) => {
  const role = (req as any).user?.role;
  if (role !== "admin") return res.status(403).json({ message: "Forbidden" });
  next();
}, getAllBookings);

export default router;

