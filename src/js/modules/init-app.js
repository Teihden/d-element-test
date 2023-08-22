/* eslint-disable no-unused-vars */
import { Modal } from './modal.js';
import { Form } from './form.js';
import { Message } from './message.js';
import { initMenu } from './menu.js';

const initApp = () => {
  const formElement = document.querySelector('[data-form="work"]');
  const modalElement = document.querySelector('[data-modal="form-modal"]');
  const successMessageElement = document.querySelector('[data-message="success"]');
  const failureMessageElement = document.querySelector('[data-message="failure"]');

  const formModal = new Modal(modalElement);
  const successMessage = new Message(successMessageElement);
  const failureMessage = new Message(failureMessageElement);
  const form = new Form(formElement, formModal, successMessage, failureMessage);

  initMenu();
};

export { initApp };
