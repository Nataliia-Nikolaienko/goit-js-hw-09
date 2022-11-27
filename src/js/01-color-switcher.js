function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'), 
};

let timerId = null;

refs.btnStart.addEventListener('click', onBtnStartClick);
refs.btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
    timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  refs.btnStart.setAttribute('disabled', 'true');
  refs.btnStop.removeAttribute('disabled', 'true');
};

function onBtnStopClick() {
    clearInterval(timerId);
  refs.btnStart.removeAttribute('disabled', 'true');
  refs.btnStop.setAttribute('disabled', 'true');
};


