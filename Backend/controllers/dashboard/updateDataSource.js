const axios = require('axios');
const parseCSV = require('../../utils/parseCSV');
const Dashboard = require("../../models/dashboard")

const uploadCSV =async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }
    
    // Parse CSV
    let data, headers;
    try {
      ({ data, headers } = await parseCSV(req.file.buffer));
      // console.log("✅ Parsed CSV:", data.length, "rows");
    } catch (csvError) {
      // console.error("❌ Error parsing CSV:", csvError);
      return res.status(400).json({ success: false, error: "CSV parsing failed" });
    }

    const fileName = req.file.originalname;
    await Dashboard.findByIdAndUpdate(req.params.id,{
      $set:{ 
        'dataSource.type': 'csv',
        'dataSource.csvConfig': {fileName:req.file.originalname,parsedData:data},
      },
      $unset:{
        'dataSource.apiConfig': '',
        'dataSource.simulatedConfig': ''
      }
    });
    
    return res.status(200).json({
      success: true,
      fileName,
      headers,
      sampleData: data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to process CSV'
    });
  }
};

const connectAPI = async (req, res) => {
  try {
    const { endpoint, method = 'GET', params = {}, body = {}, dataPath = '' } = req.body;

    // Make the API call
    const apiResponse = await axios({
      method,
      url: endpoint,
      params,
      data: body,
    });

    // Extract nested data if dataPath is provided
    let data = apiResponse.data;
    if (dataPath) {
      try {
        data = dataPath.split('.').reduce((obj, key) => obj[key], apiResponse.data);
      } catch (err) {
        return res.status(400).json({
          success: false,
          error: `Invalid dataPath: '${dataPath}'`,
        });
      }
    }

    // Ensure the data is an array
    if (!Array.isArray(data)) {
      return res.status(400).json({
        success: false,
        error: 'API response must be an array or contain an array at the specified dataPath',
      });
    }

    // Extract field names
    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    // Save API config in MongoDB
    await Dashboard.findByIdAndUpdate(req.params.id, {
      $set:{
        'dataSource.type': 'api',
        'dataSource.apiConfig': {
          endpoint,
          method,
          params,
          body,
          dataPath,
          responseSnapshot:data,
        },},
        'creationProgress.step2': true,
      $unset:{
        'dataSource.csvConfig':'',
        'dataSource.simulatedConfig':'',
      }
    });

    // Send response
    return res.status(200).json({
      success: true,
      headers,
      sampleData: data,
    });

  } catch (error) {
    console.error("❌ connectAPI error:", error.message);
    return res.status(500).json({
      success: false,
      error: `API connection failed: ${error.message}`,
    });
  }
};

const simulateData = async (req, res) => {
  try {
    const {type,sampleData} = req.body;
    await Dashboard.findByIdAndUpdate(req.params.id,{
      $set:{
        'dataSource.type': 'simulated',
        'dataSource.simulatedConfig': { type, sampleData},
      },
      $unset:{
        'dataSource.csvConfig':'',
        'dataSource.apiConfig': '',
      }
    });
    
    return res.status(200).json({
      success: true,
      sampleData: sampleData
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to generate simulated data'
    });
  }
};

const publishDashboard = async (req, res) => {
  try {
    const { charts } = req.body;
    const validTypes = ['line', 'bar', 'area', 'composed'];
    
    for (const viz of charts) {
      if (!validTypes.includes(viz.type)) {
        return res.status(400).json({
          success: false,
          error: `Invalid chart type: ${viz.type}`
        });
      }
    }

    const dashboard = await Dashboard.findByIdAndUpdate(req.params.id,{
      status: 'published',
      charts
    },{ new: true });
    
    if (!dashboard) {
      return res.status(404).json({
        success: false,
        error: 'Dashboard not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      dashboard
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to publish dashboard'
    });
  }
};

module.exports = {uploadCSV,connectAPI,simulateData,publishDashboard}
