function updateCountdown() {
    const now = new Date();
    const iftar = new Date();

    iftar.setHours(18, 45, 0);

    if (now > iftar) {
        iftar.setDate(iftar.getDate() + 1);
    }

    const diff = iftar - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("timer").innerText =
        `${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

function toggleMode() {
    document.body.classList.toggle("light-mode");
}