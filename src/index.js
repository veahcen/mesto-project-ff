import './styles/index.css'; // добавьте импорт главного файла стилей
import initialCards from './components/cards';
import {createCard, deleteCard, likeCard, openImage} from './components/card';
import {openModal, closeModal} from './components/modal';


// @todo: DOM узел для вставки карточек 
const cardsContainer = document.querySelector('.places__list');

initialCards.forEach((item) => {
  const card = createCard(item, deleteCard, likeCard, openImageCard);
  cardsContainer.append(card);
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

triggerOpenModalAddCard.addEventListener('click', () => {
  openModal(modalAddCard);
});

// вывод текста в поля инпута

const profilTitle = document.querySelector('.profile__title');
const profilDescr = document.querySelector('.profile__description');

const formProfile = document.forms['edit-profile'];

const nameInput = formProfile.elements.name;
const jobInput  = formProfile.elements.description;


triggerOpenModalEditProfile.addEventListener('click', () => {
  nameInput.value = profilTitle.textContent;
  jobInput.value = profilDescr.textContent;
  openModal(modalEditProfile);
});


function handleFormSubmit(evt) {
  evt.preventDefault();

  profilTitle.textContent = nameInput.value;
  profilDescr.textContent = jobInput.value;

  closeModal(modalEditProfile);
}

formProfile.addEventListener('submit', handleFormSubmit); 


// отрисовка карточки
const formCard = document.forms['new-place'];


function handleFormSubmitCard(evt) {
  evt.preventDefault();
  
  const placeInput = formCard.elements.placeName.value;
  const linkInput  = formCard.elements.link.value;

  const card = createCard({ name: placeInput, link: linkInput }, deleteCard, likeCard, openImageCard);
  cardsContainer.prepend(card);

  formCard.reset();

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