const Dashboard = require('../../models/dashboard'); 

const getAll = async (req, res) => {
    try {
        const dashboards = await Dashboard.find({}).populate("createdBy");
        return res.status(200).json({ success: true, dashboards });
    } catch (error) {
        console.error('❌ Failed to fetch dashboards:', error);
        return res.status(500).json({ success: false, error: 'Failed to fetch dashboards' });
    }
};

module.exports = getAll;
