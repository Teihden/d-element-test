// Modal
import {
  openModal,
  closeModal,
  closeModalByOverlay,
  setScroll,
} from './modules/modal.js';

import {
  checkForm,
  checkFieldValuePresence,
  checkEmail,
} from './modules/form.js';

// Modal
const buttonOpenModal = document.querySelector('.work__button');
const buttonCloseModal = document.querySelector('.modal__button-close');
const modal = document.querySelector('.modal');

buttonOpenModal.addEventListener('click', openModal);
buttonCloseModal.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => closeModalByOverlay(e));
window.addEventListener('scroll', setScroll);

// Form
const form = modal.querySelector(':scope .modal__form');
const modalInputEmail = modal.querySelector(':scope .modal__input--email');
const modalInputName = modal.querySelector(':scope .modal__input--name');
const modalTextarea = modal.querySelector(':scope .modal__textarea');

form.addEventListener('submit', (e) => checkForm(e));
modalInputName.addEventListener('input', (e) => checkFieldValuePresence(e.target));
modalTextarea.addEventListener('input', (e) => checkFieldValuePresence(e.target));
modalInputEmail.addEventListener('input', (e) => checkEmail(e.target));
