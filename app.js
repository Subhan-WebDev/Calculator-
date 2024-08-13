let display = document.getElementById('display');

function clearDisplay() {
    display.innerText = '';
}

function deleteLast() {
    display.innerText = display.innerText.slice(0, -1);
}

function appendNumber(number) {
    display.innerText += number;
}

function calculateResult() {
    try {
        display.innerText = eval(display.innerText);
    } catch (error) {
        display.innerText = 'Error';
    }
}