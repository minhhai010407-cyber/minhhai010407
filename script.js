const aquarium = document.getElementById("aquarium");
const fishes = document.querySelectorAll(".fish");
const dolia = document.getElementById("dolia");
const music = document.getElementById("music");
const bgList = ["images/anhnen.jpg", "images/anhnen2.jpg", "images/anhnen3.jpg"];
let bgIndex = 0;
let speedFactor = 0.5; // 🔹 tốc độ mặc định (0.5 là chậm đẹp)
let directions = [];

// Khởi tạo vị trí và hướng ngẫu nhiên
fishes.forEach((fish, i) => {
  fish.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
  fish.style.top = `${Math.random() * (window.innerHeight - 100)}px`;

  directions[i] = {
    dx: (Math.random() * 2 - 1) * speedFactor,
    dy: (Math.random() * 2 - 1) * speedFactor
  };
});

// Cập nhật chuyển động
function animateFish() {
  fishes.forEach((fish, i) => {
    let rect = fish.getBoundingClientRect();
    let x = rect.left + directions[i].dx;
    let y = rect.top + directions[i].dy;

    // Va chạm tường thì đảo hướng
    if (x <= 0 || x >= window.innerWidth - rect.width) directions[i].dx *= -1;
    if (y <= 0 || y >= window.innerHeight - rect.height) directions[i].dy *= -1;

    fish.style.left = `${x}px`;
    fish.style.top = `${y}px`;

    // Lật hướng cá
    fish.style.transform = directions[i].dx > 0 ? "scaleX(1)" : "scaleX(-1)";
  });
  requestAnimationFrame(animateFish);
}
animateFish();

// Đổi nền
document.getElementById("changeBackground").addEventListener("click", () => {
  bgIndex = (bgIndex + 1) % bgList.length;
  aquarium.style.backgroundImage = `url('${bgList[bgIndex]}')`;
});

// Phát / Dừng nhạc
document.getElementById("toggleMusic").addEventListener("click", () => {
  if (music.paused) music.play();
  else music.pause();
});

// Điều chỉnh tốc độ
document.getElementById("speedUp").addEventListener("click", () => {
  speedFactor *= 1.3;
  updateSpeed();
});

document.getElementById("speedDown").addEventListener("click", () => {
  speedFactor /= 1.3;
  updateSpeed();
});

function updateSpeed() {
  fishes.forEach((_, i) => {
    let signX = Math.sign(directions[i].dx);
    let signY = Math.sign(directions[i].dy);
    directions[i].dx = signX * (Math.random() * 1 + 0.5) * speedFactor;
    directions[i].dy = signY * (Math.random() * 1 + 0.5) * speedFactor;
  });
}
