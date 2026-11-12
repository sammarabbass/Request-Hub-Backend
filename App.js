require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dns=require("dns")
const app = express();
// dns.setDefaultResultOrder("ipv4first");
dns.setDefaultResultOrder("ipv4first");
const allowedOrigins = [
  "https://railway.app",
  "http://localhost:5173",
  process.env.FRONTEND_URL?.replace(/\/$/, "") // Automatically removes any trailing slash
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl/Postman) or allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

connectDB();

app.use(express.json());

app.use("/api/auth", require("./routes/authRoute"));

app.use("/api/requests", require("./routes/requestRoutes"));

// Testing
app.get("/", (req, res) => {
  res.json({
    message: "Service Hub API is running ok!",
  });
});

// Error
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Server Error",
  });
});

// middleware - validation (security concerns) - code between the code

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
