// Level up functionality
function showLevelUpModal(level, rank) {
    // Play celebratory sound
    playLevelUpSound();

    // Create confetti
    createConfetti();

    // Show modal
    document.getElementById('newLevel').textContent = 'Niveau ' + level;
    document.getElementById('newRank').textContent = rank;
    document.getElementById('levelUpModal').classList.remove('hidden');
}

function closeLevelUpModal() {
    document.getElementById('levelUpModal').classList.add('hidden');
    localStorage.removeItem('level-up');
}

function playLevelUpSound() {
    try {
        // Create an AudioContext for better sound synthesis
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const duration = 0.5;

        // Create oscillator for a triumphant sound
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Frequency sweep from 400Hz to 800Hz (triumphant rise)
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + duration * 0.5);
        oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + duration);

        // Volume envelope
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.type = 'sine';
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
        console.log('Audio not supported');
    }
}

function createConfetti() {
    const colors = ['#22c55e', '#10b981', '#84cc16', '#fbbf24'];
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

// Check for level-up on page load
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (localStorage.getItem('level-up')) {
            const levelUpData = JSON.parse(localStorage.getItem('level-up'));
            showLevelUpModal(levelUpData.level, levelUpData.rank);
        }
    }, 100);
});
