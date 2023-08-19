import { initMenu } from './modules/menu.js';
import { Modal } from './modules/Modal.js';

initMenu();

const formModal = new Modal('form-modal');

export { formModal };
