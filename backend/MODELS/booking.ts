import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IBooking extends Document {
  user: Types.ObjectId;
  property: Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const bookingSchema: Schema<IBooking> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    totalPrice: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const Booking: Model<IBooking> = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;

