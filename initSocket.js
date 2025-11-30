const { Server } = require("socket.io");

function initSocket(server) {
  console.log("initSocket");

  const io = new Server(server, {
    path: "/socket_io",   // MUST match the frontend
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("mouse-move", (data) => {
      socket.broadcast.emit("mouse-update", data);
      
    });
    socket.on("mouse-leave", (data) => {
      socket.broadcast.emit("user-disconnected", data);
      
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected:", socket.id, "Reason:", reason);
    });
  });

  return io;
}

module.exports = initSocket;
