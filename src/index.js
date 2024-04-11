import './styles/index.css'; // добавьте импорт главного файла стилей
import {createCard} from './components/card';
import {openModal, closeModal} from './components/modal';
import {enableValidation, clearValidation} from './components/validation';
import { getUser, getCards, postUser, postCard, deleteCardApi, putLike, deleteLike, patchUser } from './components/api';


// @todo: DOM узел для вставки карточек 
const cardsContainer = document.querySelector('.places__list');

let globalUserId = null;

// отрисовка карточек через api

Promise.all([getUser(), getCards()])
  .then(([userData, cardData]) => {
    console.log(userData);
    console.log(cardData); 

    globalUserId = userData._id;

    cardData.forEach((item) => {
      const card = createCard(item, deleteCardPopup, likeCards, openImageCard, item.likes.length, item.owner._id, item._id);
      item.likes.forEach((like) => {
        if (like._id === globalUserId) {
        const isLike = card.querySelector('.card__like-button');
        isLike.classList.add('card__like-button_is-active');
      }
      });
      cardsContainer.append(card);
     
    });
  })
  .catch((err) => {
    console.log(err);
  });

// вызов валидации с передачей параметров
document.addEventListener('DOMContentLoaded', function() {
    enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button-disabled',
        inputErrorClass: 'form__input_type_error',
        errorClass: 'form__input-error_active'
    });
});

// открытие и закрытие мадального окна

const triggerOpenModalEditProfile = document.querySelector('.profile__edit-button');
const triggerOpenModalAddCard = document.querySelector('.profile__add-button');

const modalEditProfile = document.querySelector('.popup_type_edit');
const modalAddCard = document.querySelector('.popup_type_new-card');

const buttonCloseList = document.querySelectorAll('.popup__close');

buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closeModal(popup)); 
  popup.addEventListener('mousedown', (evt) => {
    if  (evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });
})

const formAddCard = document.forms['new-place'];
const cardName = formAddCard.elements.placeName;
const cardLink = formAddCard.elements.link;

triggerOpenModalAddCard.addEventListener('click', () => {
  cardName.value = '';
  cardLink.value = '';
  clearValidation(modalAddCard, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  });
  openModal(modalAddCard);
});

// вывод текста в поля инпута

const profilTitle = document.querySelector('.profile__title');
const profilDescr = document.querySelector('.profile__description');
const profilImage = document.querySelector('.profile__image');


const formProfile = document.forms['edit-profile'];

const nameInput = formProfile.elements.name;
const descrInput  = formProfile.elements.description;

// отрисовка данных пользователя через api
getUser()
  .then((result) => {
      profilTitle.textContent = result.name;
      profilDescr.textContent = result.about;
      profilImage.style.backgroundImage = `url(${result.avatar})`;
  })
  .catch((err) => {
    console.log(err);
  }); 


triggerOpenModalEditProfile.addEventListener('click', () => {
  nameInput.value = profilTitle.textContent;
  descrInput.value = profilDescr.textContent;
  clearValidation(modalEditProfile, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  });
  modalEditProfile.querySelector('.popup__button').classList.remove('popup__button-disabled');
  modalEditProfile.querySelector('.popup__button').disabled = false;
  openModal(modalEditProfile);
});


function handleFormSubmit(evt) {
  evt.preventDefault();
  formProfile.querySelector('.button').textContent = 'Сохранение...';
  postUser(nameInput.value, descrInput.value)
  .then((result) => {
      profilTitle.textContent = result.name;
      profilDescr.textContent = result.about;
      formProfile.querySelector('.button').textContent = 'Сохранить';
  })
  .catch((err) => {
    console.log(err);
    formProfile.querySelector('.button').textContent = 'Сохранить';
  });

  closeModal(modalEditProfile);
}

formProfile.addEventListener('submit', handleFormSubmit);

// отрисовка карточки
const formCard = document.forms['new-place'];


function handleFormSubmitCard(evt) {
  evt.preventDefault();
  formCard.querySelector('.button').textContent = 'Сохранение...';
  postCard(formCard.elements.placeName.value, formCard.elements.link.value)
  .then((result) => {
    const placeInput = result.name;
    const linkInput  = result.link;

    const card = createCard({ name: placeInput, link: linkInput }, deleteCardPopup, likeCards, openImageCard, result.likes.length, result.owner._id, result._id);
    cardsContainer.prepend(card);
    formCard.querySelector('.button').textContent = 'Сохранить';
    formCard.reset();
  })
  .catch((err) => {
    console.log(err);
    formCard.querySelector('.button').textContent = 'Сохранить';
  });

  closeModal(modalAddCard);
}

formCard.addEventListener('submit', handleFormSubmitCard);

// открытие и закрытие img карточки

const cardImage = document.querySelector('.popup_type_image');

const popupImage = cardImage.querySelector('.popup__image');
const popupDescr = cardImage.querySelector('.popup__caption');

function openImageCard(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupDescr.textContent = name;
  openModal(cardImage);
}

const openDeleteModal = document.querySelector('.popup_card_delete');



function deleteCardPopup(cardId, card) {
  const triggerOpenDeleteModal = card.querySelector('.card__delete-button');
  triggerOpenDeleteModal.addEventListener('click', () => {
    openModal(openDeleteModal);
    const deletecCadrFromBase = document.querySelector('.popup__button-delete');
    deletecCadrFromBase.addEventListener('click', () => {
      deleteCardApi(cardId)
        .then((result) => {
          console.log(result);
          card.remove();
          closeModal(openDeleteModal);
          triggerOpenDeleteModal.removeEventListener('click');
          deletecCadrFromBase.removeEventListener('click');
        })
        .catch((err) => {
          console.log(err);
        });
    })
  })
}

function likeCards(cardId, card) {
  const isLike = card.querySelector('.card__like-button');
  isLike.addEventListener('click', () => {
    if (isLike.classList.contains('card__like-button_is-active')) {
      isLike.classList.remove('card__like-button_is-active');
      deleteLike(cardId)
      .then((result) => {
          card.querySelector('.card_like-count').textContent = result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      isLike.classList.add('card__like-button_is-active');
      putLike(cardId)
      .then((result) => {
          card.querySelector('.card_like-count').textContent = result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}

// const formProfile = document.forms['edit-profile'];

// const nameInput = formProfile.elements.name;
//замена аватарки
const userAvatar = document.querySelector('.profile__image');
const modalAvatar = document.querySelector('.popup_card_update-avatar');

const formAvatar = document.forms['update-avatar'];
const avatarInput = formAvatar.elements.avatar;

userAvatar.addEventListener('click', () => {
  openModal(modalAvatar);
  avatarInput.value = '';
  clearValidation(modalAvatar, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  });
});

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  formAvatar.querySelector('.button').textContent = 'Сохранение...';
  patchUser(avatarInput.value)
  .then((result) => {
    userAvatar.style.backgroundImage = `url(${result.avatar})`;
    formAvatar.querySelector('.button').textContent = 'Сохранить';
    closeModal(modalAvatar)
  })
  .catch((err) => {
    console.log(err);
    formAvatar.querySelector('.button').textContent = 'Сохранить';
  });
}

formAvatar.addEventListener('submit', handleFormSubmitAvatar)