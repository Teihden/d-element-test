const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

const handleEscapeKey = (cb, evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    evt.preventDefault();
    cb();
  }
};

const handleEnterKey = (cb, evt) => {
  if (isEnterKey(evt)) {
    evt.stopPropagation();
    evt.preventDefault();
    cb();
  }
};

export { handleEscapeKey, handleEnterKey };
