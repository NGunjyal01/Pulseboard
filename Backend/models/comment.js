const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  dashboard: { type: mongoose.Schema.Types.ObjectId, ref: 'Dashboard', required: true },
  chartId: String, // frontend chart ID to know where to display
  text: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: Date,
});

module.exports = mongoose.model('Comment', commentSchema);
