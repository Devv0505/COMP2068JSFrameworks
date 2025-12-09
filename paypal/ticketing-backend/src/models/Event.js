const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  price: Number,
  currency: { type: String, default: "USD" }
});

module.exports = mongoose.model("Event", EventSchema);
