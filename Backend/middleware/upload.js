const multer = require("multer");

const storage = multer.memoryStorage(); // store in memory, not disk
const upload = multer({ storage });

module.exports = upload;
