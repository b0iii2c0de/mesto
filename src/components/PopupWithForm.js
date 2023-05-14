import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(".pop-up__form");
    this._inputs = [...this._form.querySelectorAll(".pop-up__input")];
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      const buttonIsLoadingText = event.submitter.textContent;
      // Change button text when saving data
      event.submitter.textContent = "Сохранение...";
      this._submitForm(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          event.submitter.textContent = buttonIsLoadingText;
        });
    });
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

  close() {
    super.close();
    this._form.reset();
  }
}
