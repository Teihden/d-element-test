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

  modal.classList.remove('modal--opened');
  body.style.position = '';
  body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0', 10) * -1, { behavior: 'instant' });
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

// const showDialog = () => {
//   document.getElementById('dialog').classList.add('show')
//   const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
//   const body = document.body;
//   body.style.position = 'fixed';
//   body.style.top = `-${scrollY}`;
// };

// const closeDialog = () => {
//   const body = document.body;
//   const scrollY = body.style.top;
//   body.style.position = '';
//   body.style.top = '';
//   window.scrollTo(0, parseInt(scrollY || '0') * -1);
//   document.getElementById('dialog').classList.remove('show');
// }

// window.addEventListener('scroll', () => {
//   document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
// });
