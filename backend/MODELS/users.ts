import mongoose, { Document, Model, Schema } from "mongoose";

// 1. Define a TypeScript interface for User document
export interface IUser extends Document {
  userName: string;
  emailId: string;
  password: string;
  mobileNumber: string;
  role: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define the Mongoose schema
const userSchema: Schema<IUser> = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    emailId: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password cannot be empty"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^\d{10}$/, "Mobile number must be of 10 digits"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// 3️. Create and export the model
const Users: Model<IUser> = mongoose.model<IUser>("Users", userSchema);

export default Users;
