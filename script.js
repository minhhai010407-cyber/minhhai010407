const ocean = document.querySelector(".ocean");
const fishes = document.querySelectorAll(".fish");
const changeBgButton = document.getElementById("change-bg");
const musicButton = document.getElementById("toggle-music");
const bgMusic = document.getElementById("bg-music");

const backgrounds = [
  "images/anhnen.jpg",
  "images/anhnen2.jpg",
  "images/anhnen3.jpg"
];
let currentBg = 0;
let musicPlaying = false;

/* === Nút đổi nền === */
changeBgButton.addEventListener("click", () => {
  currentBg = (currentBg + 1) % backgrounds.length;
  ocean.style.backgroundImage = `url('${backgrounds[currentBg]}')`;
});

/* === Nút nhạc === */
musicButton.addEventListener("click", () => {
  if (musicPlaying) {
    bgMusic.pause();
  } else {
    bgMusic.play();
  }
  musicPlaying = !musicPlaying;
});

/* === Thiết lập chuyển động cho từng cá === */
const fishData = [];

fishes.forEach((fish) => {
  if (fish.classList.contains("jelly")) return; // sứa có CSS riêng

  const speed = 0.8 + Math.random() * 1.2; // tốc độ vừa phải
  const directionX = Math.random() < 0.5 ? 1 : -1;
  const directionY = Math.random() < 0.5 ? 1 : -1;
  const x = Math.random() * (window.innerWidth - 200);
  const y = Math.random() * (window.innerHeight - 200);
  const amplitude = 50 + Math.random() * 30; // dao động lên xuống

  fishData.push({ el: fish, x, y, speed, directionX, directionY, amplitude });
});

function animate() {
  fishData.forEach(f => {
    // Cập nhật vị trí
    f.x += f.speed * f.directionX;
    f.y += Math.sin(Date.now() / 1000) * 0.7 * f.directionY;

    // Quay đầu khi chạm biên
    if (f.x < 0 || f.x > window.innerWidth - f.el.width) {
      f.directionX *= -1;
      f.el.style.transform = `scaleX(${f.directionX})`;
    }
    if (f.y < 0 || f.y > window.innerHeight - f.el.height) {
      f.directionY *= -1;
    }

    f.el.style.left = f.x + "px";
    f.el.style.top = f.y + "px";
  });

  requestAnimationFrame(animate);
}

/* === Dolia riêng: bơi qua lại + lên xuống === */
const dolia = document.querySelector(".dolia");
let dx = 1, dy = 1;
let doliaX = 100, doliaY = window.innerHeight / 2;
const doliaSpeed = 1.5;

function moveDolia() {
  doliaX += doliaSpeed * dx;
  doliaY += 0.8 * dy;

  if (doliaX < 0 || doliaX > window.innerWidth - 550) {
    dx *= -1;
    dolia.style.transform = `scaleX(${dx})`;
  }
  if (doliaY < 100 || doliaY > window.innerHeight - 300) {
    dy *= -1;
  }

  dolia.style.left = doliaX + "px";
  dolia.style.top = doliaY + "px";

  requestAnimationFrame(moveDolia);
}

animate();
moveDolia();

/* Tự phát nhạc nếu được phép */
window.addEventListener("load", () => {
  bgMusic.play().catch(() => console.log("Nhấn 🎵 để bật nhạc."));
});
