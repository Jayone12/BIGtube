import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream, recorder, videoFile;

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.play();
  };
  recorder.start();
};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleDownload = async () => {
  const ffmpeg = createFFmpeg({
    corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
    log: true,
  });
  await ffmpeg.load();
  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));

  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm";
  document.body.appendChild(a);
  a.click();
};

const init = async () => {
  //사용자의 영상 및 소리 녹음 생성
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: 200, height: 200 },
  });
  //HTMLMediaElement와 연결된 미디어의 소스 역할을 하는 객체를 설정하거나 반환
  video.srcObject = stream;
  video.play();
};

init();

startBtn.addEventListener("click", handleStart);
