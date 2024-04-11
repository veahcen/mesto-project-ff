// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard(item, deleteCard, likeCard, openImage, likes, idUser, idCard, globalUserId) {
  const cardContainer = cardTemplate.querySelector('.card').cloneNode(true);

  const buttonIsMy = cardContainer.querySelector('.card__delete-button');
  if (idUser !== globalUserId) {
    buttonIsMy.classList.add('card__delete-button-disabled');
    buttonIsMy.disabled = true;
  } 

  cardContainer.querySelector('.card__title').textContent = item.name;
  cardContainer.querySelector('.card_like-count').textContent = likes;
  const cardImage = cardContainer.querySelector('.card__image');
  cardImage.src = item.link; 
  cardImage.alt = item.name;

  

  deleteCard(idCard, cardContainer);

  likeCard(idCard, cardContainer);

  cardImage.addEventListener('click', () => openImage(item.name, item.link));

  return cardContainer;
}

export {createCard};