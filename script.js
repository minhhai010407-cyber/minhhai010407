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

// Nền hồ cá (sử dụng ảnh bạn đã gửi)
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

// Bong bóng sinh động
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
