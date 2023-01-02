import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

btn.addEventListener('click', () => {
  timer.start();
});

const fp = flatpickr(input);
let selectedTime = null;

btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
    } else {
      btn.disabled = false;
      selectedTime = selectedDates[0];
    }
  },
};

class Timer {
  constructor() {
    this.intervalId = null;
    btn.disabled = true;
  }
  start() {
    if (btn.disabled) {
      return;
    }

    btn.disabled = false;
    this.intervalId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = selectedTime - startTime;
      const time = convertMs(deltaTime);
      console.log(time);
      this.update(time);
      if (deltaTime <= 0) {
        this.stop();
      }
    }, 1000);
  }
  update({ days, hours, minutes, seconds }) {
    days.textContent = days;
    hours.textContent = hours;
    minutes.textContent = minutes;
    seconds.textContent = seconds;
  }
  stop() {
    clearInterval(this.intervalId);
  }
}

const timer = new Timer();
flatpickr(input, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
