// Nhạc
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

// Đổi nền
const backgrounds = [
    'linear-gradient(to bottom, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
    'linear-gradient(to bottom, #0f766e, #14b8a6, #99f6e4)',
    'linear-gradient(to bottom, #7e22ce, #a855f7, #d8b4fe)',
    'linear-gradient(to bottom, #b91c1c, #ef4444, #fca5a5)',
    'linear-gradient(to bottom, #f59e0b, #fbbf24, #fef08a)'
];
let currentIndex = 0;

function changeBackground() {
    currentIndex = (currentIndex + 1) % backgrounds.length;
    document.body.style.background = backgrounds[currentIndex];
}

// Bong bóng tự tạo
function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const size = Math.random() * 20 + 10;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.animationDuration = (Math.random() * 4 + 5) + 's';
    document.querySelector('.ocean').appendChild(bubble);

    setTimeout(() => bubble.remove(), 9000);
}

setInterval(createBubble, 500);
