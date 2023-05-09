// Selectors
const classSelectors = {
  typeErrorModeration: "pop-up__input_type-error",
  errorActiveModeration: "pop-up__input-error_active",
  inputElement: ".pop-up__input",
  saveBtnElement: ".pop-up__sub-butt",
  saveBtnElementOff: "pop-up__sub-butt_disabled",
};

// Get the modal elements
const profileModalWindow = ".profile-pop-up";
const cardModalWindow = ".card-pop-up";

// String literals to get img pop-up
const imgModalWindow = ".img-pop-up";
const fullSizeImg = ".pop-up__image";
const fullSizeImgCap = ".pop-up__caption";

const profileForm = ".pop-up__form";
const profileFormEdit = document.querySelector(".pop-up__form-edit"); // used in formVal instance
const cardForm = document.querySelector(".pop-up__form_submit"); // used in formVal instance

// Get profile values and input values
const profileTitle = ".profile__title";
const profileSubtitle = ".profile__subtitle";
const nameInput = document.querySelector("#name");
const descriptionInput = document.querySelector("#description");

// Get card input values, not used anywhere!
const placeNameIn = document.querySelector("#place-name");
const placeImgLinkIn = document.querySelector("#img-link");

// Get profile buttons
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");

// Get template
const cardsGrid = ".elements__grid";

// An array of cards
const primeCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export {
  classSelectors,
  profileModalWindow,
  cardModalWindow,
  imgModalWindow,
  fullSizeImg,
  fullSizeImgCap,
  profileForm,
  profileFormEdit,
  cardForm,
  profileTitle,
  profileSubtitle,
  nameInput,
  descriptionInput,
  placeNameIn,
  placeImgLinkIn,
  profileEditBtn,
  profileAddBtn,
  cardsGrid,
  primeCards,
};
