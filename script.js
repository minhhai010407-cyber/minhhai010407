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

// --- Khởi tạo vị trí và hướng ngẫu nhiên ---
fishes.forEach((fish, i) => {
  fish.style.left = `${Math.random() * window.innerWidth}px`;
  fish.style.top = `${Math.random() * window.innerHeight}px`;
  directions[i] = {
    dx: (Math.random() * 2 - 1) * speedFactor,
    dy: (Math.random() * 2 - 1) * speedFactor
  };
});

// --- Dolia tự do ---
let doliaX = Math.random() * window.innerWidth;
let doliaY = Math.random() * window.innerHeight;
let doliaDX = (Math.random() * 2 - 1) * 0.25;
let doliaDY = (Math.random() * 2 - 1) * 0.25;

function moveDolia() {
  // Cập nhật vị trí
  doliaX += doliaDX;
  doliaY += doliaDY;

  // Nếu ra ngoài màn hình, quay hướng ngẫu nhiên
  if (doliaX < -dolia.clientWidth) doliaX = window.innerWidth + dolia.clientWidth;
  if (doliaX > window.innerWidth + dolia.clientWidth) doliaX = -dolia.clientWidth;
  if (doliaY < -dolia.clientHeight) doliaY = window.innerHeight + dolia.clientHeight;
  if (doliaY > window.innerHeight + dolia.clientHeight) doliaY = -dolia.clientHeight;

  dolia.style.left = `${doliaX}px`;
  dolia.style.top = `${doliaY}px`;
  dolia.style.transform =
    doliaDX >= 0
      ? `translate(-50%, -50%) scaleX(1)`
      : `translate(-50%, -50%) scaleX(-1)`;

  // Thay đổi hướng ngẫu nhiên nhỏ để di chuyển tự nhiên
  doliaDX += (Math.random() - 0.5) * 0.02;
  doliaDY += (Math.random() - 0.5) * 0.02;
}

// --- Cá di chuyển tự do ---
function animateFish() {
  fishes.forEach((fish, i) => {
    let rect = fish.getBoundingClientRect();
    let x = rect.left + directions[i].dx;
    let y = rect.top + directions[i].dy;

    // Nếu ra ngoài màn hình, cho xuất hiện bên đối diện
    if (x < -rect.width) x = window.innerWidth;
    if (x > window.innerWidth) x = -rect.width;
    if (y < -rect.height) y = window.innerHeight;
    if (y > window.innerHeight) y = -rect.height;

    fish.style.left = `${x}px`;
    fish.style.top = `${y}px`;
    fish.style.transform = directions[i].dx >= 0 ? "scaleX(1)" : "scaleX(-1)";

    // Thay đổi hướng ngẫu nhiên nhỏ
    directions[i].dx += (Math.random() - 0.5) * 0.02 * speedFactor;
    directions[i].dy += (Math.random() - 0.5) * 0.02 * speedFactor;
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
});

document.getElementById("speedDown").addEventListener("click", () => {
  speedFactor /= 1.2;
});
