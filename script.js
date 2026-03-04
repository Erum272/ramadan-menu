let dishes = JSON.parse(localStorage.getItem("dishes")) || [];
let water = Number(localStorage.getItem("water")) || 0;
let tasbeeh = Number(localStorage.getItem("tasbeeh")) || 0;
let goals = JSON.parse(localStorage.getItem("goals")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let streak = Number(localStorage.getItem("streak")) || 0;

/* ===== QURAN AYAHS ===== */
const ayahs = [
{
text: "Indeed, with hardship comes ease.",
ref: "Surah Ash-Sharh (94:6)"
},
{
text: "Allah does not burden a soul beyond that it can bear.",
ref: "Surah Al-Baqarah (2:286)"
},
{
text: "So remember Me; I will remember you.",
ref: "Surah Al-Baqarah (2:152)"
},
{
text: "And He found you lost and guided you.",
ref: "Surah Ad-Duha (93:7)"
},
{
text: "Verily, in the remembrance of Allah do hearts find rest.",
ref: "Surah Ar-Ra’d (13:28)"
}
];

function newAyah(){
    const random = Math.floor(Math.random()*ayahs.length);
    document.getElementById("ayahText").innerText = ayahs[random].text;
    document.getElementById("ayahRef").innerText = ayahs[random].ref;
}

/* ===== MOTIVATION ===== */
const quotes = [
"Stay patient, your dua is powerful.",
"Ramadan is your reset button.",
"Discipline today, Jannah tomorrow.",
"Small deeds, big rewards."
];

function newQuote(){
    quote.innerText = quotes[Math.floor(Math.random()*quotes.length)];
}

/* ===== REAL TIME CLOCK ===== */
function updateClock(){
    const now = new Date();
    liveDate.innerText = now.toDateString();

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    h = h<10?"0"+h:h;
    m = m<10?"0"+m:m;
    s = s<10?"0"+s:s;

    liveTime.innerText = `${h}:${m}:${s}`;

    if(h<12) greeting.innerText="👑 Good Morning!";
    else if(h<17) greeting.innerText="✨ Good Afternoon!";
    else if(h<20) greeting.innerText="🌙 Good Evening!";
    else greeting.innerText="🌟 Good Night!";
}

/* ===== LOAD ===== */
window.onload=function(){
    updateClock();
    setInterval(updateClock,1000);
    newAyah();
    newQuote();
};