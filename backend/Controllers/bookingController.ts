import { Request, Response } from "express";
import Booking from "../MODELS/booking";
import Property from "../MODELS/property";

export const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const { propertyId, checkIn, checkOut } = req.body;
    const userId = (req as any).user?.id || req.body.userId; // fallback for tests

    if (!userId) {
      res.status(401).json({ status: "error", message: "Unauthorized" });
      return;
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      res.status(404).json({ status: "error", message: "Property not found" });
      return;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
      res.status(400).json({ status: "error", message: "Invalid dates" });
      return;
    }

    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * property.pricePerNight;

    const booking = await Booking.create({
      user: userId,
      property: propertyId,
      checkIn: start,
      checkOut: end,
      totalPrice,
    });

    res.status(201).json({ status: "success", data: booking });
  } catch (error: any) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const getMyBookings = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user?.id || req.params.userId;
  const bookings = await Booking.find({ user: userId }).populate("property").sort({ createdAt: -1 });
  res.json({ status: "success", data: bookings });
};

export const getAllBookings = async (_req: Request, res: Response): Promise<void> => {
  const bookings = await Booking.find().populate("property").populate("user").sort({ createdAt: -1 });
  res.json({ status: "success", data: bookings });
};

