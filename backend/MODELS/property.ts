import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProperty extends Document {
  title: string;
  description: string;
  location: string;
  pricePerNight: number;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const propertySchema: Schema<IProperty> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    pricePerNight: { type: Number, required: true, min: 0 },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Property: Model<IProperty> = mongoose.model<IProperty>("Property", propertySchema);

export default Property;

