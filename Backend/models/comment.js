const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  dashboardId: { type: mongoose.Schema.Types.ObjectId, ref: "Dashboard", required: true },
  chartId: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
},{timestamps:true});

module.exports = mongoose.model('Comment', commentSchema);
