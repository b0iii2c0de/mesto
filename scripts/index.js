// Import modules
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";

// selectors
const classSelectors = {
  typeErrorModeration: "pop-up__input_type-error",
  errorActiveModeration: "pop-up__input-error_active",
  inputElement: ".pop-up__input",
  saveBtnElement: ".pop-up__sub-butt",
  saveBtnElementOff: "pop-up__sub-butt_disabled",
};

// Get the modal elements
const profileModalWindow = document.querySelector(".profile-pop-up");
const cardModalWindow = document.querySelector(".card-pop-up");

// del, used in Card class
const imgModalWindow = document.querySelector(".img-pop-up");
const fullSizeImg = imgModalWindow.querySelector(".pop-up__image");
const fullSizeImgCap = imgModalWindow.querySelector(".pop-up__caption");

const profileForm = document.querySelector(".pop-up__form");
const profileFormEdit = document.querySelector(".pop-up__form-edit"); // used in formVal fn
const cardForm = document.querySelector(".pop-up__form_submit"); // used in formVal fn

// Get profile values and input values
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const nameInput = profileModalWindow.querySelector("#name");
const descriptionInput = profileModalWindow.querySelector("#description");

// Get card input values
const placeNameIn = cardModalWindow.querySelector("#place-name");
const placeImgLinkIn = cardModalWindow.querySelector("#img-link");

// Get buttons
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");

// Get template
const cardsGrid = document.querySelector(".elements__grid");

// An array of cards
const primeCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// New instances to validate forms
const formValidatorEdit = new FormValidator(classSelectors, profileFormEdit);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(classSelectors, cardForm);
formValidatorAdd.enableValidation();

// Functions to close modals when pressing escape button
const closeByPressEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.pop-up_opened');
    closeModal(openedModal);
  }
};

// Universal open/close functions
const openModal = (modal) => {
  modal.classList.add("pop-up_opened");
  document.addEventListener("keydown", closeByPressEsc);
};

const closeModal = (modal) => {
  modal.classList.remove("pop-up_opened");
  document.removeEventListener("keydown", closeByPressEsc);
}

// Function to fill in form with profile values
const openProfileModalWindow = () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileSubtitle.textContent;
  openModal(profileModalWindow);
};

// Function to handle profile form submission
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = descriptionInput.value;
  closeModal(profileModalWindow);
  // reset the validation state of the form elements and remove any error messages.
  formValidatorEdit.resetValidation();
};

// Function to open an image fully
function openImgModalWindow(name, link) {
  fullSizeImg.src = link;
  fullSizeImg.alt = name;
  fullSizeImgCap.textContent = name;
  openModal(imgModalWindow);
};

// Functions to open card & img modal-windows
const openCardModalWindow = () => openModal(cardModalWindow);

// Function to handle card form submission
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  if (!placeNameIn.value || !placeImgLinkIn.value) {
    // reset the validation state of the form elements and remove any error messages.
    formValidatorAdd.resetValidation();
  } else {
    const newCard = {
      name: placeNameIn.value,
      link: placeImgLinkIn.value,
    };
    renderCard(newCard);
    evt.target.reset();
    closeModal(cardModalWindow);
    // reset the validation state of the form elements and remove any error messages.
    formValidatorAdd.resetValidation();
  }
};

// function to create a new card
const createCard = (data, cardId, openImgModalWindow) => {
  const card = new Card(data, cardId, openImgModalWindow);
  return card.createCard();
};

// function to render new card
const renderCard = (card) => {
  const placeCard = createCard(card, "#place-card", openImgModalWindow);
  cardsGrid.prepend(placeCard);
};

// ↑
primeCards.forEach(renderCard);

// Event listeners to open and submit modals
profileEditBtn.addEventListener("click", openProfileModalWindow);
profileAddBtn.addEventListener("click", openCardModalWindow);
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);

// Close buttons functions to close modals,
// ReFuck these later into single forEach fn
const profileModalCloseBtn = profileModalWindow.querySelector(".pop-up__close-butt");
profileModalCloseBtn.addEventListener("click", () => closeModal(profileModalWindow));

const cardModalCloseBtn = cardModalWindow.querySelector(".pop-up__close-butt");
cardModalCloseBtn.addEventListener("click", () => closeModal(cardModalWindow));

const imgModalCloseBtn = imgModalWindow.querySelector(".pop-up__close-butt");
imgModalCloseBtn.addEventListener("click", () => closeModal(imgModalWindow));

// An array with applied on it forEach method to close modals when click appears outside of a modals
const modalWindows = [profileModalWindow, cardModalWindow, imgModalWindow];

modalWindows.forEach(modalWindow => {
  modalWindow.addEventListener('click', event => {
    if (event.target === modalWindow) {
      closeModal(modalWindow);
    }
  });
});
