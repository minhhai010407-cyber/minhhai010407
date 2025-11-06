// Danh sách nền
const backgrounds = ["anhnen.jpg", "anhnen2.jpg", "anhnen3.jpg"];
let currentBg = 0;

function changeBackground() {
    currentBg = (currentBg + 1) % backgrounds.length;
    document.getElementById("aquarium").style.backgroundImage = `url('${backgrounds[currentBg]}')`;
}

// Nhạc
const music = document.getElementById("music");
let isPlaying = false;
function toggleMusic() {
    if (isPlaying) music.pause(); else music.play();
    isPlaying = !isPlaying;
}

// Cá bơi
const fishes = document.querySelectorAll('.fish');
const aquarium = document.getElementById('aquarium');

// Biến điều chỉnh tốc độ tổng thể
let speedMultiplier = 1.0;
function updateSpeed(value) {
    speedMultiplier = parseFloat(value);
}

// Dữ liệu chuyển động ban đầu
const fishData = Array.from(fishes).map(fish => ({
    el: fish,
    x: Math.random() * (window.innerWidth - 100),
    y: Math.random() * (window.innerHeight - 100),
    dx: (Math.random() * 0.3 + 0.1) * (Math.random() < 0.5 ? 1 : -1),
    dy: (Math.random() * 0.3 + 0.1) * (Math.random() < 0.5 ? 1 : -1),
}));

function animate() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    fishData.forEach(fish => {
        fish.x += fish.dx * speedMultiplier;
        fish.y += fish.dy * speedMultiplier;

        // Va chạm tường
        if (fish.x <= 0 || fish.x >= w - 100) {
            fish.dx *= -1;
            fish.el.style.transform = fish.dx > 0 ? 'scaleX(1)' : 'scaleX(-1)';
        }
        if (fish.y <= 0 || fish.y >= h - 100) {
            fish.dy *= -1;
        }

        fish.el.style.left = fish.x + "px";
        fish.el.style.top = fish.y + "px";
    });

    requestAnimationFrame(animate);
}

animate();
