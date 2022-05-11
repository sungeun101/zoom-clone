const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const input = form.querySelector("input");
const room = document.getElementById("room");
const h3 = room.querySelector("h3");

room.hidden = true;

const showRoom = (msg) => {
  console.log(`backend says : ${msg}`);
  welcome.hidden = true;
  room.hidden = false;
  h3.innerText = `Room ${roomName}`;
};

const handleRoomEnter = (event) => {
  event.preventDefault();
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
  // Rules!
  // first arg -> event name
  // last arg -> funciton
};

form.addEventListener("submit", handleRoomEnter);

// const socket = new WebSocket(`ws://${window.location.host}`);
// const messageList = document.querySelector("ul");
// const nicknameForm = document.querySelector("#nickname");
// const messageForm = document.querySelector("#message");

// socket.addEventListener("open", () => {
//   console.log("Connected to Server ✅");
// });

// socket.addEventListener("message", (message) => {
//   const li = document.createElement("li");
//   li.innerText = message.data;
//   messageList.append(li);
// });

// socket.addEventListener("close", () => {
//   console.log("Disconnected from Server ❌");
// });

// const makeMessage = (type, payload) => {
//   const msg = { type, payload };
//   return JSON.stringify(msg);
// };

// const handleNicknameSubmit = (event) => {
//   event.preventDefault();
//   const input = nicknameForm.querySelector("input");
//   socket.send(makeMessage("nickname", input.value));
//   input.value = "";
// };

// const handleMessageSubmit = (event) => {
//   event.preventDefault();
//   const input = messageForm.querySelector("input");
//   socket.send(makeMessage("new_message", input.value));
//   input.value = "";
// };

// nicknameForm.addEventListener("submit", handleNicknameSubmit);
// messageForm.addEventListener("submit", handleMessageSubmit);
