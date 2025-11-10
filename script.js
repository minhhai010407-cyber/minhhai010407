const aquarium = document.getElementById("aquarium");
const fishes = document.querySelectorAll(".fish");
const dolia = document.getElementById("dolia");
const music = document.getElementById("music");

// --- Danh sách nền & nhạc ---
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
let speedFactor = 0.4;
let directions = [];

// --- Khởi tạo vị trí và hướng ngẫu nhiên cho cá ---
fishes.forEach((fish, i) => {
  fish.style.left = `${Math.random() * (window.innerWidth - 200)}px`;
  fish.style.top = `${Math.random() * (window.innerHeight - 200)}px`;
  directions[i] = {
    dx: (Math.random() * 2 - 1) * speedFactor,
    dy: (Math.random() * 2 - 1) * speedFactor
  };
});

// --- Khởi tạo Dolia ---
let doliaX = window.innerWidth / 2;
let doliaY = window.innerHeight / 2;
let doliaDX = (Math.random() * 2 - 1) * 0.25;
let doliaDY = (Math.random() * 2 - 1) * 0.25;

function moveDolia() {
  doliaX += doliaDX;
  doliaY += doliaDY;

  const width = dolia.clientWidth;
  const height = dolia.clientHeight;

  // Đụng biên thì đổi hướng
  if (doliaX <= width / 2 || doliaX >= window.innerWidth - width / 2) doliaDX *= -1;
  if (doliaY <= height / 2 || doliaY >= window.innerHeight - height / 2) doliaDY *= -1;

  dolia.style.left = `${doliaX}px`;
  dolia.style.top = `${doliaY}px`;
  dolia.style.transform =
    doliaDX >= 0
      ? `translate(-50%, -50%) scaleX(1)`
      : `translate(-50%, -50%) scaleX(-1)`;
}

// --- Di chuyển cá, đổi hướng khi chạm biên ---
function animateFish() {
  fishes.forEach((fish, i) => {
    let rect = fish.getBoundingClientRect();
    let x = rect.left + directions[i].dx;
    let y = rect.top + directions[i].dy;

    // Đụng biên thì đổi hướng
    if (x <= 0 || x >= window.innerWidth - rect.width) directions[i].dx *= -1;
    if (y <= 0 || y >= window.innerHeight - rect.height) directions[i].dy *= -1;

    fish.style.left = `${x}px`;
    fish.style.top = `${y}px`;
    fish.style.transform = directions[i].dx >= 0 ? "scaleX(1)" : "scaleX(-1)";
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
    music.play().catch(() =>
      alert("⚠️ Trình duyệt chặn autoplay, hãy nhấn lại nút Nhạc.")
    );
    musicIndex = (musicIndex + 1) % musicList.length;
  } else {
    music.pause();
  }
});

// --- Tăng/giảm tốc ---
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

  // Dolia
  const signX = Math.sign(doliaDX) || 1;
  const signY = Math.sign(doliaDY) || 1;
  doliaDX = signX * (Math.random() * 1 + 0.5) * 0.25;
  doliaDY = signY * (Math.random() * 1 + 0.5) * 0.25;
}
