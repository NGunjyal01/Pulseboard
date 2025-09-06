const Dashboard = require("../../models/dashboard");

const deleteDashboard = async (req, res) => {
    try {
        const { id } = req.params;

        const dashboard = await Dashboard.findById(id);
        if (!dashboard) {
            return res.status(404).json({
                success: false,
                error: "Dashboard not found",
            });
        }

        if (String(dashboard.createdBy) !== String(req.user.id)) {
            return res.status(403).json({
                success: false,
                error: "You are not authorized to delete this dashboard",
            });
        }

        await Dashboard.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Dashboard deleted successfully",
        });
    } catch (error) {
        console.error("Delete Dashboard Error:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to delete dashboard",
        });
    }
};

module.exports = deleteDashboard;
