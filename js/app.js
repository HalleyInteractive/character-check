const characters = Array.from(document.getElementsByClassName('character'));
const digits = Array.from(document.getElementsByClassName('digit'));
characters.map(c => c.addEventListener('keyup', characterKeypressHandler));

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