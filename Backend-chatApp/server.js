require("dotenv").config();
require("dns").setDefaultResultOrder("ipv4first");

const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./src/config/db.config");
const app = require("./src/app");
const initializeSocket = require("./src/sockets/index");

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
    process.env.CLIENT_URL_LOCAL,
    process.env.CLIENT_URL_PROD,     
  ],
    credentials: true,
  },
});

// init sockets
initializeSocket(io);

// make io available everywhere
app.set("io", io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
