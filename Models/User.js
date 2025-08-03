const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password_hash: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports= mongoose.model("User", userSchema)
