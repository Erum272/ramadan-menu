let dishes = JSON.parse(localStorage.getItem("dishes")) || [];
let totalCalories = parseInt(localStorage.getItem("totalCalories")) || 0;
let water = parseInt(localStorage.getItem("water")) || 0;
let tasbeeh = parseInt(localStorage.getItem("tasbeeh")) || 0;
let streak = parseInt(localStorage.getItem("streak")) || 0;
let calorieGoal = 2000;

function showDate() {
    date.innerText = new Date().toDateString();
}

function toggleMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("mode", document.body.classList.contains("dark"));
}

if (localStorage.getItem("mode") === "true") {
    document.body.classList.add("dark");
}

function addDish() {
    const name = dishName.value;
    const cal = parseInt(calories.value);

    if (!name || !cal) return alert("Fill required fields");

    dishes.push({ name, cal });
    totalCalories += cal;

    saveData();
    renderDishes();
}

function renderDishes() {
    dishList.innerHTML = "";
    dishes.forEach((d, i) => {
        dishList.innerHTML += `
        <li>
        ${d.name} - ${d.cal} cal
        <button onclick="deleteDish(${i})">❌</button>
        </li>`;
    });
    totalCal.innerText = totalCalories;
    updateProgress();
}

function deleteDish(i) {
    totalCalories -= dishes[i].cal;
    dishes.splice(i, 1);
    saveData();
    renderDishes();
}

function searchDish() {
    const text = search.value.toLowerCase();
    document.querySelectorAll("#dishList li").forEach(li => {
        li.style.display =
            li.innerText.toLowerCase().includes(text) ? "" : "none";
    });
}

function sortLow() {
    dishes.sort((a, b) => a.cal - b.cal);
    renderDishes();
}

function sortHigh() {
    dishes.sort((a, b) => b.cal - a.cal);
    renderDishes();
}

function updateProgress() {
    let percent = (totalCalories / calorieGoal) * 100;
    progressBar.style.width = percent + "%";
}

function addWater() {
    if (water < 8) water++;
    waterCount.innerText = water;
    localStorage.setItem("water", water);
}

function resetWater() {
    water = 0;
    waterCount.innerText = water;
    localStorage.setItem("water", water);
}

function countTasbeeh() {
    tasbeeh++;
    tasbeehCount.innerText = tasbeeh;
    localStorage.setItem("tasbeeh", tasbeeh);
}

function resetTasbeeh() {
    tasbeeh = 0;
    tasbeehCount.innerText = tasbeeh;
    localStorage.setItem("tasbeeh", tasbeeh);
}

function addGoal() {
    const goal = goalInput.value;
    if (!goal) return;

    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onchange="updateGoal()"> ${goal}`;
    goalList.appendChild(li);
    goalInput.value = "";
}

function updateGoal() {
    const all = document.querySelectorAll("#goalList input");
    const checked = document.querySelectorAll("#goalList input:checked");
    let percent = (checked.length / all.length) * 100 || 0;
    goalPercent.innerText = percent.toFixed(0) + "%";
}

function saveNotes() {
    localStorage.setItem("notes", notes.value);
}

notes.value = localStorage.getItem("notes") || "";

function updateStreak() {
    let lastVisit = localStorage.getItem("lastVisit");
    let today = new Date().toDateString();

    if (lastVisit !== today) {
        streak++;
        localStorage.setItem("streak", streak);
        localStorage.setItem("lastVisit", today);
    }

    document.getElementById("streak").innerText = streak;
}

function exportData() {
    let data = {
        dishes,
        totalCalories,
        water,
        tasbeeh,
        notes: notes.value
    };

    let blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ramadan_data.json";
    link.click();
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

function saveData() {
    localStorage.setItem("dishes", JSON.stringify(dishes));
    localStorage.setItem("totalCalories", totalCalories);
}

showDate();
renderDishes();
waterCount.innerText = water;
tasbeehCount.innerText = tasbeeh;
updateStreak();
countdown();