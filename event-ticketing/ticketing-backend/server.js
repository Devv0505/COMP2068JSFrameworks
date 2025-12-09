require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const paypalRoutes = require("./src/routes/paypal");
app.use("/api/paypal", paypalRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

app.use("/api/events", require("./src/routes/events"));
app.use("/api/paypal", require("./src/routes/paypal"));
const ticketRoutes = require("./src/routes/tickets");
app.use("/api/tickets", ticketRoutes);
app.get("/", (req, res) => res.send("Backend running"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get('/api/paypal/complete-order', async (req, res) => {
  const { token, PayerID } = req.query;

  try {
    const capture = await paypalClient.captureOrder(token);

    // 🔥 Create ticket in DB
    const ticket = await Ticket.create({
      eventId: capture.purchase_units[0].reference_id,
      payerId: PayerID,
      orderId: token,
      createdAt: new Date()
    });

    // 🔥 Redirect to frontend with ticket id
    res.redirect(`http://localhost:4200/success?ticketId=${ticket._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Order capture failed");
  }
});
