// Object containing class selectors used throughout the code
const classSelectors = {
  inputErrorClass: "pop-up__input_type-error",
  inputErrorActiveClass: "pop-up__input-error_active",
  inputSelector: ".pop-up__input",
  submitButtonSelector: ".pop-up__sub-butt",
  inactiveButtonClass: "pop-up__sub-butt_disabled",
  formSelector: ".pop-up__form",
};

// Shows an error message next to an input field
const displayInputError = (form, input, message, settings) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  error.textContent = message;
  error.classList.add(settings.inputErrorActiveClass);
};

// Hides an error message next to an input field
const hideInputError = (form, input, settings) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  error.classList.remove(settings.inputErrorActiveClass);
  error.textContent = "";
};

// Checks the validity of an input field and shows/hides error message accordingly
const checkInputValidity = (form, input, settings) => {
  if (!input.validity.valid) {
    displayInputError(
      form,
      input,
      input.validationMessage,
      settings
    );
  } else {
    hideInputError(form, input, settings);
  }
};

// Sets event listeners for all input fields in a form
const setEventListeners = (form, settings) => {
  const inputList = Array.from(
    form.querySelectorAll(settings.inputSelector)
  );
  const button = form.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, button, settings);
  // Resets the form and toggles button state when reset button is clicked
  form.addEventListener("reset", () => {
    setTimeout(() => {
      toggleButtonState(inputList, button, settings);
    }, 0);
  });
  // Listens for input events on all input fields and checks their validity
  inputList.forEach((input) => {
    input.addEventListener("input", function () {
      checkInputValidity(form, input, settings);
      toggleButtonState(inputList, button, settings);
    });
  });
};

// Enables validation on all forms with the specified selectors
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((form) => setEventListeners(form, settings));
};

// Checks if any input fields in the provided list are invalid
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

// Toggles the disabled/enabled state of a submit button based on input field validity
const toggleButtonState = (inputList, button, settings) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(settings.inactiveButtonClass);
    button.setAttribute("disabled", "");
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.removeAttribute("disabled", "");
  }
};

// Enables validation on all forms with the provided class selectors
enableValidation(classSelectors);
