const TeamInvite = require("../../../models/teamInvite");

const rejectInvite = async (req, res) => {
    try {
        const { inviteId } = req.params;

        const invite = await TeamInvite.findByIdAndDelete(inviteId);
        if (!invite) {
            return res.status(404).json({ success: false, message: "Invitation not found" });
        }

        if (invite.email !== req.user.email) {
            return res.status(403).json({ success: false, message: "This invitation is not for you" });
        }

        await TeamInvite.findByIdAndDelete(inviteId);

        return res.status(200).json({
            success: true,
            message: "Invitation rejected",
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = rejectInvite;
