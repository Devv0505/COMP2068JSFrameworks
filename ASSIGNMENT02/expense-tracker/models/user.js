const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: String,
  password: String,            // for local auth
  githubId: String             // for GitHub auth
});

module.exports = mongoose.model('User', userSchema);
