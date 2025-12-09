const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

router.post("/list", async (req, res) => {
  try {
    const tickets = await Ticket.find({ _id: { $in: req.body.ids } })
      .populate("eventId"); // Get event info too
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: "Failed to load tickets" });
  }
});

module.exports = router;
