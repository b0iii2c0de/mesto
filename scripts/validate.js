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
const displayInputError = (form, input, message, css) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(css.inputErrorClass);
  error.textContent = message;
  error.classList.add(css.inputErrorActiveClass);
};

// Hides an error message next to an input field
const hideInputError = (form, input, css) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(css.inputErrorClass);
  error.classList.remove(css.inputErrorActiveClass);
  error.textContent = "";
};

// Checks the validity of an input field and shows/hides error message accordingly
const checkInputValidity = (form, input, css) => {
  if (!input.validity.valid) {
    displayInputError(
      form,
      input,
      input.validationMessage,
      css
    );
  } else {
    hideInputError(form, input, css);
  }
};

// Sets event listeners for all input fields in a form
const setEventListeners = (form, css) => {
  const inputList = Array.from(
    form.querySelectorAll(css.inputSelector)
  );
  const button = form.querySelector(css.submitButtonSelector);
  toggleButtonState(inputList, button, css);
  // Resets the form and toggles button state when reset button is clicked
  form.addEventListener("reset", () => {
    setTimeout(() => {
      toggleButtonState(inputList, button, css);
    }, 0);
  });
  // Listens for input events on all input fields and checks their validity
  inputList.forEach((input) => {
    input.addEventListener("input", function () {
      checkInputValidity(form, input, css);
      toggleButtonState(inputList, button, css);
    });
  });
};

// Enables validation on all forms with the specified selectors
const enableValidation = (css) => {
  const formList = Array.from(document.querySelectorAll(css.formSelector));
  formList.forEach((form) => setEventListeners(form, css));
};

// Checks if any input fields in the provided list are invalid
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

// Toggles the disabled/enabled state of a submit button based on input field validity
const toggleButtonState = (inputList, button, css) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(css.inactiveButtonClass);
    button.setAttribute("disabled", "");
  } else {
    button.classList.remove(css.inactiveButtonClass);
    button.removeAttribute("disabled", "");
  }
};

// Enables validation on all forms with the provided class selectors
enableValidation(classSelectors);
