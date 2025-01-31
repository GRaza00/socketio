import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();
const server = createServer(app);
const io = new Server(server);

//Port
const PORT = 8000;

//static
app.use(express.static(path.resolve("./src/public")));

//controller
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./src/pulic/index.html"));
});

//connection checking
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("message", (msg) => {
    console.log("message: " + msg);
    io.emit("msg", msg);
  });
});
// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);
// });

//Server Listen
server.listen(PORT, () => {
  console.log(`Server Listening On PORT: ${PORT}`);
});
