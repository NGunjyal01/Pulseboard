const Annotation = require("../../models/annotation");

const addAnnotation = async (data) => {
    try {
        const { dashboardId, annotation } =data;

        // Extract position fields
        const { x, y, x1, x2, y1, y2 } = annotation;

        const position = {};
        if (x) position.x = x;
        if (y) position.y = y;
        if (x1) position.x1 = x1;
        if (x2) position.x2 = x2;
        if (y1) position.y1 = y1;
        if (y2) position.y2 = y2;

        // Create annotation doc
        const newAnnotation = await Annotation.create({
        dashboardId,
        chartId: annotation.chartId,
        user: annotation.user, // should be ObjectId
        type: annotation.type,
        label: annotation.label,
        color: annotation.color,
        position,
        });

        return await newAnnotation.populate("user", "firstName lastName email imageUrl");

    } catch (err) {
        console.error("❌ Error in saving annotation:", err.message);
        throw err;
    }
};

module.exports = addAnnotation;