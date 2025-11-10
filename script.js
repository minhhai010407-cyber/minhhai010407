const aquarium = document.getElementById("aquarium");
const fishes = document.querySelectorAll(".fish");
const dolia = document.getElementById("dolia");
const music1 = document.getElementById("music1");
const music2 = document.getElementById("music2");

const bgList = ["images/anhnen.jpg", "images/anhnen2.jpg", "images/anhnen3.jpg"];
let bgIndex = 0;

let speedFactor = 0.7; // tốc độ cơ bản
let directions = [];

let musicState = 0; // 0 = tắt, 1 = nhạc 1, 2 = nhạc 2

// --- Khởi tạo vị trí & hướng ---
fishes.forEach((fish, i) => {
  fish.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
  fish.style.top = `${Math.random() * (window.innerHeight - 100)}px`;

  directions[i] = {
    dx: (Math.random() * 2 - 1) * speedFactor,
    dy: (Math.random() * 2 - 1) * speedFactor
  };
});

// --- Dolia di chuyển ---
let doliaX = window.innerWidth / 2;
let doliaY = window.innerHeight / 2;
let doliaDX = (Math.random() * 2 - 1) * 0.8;
let doliaDY = (Math.random() * 2 - 1) * 0.8;

function moveDolia() {
  doliaX += doliaDX;
  doliaY += doliaDY;

  const width = dolia.clientWidth;
  const height = dolia.clientHeight;

  if (doliaX <= width / 2 || doliaX >= window.innerWidth - width / 2) doliaDX *= -1;
  if (doliaY <= height / 2 || doliaY >= window.innerHeight - height / 2) doliaDY *= -1;

  dolia.style.left = `${doliaX}px`;
  dolia.style.top = `${doliaY}px`;
  dolia.style.transform = doliaDX > 0 ? "scaleX(1)" : "scaleX(-1)";
}

// --- Cá bơi ---
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
document.getElementById("toggleMusic").addEventListener("click", async () => {
  try {
    if (musicState === 0) {
      await music1.play();
      music2.pause();
      music1.currentTime = 0;
      musicState = 1;
    } else if (musicState === 1) {
      music1.pause();
      await music2.play();
      music2.currentTime = 0;
      musicState = 2;
    } else {
      music1.pause();
      music2.pause();
      musicState = 0;
    }
  } catch (error) {
    alert("⚠️ Trình duyệt đang chặn phát nhạc. Bấm lại nút để phát nhé!");
  }
});

// --- Tốc độ ---
function updateSpeed() {
  fishes.forEach((_, i) => {
    let signX = Math.sign(directions[i].dx);
    let signY = Math.sign(directions[i].dy);
    directions[i].dx = signX * (Math.random() * 1 + 0.5) * speedFactor;
    directions[i].dy = signY * (Math.random() * 1 + 0.5) * speedFactor;
  });
  doliaDX *= speedFactor;
  doliaDY *= speedFactor;
}

document.getElementById("speedUp").addEventListener("click", () => {
  speedFactor *= 1.2;
  updateSpeed();
});

document.getElementById("speedDown").addEventListener("click", () => {
  speedFactor /= 1.2;
  updateSpeed();
});
