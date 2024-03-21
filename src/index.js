import './styles/index.css'; // добавьте импорт главного файла стилей
import createCards from './components/createCards';
import {open, close} from './components/modal';

createCards()


// открытие и закрытие мадального окна

const triggerOpenModalEditProfile = document.querySelector('.profile__edit-button');
const triggerOpenModalAddCard = document.querySelector('.profile__add-button');

const modalEditProfile = document.querySelector('.popup_type_edit');
const modalAddCard = document.querySelector('.popup_type_new-card');

const closeModalProfile = modalEditProfile.querySelector('.popup__close');
const closeModalCard = modalAddCard.querySelector('.popup__close');


triggerOpenModalEditProfile.addEventListener('click', () => {
  open(modalEditProfile);
});

triggerOpenModalAddCard.addEventListener('click', () => {
  open(modalAddCard);
});

closeModalProfile.addEventListener('click', () => {
  close(modalEditProfile, formProfile);
});

closeModalCard.addEventListener('click', () => {
  close(modalAddCard, formCard);
});


// закрытие на оверлей
modalEditProfile.addEventListener('click', (evt) => {
   if (evt.target.classList.contains('popup_type_edit')) {
    close(modalEditProfile, formProfile);
  }
});

modalAddCard.addEventListener('click', (evt) => {
   if (evt.target.classList.contains('popup_type_new-card')) {
    close(modalAddCard, formCard);
  }
});



// вывод текста в поля инпута

const profilTitle = document.querySelector('.profile__title');
const profilDescr = document.querySelector('.profile__description');

const formProfile = document.forms['edit-profile'];

const nameInput = formProfile.elements.name;
const jobInput  = formProfile.elements.description;

nameInput.value = profilTitle.textContent;
jobInput.value = profilDescr.textContent;


function handleFormSubmit(evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  const name = nameInput.value;
  const job = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  profilTitle.textContent = name;
  profilDescr.textContent = job;


  close(modalEditProfile, formProfile);

}

formProfile.addEventListener('submit', handleFormSubmit); 


// отрисовка карточки
const formCard = document.forms['new-place'];


function handleFormSubmitCard(evt) {
  evt.preventDefault();
  
  const placeInput = formCard.elements.placeName.value;
  const linkInput  = formCard.elements.link.value;

  createCards({ name: placeInput, link: linkInput });

  close(modalAddCard, formCard);

}

formCard.addEventListener('submit', handleFormSubmitCard);


// открытие и закрытие img карточки


const cardImage = document.querySelector('.popup_type_image');
const cardImageClose = cardImage.querySelector('.popup__close');

const triggerOpenImage = document.querySelector('.places__list');

const popupImage = cardImage.querySelector('.popup__image');
const popupDescr = cardImage.querySelector('.popup__caption');

triggerOpenImage.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__image')) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupDescr.textContent = evt.target.alt;
    open(cardImage);
  }
});

cardImageClose.addEventListener('click', () => {
  close(cardImage);
});

cardImage.addEventListener('click', (evt) => {
   if (evt.target.classList.contains('popup_type_image')) {
    close(cardImage);
  }
});