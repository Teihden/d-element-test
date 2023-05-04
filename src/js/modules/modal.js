const modal = document.querySelector('.modal');

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
  const form = modal.querySelector(':scope .modal__form');
  const modalFields = modal.querySelectorAll(':scope .modal__field');
  const modalAlerts = modal.querySelectorAll(':scope .modal__alert');

  modal.classList.remove('modal--opened');
  body.style.position = '';
  body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0', 10) * -1, { behavior: 'instant' });
  form.reset();

  modalFields.forEach((element) => {
    element.classList.remove('modal__field--invalid');
  });

  modalAlerts.forEach((element) => {
    // eslint-disable-next-line no-param-reassign
    element.textContent = '';
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
