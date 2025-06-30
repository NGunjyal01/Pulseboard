const mongoose = require("mongoose");

const friendRequestSchema = new mongoose.Schema({
    from:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},{timestamps: true});

friendRequestSchema.pre("save", function(next){
    if(this.from.toString() === this.to.toString()){
        throw new Error("You cannot send a friend request to yourself");
    };
    next();
})

friendRequestSchema.index({ from: 1, to: 1 }, { unique: true });

module.exports = mongoose.model("FriendRequest", friendRequestSchema);