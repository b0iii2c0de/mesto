import Popup from "./Popup.js";
import { profileForm, classSelectors } from "../../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._btnElement = this._popupSelector.querySelector(
      classSelectors.saveBtnElement
    );
  }

  _getInputValues() {
    this._inputsList = this._popupSelector.querySelectorAll(
      classSelectors.inputElement
    );

    this._formValues = {};
    this._inputsList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector
      .querySelector(profileForm)
      .addEventListener("submit", (evt) => {
        this._submitForm(evt, this._getInputValues());
      });
  }

  close() {
    super.close();
    // this._popupSelector.querySelector(profileForm).reset();
    this._btnElement.classList.add(classSelectors.saveBtnElementOff);
    this._btnElement.setAttribute("disabled", "");
  }
}
