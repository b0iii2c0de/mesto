// Creation of the Api utility class, to describe the work of logic, access to Api
export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // I form a request to the server, if it was not successful, we return an error!
  _handleSendReq(res) {
    if (res.ok) {
      return Promise.resolve(res.json());
    }

    // If an error came, we reject the promise
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Method for downloading user information from the server
  async getUser() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return this._handleSendReq(response);
  }

  // Method for downloading cards from the server
  async getInitialCards() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
    return this._handleSendReq(response);
  }

  // Profile editing method
  async editProfileUser(data) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return this._handleSendReq(response);
  }

  // User avatar update method
  async updateAvatar(data) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
    return this._handleSendReq(response);
  }

  // Method for adding a new card from the server
  async addCard(data) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    return this._handleSendReq(response);
  }

  // Card removal method
  async deletedCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._handleSendReq(response);
  }

  // Method for liking a card
  async addLike(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    return this._handleSendReq(response);
  }

  // The method of setting and removing likes from the card
  async deletedLike(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._handleSendReq(response);
  }
}
