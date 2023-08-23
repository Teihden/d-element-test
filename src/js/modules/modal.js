import { handleEscapeKey, handleEnterKey } from './utils.js';

class Modal {
  static #onModalInnerClick = (evt) => evt.stopPropagation();

  static #onOpenModalButtonKeydown(evt) {
    handleEnterKey(this.openModal, evt);
  }

  static #onCloseModalButtonKeydown(evt) {
    handleEnterKey(this.closeModal, evt);
  }

  constructor(modalElement, openModalCb = null, closeModalCb = null) {
    const modalName = modalElement.dataset.modal;

    this.element = {
      modal: modalElement,
      modalInner: modalElement.querySelector(`[data-modal-inner=${modalName}]`),
      openModalButton: document.querySelector(`[data-open-button=${modalName}]`),
      closeModalButton: modalElement.querySelector(`[data-close-button=${modalName}]`),
    };

    this.openModalCb = openModalCb;
    this.closeModalCb = closeModalCb;

    const {
      modal,
      modalInner,
      openModalButton,
      closeModalButton,
    } = this.element;

    modal.addEventListener('click', this.closeModal);

    if (modalInner) {
      modalInner.addEventListener('click', Modal.#onModalInnerClick);
    }

    if (openModalButton) {
      openModalButton.addEventListener('click', this.openModal);
      openModalButton.addEventListener('keydown', Modal.#onOpenModalButtonKeydown.bind(this));
    }

    if (closeModalButton) {
      closeModalButton.addEventListener('click', this.closeModal);
      closeModalButton.addEventListener('keydown', Modal.#onCloseModalButtonKeydown.bind(this));
    }
  }

  #onDocumentKeydown = (evt) => handleEscapeKey(this.closeModal, evt);

  openModal = () => {
    const { modal } = this.element;

    modal.classList.add('modal--active');
    document.body.style.setProperty('overflow', 'hidden');
    document.addEventListener('keydown', this.#onDocumentKeydown);

    if (this.openModalCb) {
      this.openModalCb();
    }
  };

  closeModal = () => {
    const { modal } = this.element;

    modal.classList.remove('modal--active');
    document.body.style.removeProperty('overflow');
    document.removeEventListener('keydown', this.#onDocumentKeydown);

    if (this.closeModalCb) {
      this.closeModalCb();
    }
  };
}

export { Modal };
