import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./DB/db"
import userRouter from "./ROUTERS/userRouter"
import propertyRouter from "./ROUTERS/propertyRouter"
import bookingRouter from "./ROUTERS/bookingRouter"

dotenv.config();

const app: Application = express();

const PORT: number = Number(process.env.PORT) || 3000;
const CLIENT_URL: string = process.env.CLIENT_URL || "http://localhost:3001";

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

connectDB();

app.use("/api/users", userRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/bookings", bookingRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to StayWise API 🚀" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
