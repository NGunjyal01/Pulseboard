const TeamInvite = require("../../../models/teamInvite");

const getAllInvitations = async (req, res) => {
    try {
        const userEmail = req.user.email;

        const invitations = await TeamInvite.find({email: userEmail})
            .populate("team", "name description imageUrl members")
            .populate("invitedBy", "firstName lastName email imageUrl");

        return res.status(200).json({
            success: true,
            invitations,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

module.exports = getAllInvitations;
