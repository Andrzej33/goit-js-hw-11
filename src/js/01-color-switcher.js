function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

stopBtn.disabled = true;

let timerId = null;

const start = () => {
  if (timerId) return;
  stopBtn.disabled = false;
  startBtn.disabled = true;
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    console.log('start');
  }, 1000);
};
const stop = () => {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  clearInterval(timerId);
  timerId = null;
};

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
