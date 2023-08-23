import { handleEscapeKey } from './utils.js';

class Message {
  static #onMessageInnerClick = (evt) => evt.stopPropagation();

  constructor(messageElement) {
    const messageName = messageElement.dataset.message;

    this.element = {
      message: messageElement,
      messageInner: messageElement.querySelector(`[data-message-inner=${messageName}]`),
    };

    this.id = null;

    const { message, messageInner } = this.element;

    message.addEventListener('click', this.closeMessage);

    if (messageInner) {
      messageInner.addEventListener('click', Message.#onMessageInnerClick);
    }
  }

  #onDocumentKeydown = (evt) => handleEscapeKey(this.closeMessage, evt);

  showMessage = () => {
    const { message } = this.element;

    message.classList.add('message--active');
    document.body.style.setProperty('overflow', 'hidden');

    document.addEventListener('keydown', this.#onDocumentKeydown, true);

    this.id = setTimeout(this.closeMessage, 4000);
  };

  closeMessage = () => {
    if (this.id) {
      clearTimeout(this.id);
    }

    const { message } = this.element;

    message.classList.remove('message--active');
    document.body.style.removeProperty('overflow');

    document.removeEventListener('keydown', this.#onDocumentKeydown, true);
  };
}

export { Message };
