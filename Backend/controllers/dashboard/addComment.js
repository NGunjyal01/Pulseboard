const Comment = require("../../models/comment");

async function addComment(data) {
    try {
        // Save comment to DB
        const { dashboardId,comment } = data;
        const {chartId,user,text} = comment;
        const savedComment = await Comment.create({
            dashboardId,
            chartId: chartId || null,
            user,text
        });

        return await savedComment.populate("user", "firstName lastName imageUrl");
    } catch (error) {
        console.error("❌ Error in saveComment:", error.message);
        throw error;
    }
}

module.exports = { addComment };
