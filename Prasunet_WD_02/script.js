// script.js
let startTime, updatedTime, difference, tInterval, running = false, lapCount = 0;
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');
const body = document.body;

const initialColor = { background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)', color: '#fff' };
const colors = [
    { background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', color: '#fff' },
    { background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', color: '#333' },
    { background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', color: '#333' },
    { background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', color: '#333' },
];

let colorIndex = 0;
let colorInterval;

function changeBackground() {
    colorIndex = (colorIndex + 1) % colors.length;
    body.style.background = colors[colorIndex].background;
    body.style.color = colors[colorIndex].color;
}

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        colorInterval = setInterval(changeBackground, 5000); // Change background every 5 seconds
        running = true;
        startStopBtn.innerHTML = "Stop";
    } else {
        clearInterval(tInterval);
        clearInterval(colorInterval);
        running = false;
        startStopBtn.innerHTML = "Start";
    }
}

function reset() {
    clearInterval(tInterval);
    clearInterval(colorInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    startStopBtn.innerHTML = "Start";
    laps.innerHTML = "";
    lapCount = 0;
    // Reset to initial color
    body.style.background = initialColor.background;
    body.style.color = initialColor.color;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    display.innerHTML = hours + ':' + minutes + ':' + seconds;
}

function lap() {
    if (running) {
        lapCount++;
        const lapTime = display.innerHTML;
        const lapElement = document.createElement('li');
        lapElement.innerText = `Lap ${lapCount}: ${lapTime}`;
        laps.appendChild(lapElement);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
