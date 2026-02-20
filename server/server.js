require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const matchRoutes = require("./routes/matchRoutes");
const errorHandler = require("./middleware/errorMiddleware");

connectDB();

const app = express();

// Security
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
app.use(limiter);

// Routes
app.use("/api/matches", matchRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "API Running" });
});

// Error middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});