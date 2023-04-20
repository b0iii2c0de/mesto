import {openModal} from "../index.js";

export const imgModalWindow = document.querySelector(".img-pop-up");
const fullSizeImg = imgModalWindow.querySelector(".pop-up__image");
const fullSizeImgCap = imgModalWindow.querySelector(".pop-up__caption");

// declaring and export the class
export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    // property containes a whole template
    this._templateSelector = templateSelector;
  }

  // private method to get a template element from the HTML document
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return cardElement;
  }

  // public method to create card
  createCard() {
    this._element = this._getTemplate();
    this._cardImg = this._element.querySelector(".elements__img");

    // invoke listeners on card
    this._setEventListeners();

    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._element.querySelector(".elements__name").textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._likeBtn = this._element.querySelector(".elements__butt");
    this._likeBtn.addEventListener("click", () => {this._likeToggle()});

    this._element.querySelector(".elements__bin").addEventListener("click", () => {this._deleteCard()});

    this._cardImg.addEventListener("click", () => {this._openImgModalWindow()});
  }

  _openImgModalWindow() {
    fullSizeImg.src = this._link;
    fullSizeImg.alt = this._name;
    fullSizeImgCap.textContent = this._name;
    openModal(imgModalWindow);
  };

  _likeToggle() {
    this._likeBtn.classList.toggle("elements__butt_liked");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
