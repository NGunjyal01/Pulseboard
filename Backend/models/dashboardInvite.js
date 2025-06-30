const mongoose = require('mongoose');

const dashboardInviteSchema = new mongoose.Schema({
    dashboard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dashboard',
        required: true,
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    role: {
        type: String,
        enum: ['viewer', 'editor', 'admin'],
        default: 'viewer',
    },
    // status: {
    //     type: String,
    //     enum: ['pending', 'accepted', 'declined'],
    //     default: 'pending',
    // },
}, { timestamps: true });

dashboardInviteSchema.pre("save", function(next){
    if(this.from.toString() === this.to.toString()){
        throw new Error("You cannot send a friend request to yourself");
    };
    next();
})

dashboardInviteSchema.index({ from: 1, to: 1 }, { unique: true });

module.exports = mongoose.model('DashboardInvite', dashboardInviteSchema);
