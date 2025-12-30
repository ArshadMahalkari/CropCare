const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    passwordHash: { type: String, required: true },
    role: { type: String, default: 'farmer' },
    preferences: {
      language: { type: String, default: 'EN' },
      region: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
