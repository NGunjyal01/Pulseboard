const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require("./utils/db");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;
const authRoutes = require("./routes/auth");

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use("/",authRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`🔧 Pulseboard backend running on http://localhost:${PORT}`);
});
