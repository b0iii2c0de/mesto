import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._popup.querySelector(".pop-up__image");
    this._caption = this._popup.querySelector(".pop-up__caption");
  }

  open(name, link) {
    this._img.src = link;
    this._img.alt = "Foto " + name;
    this._caption.textContent = name;

    super.open();
  }
}

