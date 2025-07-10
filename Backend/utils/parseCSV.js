const csv = require("csv-parser");
const { Readable } = require("stream");

const parseCSV = async (buffer) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const headers = [];

    const stream = Readable.from(buffer)
      .pipe(csv())
      .on("headers", (hdrs) => headers.push(...hdrs))
      .on("data", (data) => results.push(data))
      .on("end", () => resolve({ data: results, headers }))
      .on("error", (err) => reject(err));
  });
};


module.exports = parseCSV;
