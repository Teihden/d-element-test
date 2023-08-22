import { Validation } from './validation.js';
import { sendData } from './http-api.js';

class Form {
  static #SubmitButtonText = {
    idle: 'Submit',
    sending: 'Sending...',
  };

  constructor(formElement, formModal, successMessage, failureMessage) {
    this.element = {
      form: formElement,
      submitButton: formElement.querySelector('[data-button="submit"]'),
    };

    const { form } = this.element;

    this.instance = {
      modal: formModal,
      successMessage,
      failureMessage,
    };

    const { modal } = this.instance;

    this.validation = new Validation(form);

    modal.openModalCb = () => {
      form.elements[0].focus();
    };
    modal.closeModalCb = () => {
      form.reset();
      this.validation.clearAllErrors();
    };

    form.addEventListener('submit', this.submit);
  }

  switchSubmitButtonState = (state, text) => {
    const { submitButton } = this.element;

    submitButton.disabled = state;
    submitButton.textContent = text;
  };

  createFormData = () => {
    const { form } = this.element;

    const data = new FormData(form);
    [...data.entries()].forEach(([key, value]) => data.set(key, value.trim()));

    return data;
  };

  sendFormData = (data) => {
    const { modal, successMessage, failureMessage } = this.instance;

    const onSuccessRequestSend = () => {
      modal.closeModal();
      successMessage.showMessage();
    };

    const onFailureRequestSend = failureMessage.showMessage;

    return sendData(onSuccessRequestSend, onFailureRequestSend, data);
  };

  submit = async (evt) => {
    evt.preventDefault();

    const isFormValid = this.validation.validateAll();

    if (isFormValid) {
      this.switchSubmitButtonState(true, Form.#SubmitButtonText.sending);

      const data = this.createFormData();
      await this.sendFormData(data);

      this.switchSubmitButtonState(false, Form.#SubmitButtonText.idle);
    }
  };
}

export { Form };
