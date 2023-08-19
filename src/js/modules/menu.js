const omMenuButtonClick = (evt) => {
  evt.currentTarget.classList.toggle('menu-button--active');
};

const initMenu = () => {
  const menuButton = document.querySelector('[data-button="menu"]');
  menuButton.addEventListener('click', omMenuButtonClick);
};

export { initMenu };
