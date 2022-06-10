import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();
const __dirname = path.resolve();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("join_room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome");
  });
  socket.on("send_offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });
});

httpServer.listen(3000, () => {
  console.log("listening on 3000");
});
