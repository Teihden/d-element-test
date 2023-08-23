const EMAIL_REGEX = /^[a-zA-Z0-9]+([.-]?[a-zA-Z0-9])*@[a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.[a-zA-Z0-9]+(-?[a-zA-Z0-9])+$/;

class Validation {
  static #validator = {
    required: (value, condition) => !condition || (value !== undefined && value !== null && value !== ''),
    email: (value, condition) => !condition || (!value || EMAIL_REGEX.test(value)),
    minLength: (value, condition) => !value || value.length >= condition,
    maxLength: (value, condition) => !value || value.length <= condition,
  };

  static #message = {
    required: () => 'Empty field is not allowed',
    email: () => 'Entered value must be a valid email address',
    minLength: (value, condition) => `Field value must be at least ${condition} characters. You've entered ${value.length}`,
    maxLength: (value, condition) => `Field value must be a maximum of ${condition} characters. You've entered ${value.length}`,
  };

  constructor(formElement) {
    this.check = {};
    this.alert = {};
    this.error = {};
    this.input = {};

    const inputs = formElement.querySelectorAll('[data-input]');
    const alerts = formElement.querySelectorAll('[data-alert]');

    alerts.forEach((alert) => {
      const alertName = alert.dataset.alert;
      this.alert[alertName] = alert;
    });

    inputs.forEach((input) => {
      const inputName = input.dataset.input;
      this.input[inputName] = input;

      const checkList = JSON.parse(input.dataset.check);
      this.check[inputName] = checkList;
    });

    formElement.addEventListener('focusout', this.selectInput);
  }

  selectInput = (evt) => {
    const inputName = evt.target.dataset.input;

    if (inputName) {
      this.validate(inputName);
    }
  };

  validate = (inputName) => {
    const { value } = this.input[inputName];
    const normalizedValue = value.trim();
    const checkList = this.check[inputName];

    this.error[inputName] = null;

    Object.keys(checkList).forEach((checkName) => {
      if (!this.error[inputName]) {
        const checkCondition = checkList[checkName];
        const checkResult = Validation.#validator[checkName](normalizedValue, checkCondition);

        if (!checkResult) {
          this.error[inputName] = Validation.#message[checkName](normalizedValue, checkCondition);
          this.renderError(inputName);
        }
      }
    });

    if (!this.error[inputName]) {
      this.clearError(inputName);
    }
  };

  validateAll = () => {
    const inputs = Object.keys(this.input);
    inputs.forEach(this.validate);

    const checkResult = !Object.values(this.error).some((check) => check !== null);
    return checkResult;
  };

  clearError = (name) => {
    const input = this.input[name];
    const alert = this.alert[name];

    input.classList.remove('modal__field--invalid');
    alert.textContent = '';
  };

  renderError = (name) => {
    const input = this.input[name];
    const alert = this.alert[name];
    const error = this.error[name];

    input.classList.add('modal__field--invalid');
    alert.textContent = error;
  };

  clearAllErrors = () => {
    const inputNames = Object.keys(this.input);
    inputNames.forEach((name) => {
      const input = this.input[name];
      const alert = this.alert[name];

      input.classList.remove('modal__field--invalid');
      alert.textContent = '';
    });
  };
}

export { Validation };
