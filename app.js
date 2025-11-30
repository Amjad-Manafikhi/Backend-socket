const express = require("express");
const http = require("http");
const initSocket = require("./initSocket");

const app = express();
app.use(express.json());

// Create HTTP server and attach Socket.IO once
const server = http.createServer(app);
const io = initSocket(server);

const port = 3001;

// Simple test route
app.get("/", (req, res) => {
  res.json({ res: "Hello World!" });
});


// Emit handler
app.put("/", (req, res) => {
  const { socketId, event, data } = req.body;

  const sender = io.sockets.sockets.get(socketId);

  if (sender) sender.broadcast.emit(event, data);
  else io.emit(event, data);

  res.json({ success: true });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
