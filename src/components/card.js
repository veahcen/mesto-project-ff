// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard(item, deleteCard, likeCard) {
  const cardContainer = cardTemplate.querySelector('.card').cloneNode(true);
  cardContainer.querySelector('.card__title').textContent = item.name;
  const cardImage = cardContainer.querySelector('.card__image')
  cardImage.src = item.link; 
  cardImage.alt = item.name; 

  const buttonDelete = cardContainer.querySelector('.card__delete-button');
  buttonDelete.addEventListener('click', () => deleteCard(cardContainer));

  const isLike = cardContainer.querySelector('.card__like-button');
  isLike.addEventListener('click', () => likeCard(isLike));

  // cardImage.addEventListener('click', () => openImage(cardImage));

  return cardContainer;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// @todo: Функция лайка карточки
function likeCard(isLike) {
  isLike.classList.toggle('card__like-button_is-active');
}

// function openImage(card) {
//   console.log(card.src, card.alt);
//   return [card.src, card.alt];
//   if (evt.target.classList.contains('card__image')) {
//     return [evt.target.src, evt.target.alt];
//   }
// }

export {createCard, deleteCard, likeCard};