import initialCards from './cards';

export default function createCards(newCard) {

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

    const isLike = cardContainer.querySelector('.card__like-button');
    isLike.addEventListener('click', (evt) => likeCard(evt, isLike));

    return cardContainer;
  }

  // @todo: Функция удаления карточки
  function deleteCard(card) {
    card.remove();
  }

  // @todo: Функция лайка карточки
  function likeCard(evt, isLike) {
    if (evt.target.classList.contains('card__like-button_is-active')) {
      isLike.classList.remove('card__like-button_is-active');
    } else {
      isLike.classList.add('card__like-button_is-active');
    }
  }
  
  if (!newCard) {
    // @todo: Вывести карточки на страницу
    initialCards.forEach((item) => {
      const card = createCards(item, deleteCard);
      cardsContainer.append(card);
    });
  }

  if (newCard) {
    const card = createCards(newCard, deleteCard);
    cardsContainer.prepend(card);
  }
  
}