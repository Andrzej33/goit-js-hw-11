// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

// Обєкт з налаштуваннями бібліотеки

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const pickedData = selectedDates[0].getTime();

    //   Перевірка чи вибрана дата знаходитьсся в майбутньому
    if (pickedData > Date.now()) {
      refs.startBtn.disabled = false;
      return;
    }

    Report.failure('Please choose a date in the future');
  },
};

// Ініціфлізація і створення доступу до бібліотеки flatpickr

flatpickr('#datetime-picker', options);
const fp = document.querySelector('#datetime-picker')._flatpickr;

// Створення посилань для  нещбхідних елементів

const refs = {
  day: document.querySelector('span[data-days]'),
  hour: document.querySelector('span[data-hours]'),
  minute: document.querySelector('span[data-minutes]'),
  second: document.querySelector('span[data-seconds]'),
  startBtn: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
};

// Встановлення початкового значення лічильника ш очищення input  при перезавантаженні сторінки

let timerId = null;
fp.clear();

// Додавання стилів до Timer

refs.timer.style.display = 'flex';
refs.timer.style.marginTop = '20px';
refs.timer.style.gap = '10px';
refs.timer.style.backgroundColor = 'rgb(44 205 34)';
refs.timer.style.width = 'fit-content';
refs.timer.style.fontSize = 'x-large';
refs.timer.style.padding = '10px';
refs.timer.style.borderStyle = 'dotted';

// Встановлення видимості кнопки за замовчуванням

refs.startBtn.disabled = true;

// Додавання слухача подій при запуску таймера і створення функції для обробки кліку

refs.startBtn.addEventListener('click', onTimerClick);

function onTimerClick() {
  refs.startBtn.disabled = true;
  if (timerId) return;
  const futureData = fp.selectedDates[0].getTime();

  timerId = setInterval(() => {
    const currentData = Date.now();
    const ms = futureData - currentData;

    if (ms <= 0) return;
    const generalTime = convertMs(ms);
    changedTimeLeft(generalTime);
  }, 1000);
}

// Функція для додавання в інтерфейсі таймера  0, якщо в числі менше двох символів

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

// Створення функції для виведення таймера в інтерфейс

function changedTimeLeft({ days, hours, minutes, seconds }) {
  refs.day.textContent = `${days}`;
  refs.hour.textContent = `${hours}`;
  refs.minute.textContent = `${minutes}`;
  refs.second.textContent = `${seconds}`;
}
