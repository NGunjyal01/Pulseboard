const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
const connectDB = require("./utils/db");
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`🔧 Pulseboard backend running on http://localhost:${PORT}`);
});
