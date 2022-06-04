const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const cameraSelect = document.getElementById("cameras");

let myStream;
let muted = true;
let cameraOn = false;

const getMedia = async () => {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    myFace.srcObject = myStream;
    await getUserCameras();
  } catch (e) {
    console.log(e);
  }
};

getMedia();

const getUserCameras = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
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
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOn = true;
  }
};

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
