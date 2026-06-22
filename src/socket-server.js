const next = require("next");
const { createServer } = require("http");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });

const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    handler(req, res);
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  global.io = io;

  io.on("connection", (socket) => {
  

    socket.on("disconnect", () => {
      
    });
  });

  httpServer.listen(3000, () => {
    console.log("Server running on 3000");
  });
});