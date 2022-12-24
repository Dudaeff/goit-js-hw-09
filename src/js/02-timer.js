import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({ position: 'center-top', cssAnimationStyle: 'from-top', fontAwesomeIconStyle: 'shadow' });

const refs = {
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    timer: document.querySelector('.timer'),
};
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = Date.now();
        const timeToDeadline = convertMs(selectedDates[0] - currentDate);

        if (selectedDates[0] <= currentDate) {
            Notify.info('Please choose a date in the future');
            return;
        } else {
            refs.startBtn.disabled = false;
            initializeTimer(timeToDeadline);
        };
    },
};
const fp = flatpickr('#datetime-picker', options);
let timerIntervalId = null;
let bgColorIntervalId = null;
refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
    updateTimer();
    timerIntervalId = setInterval(updateTimer, 1000); 
    
    refs.startBtn.disabled = true; 

    bgColorIntervalId = setInterval(() => {
        refs.timer.style.backgroundColor = getRandomHexColor();
    }, 5000);
};

function initializeTimer({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}

function updateTimer() {
        const timeToDeadline = fp.selectedDates[0] - Date.now();
        const { days, hours, minutes, seconds } = convertMs(timeToDeadline);
        refs.days.textContent = addLeadingZero(days);
        refs.hours.textContent = addLeadingZero(hours);
        refs.minutes.textContent = addLeadingZero(minutes);
        refs.seconds.textContent = addLeadingZero(seconds);
 
    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
        clearInterval(timerIntervalId);
        clearInterval(bgColorIntervalId);
        return;
    }
};

function addLeadingZero(value) {
  return value.toString().padStart(2,"0")
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};