import express from "express";
import membersRoutes from "./routes/membersRoutes";
import coachesRoutes from "./routes/coachesRoutes";
import dotenv from "dotenv";
import cors from "cors";
import appointmentsRoutes from "./routes/appointmentsRoutes";
import webhookRoutes from "./routes/webhookRoutes";

const app = express();
dotenv.config();

// Enable CORS before routes
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://pthub-frontend-omdo8.ondigitalocean.app",      
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);


app.use(express.json());

app.use("/api/members", membersRoutes);
app.use("/api/coaches", coachesRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/webhook", webhookRoutes);

export default app;