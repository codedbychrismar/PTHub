import express from "express";
import membersRoutes from "./routes/membersRoutes";
import coachesRoutes from "./routes/coachesRoutes";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

// Enable CORS before routes
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true, // 👈 allow cookies
  })
);

app.use(express.json());

app.use("/api/members", membersRoutes);
app.use("/api/coaches", coachesRoutes);

export default app;