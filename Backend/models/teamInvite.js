const mongoose = require("mongoose");

const teamInviteSchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    invitedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    role: {
        type: String,
        enum: ["owner", "admin", "member"],
        default: "member",
    },
}, { timestamps: true });

teamInviteSchema.index({ team: 1, email: 1 }, { unique: true });

module.exports = mongoose.model("TeamInvite", teamInviteSchema);
