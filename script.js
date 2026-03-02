let dishes = [];
let totalCal = 0;
let waterCount = 0;
let tasbeeh = 0;
let calorieGoal = 2000;

const duas = [
    "Allahumma inni laka sumtu.",
    "Ya Allah accept our fast.",
    "Grant us forgiveness.",
    "Increase our sabr."
];

const motivations = [
    "Stay consistent.",
    "Ramadan builds discipline.",
    "Small progress daily.",
    "Be better than yesterday."
];

function showDate() {
    date.innerText = new Date().toDateString();
}

function toggleMode() {
    document.body.classList.toggle("dark");
}

function addDish() {
    const n = name.value;
    const c = parseInt(cal.value);

    if (!n || !c) return alert("Enter details");

    dishes.push({ n, c });
    totalCal += c;

    render();
    save();
    name.value = "";
    cal.value = "";
}

function render() {
    list.innerHTML = "";
    dishes.forEach((d, i) => {
        list.innerHTML += `
        <li>
        ${d.n} - ${d.c} cal
        <button onclick="deleteDish(${i})">❌</button>
        </li>`;
    });
    total.innerText = totalCal;
    updateBar();
}

function deleteDish(i) {
    totalCal -= dishes[i].c;
    dishes.splice(i, 1);
    render();
    save();
}

function updateBar() {
    let percent = (totalCal / calorieGoal) * 100;
    bar.style.width = percent + "%";
}

function searchDish() {
    const s = search.value.toLowerCase();
    document.querySelectorAll("#list li").forEach(li => {
        li.style.display =
            li.innerText.toLowerCase().includes(s) ? "" : "none";
    });
}

function sortLow() {
    dishes.sort((a, b) => a.c - b.c);
    render();
}

function sortHigh() {
    dishes.sort((a, b) => b.c - a.c);
    render();
}

function addWater() {
    if (waterCount < 8) waterCount++;
    water.innerText = waterCount;
}

function tasbeehCount() {
    tasbeeh++;
    document.getElementById("tasbeeh").innerText = tasbeeh;
}

function resetTasbeeh() {
    tasbeeh = 0;
    document.getElementById("tasbeeh").innerText = tasbeeh;
}

function addGoal() {
    const g = goalInput.value;
    if (!g) return;

    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onchange="goalUpdate()"> ${g}`;
    goals.appendChild(li);
    goalInput.value = "";
}

function goalUpdate() {
    const all = document.querySelectorAll("#goals input");
    const checked = document.querySelectorAll("#goals input:checked");
    let percent = (checked.length / all.length) * 100 || 0;
    goalPercent.innerText = percent.toFixed(0) + "%";
}

function dua() {
    text.innerText = duas[Math.floor(Math.random() * duas.length)];
}

function motivation() {
    text.innerText = motivations[Math.floor(Math.random() * motivations.length)];
}

function exportData() {
    let blob = new Blob([JSON.stringify(dishes)], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ramadan_menu.txt";
    link.click();
}

function save() {
    localStorage.setItem("dishes", JSON.stringify(dishes));
    localStorage.setItem("total", totalCal);
}

function load() {
    const saved = JSON.parse(localStorage.getItem("dishes"));
    if (saved) {
        dishes = saved;
        totalCal = parseInt(localStorage.getItem("total")) || 0;
        render();
    }
}

function countdown() {
    const now = new Date();
    const iftar = new Date();
    iftar.setHours(18, 30, 0);

    if (now > iftar) iftar.setDate(iftar.getDate() + 1);

    const diff = iftar - now;
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    countdown.innerText = `Iftar in ${h}h ${m}m ${s}s`;
    setTimeout(countdown, 1000);
}

showDate();
load();
countdown();