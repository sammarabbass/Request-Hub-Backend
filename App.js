require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
require("dotenv").config();

const app = express();
app.use(cors({
  origin: [
    "https://railway.app",
    "http://localhost:5173"
  ],
  credentials: true
}));
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
