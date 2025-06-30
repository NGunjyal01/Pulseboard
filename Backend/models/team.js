const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    members: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
    ],
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);
