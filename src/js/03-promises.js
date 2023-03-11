import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Ініціалізація налаштувань бібліотеки

Notify.init({ timeout: 4000, position: 'right-bottom', width: '220px' });

// Функція для виклику та повернення промісу

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Отримуємо посилання на форму і додаємо мінімальне оформлення

const form = document.querySelector('.form');

form.style.display = 'flex';
form.style.flexDirection = 'column';
form.style.alignItems = 'baseline';
form.style.gap = '10px';

// Додаємо слухача на підписку форми

form.addEventListener('submit', evt => {
  evt.preventDefault();

  // Отримуємо значення з форми

  const delayDenotation = Number(form.delay.value);
  const stepDenotation = Number(form.step.value);
  const amountDenotation = form.amount.value;

  // Перебираємо в циклі кількість промісів і створюємо один на кожній ітерації

  for (let i = 0; i < amountDenotation; i++) {
    createPromise(i + 1, stepDenotation * i + delayDenotation)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
