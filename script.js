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


// Dark Mode Save
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
let total = 0;

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    displayCart();
}

function displayCart() {
    const cartList = document.getElementById("cart-list");
    const totalDisplay = document.getElementById("total");

    cartList.innerHTML = "";

    cart.forEach((product, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${product.item} - ₹${product.price}
            <button onclick="removeItem(${index})">❌</button>
        `;
        cartList.appendChild(li);
    });

    totalDisplay.innerText = total;
}

function removeItem(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    displayCart();
}

function clearCart() {
    cart = [];
    total = 0;
    displayCart();
}