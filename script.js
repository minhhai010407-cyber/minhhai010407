// ---------- NHẠC ----------
const music = document.getElementById("music");
let playing = false;

function toggleMusic() {
    if (!playing) {
        music.play();
        playing = true;
    } else {
        music.pause();
        playing = false;
    }
}

// ---------- NỀN ----------
const backgrounds = [
    'images/anhnen.jpg',
    'images/anhnen2.jpg',
    'images/anhnen3.jpg'
];
let currentIndex = 0;

function changeBackground() {
    currentIndex = (currentIndex + 1) % backgrounds.length;
    document.body.style.backgroundImage = `url('${backgrounds[currentIndex]}')`;
}

// ---------- CÁ DI CHUYỂN NGẪU NHIÊN ----------
const fishes = document.querySelectorAll('.fish');

const fishData = Array.from(fishes).map(fish => ({
    el: fish,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() * 2 + 1) * (Math.random() < 0.5 ? -1 : 1),
    vy: (Math.random() * 1 + 0.5) * (Math.random() < 0.5 ? -1 : 1),
    speed: fish.classList.contains('dolia') ? 0.7 : (Math.random() * 1.5 + 0.5),
}));

function moveFish() {
    fishData.forEach(fish => {
        fish.x += fish.vx * fish.speed;
        fish.y += fish.vy * fish.speed;

        // Giới hạn trong khung, chạm mép thì đổi hướng
        if (fish.x <= 0 || fish.x + 150 >= window.innerWidth) {
            fish.vx *= -1;
            fish.el.style.transform = `scaleX(${fish.vx > 0 ? 1 : -1})`;
        }
        if (fish.y <= 0 || fish.y + 150 >= window.innerHeight) {
            fish.vy *= -1;
        }

        // Thay đổi nhẹ hướng để cá không đi thẳng mãi
        if (Math.random() < 0.02) {
            fish.vx += (Math.random() - 0.5) * 0.5;
            fish.vy += (Math.random() - 0.5) * 0.5;
        }

        fish.el.style.left = fish.x + 'px';
        fish.el.style.top = fish.y + 'px';
    });

    requestAnimationFrame(moveFish);
}
moveFish();

// ---------- BONG BÓNG ----------
function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = Math.random() * 20 + 10;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.animationDuration = (Math.random() * 5 + 5) + 's';
    document.querySelector('.ocean').appendChild(bubble);
    setTimeout(() => bubble.remove(), 10000);
}
setInterval(createBubble, 500);
