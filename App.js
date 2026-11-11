require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Replace with your frontend URL
  credentials: true,               // Allow cookies / authorization headers if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
connectDB()

app.use(express.json());

app.use("/api/auth", require("./routes/authRoute"));

app.use("/api/requests", require("./routes/requestRoutes"));

// Testing
app.get("/", (req, res) => {
  res.json({
    message: "Service Hub API is running!",
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
