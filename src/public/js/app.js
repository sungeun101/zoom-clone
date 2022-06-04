const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const cameraSelect = document.getElementById("cameras");
const call = document.getElementById("call");

call.hidden = true;

let myStream;
let muted = true;
let cameraOn = false;
let roomName;

const getMedia = async (selectedCamera) => {
  const initialConstraints = {
    audio: true,
    video: { facingMode: "user" },
  };
  const selectedConstraints = {
    audio: true,
    video: { deviceId: selectedCamera },
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      selectedCamera ? selectedConstraints : initialConstraints
    );
    myFace.srcObject = myStream;
    if (!selectedCamera) {
      await getUserCameras();
    }
  } catch (e) {
    console.log(e);
  }
  console.log(selectedCamera);
};

const getUserCameras = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    console.log(cameras);
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.label = camera.label;
      cameraSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
};

const handleMuteClick = () => {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (muted) {
    muteBtn.innerText = "Unmute";
    muted = false;
  } else {
    muteBtn.innerText = "Mute";
    muted = true;
  }
};

const handleCameraClick = () => {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOn) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOn = false;
    cameraSelect.hidden = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOn = true;
    cameraSelect.hidden = true;
  }
};

const handleCameraChange = async () => {
  await getMedia(cameraSelect.value);
};

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
cameraSelect.addEventListener("input", handleCameraChange);

// Welcome Form
const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");

const startMedia = async () => {
  await getMedia();
  welcome.hidden = true;
  call.hidden = false;
};

const handleWelcomeSubmit = (e) => {
  e.preventDefault();
  const input = welcomeForm.querySelector("input");
  socket.emit("join_room", input.value, startMedia);
  roomName = input.value;
  input.value = "";
};

welcomeForm.addEventListener("submit", handleWelcomeSubmit);

// Socket
socket.on("welcome", () => console.log("someone joined"));
