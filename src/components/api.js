const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-11',
  headers: {
    authorization: 'd18d17de-71da-4ffa-96dc-f3bf4ad6b748',
    'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
} 

async function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then((res) => checkResponse(res))
    .catch((err) => {
      return err;
    });
}

async function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then((res) => checkResponse(res))
    .catch((err) => {
      return err;
    });
}

async function postUser(title, descr) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
     body: JSON.stringify({
      name: title,
      about: descr
    })
  })
    .then((res) => checkResponse(res))
    .catch((err) => {
      return err;
    });
}

async function postCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
     body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then((res) => checkResponse(res))
    .catch((err) => {
      return err;
    });
}

async function deleteCardApi(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then((res) => checkResponse(res))
    .catch((err) => {
      return err;
    });
}

async function putLike (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then((res) => checkResponse(res))
    .catch((err) => {
      return err;
    });
}

async function deleteLike (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then((res) => checkResponse(res))
    .catch((err) => {
      return err;
    });
}

async function patchUser (url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
    .then((res) => checkResponse(res))
    .catch((err) => {
      return err;
    });
}

export {getUser, getCards, postUser, postCard, deleteCardApi, putLike, deleteLike, patchUser};