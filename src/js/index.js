/* eslint-disable no-unused-vars */
import { Modal } from './modules/modal.js';
import { Form } from './modules/form.js';
import { Message } from './modules/message.js';
import { initMenu } from './modules/menu.js';

(() => {
  const formElement = document.querySelector('[data-form="work"]');
  const modalElement = document.querySelector('[data-modal="form-modal"]');
  const successMessageElement = document.querySelector('[data-message="success"]');
  const failureMessageElement = document.querySelector('[data-message="failure"]');

  const formModal = new Modal(modalElement);
  const successMessage = new Message(successMessageElement);
  const failureMessage = new Message(failureMessageElement);
  const form = new Form(formElement, formModal, successMessage, failureMessage);

  initMenu();
})();
