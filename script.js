let dishes = JSON.parse(localStorage.getItem("dishes")) || [];
let water = Number(localStorage.getItem("water")) || 0;
let tasbeeh = Number(localStorage.getItem("tasbeeh")) || 0;
let goals = JSON.parse(localStorage.getItem("goals")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let streak = Number(localStorage.getItem("streak")) || 0;

const quotes = [
    "Indeed, with hardship comes ease. (94:6)",
    "Allah does not burden a soul beyond that it can bear. (2:286)",
    "So remember Me; I will remember you. (2:152)",
    "Fasting is a shield. (Hadith)",
    "Make dua, Allah is listening."
];

window.onload = function() {
    updateDishes();
    updateWater();
    updateTasbeeh();
    updateGoals();
    updateTasks();

    document.getElementById("notes").value = localStorage.getItem("notes") || "";
    document.getElementById("date").innerText = new Date().toDateString();
    newQuote();

    if(localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark");
    }

    streak++;
    localStorage.setItem("streak", streak);
    document.getElementById("streak").innerText = streak;
};

function toggleMode(){
    document.body.classList.toggle("dark");
    localStorage.setItem("theme",
        document.body.classList.contains("dark") ? "dark" : "light");
}

function newQuote(){
    quote.innerText = quotes[Math.floor(Math.random()*quotes.length)];
}

function addDish(){
    if(!dishName.value || !calories.value) return;
    dishes.push({name:dishName.value, cal:Number(calories.value)});
    localStorage.setItem("dishes", JSON.stringify(dishes));
    dishName.value = "";
    calories.value = "";
    updateDishes();
}

function updateDishes(){
    dishList.innerHTML = "";
    let total = 0;

    dishes.forEach((d,index)=>{
        dishList.innerHTML += 
        `<li>${d.name} - ${d.cal} cal
        <button onclick="deleteDish(${index})">❌</button></li>`;
        total += d.cal;
    });

    totalCal.innerText = total;
    progressBar.style.width = (total/2000)*100 + "%";

    if(total > 2000){
        alert("⚠ You exceeded 2000 calories!");
    }
}

function deleteDish(i){
    dishes.splice(i,1);
    localStorage.setItem("dishes", JSON.stringify(dishes));
    updateDishes();
}

function searchDish(){
    const value = search.value.toLowerCase();
    dishList.innerHTML = "";
    dishes.filter(d=>d.name.toLowerCase().includes(value))
          .forEach(d=>{
            dishList.innerHTML += `<li>${d.name} - ${d.cal} cal</li>`;
          });
}

function sortLow(){ dishes.sort((a,b)=>a.cal-b.cal); updateDishes(); }
function sortHigh(){ dishes.sort((a,b)=>b.cal-a.cal); updateDishes(); }

function calculateBMI(){
    const w = Number(weight.value);
    const h = Number(height.value)/100;
    const bmi = (w/(h*h)).toFixed(2);
    bmiResult.innerText = "BMI: " + bmi;
}

function addWater(){ water++; localStorage.setItem("water",water); updateWater(); }
function resetWater(){ water=0; localStorage.setItem("water",water); updateWater(); }
function updateWater(){ waterCount.innerText = water; }

function countTasbeeh(){ tasbeeh++; localStorage.setItem("tasbeeh",tasbeeh); updateTasbeeh(); }
function resetTasbeeh(){ tasbeeh=0; localStorage.setItem("tasbeeh",tasbeeh); updateTasbeeh(); }
function updateTasbeeh(){ tasbeehCount.innerText = tasbeeh; }

function addGoal(){
    goals.push({text:goalInput.value, done:false});
    localStorage.setItem("goals", JSON.stringify(goals));
    goalInput.value="";
    updateGoals();
}

function updateGoals(){
    goalList.innerHTML="";
    let completed=0;
    goals.forEach((g,i)=>{
        goalList.innerHTML+=
        `<li onclick="toggleGoal(${i})"
         style="text-decoration:${g.done?'line-through':'none'}">
         ${g.text}</li>`;
        if(g.done) completed++;
    });
    goalPercent.innerText = goals.length ?
        Math.round((completed/goals.length)*100)+"%" : "0%";
}

function toggleGoal(i){
    goals[i].done=!goals[i].done;
    localStorage.setItem("goals", JSON.stringify(goals));
    updateGoals();
}

function addTask(){
    tasks.push(taskInput.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value="";
    updateTasks();
}

function updateTasks(){
    taskList.innerHTML="";
    tasks.forEach(t=>{
        taskList.innerHTML+=`<li>${t}</li>`;
    });
}

function saveNotes(){
    localStorage.setItem("notes", notes.value);
    alert("Notes Saved!");
}

function checkPrayer(){
    const h = new Date().getHours();
    prayerTime.innerText =
        h<12?"Fajr/Dhuhr time":
        h<16?"Asr time":
        h<19?"Maghrib time":"Isha time";
}

function resetAll(){
    if(confirm("Reset everything?")){
        localStorage.clear();
        location.reload();
    }
}

function exportData(){
    const data={dishes,water,tasbeeh,goals,tasks,streak};
    const blob=new Blob([JSON.stringify(data,null,2)],
        {type:"application/json"});
    const link=document.createElement("a");
    link.href=URL.createObjectURL(blob);
    link.download="ramadan_data.json";
    link.click();
}