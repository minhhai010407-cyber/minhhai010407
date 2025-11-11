const aquariumWrapper = document.getElementById("aquarium-wrapper");
const aquarium = document.getElementById("aquarium");
const fishes = document.querySelectorAll(".fish");
const dolia = document.getElementById("dolia");
const music = document.getElementById("music");

// Nền & nhạc
const bgList = [
  "images/anhnen.jpg",
  "images/anhnen2.jpg",
  "images/anhnen3.jpg",
  "images/anhnen4.jpg"
];

const musicList = [
  "music/nhac1.mp3",
  "music/nhac2.mp3",
  "music/nhac3.mp3"
];

let bgIndex = 0;
let musicIndex = 0;
let speedFactor = 1.2; // tốc độ ban đầu nhanh
let directions = [];

// Khởi tạo cá
fishes.forEach((fish, i) => {
  fish.style.left = `${Math.random() * (1920 - 200)}px`;
  fish.style.top = `${Math.random() * (1080 - 200)}px`;
  directions[i] = {
    dx: (Math.random() * 2 - 1) * speedFactor,
    dy: (Math.random() * 2 - 1) * speedFactor
  };
});

// Dolia
let doliaX = 960;
let doliaY = 540;
let doliaDX = (Math.random() * 2 - 1) * 0.8;
let doliaDY = (Math.random() * 2 - 1) * 0.8;

// Scale cover, căn giữa cả 2 chiều
function scaleAquarium() {
  const scaleX = aquariumWrapper.clientWidth / 1920;
  const scaleY = aquariumWrapper.clientHeight / 1080;
  const scale = Math.max(scaleX, scaleY); // cover → lấp đầy màn hình
  aquarium.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

window.addEventListener("load", scaleAquarium);
window.addEventListener("resize", scaleAquarium);

// Di chuyển Dolia
function moveDolia() {
  doliaX += doliaDX;
  doliaY += doliaDY;

  const width = dolia.clientWidth;
  const height = dolia.clientHeight;

  if (doliaX <= width / 2 || doliaX >= 1920 - width / 2) doliaDX *= -1;
  if (doliaY <= height / 2 || doliaY >= 1080 - height / 2) doliaDY *= -1;

  dolia.style.left = `${doliaX}px`;
  dolia.style.top = `${doliaY}px`;
  dolia.style.transform =
    doliaDX >= 0
      ? `translate(-50%, -50%) scaleX(1)`
      : `translate(-50%, -50%) scaleX(-1)`;
}

// Di chuyển cá
function animateFish() {
  fishes.forEach((fish, i) => {
    let x = parseFloat(fish.style.left) + directions[i].dx;
    let y = parseFloat(fish.style.top) + directions[i].dy;

    if (x <= 0 || x >= 1920 - fish.clientWidth) directions[i].dx *= -1;
    if (y <= 0 || y >= 1080 - fish.clientHeight) directions[i].dy *= -1;

    fish.style.left = `${x}px`;
    fish.style.top = `${y}px`;
    fish.style.transform = directions[i].dx >= 0 ? "scaleX(1)" : "scaleX(-1)";
  });

  moveDolia();
  requestAnimationFrame(animateFish);
}
animateFish();

// Đổi nền
document.getElementById("changeBackground").addEventListener("click", () => {
  bgIndex = (bgIndex + 1) % bgList.length;
  aquarium.style.backgroundImage = `url('${bgList[bgIndex]}')`;
});

// Nhạc
document.getElementById("toggleMusic").addEventListener("click", () => {
  if (music.paused) {
    music.src = musicList[musicIndex];
    music.play().catch(() =>
      alert("⚠️ Trình duyệt chặn autoplay, nhấn lại nút Nhạc.")
    );
    musicIndex = (musicIndex + 1) % musicList.length;
  } else {
    music.pause();
  }
});

// Tăng/giảm tốc
document.getElementById("speedUp").addEventListener("click", () => {
  speedFactor *= 1.2;
  updateSpeed();
});
document.getElementById("speedDown").addEventListener("click", () => {
  speedFactor /= 1.2;
  updateSpeed();
});

function updateSpeed() {
  fishes.forEach((_, i) => {
    const signX = Math.sign(directions[i].dx) || 1;
    const signY = Math.sign(directions[i].dy) || 1;
    directions[i].dx = signX * (Math.random() * 1 + 0.5) * speedFactor;
    directions[i].dy = signY * (Math.random() * 1 + 0.5) * speedFactor;
  });
  const signX = Math.sign(doliaDX) || 1;
  const signY = Math.sign(doliaDY) || 1;
  doliaDX = signX * (Math.random() * 1 + 0.5) * speedFactor;
  doliaDY = signY * (Math.random() * 1 + 0.5) * speedFactor;
}

