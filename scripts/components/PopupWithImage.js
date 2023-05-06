import Popup from "./Popup.js";
import { fullSizeImg, fullSizeImgCap } from "../../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._popupSelector.querySelector(fullSizeImg);
    this._caption = this._popupSelector.querySelector(fullSizeImgCap);
  }

  open(data) {
    this._img.src = data.link;
    this._img.alt = data.name;
    this._caption.textContent = data.name;

    super.open();
  }
}
