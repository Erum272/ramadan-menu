// Countdown
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


// Dark Mode with Save
function toggleMode() {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("mode", "light");
    } else {
        localStorage.setItem("mode", "dark");
    }
}

window.onload = function () {
    if (localStorage.getItem("mode") === "light") {
        document.body.classList.add("light-mode");
    }
};


// Search
function searchMenu() {
    let input = document.getElementById("search").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let title = card.querySelector("h3").innerText.toLowerCase();
        card.style.display = title.includes(input) ? "block" : "none";
    });
}


// Cart
let cart = [];

function addToCart(item) {
    cart.push(item);
    displayCart();
}

function displayCart() {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = "";

    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        cartList.appendChild(li);
    });
}