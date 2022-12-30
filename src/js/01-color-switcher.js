const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timerId = null;

stopBtn.disabled = true;

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
  isPassive(startBtn);
  isActive(stopBtn);
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopClick() {
  isPassive(stopBtn);
  isActive(startBtn);
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function isPassive(btnPas) {
  btnPas.disabled = true;
}

function isActive(btnAct) {
  btnAct.disabled = false;
}
