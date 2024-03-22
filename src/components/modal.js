function closeByEsc (evt) {
  if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      closeModal(openedPopup); 
  }
}

function openModal(modalElement) {
  modalElement.classList.add('popup_is-opened');
  //Закрытие попапа нажатием на Esc
  document.addEventListener('keydown', closeByEsc);
}

function closeModal(modalElement) {
  modalElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
}

export {openModal, closeModal};