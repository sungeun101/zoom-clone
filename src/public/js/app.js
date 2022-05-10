const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const input = form.querySelector("input");

const handleRoomSubmit = (event) => {
  event.preventDefault();
  socket.emit("enter_room", { payload: input.value }, () => {
    console.log("server is done!");
  });
};

form.addEventListener("submit", handleRoomSubmit);

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
