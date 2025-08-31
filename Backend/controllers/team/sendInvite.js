// controllers/team/sendInvite.js
const Team = require("../../models/team");
const teamInvite = require("../../models/teamInvite");
const User = require("../../models/user");

const sendInvite = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { email, role } = req.body;
    const inviterId = req.user.id;

    // check if team exists
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }

    const inviter = team.members.find(
      (m) => m.user.toString() === inviterId.toString()
    );
    if (!inviter || !["owner", "admin"].includes(inviter.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to invite members",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const alreadyMember = team.members.find(
        (m) => m.user.toString() === existingUser._id.toString()
      );
      if (alreadyMember) {
        return res.status(400).json({
          success: false,
          message: "User is already a team member",
        });
      }
    }

    // create invitation
    const invitation = await teamInvite.create({
      team: teamId,
      email,
      invitedBy: inviterId,
      role: role || "member",
    });

    // ✅ Here send email using nodemailer / any email service
    // sendEmail(email, `You are invited to join ${team.name}`, inviteLink)

    return res.status(201).json({
      success: true,
      message: "Invitation sent successfully",
      invitation,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = sendInvite;
