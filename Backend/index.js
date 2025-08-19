const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require("cookie-parser");

const connectDB = require("./utils/db");

//routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const friendsRoutes = require('./routes/friends');
const friendRequestRoutes = require('./routes/friendRequest');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // client port
    credentials: true,
  },  
});

//middlewares
const userAuth = require("./middleware/userAuth");
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('join-dashboard', (dashboardId) => {
    socket.join(dashboardId);
    console.log(`User joined dashboard: ${dashboardId}`);
  });

  socket.on('chart-update', ({ dashboardId, chartId, newData }) => {
    // Broadcast updated data to other users in the same room
    socket.to(dashboardId).emit('receive-chart-update', { chartId, newData });
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});


app.use("/", authRoutes);
app.use("/dashboard",userAuth,dashboardRoutes);
app.use('/friends',userAuth,friendsRoutes);
app.use("/friendRequest",userAuth,friendRequestRoutes);

const startServer = async () => {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(`🔧 Pulseboard backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to DB:", error.message);
  }
};

startServer();
