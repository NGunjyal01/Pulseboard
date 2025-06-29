const mongoose = require('mongoose');

const chartSchema = new mongoose.Schema({
    dashboard: { type: mongoose.Schema.Types.ObjectId, ref: 'Dashboard', required: true },
    title: String,
    type: String, // line, bar, pie, etc.
    data: Array,
    config: mongoose.Schema.Types.Mixed,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });


module.exports = mongoose.model('Chart', chartSchema);