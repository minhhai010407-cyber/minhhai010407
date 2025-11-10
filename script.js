const aquarium = document.getElementById("aquarium");
const fishes = document.querySelectorAll(".fish");
const dolia = document.getElementById("dolia");
const music = document.getElementById("music");

// --- Danh sách nền & nhạc ---
const bgList = [
  "images/anhnen.jpg",
  "images/anhnen2.jpg",
  "images/anhnen3.jpg"
];
const musicList = [
  "music/nhac1.mp3",
  "music/nhac2.mp3",
  "music/nhac3.mp3"
];

let bgIndex = 0;
let musicIndex = 0;
let speedFactor = 0.5;
let directions = [];

// --- Khởi tạo vị trí ngẫu nhiên ---
fishes.forEach((fish, i) => {
  fish.style.left = `${Math.random() * (window.innerWidth - 150)}px`;
  fish.style.top = `${Math.random() * (window.innerHeight - 150)}px`;

  directions[i] = {
    dx: (Math.random() * 2 - 1) * speedFactor,
    dy: (Math.random() * 2 - 1) * speedFactor
  };
});

// --- Dolia di chuyển ---
let doliaX = window.innerWidth / 2;
let doliaY = window.innerHeight / 2;
let doliaDX = (Math.random() * 2 - 1) * 0.25;
let doliaDY = (Math.random() * 2 - 1) * 0.25;

function moveDolia() {
  doliaX += doliaDX;
  doliaY += doliaDY;

  const width = dolia.clientWidth;
  const height = dolia.clientHeight;

  if (doliaX <= width / 2 || doliaX >= window.innerWidth - width / 2) doliaDX *= -1;
  if (doliaY <= height / 2 || doliaY >= window.innerHeight - height / 2) doliaDY *= -1;

  dolia.style.transform =
    doliaDX > 0
      ? `translate(-50%, -50%) scaleX(1)`
      : `translate(-50%, -50%) scaleX(-1)`;

  dolia.style.left = `${doliaX}px`;
  dolia.style.top = `${doliaY}px`;
}

// --- Cá di chuyển ---
function animateFish() {
  fishes.forEach((fish, i) => {
    let rect = fish.getBoundingClientRect();
    let x = rect.left + directions[i].dx;
    let y = rect.top + directions[i].dy;

    if (x <= 0 || x >= window.innerWidth - rect.width) directions[i].dx *= -1;
    if (y <= 0 || y >= window.innerHeight - rect.height) directions[i].dy *= -1;

    fish.style.left = `${x}px`;
    fish.style.top = `${y}px`;
    fish.style.transform = directions[i].dx > 0 ? "scaleX(1)" : "scaleX(-1)";
  });

  moveDolia();
  requestAnimationFrame(animateFish);
}
animateFish();

// --- Đổi nền ---
document.getElementById("changeBackground").addEventListener("click", () => {
  bgIndex = (bgIndex + 1) % bgList.length;
  aquarium.style.backgroundImage = `url('${bgList[bgIndex]}')`;
});

// --- Nhạc ---
document.getElementById("toggleMusic").addEventListener("click", () => {
  if (music.paused) {
    music.src = musicList[musicIndex];
    music.play().catch(() => alert("⚠️ Trình duyệt chặn autoplay. Hãy nhấn lại!"));
    musicIndex = (musicIndex + 1) % musicList.length;
  } else {
    music.pause();
  }
});

// --- Tốc độ ---
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
    const signX = Math.sign(directions[i].dx);
    const signY = Math.sign(directions[i].dy);
    directions[i].dx = signX * (Math.random() * 1 + 0.5) * speedFactor;
    directions[i].dy = signY * (Math.random() * 1 + 0.5) * speedFactor;
  });
}
