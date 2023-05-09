// Styles import ↓
import "../pages/index.css";

// Import modules
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

// Import const-s
import {
  classSelectors,
  profileFormEdit,
  cardForm,
  nameInput,
  descriptionInput,
  profileEditBtn,
  profileAddBtn,
  primeCards,
} from "../utils/constants.js";

// Functions

function createCard(item) {
  return new Card(item, "#place-card", () =>
    popupImgModalWindow.open(item)
  ).createCard();
}

// Fn to pass text to inputs of profile form
function passValues(value) {
  userInfo.setUserInfo(value.name, value.description);
  popupEditProfile.close();
}

const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  subtitleSelector: ".profile__subtitle",
});

// Fn to open profile modal window
function openEditProfile() {
  const { title, subtitle } = userInfo.getUserInfo();
  console.log(title);
  nameInput.value = title;
  descriptionInput.value = subtitle;
  formValidatorEdit.resetValidation();
  popupEditProfile.open();
}

// Fn to open card modal window and create new card
function openPopupAddCard() {
  formValidatorCard.resetValidation();
  popupAddCard.open();
}

// An instance of Class to edit profile
const popupEditProfile = new PopupWithForm(".profile-pop-up", passValues);
popupEditProfile.setEventListeners();

// An instance of Class to render cards out of primeCards object
const cardPrimeCardsSection = new Section(
  {
    renderer: (item) => cardPrimeCardsSection.addItem(createCard(item)),
  },
  ".elements__grid"
);

const popupAddCard = new PopupWithForm(".card-pop-up", (item) => {
  cardPrimeCardsSection.addItem(createCard(item));
  popupAddCard.close();
});
popupAddCard.setEventListeners();

// an object of PopupWithImage Class
const popupImgModalWindow = new PopupWithImage(".img-pop-up");
popupImgModalWindow.setEventListeners();

// Profile modal form validation
const formValidatorEdit = new FormValidator(classSelectors, profileFormEdit);
formValidatorEdit.enableValidation();

// Card modal form validation
const formValidatorCard = new FormValidator(classSelectors, cardForm);
formValidatorCard.enableValidation();

// Buttons to open card and profile modals
profileAddBtn.addEventListener("click", () => openPopupAddCard());
profileEditBtn.addEventListener("click", () => openEditProfile());

cardPrimeCardsSection.renderItems(primeCards.reverse());