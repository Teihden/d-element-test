import { handleEscapeKey, handleEnterKey } from './utils.js';

class Modal {
  static onModalInnerClick = (evt) => evt.stopPropagation();

  static onOpenModalButtonKeydown(evt) {
    handleEnterKey(this.openModal, evt);
  }

  static onCloseModalButtonKeydown(evt) {
    handleEnterKey(this.closeModal, evt);
  }

  constructor(modalName, openModalCb = null) {
    this.elements = {
      modal: document.querySelector(`[data-modal=${modalName}]`),
      modalInner: document.querySelector(`[data-modal-inner=${modalName}]`),
      openModalButton: document.querySelector(`[data-open-button=${modalName}]`),
      closeModalButton: document.querySelector(`[data-close-button=${modalName}]`),
    };

    this.openModalCb = openModalCb;

    const {
      modal,
      modalInner,
      openModalButton,
      closeModalButton,
    } = this.elements;

    modal.addEventListener('click', this.closeModal);
    modalInner.addEventListener('click', Modal.onModalInnerClick);

    openModalButton.addEventListener('click', this.openModal);
    openModalButton.addEventListener('keydown', Modal.onOpenModalButtonKeydown.bind(this));

    closeModalButton.addEventListener('click', this.closeModal);
    closeModalButton.addEventListener('keydown', Modal.onCloseModalButtonKeydown.bind(this));
  }

  #onDocumentKeydown = (evt) => handleEscapeKey(this.closeModal, evt);

  openModal = () => {
    const { modal } = this.elements;

    modal.classList.add('modal--active');
    document.body.style.setProperty('overflow', 'hidden');
    document.addEventListener('keydown', this.#onDocumentKeydown);

    if (this.openModalCb) {
      this.openModalCb();
    }
  };

  closeModal = () => {
    const { modal } = this.elements;

    modal.classList.remove('modal--active');
    document.body.style.removeProperty('overflow');
    document.removeEventListener('keydown', this.#onDocumentKeydown);
  };
}

export { Modal };
