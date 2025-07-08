// utils/parseCSV.js
const { Readable } = require('stream');
const csv = require('csv-parser');

function parseCSV(buffer) {
  return new Promise((resolve, reject) => {
    const data = [];
    let headers = [];

    Readable.from(buffer)
      .pipe(csv())
      .on('headers', (h) => {
        headers = h;
      })
      .on('data', (row) => {
        const formattedRow = {};

        // Try to cast numeric fields (Recharts loves numbers)
        for (const key in row) {
          const value = row[key].trim();
          formattedRow[key] = isNaN(value) || value === '' ? value : Number(value);
        }

        data.push(formattedRow);
      })
      .on('end', () => {
        resolve({ data, headers });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

module.exports = parseCSV;
