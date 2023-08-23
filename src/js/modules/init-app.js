/* eslint-disable no-unused-vars */
import { Modal } from './modal.js';
import { Form } from './form.js';
import { Message } from './message.js';
import { initMenu } from './menu.js';

const initApp = () => {
  const menuButton = document.querySelector('[data-button="menu"]');
  const modalElement = document.querySelector('[data-modal="form-modal"]');
  const formElement = document.querySelector('[data-form="work"]');
  const successMessageElement = document.querySelector('[data-message="success"]');
  const failureMessageElement = document.querySelector('[data-message="failure"]');

  const instance = {};

  if (menuButton) {
    initMenu(menuButton);
  }

  if (modalElement) {
    instance.formModal = new Modal(modalElement);
  }

  if (successMessageElement) {
    instance.successMessage = new Message(successMessageElement);
  }

  if (failureMessageElement) {
    instance.failureMessage = new Message(failureMessageElement);
  }

  const { formModal, successMessage, failureMessage } = instance;

  if (formElement) {
    instance.form = new Form(formElement, formModal, successMessage, failureMessage);
  }
};

export { initApp };
