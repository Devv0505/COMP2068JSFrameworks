require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ⭐ STRONG CORS FIX (WORKS FOR RENDER + LOCALHOST)
app.use(
  cors({
    origin: "*",  // allow all origins (or add your frontend URL)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ROUTES
app.use("/api/paypal", require("./src/routes/paypal"));
app.use("/api/events", require("./src/routes/events"));
app.use("/api/tickets", require("./src/routes/tickets"));

app.get("/", (req, res) => res.send("Backend running"));

// CONNECT TO DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// SERVER START
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// 🟦 OPTIONAL: Order completion (only works locally unless changed)
app.get("/api/paypal/complete-order", async (req, res) => {
  const { token, PayerID } = req.query;

  try {
    const capture = await paypalClient.captureOrder(token);

    const ticket = await Ticket.create({
      eventId: capture.purchase_units[0].reference_id,
      payerId: PayerID,
      orderId: token,
      createdAt: new Date(),
    });

    // FIX THIS BEFORE DEPLOYING
    res.redirect(`http://localhost:4200/success?ticketId=${ticket._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Order capture failed");
  }
});
