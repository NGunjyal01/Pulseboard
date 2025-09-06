const Dashboard = require("../../models/dashboard");
const Team = require("../../models/team");

const updateBasicInfo = async (req, res) => {
    try {
        const { title, description, collaborators } = req.body;
        const updateFields = {};

        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        let finalCollaborators = [];
        updateFields["creationProgress.step1"] = true;
        if (collaborators && collaborators.length > 0) {
            for (const collab of collaborators) {
                if (collab.addedVia === "friend") {
                    finalCollaborators.push({
                        userId: collab.userId,
                        role: collab.role || "viewer",
                        addedVia: "friend",
                    });
                } else if (collab.addedVia === "team") {
                    const team = await Team.findById(collab.teamId).populate("members.user", "_id");
                    if (team) {
                        team.members.forEach((member) => {
                            if (!finalCollaborators.find(c => String(c.userId) === String(member.user))) {
                                finalCollaborators.push({
                                    userId: member.user,
                                    role: collab.role || "viewer",
                                    addedVia: "team",
                                    teamId: team._id,
                                });
                            }
                        });
                    }
                }
            }
            updateFields.collaborators = finalCollaborators;
        }

        const dashboard = await Dashboard.findByIdAndUpdate(req.params.id,updateFields,{ new: true });

        if (!dashboard) {
            return res.status(404).json({
            success: false,
            error: "Dashboard not found",
            });
        }

        return res.status(200).json({
            success: true,
            dashboard,
        });
    } catch (error) {
        console.error("Error updating dashboard basic info:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to update dashboard",
        });
    }
};

module.exports = updateBasicInfo;
