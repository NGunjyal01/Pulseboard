const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  dashboard: { type: mongoose.Schema.Types.ObjectId, ref: 'Dashboard', required: true },
  chartId: { type: String, required: true }, // frontend chart UUID
  content: String,
  position: { x: Number, y: Number },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Note', noteSchema);