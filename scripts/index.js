// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы 
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCards(item, deleteCard) {
  const cardContainer = cardTemplate.querySelector('.card').cloneNode(true);
  cardContainer.querySelector('.card__title').textContent = item.name;
  cardContainer.querySelector('.card__image').src = item.link;

  const del = cardContainer.querySelector('.card__delete-button');
  del.addEventListener('click', deleteCard);

  cardsList.append(cardContainer);
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  event.target.parentElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => createCards(item, deleteCard));