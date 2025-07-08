const Dashboard = require("../../models/dashboard")

const create = async (req, res) => {
  try {
    console.log(req)
    const dashboard = new Dashboard({
      title: 'Untitled Dashboard',
      createdBy: req.user._id,
      status: 'draft',
    });
    
    await dashboard.save();
    
    return res.status(201).json({
        success: true,
        dashboardId: dashboard._id,
        status: 'draft',
    });
  } catch (error) {
    return res.status(500).json({ 
        success:false,
        error: 'Failed to create dashboard' });
  }
};

module.exports = create;