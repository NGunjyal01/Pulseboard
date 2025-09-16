const Comment = require('../../models/comment');

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ dashboardId: req.params.dashboardId }).populate("user", "firstName lastName imageUrl");
        return res.status(200).json({
            success:true,
            comments,
            message: "Successfully fetched comments",
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'failed to fetch comments'
        })
    }
}

module.exports = getComments;