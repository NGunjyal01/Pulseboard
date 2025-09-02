const Team = require("../../../models/team");
const TeamInvite = require("../../../models/teamInvite");

const acceptInvite = async (req, res) => {
    try {
        const { inviteId } = req.params;
        const userId = req.user.id;

        const invite = await TeamInvite.findById(inviteId);
        if (!invite) {
            return res.status(404).json({ success: false, message: "Invitation not found" });
        }

        if (invite.email !== req.user.email) {
            return res.status(403).json({ success: false, message: "This invitation is not for you" });
        }

        const team = await Team.findById(invite.team);
        if (!team) {
            return res.status(404).json({ success: false, message: "Team not found" });
        }

        // Add user to team
        team.members.push({
            user: userId,
            role: invite.role,
        });

        await Promise.all([team.save(),TeamInvite.findByIdAndDelete(inviteId)])

        return res.status(200).json({
            success: true,
            message: "Invitation accepted. You are now a team member.",
            team,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = acceptInvite;
