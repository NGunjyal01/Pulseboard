// models/Dashboard.js
import mongoose from 'mongoose';

const dashboardSchema = new mongoose.Schema({
  title: { type: String, 
    required: true, 
    default: 'Untitled Dashboard' },
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true },
  collaborators: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['editor', 'viewer'], default: 'viewer' }
  }],
  dataSource: {
    type: { type: String, enum: ['csv', 'api', 'simulated'], required: true },
    csvConfig: {
      fileName: String,
      parsedData: [mongoose.Schema.Types.Mixed]
    },
    apiConfig: {
      endpoint: String,
      method: { type: String, 
        default: 'GET' },
      responseSnapshot: mongoose.Schema.Types.Mixed
    },
    simulatedConfig: {
      type: { type: String, 
        enum: ['timeseries', 'categorical', 'numerical'] },
      sampleData: [mongoose.Schema.Types.Mixed]
    }
  },
  visualizations: [{
    type: {
      type: String,
      enum: ['line', 'bar', 'area', 'pie', 'radar', 'composed'],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    dataMapping: {
      xAxis: { type: String, required: true }
    },
    // ✅ For all normal charts: just list values to plot
    values: [String],

    // ✅ Only used when type === "composed"
    composedConfig: [{
      value: String,             // e.g. "revenue"
      viewType: {
        type: String,
        enum: ['line', 'bar', 'area'], // only valid for composed
        required: true
      }
    }]
  }],
  creationProgress: {
    step1: { type: Boolean, default: false }, // Basic info
    step2: { type: Boolean, default: false }, // Data source
    step3: { type: Boolean, default: false }  // Charts
  },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
},{timestamps: true});

dashboardSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Dashboard', dashboardSchema);