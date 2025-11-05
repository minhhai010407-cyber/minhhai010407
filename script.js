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
let bgIndex = 0;
let playing = false;

// Đổi nền
changeBgButton.addEventListener("click", () => {
  bgIndex = (bgIndex + 1) % backgrounds.length;
  ocean.style.backgroundImage = `url('${backgrounds[bgIndex]}')`;
});

// Nhạc
musicButton.addEventListener("click", () => {
  if (playing) bgMusic.pause();
  else bgMusic.play();
  playing = !playing;
});

// Tạo bong bóng
function createBubble() {
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  const size = Math.random() * 25 + 10;
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";
  bubble.style.left = Math.random() * 100 + "%";
  bubble.style.animationDuration = (Math.random() * 5 + 5) + "s";
  ocean.appendChild(bubble);
  setTimeout(() => bubble.remove(), 10000);
}
setInterval(createBubble, 700);

// Vị trí khởi tạo
const fishData = [];
fishes.forEach((fish) => {
  let x = Math.random() * (window.innerWidth - 300);
  let y = Math.random() * (window.innerHeight - 200);
  let dx = Math.random() < 0.5 ? 1 : -1;
  let dy = Math.random() < 0.5 ? 1 : -1;
  let speed = 0.8 + Math.random() * 0.8;

  if (fish.classList.contains("tholan")) speed = 1.8; // thợ lặn nhanh hơn
  if (fish.classList.contains("dolia")) speed = 1.2;
  if (fish.classList.contains("jelly")) return;

  fishData.push({ el: fish, x, y, dx, dy, speed });
});

// Chuyển động mượt
function moveFish() {
  fishData.forEach(f => {
    f.x += f.speed * f.dx;
    f.y += Math.sin(Date.now()/800) * f.dy * 0.6;

    if (f.x < 0 || f.x > window.innerWidth - f.el.width) {
      f.dx *= -1;
      f.el.style.transform = `scaleX(${f.dx})`;
    }
    if (f.y < 0 || f.y > window.innerHeight - f.el.height) f.dy *= -1;

    f.el.style.left = f.x + "px";
    f.el.style.top = f.y + "px";
  });
  requestAnimationFrame(moveFish);
}

// Dolia riêng – to, bơi qua lại nhẹ
const dolia = document.querySelector(".dolia");
let doliaX = 100, doliaY = window.innerHeight / 2;
let dirX = 1, dirY = 1;
function moveDolia() {
  doliaX += 1.5 * dirX;
  doliaY += 0.5 * dirY;

  if (doliaX < 0 || doliaX > window.innerWidth - dolia.width) {
    dirX *= -1;
    dolia.style.transform = `scaleX(${dirX})`;
  }
  if (doliaY < 50 || doliaY > window.innerHeight - 400) dirY *= -1;

  dolia.style.left = doliaX + "px";
  dolia.style.top = doliaY + "px";

  requestAnimationFrame(moveDolia);
}

moveFish();
moveDolia();
