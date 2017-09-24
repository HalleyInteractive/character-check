var timerInitialValue = 45 * 60;
var timerStart = null;
var timerInterval = null;

const time = document.getElementById('time');
const characters = Array.from(document.getElementsByClassName('character'));
const digits = Array.from(document.getElementsByClassName('digit'));
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const fullscreenButton = document.getElementById('fullscreen-button');
const container = document.getElementById('container');

characters.map(c => c.addEventListener('keyup', characterKeypressHandler));
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
fullscreenButton.addEventListener('click', toggleFullscreen);

function characterKeypressHandler(event) {
    if(event.code == 'Backspace' && event.target.previousElementSibling) {
        event.target.previousElementSibling.focus();
    } else if(event.keyCode >= 65 && event.keyCode <= 90) {
        event.target.value = event.key.toUpperCase();
        if(event.target.nextElementSibling) {
            event.target.nextElementSibling.focus();
        }
    } else if(event.code == 'ArrowLeft' && event.target.previousElementSibling) {
        event.target.previousElementSibling.focus();
    } else if(event.code == 'ArrowRight' && event.target.nextElementSibling) {
        event.target.nextElementSibling.focus();
    }
    calculateOutput();
}

function calculateOutput() {
    let total = 0;
    characters.map((c, i) => {
        let value = parseInt(c.value.charCodeAt(0) * i);
        if(!isNaN(value)) {
            total += value;
        }
    });
    let cbrt = Math.cbrt(total) * 23456;
    setOutput(cbrt.toString().substr(-4));
}

function setOutput(output) {
    for(let i = 0; i < digits.length; i++) {
        digits[i].innerHTML = output.substr(i,1);
    }
}

function startTimer() {
    startButton.style.display = 'none';
    pauseButton.style.display = 'block';
    timerStart = Date.now();
    if(timerInterval === null) {
        timerInterval = setInterval(timerTick, 100);
    }
}

function pauseTimer() {
    startButton.style.display = 'block';
    pauseButton.style.display = 'none';
    clearInterval(timerInterval);
    timerInterval = null;
    timerInitialValue = timerInitialValue - (((Date.now() - timerStart) / 1000) | 0);
}

function timerTick() {
    let diff = timerInitialValue - (((Date.now() - timerStart) / 1000) | 0);
    let minutes = (diff / 60) | 0;
    let seconds = (diff % 60) | 0;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    time.innerHTML = minutes + ":" + seconds;
}

function toggleFullscreen() {
  if(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {
    if (document.exitFullscreen) { document.exitFullscreen(); }
    else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
    else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
    else if (document.msExitFullscreen) { document.msExitFullscreen(); }
  } else {
    if (container.requestFullscreen) { container.requestFullscreen(); }
    else if (container.mozRequestFullScreen) { container.mozRequestFullScreen(); }
    else if (container.webkitRequestFullscreen) { container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT); }
    else if (container.msRequestFullscreen) { container.msRequestFullscreen(); }
  }
}