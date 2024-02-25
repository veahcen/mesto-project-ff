// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы 
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCards(item, deleteCard) {
  const cardContainer = cardTemplate.querySelector('.card').cloneNode(true);
  cardContainer.querySelector('.card__title').textContent = item.name;
  cardContainer.querySelector('.card__image').src = item.link;
  cardContainer.querySelector('.card__image').alt = item.name;

  const buttonDelete = cardContainer.querySelector('.card__delete-button');
  buttonDelete.addEventListener('click', () => deleteCard(cardContainer));

  return cardContainer;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  const card = createCards(item, deleteCard);
  cardsContainer.append(card);
});