// Nút đổi nền
const backgrounds = [
    'linear-gradient(to bottom, #1e3a8a, #3b82f6, #60a5fa)',
    'linear-gradient(to bottom, #0f766e, #14b8a6, #99f6e4)',
    'linear-gradient(to bottom, #7e22ce, #a855f7, #d8b4fe)',
    'linear-gradient(to bottom, #b91c1c, #ef4444, #fca5a5)',
    'linear-gradient(to bottom, #f59e0b, #fbbf24, #fef08a)'
];
let bgIndex = 0;
document.getElementById("bgBtn").addEventListener("click", () => {
    bgIndex = (bgIndex + 1) % backgrounds.length;
    document.body.style.background = backgrounds[bgIndex];
});

// Phát nhạc
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let isPlaying = false;
musicBtn.addEventListener("click", () => {
    if (!isPlaying) {
        music.play();
        musicBtn.textContent = "⏸ Dừng nhạc";
    } else {
        music.pause();
        musicBtn.textContent = "▶️ Phát nhạc";
    }
    isPlaying = !isPlaying;
});

// Bong bóng ngẫu nhiên
function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    const size = Math.random() * 25 + 10;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = Math.random() * 100 + "%";
    bubble.style.animationDuration = (Math.random() * 5 + 5) + "s";
    document.querySelector(".ocean").appendChild(bubble);
    setTimeout(() => bubble.remove(), 10000);
}
setInterval(createBubble, 500);
