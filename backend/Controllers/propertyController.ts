import { Request, Response } from "express";
import Property from "../MODELS/property";

export const createProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, location, pricePerNight, images } = req.body;
    const property = await Property.create({ title, description, location, pricePerNight, images });
    res.status(201).json({ status: "success", data: property });
  } catch (error: any) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const getProperties = async (_req: Request, res: Response): Promise<void> => {
  const properties = await Property.find().sort({ createdAt: -1 });
  res.json({ status: "success", data: properties });
};

export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const property = await Property.findById(id);
  if (!property) {
    res.status(404).json({ status: "error", message: "Property not found" });
    return;
  }
  res.json({ status: "success", data: property });
};

