const modal = document.querySelector('.modal');
const modalFields = modal.querySelectorAll(':scope .modal__field');
const modalInputEmail = modal.querySelector(':scope .modal__input--email');

const showErrorPresence = (element) => {
  const className = element.dataset.class;
  const modalAlert = modal.querySelector(`:scope .modal__alert--${className}`);

  element.classList.add('modal__field--invalid');
  modalAlert.textContent = 'Empty fields is not allowed.';
};

const removeError = (element) => {
  const className = element.dataset.class;
  const modalAlert = modal.querySelector(`:scope .modal__alert--${className}`);

  element.classList.remove('modal__field--invalid');
  modalAlert.textContent = '';
};

const checkFieldValuePresence = (element) => {
  let check = true;

  if (!element.value) {
    check = false;
    showErrorPresence(element);
  } else if (element.value) {
    removeError(element);
  }

  return check;
};

const checkEmailValue = (element) => {
  const className = element.dataset.class;
  const modalAlert = modal.querySelector(`:scope .modal__alert--${className}`);
  let check = false;

  if (element.validity.typeMismatch) {
    check = true;
    element.classList.add('modal__field--invalid');
    modalAlert.textContent = 'Entered value needs to be an email address.';
  } else if (element.validity.tooShort) {
    check = true;
    element.classList.add('modal__field--invalid');
    modalAlert.textContent = `Email should be at least ${element.minLength} characters. You entered ${element.value.length}.`;
  }

  return check;
};

const checkEmail = (element) => {
  if (checkFieldValuePresence(element)) {
    checkEmailValue(element);
  }
};

const checkForm = (e) => {
  const isAbsentValueField = [...modalFields].map((element) => checkFieldValuePresence(element));
  const isValidEmail = checkEmailValue(modalInputEmail);

  if (isAbsentValueField.includes(false) || isValidEmail) {
    e.preventDefault();
  }
};

export {
  checkForm,
  removeError,
  checkEmail,
  checkFieldValuePresence,
};
