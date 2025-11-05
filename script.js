const ocean = document.querySelector(".ocean");
const fishElements = document.querySelectorAll(".fish");
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

/* === CHUYỂN NỀN === */
changeBgButton.addEventListener("click", () => {
  currentBg = (currentBg + 1) % backgrounds.length;
  ocean.style.backgroundImage = `url('${backgrounds[currentBg]}')`;
});

/* === PHÁT / DỪNG NHẠC === */
musicButton.addEventListener("click", () => {
  if (musicPlaying) {
    bgMusic.pause();
  } else {
    bgMusic.play();
  }
  musicPlaying = !musicPlaying;
});

/* === DI CHUYỂN CÁ === */
const fishes = [];

fishElements.forEach((fish, index) => {
  let speed = 1 + Math.random() * 2;
  let directionX = Math.random() < 0.5 ? 1 : -1;
  let directionY = Math.random() < 0.5 ? 1 : -1;
  let x = Math.random() * window.innerWidth * 0.8;
  let y = Math.random() * window.innerHeight * 0.8;
  let amplitude = 30 + Math.random() * 20;

  fishes.push({ el: fish, x, y, speed, directionX, directionY, amplitude });
});

/* Dolia đặc biệt: bơi qua lại + lên xuống */
const dolia = document.querySelector(".dolia");
let doliaX = 100, doliaY = window.innerHeight / 2, doliaDirX = 1, doliaDirY = 1;
const doliaSpeed = 2;

/* === CẬP NHẬT VỊ TRÍ === */
function animate() {
  fishes.forEach(f => {
    if (f.el.classList.contains("dolia")) return; // dolia xử lý riêng
    if (f.el.classList.contains("jelly")) return; // sứa xử lý bằng CSS

    f.x += f.speed * f.directionX;
    f.y += Math.sin(Date.now() / 500) * 0.5 * f.directionY;

    // Quay đầu khi đụng tường
    if (f.x < 0 || f.x > window.innerWidth - 200) {
      f.directionX *= -1;
      f.el.style.transform = `scaleX(${f.directionX})`;
    }
    if (f.y < 0 || f.y > window.innerHeight - 200) {
      f.directionY *= -1;
    }

    f.el.style.left = f.x + "px";
    f.el.style.top = f.y + "px";
  });

  // Dolia di chuyển riêng: bơi ngang + lên xuống
  doliaX += doliaSpeed * doliaDirX;
  doliaY += 1.5 * doliaDirY;

  if (doliaX < 0 || doliaX > window.innerWidth - 700) {
    doliaDirX *= -1;
    dolia.style.transform = `scaleX(${doliaDirX})`;
  }
  if (doliaY < 100 || doliaY > window.innerHeight - 250) {
    doliaDirY *= -1;
  }

  dolia.style.left = doliaX + "px";
  dolia.style.top = doliaY + "px";

  requestAnimationFrame(animate);
}

animate();

/* Tự động phát nhạc nếu được phép */
window.addEventListener("load", () => {
  bgMusic.play().catch(() => console.log("Nhấn 🎵 để bật nhạc."));
});
