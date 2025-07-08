const Dashboard = require("../../models/dashboard")

const updateBasicInfo = async (req, res) => {
    try {
        const { title, description, collaborators } = req.body;

        const dashboard = await Dashboard.findByIdAndUpdate(req.params.id,{title,description,collaborators,},{ new: true });
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