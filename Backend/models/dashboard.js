const mongoose = require('mongoose');

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
    type: { type: String, enum: ['csv', 'api', 'simulated'], required: true,default:'csv' },
    csvConfig: {
      fileName: String,
      parsedData: [mongoose.Schema.Types.Mixed]
    },
    apiConfig: {
      endpoint: {
        type: String,
        required: true,
        default:'sampleAPI'
      },
      method: {
        type: String,
        enum: ['GET', 'POST'],
        default: 'GET'
      },
      params: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
      },
      body: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
      },
      dataPath: {
        type: String,
        default: '' // optional, can be empty if root array
      },
      responseSnapshot: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
      }
    },
    simulatedConfig: {
      type: { type: String, 
        enum: ['Sales Performance', 'Marketing Analytics', 'User Engagement', 'Financial Metrics', 'Inventory Status', 'Support Tickets', 'A/B Testing', 'Shipping Performance', 'SaaS Metrics', 'Social Media Analytics'] },
      sampleData: [mongoose.Schema.Types.Mixed]
    }
  },
  visualizations: [{
    type: {
      type: String,
      enum: ['line', 'bar', 'area', 'pie', 'radar', 'composed'],
      required: true,
      default: 'line'
    },
    title: {
      type: String,
      required: true,
      default: 'unamed'
    },
    dataMapping: {
      xAxis: { type: String, required: true , default: 'none'}
    },
    // ✅ For all normal charts: just list values to plot
    values: [String],

    // ✅ Only used when type === "composed"
    composedConfig: [{
      value: String,             // e.g. "revenue"
      viewType: {
        type: String,
        enum: ['line', 'bar', 'area'], // only valid for composed
        required: true,
        default: 'line'
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

module.exports =  mongoose.model('Dashboard', dashboardSchema);