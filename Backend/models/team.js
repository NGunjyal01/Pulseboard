const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    imageUrl:{
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    members: [{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true,
        },
        role:{
            type: String,
            enum: ['owner','admin','member'],
            default: 'member',
        },
        joinedAt:{
            type: Date,
            default: Date.now,
        }
    }],
    dashboards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dashboard'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);
