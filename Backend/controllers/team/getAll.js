const Team = require('../../models/team'); 

const getAll = async (req, res) => {
    try {
        const userId = req.user.id;
        const teams = await Team.find({ "members.user": userId });

        return res.status(200).json({ 
            success: true,
            teams });
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: 'Server error', 
            error: error.message });
    }
};

module.exports = getAll;