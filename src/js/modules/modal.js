import {
  removeError,
} from './form.js';

const modal = document.querySelector('.modal');
const modalFields = modal.querySelectorAll(':scope .modal__field');

const setScroll = () => {
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
};

const getScroll = () => document.documentElement.style.getPropertyValue('--scroll-y');

const openModal = () => {
  const scrollY = getScroll();
  const { body } = document;

  modal.classList.add('modal--opened');
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}`;
};

const closeModal = () => {
  const { body } = document;
  const scrollY = body.style.top;

  modal.classList.remove('modal--opened');
  body.style.position = '';
  body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0', 10) * -1, { behavior: 'instant' });

  modalFields.forEach((element) => {
    removeError(element);
  });
};

const closeModalByOverlay = (e) => {
  const modalInner = document.querySelector('.modal__inner');

  if (!modalInner.contains(e.target)) {
    closeModal();
  }
};

export {
  openModal,
  closeModal,
  closeModalByOverlay,
  setScroll,
  getScroll,
};
