// Dhamaan DOM Elements-ka
const videoElement = document.getElementById("video");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const volumeSlider = document.getElementById("volume");
const speedSelect = document.getElementById("speed");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const videoTitle = document.getElementById("video-title");
const videoDescription = document.getElementById("video-description");

const videos = [
  {
    title: "Muuqaal-ka 1 aad",
    description: "Kani waa muuqaal-ka 1 aad, ee muuqaaladeena!",
    src: "./dugsiiye-html-css.mp4",
  },
  {
    title: "Muuqaal-ka 2 aad",
    description: "Kani waa muuqaal-ka 2 aad, ee muuqaaladeena!",
    src: "./dugsiiye-flutter.mp4",
  },
  {
    title: "Muuqaal-ka 3 aad",
    description: "Kani waa muuqaal-ka 3 aad, ee muuqaaladeena!",
    src: "./dugsiiye-data-visualization.mp4",
  },
];

let videoIndex = 0;
let isPlaying = false;

function loadVideo(video) {
  videoElement.src = video.src;
  videoTitle.textContent = video.title;
  videoDescription.textContent = video.description;
}

loadVideo(videos[videoIndex]);

function playVideo() {
  playBtn.querySelector("i").classList.replace("fa-play", "fa-pause");
  videoElement.play();
  isPlaying = true;
}

function pauseVideo() {
  playBtn.querySelector("i").classList.replace("fa-pause", "fa-play");
  videoElement.pause();
  isPlaying = false;
}

function prevVideo() {
  videoIndex = (videoIndex - 1 + videos.length) % videos.length;
  loadVideo(videos[videoIndex]);
  playVideo();
}

function nextVideo() {
  videoIndex = (videoIndex + 1) % videos.length;
  loadVideo(videos[videoIndex]);
  playVideo();
}

function updateProgress() {
  if (videoElement.duration) {
    const progressPercent =
      (videoElement.currentTime / videoElement.duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const currentMinutes = Math.floor(videoElement.currentTime / 60);
    const currentSeconds = Math.floor(videoElement.currentTime % 60)
      .toString()
      .padStart(2, "0");
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    const durationMinutes = Math.floor(videoElement.duration / 60);
    const durationSeconds = Math.floor(videoElement.duration % 60)
      .toString()
      .padStart(2, "0");
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
  }
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = videoElement.duration;
  videoElement.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseVideo() : playVideo();
});

prevBtn.addEventListener("click", prevVideo);
nextBtn.addEventListener("click", nextVideo);

videoElement.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
videoElement.addEventListener("ended", nextVideo);

volumeSlider.addEventListener("input", (e) => {
  videoElement.volume = e.target.value;
});

speedSelect.addEventListener("change", (e) => {
  videoElement.playbackRate = parseFloat(e.target.value);
});
