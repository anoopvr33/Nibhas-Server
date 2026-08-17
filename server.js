import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import jobApplicationRoutes from "./routes/jobApplicationRoutes.js";
import designationRoutes from "./routes/designationRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import vacancyRoutes from "./routes/vacancyRoutes.js";
import cityRoutes from "./routes/cityRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import path from "node:path";

dotenv.config();

// ==========================================
// CONNECT DATABASE
// ==========================================

connectDB();

// ==========================================
// APP
// ==========================================

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

const allowedOrigins = [
  "https://admin.nibhashrdsolutions.com",
  "https://nibhashrdsolutions.com",
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "http://localhost:3000",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json());

// ==========================================
// ROUTES
// ==========================================
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// 🔥 GLOBAL REQUEST LOGGER
app.use((req, res, next) => {
  console.log("➡️ REQUEST:", req.method, req.originalUrl);
  next();
});

// TEST

app.post("/test-post", (req, res) => {
  console.log("🔥 TEST POST RECEIVED");

  console.log("BODY:", req.body);

  res.json({
    message: "POST is working",
  });
});

// ==========================================
// STATIC UPLOADS
// ==========================================

app.use("/uploads", express.static("uploads"));

app.use("/api/designations", designationRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/job-applications", jobApplicationRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/vacancies", vacancyRoutes);

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "Doctor Recruitment API is running",
  });
});

// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
