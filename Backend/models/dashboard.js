const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  title: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  collaborators: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, enum: ['viewer', 'editor', 'admin'], default: 'viewer' },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Dashboard', dashboardSchema);
