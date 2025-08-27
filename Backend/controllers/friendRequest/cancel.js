const FriendRequest = require("../../models/friendRequest");

const cancel = async (req, res) => {
    try {
    const fromUserId = req.user.id; 
    const { to } = req.params; 

    if (!to) {
        return res.status(400).json({
        success: false,
        message: "Recipient user id is required",
        });
    }

    // Find and delete the friend request
    const request = await FriendRequest.findOneAndDelete({
        from: fromUserId,
        to,
    });

    if (!request) {
        return res.status(404).json({
        success: false,
        message: "Friend request not found or already cancelled/accepted",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Friend request cancelled successfully",
    });
    } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
    });
    }
};

module.exports = cancel;
