const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Ticket = require("../models/Ticket");
const paypalService = require("../services/paypalService");

// Create PayPal order
router.post("/create-order", async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);

    const order = await paypalService.createOrder(event);
    const approvalUrl = order.links.find(l => l.rel === "approve").href;

    res.json({ id: order.id, approvalUrl });

  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ error: "PayPal order failed." });
  }
});

// Capture order + save ticket
router.post("/capture-order", async (req, res) => {
  try {
    const { orderId } = req.body;

    const capture = await paypalService.captureOrder(orderId);

    const eventId = capture.purchase_units[0].reference_id;
    const event = await Event.findById(eventId);

    const ticket = await Ticket.create({
      eventId,
      orderId,
      payerEmail: capture.payer.email_address,
      purchasedAt: new Date(),
      eventDetails: event   // store whole event
    });

    res.json({
      ticketId: ticket._id,
      event: event,
      purchasedAt: ticket.purchasedAt
    });

  } catch (err) {
    console.error("Capture error:", err);
    res.status(500).json({ error: "Payment capture failed." });
  }
});

module.exports = router;
