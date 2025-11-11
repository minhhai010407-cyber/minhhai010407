const aquarium = document.getElementById("aquarium");
const fishes = document.querySelectorAll(".fish");
const dolia = document.getElementById("dolia");
const music = document.getElementById("music");

// Danh sách nền & nhạc
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
let positions = [];

// --- Khởi tạo vị trí và hướng ngẫu nhiên ---
fishes.forEach((fish, i) => {
  const startX = Math.random() * (window.innerWidth - 200);
  const startY = Math.random() * (window.innerHeight - 200);

  fish.style.left = `${startX}px`;
  fish.style.top = `${startY}px`;

  positions[i] = { x: startX, y: startY };
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

  dolia.style.left = `${doliaX}px`;
  dolia.style.top = `${doliaY}px`;
  dolia.style.transform =
    doliaDX > 0
      ? `translate(-50%, -50%) scaleX(1)`
      : `translate(-50%, -50%) scaleX(-1)`;
}

// --- Di chuyển các sinh vật ---
function animateFish() {
  fishes.forEach((fish, i) => {
    const rectWidth = fish.clientWidth;
    const rectHeight = fish.clientHeight;

    positions[i].x += directions[i].dx;
    positions[i].y += directions[i].dy;

    // --- Va chạm biên ---
    if (positions[i].x <= 0) {
      positions[i].x = 0;
      directions[i].dx *= -1;
    }
    if (positions[i].x >= window.innerWidth - rectWidth) {
      positions[i].x = window.innerWidth - rectWidth;
      directions[i].dx *= -1;
    }

    if (positions[i].y <= 0) {
      positions[i].y = 0;
      directions[i].dy *= -1;
    }
    if (positions[i].y >= window.innerHeight - rectHeight) {
      positions[i].y = window.innerHeight - rectHeight;
      directions[i].dy *= -1;
    }

    fish.style.left = `${positions[i].x}px`;
    fish.style.top = `${positions[i].y}px`;
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
    music.play().catch(() =>
      alert("⚠️ Trình duyệt chặn autoplay, hãy nhấn lại nút Nhạc.")
    );
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
