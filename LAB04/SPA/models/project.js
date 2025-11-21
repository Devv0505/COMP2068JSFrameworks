var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dueDate: { type: String, required: true },
  course: { type: String, required: true }
});

module.exports = mongoose.model('Project', projectSchema);
