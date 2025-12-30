const mongoose = require('mongoose');

const AdvisorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    input: {
      crop: { type: String },
      soil: { type: String },
      language: { type: String },
    },
    result: { type: Object },
    version: { type: String, default: 'v1' },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Advisory', AdvisorySchema);
