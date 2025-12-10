require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// CORS SETUP
app.use(cors({
  origin: ["http://localhost:4200",  "https://ticketing-frontend.onrender.com"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// CONNECT MONGO
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Mongo error:", err));

// ROUTES
app.use("/api/events", require("./src/routes/events"));
app.use("/api/paypal", require("./src/routes/paypal"));
app.use("/api/tickets", require("./src/routes/tickets"));

// TEST ROUTE
app.get("/", (req, res) => res.send("Backend running OK"));

// START SERVER
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
