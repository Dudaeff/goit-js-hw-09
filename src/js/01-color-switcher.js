const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let intervalId = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
    stopBtn.removeAttribute('disabled');
    startBtn.setAttribute('disabled', 'disabled');
    changeBgColorByInterval();
};

function onStopBtnClick() {
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', 'disabled');
    clearInterval(intervalId);
};

function changeBgColorByInterval() {
    return intervalId = setInterval(() => {
        body.style.backgroundColor =  getRandomHexColor();
    }, 1000)
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};