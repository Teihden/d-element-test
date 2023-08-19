// import {
//   closeModal,
// } from './modal.js';

// const modal = document.querySelector('.modal');

// const showErrorPresence = (element) => {
//   const className = element.name;
//   const modalAlert = modal.querySelector(`:scope .modal__alert--${className}`);

//   element.classList.add('modal__field--invalid');
//   modalAlert.textContent = 'Empty fields is not allowed.';
// };

// const removeError = (element) => {
//   const className = element.name;
//   const modalAlert = modal.querySelector(`:scope .modal__alert--${className}`);

//   element.classList.remove('modal__field--invalid');
//   modalAlert.textContent = '';
// };

// const checkFieldValuePresence = (element) => {
//   let check = true;

//   if (!element.value) {
//     check = false;
//     showErrorPresence(element);
//   } else if (element.value) {
//     removeError(element);
//   }

//   return check;
// };

// const checkEmailValue = (element) => {
//   const className = element.name;
//   const modalAlert = modal.querySelector(`:scope .modal__alert--${className}`);
//   let check = true;

//   if (element.validity.typeMismatch) {
//     check = false;
//     element.classList.add('modal__field--invalid');
//     modalAlert.textContent = 'Entered value needs to be an email address.';
//   } else if (element.validity.tooShort) {
//     check = false;
//     element.classList.add('modal__field--invalid');
//     modalAlert.textContent =
// `Email should be at least ${element.minLength} characters. You entered ${element.value.length}.`;
//   }

//   return check;
// };

// const checkEmail = (element) => {
//   if (checkFieldValuePresence(element)) {
//     checkEmailValue(element);
//   }
// };

// const sendFormData = () => {
//   const form = modal.querySelector(':scope .modal__form');
//   const formData = new FormData(form);
//   const url = form.action;
//   const workPopupText = document.querySelector('.work__popup-text');

//   fetch(url, {
//     method: 'POST',
//     body: formData,
//   })
//     .then((response) => {
//       if (response.ok) {
//         closeModal();
//         workPopupText.style.opacity = '1';
//         workPopupText.textContent = 'Your message successfully sent !';
//       } else {
//         closeModal();
//         workPopupText.style.opacity = '1';
//         workPopupText.textContent = 'Your message has not been sent !';
//       }
//     });

//   setTimeout(() => {
//     workPopupText.style.opacity = '0';
//   }, 4000);

//   setTimeout(() => {
//     workPopupText.textContent = '';
//   }, 5000);
// };

// const checkForm = (e) => {
//   e.preventDefault();

//   const modalFields = modal.querySelectorAll(':scope .modal__field');
//   const modalInputEmail = modal.querySelector(':scope .modal__input--email');

//   const isAbsentValueField = [...modalFields].map((element) => checkFieldValuePresence(element));
//   const isValidEmail = checkEmailValue(modalInputEmail);

//   if (!isAbsentValueField.includes(false) && isValidEmail) {
//     sendFormData();
//   }
// };

// export {
//   checkForm,
//   removeError,
//   checkEmail,
//   checkFieldValuePresence,
// };
