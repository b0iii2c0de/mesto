import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(".pop-up__form");
    this._inputs = [...this._form.querySelectorAll(".pop-up__input")];
    this._submitButton = this._popup.querySelector(".pop-up__sub-butt");
    this._submitTitle = this._submitButton.textContent;
  }

  setInputValue(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  open() {
    this._submitButton.textContent = this._submitTitle;
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }

  updateText() {
    this._submitButton.textContent = "Сохранение...";
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }
}
