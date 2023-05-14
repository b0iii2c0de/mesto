export default class Card {
  constructor(
    data,
    templateSelector,
    openImgModalWindow,
    userId,
    like,
    dislike,
    deleteCard
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openImgModalWindow = openImgModalWindow;
    this._userId = userId;
    this._like = like;
    this._likes = data.likes;
    this._id = data._id;
    this._dislike = dislike;
    this._deleteCard = deleteCard;
    this._ownerId = data.owner._id;
    console.log(this._ownerId);
  }

  _handleUserLiked() {
    this._likes.forEach((elementId) => {
      if (elementId._id === this._userId) {
        this.like();
      } else {
        this.dislike();
      }
    });
  }

  like() {
    this._likeBtn.classList.add("elements__butt_liked");
  }

  dislike() {
    this._likeBtn.classList.remove("elements__butt_liked");
  }

  likesCount(res) {
    this._likesCount.textContent = `${res.likes.length}`;
  }

  remove() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  createCard = () => {
    const template = document.querySelector(this._templateSelector);
    if (template) {
      const element = template.content.querySelector(".elements__item");
      this._cardElement = element.cloneNode(true);
      this._likeBtn = this._cardElement.querySelector(".elements__butt");
      console.log(this._cardElement);
      // Устанавливаю счетчик для подсчета лайков
      this._likesCount = this._cardElement.querySelector(
        ".elements__count-like"
      );
      this._likesCount.textContent = this._likes.length;
      this._deleteButton = this._cardElement.querySelector(".elements__bin");
      if (this._ownerId !== this._userId) {
        this._deleteButton.remove();
      }

      this._cardImg = this._cardElement.querySelector(".elements__img");
      this._cardImg.src = this._link;
      this._cardImg.alt = this._name;
      this._cardElement.querySelector(".elements__name").textContent =
        this._name;

      this._setEventListeners();
      this._handleUserLiked();

      return this._cardElement;
    }
  };

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      if (this._likeBtn.classList.contains("elements__butt_liked")) {
        this._dislike();
      } else {
        this._like();
      }
    });
    this._deleteButton.addEventListener("click", () => {
      this._deleteCard(this._id);
    });
    this._cardImg.addEventListener("click", () => {
      this._openImgModalWindow(this._name, this._link);
    });
  }
}
