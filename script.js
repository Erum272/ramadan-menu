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

/* ===== REAL TIME CLOCK ===== */
function updateClock() {
    const now = new Date();

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    liveDate.innerText = now.toLocaleDateString(undefined, options);

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    h = h < 10 ? "0"+h : h;
    m = m < 10 ? "0"+m : m;
    s = s < 10 ? "0"+s : s;

    liveTime.innerText = `${h}:${m}:${s}`;

    if(h < 12) greeting.innerText = "👑 Good Morning, Stay Blessed!";
    else if(h < 17) greeting.innerText = "✨ Good Afternoon, Stay Productive!";
    else if(h < 20) greeting.innerText = "🌙 Good Evening, Ramadan Kareem!";
    else greeting.innerText = "🌟 Good Night, May Allah Bless You!";
}

window.onload = function(){
    updateClock();
    setInterval(updateClock,1000);

    updateDishes();
    updateWater();
    updateTasbeeh();
    updateGoals();
    updateTasks();
    newQuote();

    streak++;
    localStorage.setItem("streak", streak);
    document.getElementById("streak").innerText = streak;
};

/* ===== OTHER FEATURES ===== */

function toggleMode(){
    document.body.classList.toggle("dark");
}

function newQuote(){
    quote.innerText = quotes[Math.floor(Math.random()*quotes.length)];
}

function addDish(){
    if(!dishName.value || !calories.value) return;
    dishes.push({name:dishName.value, cal:Number(calories.value)});
    localStorage.setItem("dishes", JSON.stringify(dishes));
    updateDishes();
}

function updateDishes(){
    dishList.innerHTML="";
    let total=0;
    dishes.forEach((d,i)=>{
        dishList.innerHTML += 
        `<li>${d.name} - ${d.cal} cal
        <button onclick="deleteDish(${i})">❌</button></li>`;
        total+=d.cal;
    });
    totalCal.innerText=total;
    progressBar.style.width=(total/2000)*100+"%";
}

function deleteDish(i){
    dishes.splice(i,1);
    localStorage.setItem("dishes", JSON.stringify(dishes));
    updateDishes();
}

function searchDish(){
    const val=search.value.toLowerCase();
    dishList.innerHTML="";
    dishes.filter(d=>d.name.toLowerCase().includes(val))
    .forEach(d=>dishList.innerHTML+=`<li>${d.name} - ${d.cal}</li>`);
}

function sortLow(){ dishes.sort((a,b)=>a.cal-b.cal); updateDishes(); }
function sortHigh(){ dishes.sort((a,b)=>b.cal-a.cal); updateDishes(); }

function calculateBMI(){
    const w=Number(weight.value);
    const h=Number(height.value)/100;
    const bmi=(w/(h*h)).toFixed(2);
    bmiResult.innerText="BMI: "+bmi;
}

function addWater(){ water++; localStorage.setItem("water",water); updateWater(); }
function resetWater(){ water=0; localStorage.setItem("water",water); updateWater(); }
function updateWater(){ waterCount.innerText=water; }

function countTasbeeh(){ tasbeeh++; localStorage.setItem("tasbeeh",tasbeeh); updateTasbeeh(); }
function resetTasbeeh(){ tasbeeh=0; localStorage.setItem("tasbeeh",tasbeeh); updateTasbeeh(); }
function updateTasbeeh(){ tasbeehCount.innerText=tasbeeh; }

function addGoal(){
    goals.push({text:goalInput.value,done:false});
    localStorage.setItem("goals",JSON.stringify(goals));
    updateGoals();
}

function updateGoals(){
    goalList.innerHTML="";
    let done=0;
    goals.forEach((g,i)=>{
        goalList.innerHTML+=
        `<li onclick="toggleGoal(${i})"
        style="text-decoration:${g.done?'line-through':'none'}">
        ${g.text}</li>`;
        if(g.done) done++;
    });
    goalPercent.innerText = goals.length ?
    Math.round((done/goals.length)*100)+"%" : "0%";
}

function toggleGoal(i){
    goals[i].done=!goals[i].done;
    localStorage.setItem("goals",JSON.stringify(goals));
    updateGoals();
}

function addTask(){
    tasks.push(taskInput.value);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    updateTasks();
}

function updateTasks(){
    taskList.innerHTML="";
    tasks.forEach(t=>taskList.innerHTML+=`<li>${t}</li>`);
}

function saveNotes(){
    localStorage.setItem("notes",notes.value);
    alert("Saved!");
}

function checkPrayer(){
    const h=new Date().getHours();
    prayerTime.innerText=
    h<12?"Fajr/Dhuhr":
    h<16?"Asr":
    h<19?"Maghrib":"Isha";
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