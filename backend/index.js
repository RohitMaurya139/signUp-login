import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js"
import authRouter from "./routes/authRoutes.js";
dotenv.config();
const app = express();


// Change these to match your deployment domains
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

// CORS middleware for REST API
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// Api routes
app.use("/api/auth", authRouter);

const PORT = 4000;
const startServer = async () => {
     await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};
startServer();
