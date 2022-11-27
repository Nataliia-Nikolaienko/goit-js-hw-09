import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

refs.form.addEventListener('submit', onFormSubmit);


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}


function onFormSubmit(evt) {
  evt.preventDefault();

  let delayValue = Number(refs.delay.value);
  let stepValue = Number(refs.step.value);;
  let amountValue = Number(refs.amount.value);
  
  for (let i = 0; i < amountValue; i += 1) {
    createPromise(i + 1, i * stepValue + delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  evt.target.reset();
}
