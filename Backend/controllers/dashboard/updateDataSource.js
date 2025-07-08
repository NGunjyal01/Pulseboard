const parseCSV = require('../../utils/parseCSV');

const uploadCSV =async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }
    
    // Parse CSV
    const { data, headers } = await parseCSV(req.file.buffer);
    
    // Save file info (in production, save to S3 or filesystem)
    const filePath = `/uploads/${req.file.originalname}`;
    
    await Dashboard.findByIdAndUpdate(req.params.id,
      {
        'dataSource.type': 'csv',
        'dataSource.csvConfig': {
          filePath,
          headers
        },
      }
    );
    
    return res.status(200).json({
      success: true,
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
    const { endpoint, method, params, body, dataPath } = req.body;
    
    // Test API connection
    const response = await axios({
      method: method || 'GET',
      url: endpoint,
      headers,
      params,
      data: body
    });
    
    // Extract data using dataPath if provided
    const data = dataPath 
      ? dataPath.split('.').reduce((obj, key) => obj[key], response.data)
      : response.data;
      
    if (!Array.isArray(data)) {
      throw new Error('API response must be an array or contain an array at the specified dataPath');
    }
    
    // Get headers from first item
    const headers = data.length > 0 ? Object.keys(data[0]) : [];
    
    // Save API config
    await Dashboard.findByIdAndUpdate(
      req.params.id,
      {
        'dataSource.type': 'api',
        'dataSource.apiConfig': {
          endpoint,
          method,
          headers,
          params,
          body,
          dataPath
        }
      }
    );
    
    res.json({
      success: true,
      headers,
      sampleData: data.slice(0, 10)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `API connection failed: ${error.message}`
    });
  }
};

module.exports = {uploadCSV,connectAPI}

// import { generateSimulatedData } from '../utils/dataGenerators';

// export const simulateData = async (req, res) => {
//   try {
//     const { type, rows } = req.body;
    
//     // Generate sample data
//     const { data, headers } = generateSimulatedData(type, rows);
    
//     await Dashboard.findByIdAndUpdate(
//       req.params.id,
//       {
//         'dataSource.type': 'simulated',
//         'dataSource.simulatedConfig': {
//           type,
//           rows
//         },
//         updatedAt: Date.now()
//       }
//     );
    
//     res.json({
//       success: true,
//       headers,
//       sampleData: data.slice(0, 10)
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: 'Failed to generate simulated data'
//     });
//   }
// };