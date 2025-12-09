const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// GET all events
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Seed sample events
router.post("/seed", async (req, res) => {
  await Event.deleteMany();

  await Event.insertMany([
    {
      title: "Tech Conference 2025",
      description: "A cool tech conference.",
      date: "2025-12-19",
      price: 25,
      currency: "USD"
    },
    {
      title: "JavaScript Workshop",
      description: "Hands-on JS practice.",
      date: "2025-12-20",
      price: 15,
      currency: "USD"
    }
  ]);

  res.json({ message: "Events seeded" });
});

module.exports = router;
