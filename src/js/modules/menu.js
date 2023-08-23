const omMenuButtonClick = (evt) => {
  evt.currentTarget.classList.toggle('menu-button--active');
};

const initMenu = (menuButton) => {
  menuButton.addEventListener('click', omMenuButtonClick);
};

export { initMenu };
