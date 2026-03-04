// Load saved data
let dishes = JSON.parse(localStorage.getItem("dishes")) || [];
let water = Number(localStorage.getItem("water")) || 0;
let tasbeeh = Number(localStorage.getItem("tasbeeh")) || 0;
let goals = JSON.parse(localStorage.getItem("goals")) || [];
let streak = Number(localStorage.getItem("streak")) || 0;

const quotes = [
    "Indeed, with hardship comes ease. (94:6)",
    "Allah does not burden a soul beyond that it can bear. (2:286)",
    "So remember Me; I will remember you. (2:152)",
    "Fasting is a shield. (Hadith)",
    "Make dua, Allah is listening."
];

// Initialize
window.onload = function() {
    updateDishes();
    updateWater();
    updateTasbeeh();
    updateGoals();
    document.getElementById("notes").value = localStorage.getItem("notes") || "";
    newQuote();

    if(localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark");
    }

    streak++;
    localStorage.setItem("streak", streak);
    document.getElementById("streak").innerText = streak;

    document.getElementById("date").innerText = new Date().toDateString();
};

// Dark Mode
function toggleMode(){
    document.body.classList.toggle("dark");
    localStorage.setItem("theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
}

// Motivation
function newQuote(){
    document.getElementById("quote").innerText =
        quotes[Math.floor(Math.random() * quotes.length)];
}

// Nutrition
function addDish(){
    const dish = {
        name: dishName.value,
        cal: Number(calories.value)
    };
    dishes.push(dish);
    localStorage.setItem("dishes", JSON.stringify(dishes));
    updateDishes();
}

function updateDishes(){
    dishList.innerHTML = "";
    let total = 0;

    dishes.forEach(d=>{
        dishList.innerHTML += `<li>${d.name} - ${d.cal} cal</li>`;
        total += d.cal;
    });

    totalCal.innerText = total;
    progressBar.style.width = (total/2000)*100 + "%";
}

function searchDish(){
    const value = search.value.toLowerCase();
    dishList.innerHTML = "";
    dishes.filter(d => d.name.toLowerCase().includes(value))
          .forEach(d=>{
              dishList.innerHTML += `<li>${d.name} - ${d.cal} cal</li>`;
          });
}

function sortLow(){
    dishes.sort((a,b)=>a.cal-b.cal);
    updateDishes();
}

function sortHigh(){
    dishes.sort((a,b)=>b.cal-a.cal);
    updateDishes();
}

// Water
function addWater(){
    water++;
    localStorage.setItem("water", water);
    updateWater();
}

function resetWater(){
    water = 0;
    localStorage.setItem("water", water);
    updateWater();
}

function updateWater(){
    waterCount.innerText = water;
}

// Tasbeeh
function countTasbeeh(){
    tasbeeh++;
    localStorage.setItem("tasbeeh", tasbeeh);
    updateTasbeeh();
}

function resetTasbeeh(){
    tasbeeh = 0;
    localStorage.setItem("tasbeeh", tasbeeh);
    updateTasbeeh();
}

function updateTasbeeh(){
    tasbeehCount.innerText = tasbeeh;
}

// Goals
function addGoal(){
    goals.push({text: goalInput.value, done:false});
    localStorage.setItem("goals", JSON.stringify(goals));
    updateGoals();
}

function updateGoals(){
    goalList.innerHTML = "";
    let completed = 0;

    goals.forEach((g,i)=>{
        goalList.innerHTML +=
        `<li onclick="toggleGoal(${i})"
         style="cursor:pointer; text-decoration:${g.done?'line-through':'none'}">
         ${g.text}</li>`;
        if(g.done) completed++;
    });

    goalPercent.innerText =
        goals.length ? Math.round((completed/goals.length)*100)+"%" : "0%";
}

function toggleGoal(i){
    goals[i].done = !goals[i].done;
    localStorage.setItem("goals", JSON.stringify(goals));
    updateGoals();
}

// Notes
function saveNotes(){
    localStorage.setItem("notes", notes.value);
    alert("Notes Saved!");
}

// Prayer
function checkPrayer(){
    const h = new Date().getHours();
    let msg = h<12?"Fajr/Dhuhr time":
              h<16?"Asr time":
              h<19?"Maghrib time":
              "Isha time";
    prayerTime.innerText = msg;
}

// Export
function exportData(){
    const data = {
        dishes, water, tasbeeh, goals, streak
    };
    const blob = new Blob([JSON.stringify(data,null,2)],
        {type:"application/json"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ramadan_data.json";
    link.click();
}