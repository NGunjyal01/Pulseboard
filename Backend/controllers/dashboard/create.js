const Dashboard = require("../../models/dashboard")

const create = async (req, res) => {
  try {
    const dashboard = new Dashboard({
      title: 'Untitled Dashboard',
      createdBy: req.user.id,
      status: 'draft',
    });
    
    await dashboard.save();
    
    return res.status(201).json({
        success: true,
        dashboardId: dashboard._id,
        status: 'draft',
    });
  } catch (error) {
  console.error("Dashboard create error:", error);
  return res.status(500).json({ 
    success: false,
    error: 'Failed to create dashboard',
    message: error.message
  });
}
};

module.exports = create;