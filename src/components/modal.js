function closeModalOnEscape (evt) {
  if (evt.key === 'Escape') {
      close(modalEditProfile, formProfile);
      close(modalAddCard, formCard);
  }
}

function open(opoenModal) {
  opoenModal.classList.add('popup_is-opened');
  //Закрытие попапа нажатием на Esc

  document.addEventListener('keydown', closeModalOnEscape);
}

function close(closeModal, resetForm) {
  closeModal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalOnEscape);

  if (resetForm) {
    resetForm.reset();
  }
}

export {open, close};