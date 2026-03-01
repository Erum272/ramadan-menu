let totalCalories = 0;

const duas = [
    "Allahumma inni laka sumtu wa bika aamantu.",
    "Allahumma taqabbal minna siyamana.",
    "Ya Allah forgive us.",
    "Rabbi inni lima anzalta ilayya min khairin faqeer."
];

const motivations = [
    "Ramadan is the month of discipline.",
    "Every fast brings you closer to Allah.",
    "Patience is the key to Jannah.",
    "Small efforts daily = big rewards."
];

function showDate() {
    const today = new Date();
    document.getElementById("date").innerText =
        "Today: " + today.toDateString();
}

function toggleMode() {
    document.body.classList.toggle("dark");
}

function addDish() {
    const name = document.getElementById("dishName").value;
    const calories = parseInt(document.getElementById("dishCalories").value);

    if (!name || !calories) {
        alert("Enter valid details!");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `${name} - ${calories} cal 
    <button onclick="deleteDish(this, ${calories})">❌</button>`;

    document.getElementById("dishList").appendChild(li);

    totalCalories += calories;
    updateCalories();
    saveData();

    document.getElementById("dishName").value = "";
    document.getElementById("dishCalories").value = "";
}

function deleteDish(btn, calories) {
    btn.parentElement.remove();
    totalCalories -= calories;
    updateCalories();
    saveData();
}

function updateCalories() {
    document.getElementById("totalCalories").innerText = totalCalories;
}

function searchDish() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const items = document.querySelectorAll("#dishList li");

    items.forEach(item => {
        if (item.innerText.toLowerCase().includes(input)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
}

function filterLow() {
    const items = document.querySelectorAll("#dishList li");

    items.forEach(item => {
        const cal = parseInt(item.innerText.match(/\d+/));
        if (cal > 300) {
            item.style.display = "none";
        }
    });
}

function showAll() {
    const items = document.querySelectorAll("#dishList li");
    items.forEach(item => item.style.display = "");
}

function clearAll() {
    document.getElementById("dishList").innerHTML = "";
    totalCalories = 0;
    updateCalories();
    localStorage.clear();
}

function generateDua() {
    const random = Math.floor(Math.random() * duas.length);
    document.getElementById("duaText").innerText = duas[random];
}

function motivation() {
    const random = Math.floor(Math.random() * motivations.length);
    document.getElementById("motivationText").innerText = motivations[random];
}

function countdown() {
    const now = new Date();
    const iftar = new Date();
    iftar.setHours(18, 30, 0);

    if (now > iftar) {
        iftar.setDate(iftar.getDate() + 1);
    }

    const diff = iftar - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("countdown").innerText =
        `${hours}h ${minutes}m ${seconds}s`;

    setTimeout(countdown, 1000);
}

function saveData() {
    localStorage.setItem("menu", document.getElementById("dishList").innerHTML);
    localStorage.setItem("calories", totalCalories);
}

function loadData() {
    const savedMenu = localStorage.getItem("menu");
    const savedCalories = localStorage.getItem("calories");

    if (savedMenu) {
        document.getElementById("dishList").innerHTML = savedMenu;
        totalCalories = parseInt(savedCalories);
        updateCalories();
    }
}

showDate();
loadData();
countdown();