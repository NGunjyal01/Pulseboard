const Dashboard = require("../../models/dashboard")

const updateBasicInfo = async (req, res) => {
    try {
        const { title, description, collaborators } = req.body;
        const updateFields = {};
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (collaborators) updateFields.collaborators = collaborators;

        const dashboard = await Dashboard.findByIdAndUpdate(req.params.id,updateFields,{ new: true });
        if (!dashboard) {
            return res.status(404).json({
                success: false,
                error: 'Dashboard not found'
            });
        }

        return res.status(200).json({
            success: true,
            dashboard
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Failed to update dashboard'
        });
    }
};

module.exports = updateBasicInfo;