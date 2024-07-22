let video = document.querySelector(".videoPlayer video");
videoPlayer = document.querySelector(".videoPlayer");
videoProgressBar = document.querySelector(".videoProgressBar");
videoProgressDuration = document.querySelector(".videoProgressDuration");
dot = document.querySelector(".videoProgressBar .dot");
volume = document.querySelector(".leftControls .volume input[type=range]");
volIcon = document.querySelector(".leftControls .volume i");
fullScrean = document.querySelector(".fullScrean");
currentVideoDuration = document.querySelector(".currentVideoDuration p");
totalVideoDuration = document.querySelector(".totalVideoDuration p");
playBtn = document.querySelector(".playBtn");
pauseBtn = document.querySelector(".pauseBtn");
forwardVideo = document.querySelector(".forwardVideo");
reverseVideo = document.querySelector(".reverseVideo");

videoPlayer.addEventListener("mousemove", function () {
  this.classList.add("active");
});

videoPlayer.addEventListener("mousemove", function () {
  this.classList.add("active");
});

videoPlayer.addEventListener("mouseleave", function () {
  this.classList.remove("active");
});

video.addEventListener("timeupdate", function (e) {
  let videoPosition = video.currentTime / video.duration;
  dot.style.left = videoPosition * 100 + "%";
  videoProgressDuration.style.width = videoPosition * 100 + "%";
});

const i = setInterval(function () {
  if (video.readyState > 0) {
    var minutes = parseInt(video.duration / 60, 10);
    var seconds = Math.round(video.duration % 60);

    totalVideoDuration.innerText = minutes + ":" + seconds;
    clearInterval(i);
  }
}, 10);

videoProgressBar.addEventListener("click", function (e) {
  let videoDuration = video.duration;
  let progressWidthValue = this.clientWidth;
  let clickOffestX = e.offsetX;
  video.currentTime = (clickOffestX / progressWidthValue) * videoDuration;
  pauseBtn.classList.toggle("hide");
  playBtn.classList.toggle("hide");
});

fullScrean.addEventListener("click", function () {
  video.requestFullscreen();
});

video.addEventListener("timeupdate", function (e) {
  let currentVideoTime = e.target.currentTime;
  let currentMin = Math.floor(currentVideoTime / 60);
  let currentSec = Math.floor(currentVideoTime % 60);

  currentMin < 10 ? (currentMin = "0" + currentMin) : currentMin;
  currentSec < 10 ? (currentSec = "0" + currentSec) : currentSec;
  currentVideoDuration.innerHTML = `${currentMin}:${currentSec}`;
});

playBtn.addEventListener("click", function () {
  this.classList.toggle("hide");
  pauseBtn.classList.toggle("hide");
  video.play();
});

pauseBtn.addEventListener("click", function () {
  this.classList.toggle("hide");
  playBtn.classList.toggle("hide");
  video.pause();
});

reverseVideo.addEventListener("click", function () {
  video.currentTime -= 10;
});

forwardVideo.addEventListener("click", function () {
  video.currentTime += 10;
});

volume.addEventListener("change", function () {
  if (this.value < 20) {
    volIcon.classList.remove("fa-volume-high");
    volIcon.classList.add("fa-volume-low");
  } else if (this.value > 20) {
    volIcon.classList.remove("fa-volume-low");
    volIcon.classList.remove("fa-volume-xmark");
    volIcon.classList.add("fa-volume-high");
  } else if (this.value == 0) {
    volIcon.classList.remove("fa-volume-low");
    volIcon.classList.add("fa-volume-xmark");
  }
  video.volume = this.value / 100;
});

document
  .querySelector(".fa-volume-high")
  .addEventListener("click", function () {
    volIcon.classList.toggle("fa-volume-high");
    volIcon.classList.toggle("fa-volume-xmark");
    video.volume = 0;
  });

volIcon.addEventListener("click", function () {
  volIcon.classList.toggle("fa-volume-xmark");
  volIcon.classList.toggle("fa-volume-high");
  video.volume = 1;
});

video.addEventListener("ended", function () {
  pauseBtn.classList.toggle("hide");
  playBtn.classList.toggle("hide");

  setTimeout(function () {
    video.currentTime = 0;
  }, 800);
});
