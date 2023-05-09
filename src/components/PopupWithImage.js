import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._popup.querySelector(".pop-up__image");
    this._caption = this._popup.querySelector(".pop-up__caption");
  }

  open(data) {
    this._img.src = data.link;
    this._img.alt = data.name;
    this._caption.textContent = data.name;

    super.open();
  }
}
