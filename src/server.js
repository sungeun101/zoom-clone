import express from "express";
import http from "http";
// import WebSocket from "ws";
import { Server } from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`socket event : ${event}`);
  });
  socket.on("enter_room", (roomName, sayAndShowRoom) => {
    socket.join(roomName);
    sayAndShowRoom("I am backend");
    // 1. backend calls a function -> runs on frontend
    // 2. backend can send arguments to frontend
    socket.to(roomName).emit("welcome");
  });
});

// const wss = new WebSocket.Server({ httpServer });
// const sockets = [];
// const handleConnection = (socket) => {
//   sockets.push(socket); // to collect all connections from various browsers
//   socket.nickname = "somebody";
//   console.log("Connected to Browser ✅");
//   socket.on("close", () => console.log("Disconnected from the Browser ❌"));
//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case "new_message":
//         sockets.forEach(
//           (aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`)
//           // do not send javascript object to backend(bad practice because backend has multiple languages)
//         );
//         break;
//       case "nickname":
//         socket.nickname = message.payload;
//         break;
//     }
//   });
// };
// wss.on("connection", handleConnection);

httpServer.listen(3000, () => {
  console.log("listening on 3000");
});
