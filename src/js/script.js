// Modal
import { openModal, closeModal, closeModalByOverlay, setScroll } from './modules/modal.js';

const buttonOpenModal = document.querySelector('.work__button');
const buttonCloseModal = document.querySelector('.modal__button-close');
const modal = document.querySelector('.modal');

buttonOpenModal.addEventListener('click', openModal);
buttonCloseModal.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => closeModalByOverlay(e));
window.addEventListener('scroll', setScroll);
