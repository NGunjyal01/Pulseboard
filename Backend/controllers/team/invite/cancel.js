const Team = require("../../../models/team");
const TeamInvite = require("../../../models/teamInvite");

const cancelInvite = async (req, res) => {
    try {
        const { inviteId } = req.params;
        const { teamId } = req.body;
        const userId = req.user.id;

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ success: false, message: "Team not found" });
        }

        const inviter = team.members.find(
            (m) => m.user.toString() === userId.toString()
        );
        if (!inviter || !["owner", "admin"].includes(inviter.role)) {
            return res.status(403).json({ success: false, message: "Not allowed to cancel invitations" });
        }

        const invite = await TeamInvite.findByIdAndDelete(inviteId);
        if (!invite) {
            return res.status(404).json({ success: false, message: "Invitation not found" });
        }

        if (invite.team.toString() !== teamId) {
            return res.status(400).json({ success: false, message: "Invitation does not belong to this team" });
        }

        return res.status(200).json({
            success: true,
            message: "Invitation cancelled",
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = cancelInvite;
