import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    btnStartEl: document.querySelector('button[data-start]'),
    daysEl: document.querySelector('span[data-days]'),
    hoursEl: document.querySelector('span[data-hours]'),
    minutesEl: document.querySelector('span[data-minutes]'),
    secondsEl: document.querySelector('span[data-seconds]'),
};


let timer = null;
refs.btnStartEl.addEventListener('click', userDate);
  refs.btnStartEl.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        timer = selectedDates[0].getTime();
        console.log(timer);
        const currentTime = Date.now();
        if ((timer - currentTime) < 0) {
      
            Notiflix.Notify.failure("Please choose a date in the future");
            // refs.btnStartEl.setAttribute('disabled', true);
            return;
        }
        //   refs.btnStartEl.setAttribute('disabled', true);
        refs.btnStartEl.removeAttribute('disabled');
    }
};

flatpickr('#datetime-picker', options);


function userDate() {
    
    const intervalId = setInterval(() => {
        const time = timer - Date.now();

        if (time >= 0) {

        // refs.btnStartEl.removeAttribute('disabled');

            convertMs(time);
            const { days, hours, minutes, seconds } = convertMs(time);
            updateClockFace({ days, hours, minutes, seconds });
        } else {
            clearInterval(intervalId);
        }
    }, 1000);    
};


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

function updateClockFace({ days, hours, minutes, seconds }) {
    refs.daysEl.textContent = `${days}`;
    refs.hoursEl.textContent = `${hours}`;
    refs.minutesEl.textContent = `${minutes}`;
    refs.secondsEl.textContent = `${seconds}`;
};