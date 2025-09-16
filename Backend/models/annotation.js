const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
    dashboardId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Dashboard", 
        required: true 
    },
    chartId: { 
        type: String, 
        required: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    type: { 
        type: String, 
        enum: ["line", "point", "area"], 
        required: true 
    },
    position: {
        type: Object,
        required: true,
        validate: {
            validator: function (pos) {
            if (this.type === "line") {
                // must have only one of x or y
                return (pos.x && !pos.y) || (!pos.x && pos.y);
            }
            if (this.type === "point") {
                // must have both x and y
                return !!(pos.x && pos.y);
            }
            if (this.type === "area") {
                // must have at least one of x1, x2, y1, y2
                return pos.x1 || pos.x2 || pos.y1 || pos.y2;
            }
            return false;
            },
            message: props => `Invalid position for annotation type: ${JSON.stringify(props.value)}`
        }
    },
    label: { type: String },
    color: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Annotation", annotationSchema);
