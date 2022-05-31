const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const input = form.querySelector("input");
const room = document.getElementById("room");
const roomTitle = room.querySelector("h3");

let roomName;
let userCount;

room.hidden = true;

const showMessage = (msg) => {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = msg;
  ul.appendChild(li);
};

const showRoom = (msg) => {
  console.log(`backend says : ${msg}`);
  welcome.hidden = true;
  room.hidden = false;
  roomTitle.innerText = `Room ${roomName}`;
};

const handleRoomEnter = (event) => {
  event.preventDefault();
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
  // Rules!
  // first arg -> event name
  // last arg -> callback function(called Acknowledgements ; this callback will be called once the other side acknowledges the event)
};

form.addEventListener("submit", handleRoomEnter);

const msgForm = room.querySelector("form");
const msgInput = msgForm.querySelector("input");

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const message = msgInput.value;
  socket.emit(
    "new_message",
    message,
    roomName,
    showMessage(`You : ${message}`) // for you
  );
  msgInput.value = "";
};

msgForm.addEventListener("submit", handleMessageSubmit);

socket.on("welcome", (user, userCount) => {
  showMessage(`${user} just joined!`);
  roomTitle.innerText = `Room ${roomName} (${userCount} users)`;
});

socket.on("bye", (user) => {
  showMessage(`${user} left;(..bye`);
});

socket.on("new_message", showMessage); // for other users

socket.on("room_change", (rooms) => {
  console.log("rooms", rooms);
  const roomList = welcome.querySelector("ul");
  rooms.forEach((room) => {
    const li = document.createElement(li);
    li.innerText = room;
    roomList.append(li);
  });
});

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
