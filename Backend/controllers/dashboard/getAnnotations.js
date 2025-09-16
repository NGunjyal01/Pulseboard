const Annotation = require('../../models/annotation');

const getAnnotations = async (req, res) => {
    try {
        const annotations = await Annotation.find({ dashboardId: req.params.dashboardId }).populate("user", "firstName lastName imageUrl");
        return res.status(200).json({
            success:true,
            annotations,
            message: "Successfully fetched annotations"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Failed to fetch annotations"
        })
    }
}

module.exports = getAnnotations;