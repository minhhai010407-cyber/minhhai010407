// Danh sách ảnh nền
const backgrounds = [
  "images/anhnen.jpg",
  "images/anhnen2.jpg",
  "images/anhnen3.jpg"
];

let currentBg = 0;
const ocean = document.querySelector(".ocean");
const changeBtn = document.getElementById("changeBackground");
const musicBtn = document.getElementById("toggleMusic");
const changeMusicBtn = document.getElementById("changeMusic");
const music = document.getElementById("bgMusic");

let isPlaying = false;
let currentMusic = 0;
const musicList = ["music/nhac1.mp3", "music/nhac2.mp3"];

// Đổi nền
changeBtn.addEventListener("click", () => {
  currentBg = (currentBg + 1) % backgrounds.length;
  ocean.style.backgroundImage = `url('${backgrounds[currentBg]}')`;
});

// Bật / Tắt nhạc
musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    musicBtn.textContent = "🎵 PHÁT NHẠC";
  } else {
    music.play().catch(err => console.log("Không thể phát nhạc:", err));
    musicBtn.textContent = "⏸ DỪNG NHẠC";
  }
  isPlaying = !isPlaying;
});

// Đổi bài
changeMusicBtn.addEventListener("click", () => {
  currentMusic = (currentMusic + 1) % musicList.length;
  music.src = musicList[currentMusic];
  if (isPlaying) music.play();
});
