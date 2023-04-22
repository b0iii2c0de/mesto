// declaring and export the class
export default class FormValidator {
  constructor(formSelectors, formElement) {
    this._inputElement = formSelectors.inputElement;
    this._typeErrorModeration = formSelectors.typeErrorModeration;
    this._errorActiveModeration = formSelectors.errorActiveModeration;
    this._saveBtnElement = formSelectors.saveBtnElement;
    this._saveBtnElementOff = formSelectors.saveBtnElementOff;
    this._formElement = formElement;
  }

  // private method to throw an error when input values
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._typeErrorModeration);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorActiveModeration);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // these two removes type, active classes from input
    inputElement.classList.remove(this._typeErrorModeration);
    errorElement.classList.remove(this._errorActiveModeration);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputElement));
    this._btnElement = this._formElement.querySelector(this._saveBtnElement);
    this._stateBtnToggle();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._stateBtnToggle();
      });
    });
  }

  // method to clean errors and button control
  resetValidation() {
    this._stateBtnToggle();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }

  // method to check imput validity
  _invalidInput() {
    return this._inputList.some((inputElement) => {return !inputElement.validity.valid});
  }

  // method to switch the state of a button element
  _stateBtnToggle() {
    if (this._invalidInput(this._inputList)) {
      this._btnElement.classList.add(this._saveBtnElementOff);
      this._btnElement.setAttribute("disabled", true);
    } else {
      console.log(this._btnElement);
      this._btnElement.classList.remove(this._saveBtnElementOff);
      this._btnElement.removeAttribute("disabled");
    }
  }

  // public method to enable form validation
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
};
