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

export const cancelBooking = async (req: Request, res: Response): Promise<Response> => {
  try {
    const bookingId = req.params.id;
console.log(req.params.id,'bookingid---')
    if (!bookingId) {
      return res.status(400).json({ message: "Booking ID is required" });
    }

    // Find the booking first
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Optional: Only allow the user who booked to cancel
    // if (booking.user.toString() !== req.user.id) {
    //   return res.status(403).json({ message: "Not authorized to cancel this booking" });
    // }

    await booking.deleteOne(); // Delete the booking
    return res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Unable to cancel booking" });
  }
};

