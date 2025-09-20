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
const teamsRoutes = require("./routes/team");
const settingsRoutes = require('./routes/settings');

const server = http.createServer(app);
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];
const io = new Server(server, {
  cors: {
    origin: allowedOrigins, // client port
    credentials: true,
  },  
});

//middlewares
const userAuth = require("./middleware/userAuth");
const { addComment } = require("./controllers/dashboard/addComment");
const addAnnotation = require("./controllers/dashboard/addAnnotation");
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('join_dashboard', (dashboardId) => {
    socket.join(dashboardId);
    console.log(`User ${socket.id} joined dashboard: ${dashboardId}`);
  });

  socket.on("new_comment", async (data) => {
    const { dashboardId } = data;
    try {
      const savedComment = await addComment(data);
      // Broadcast to all clients in the same dashboard room
      io.to(dashboardId).emit("new_comment", savedComment);
    } catch (err) {
      socket.emit("error", { message: "Failed to save comment" });
    }
  });

  socket.on("new_annotation", async (data) => {
    const { dashboardId } = data;
    try {
      const savedAnnotation = await addAnnotation(data);
      io.to(dashboardId).emit("new_annotation", savedAnnotation);
    } catch (err) {
      socket.emit("error", { message: "Failed to save annotation" });
    }
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});


app.use("/", authRoutes);
app.use("/dashboard",userAuth,dashboardRoutes);
app.use('/friends',userAuth,friendsRoutes);
app.use("/friendRequest",userAuth,friendRequestRoutes);
app.use("/teams",userAuth,teamsRoutes);
app.use('/settings',userAuth,settingsRoutes);

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
