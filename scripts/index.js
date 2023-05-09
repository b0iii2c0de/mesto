// Styles import ↓

// Import modules
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";

// Import const-s
// Set-up the paths properly!
import {
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
  primeCards
} from "../utils/constants.js";

// New instances to validate forms
const formValidatorEdit = new FormValidator(classSelectors, profileFormEdit);
formValidatorEdit.enableValidation();

const formValidatorAdd = new FormValidator(classSelectors, cardForm);
formValidatorAdd.enableValidation();

const userInfo = new UserInfo({
  userNameSelector: profileTitle,
  descriptionSelector: profileSubtitle
});

// Class to handle profile form submission
const editProfileModal = new PopupWithForm(profileModalWindow, (evt, formsData) => {

  evt.preventDefault();

  const updatedUserInfo = {
    name: formsData.userNameIn,
    description: formsData.userDetailsIn
  };

  userInfo.setUserInfo(updatedUserInfo);
  editProfileModal.close();
  
  formValidatorEdit.resetValidation();
});

// Class to handle card form submission
const createCardModal = new PopupWithForm(cardModalWindow, (evt, formsData) => {

  evt.preventDefault();

  const cardInfo = {
    // change property's name if not working
    name: formsData.placeNameIn, // new card's name
    link: formsData.placeImgLinkIn // new card's link
  };

  const newCard = new Section(
    { items: cardInfo, renderer: renderCard },
    cardsGrid
  );

  newCard.renderItems();
  createCardModal.close();

  formValidatorAdd.resetValidation();
});

// Functions to open profile and card modals
const openProfileModal = () => {
  nameInput.value = userInfo.getUserInfo().userName;
  descriptionInput.value = userInfo.getUserInfo().description;
  editProfileModal.open();
}

const openCardModalWindow = () => createCardModal.open();

// Implemented in Pop-up class ↓

// Functions to close modals when pressing escape button
// const closeByPressEsc = (evt) => {
//   if (evt.key === 'Escape') {
//     const openedModal = document.querySelector('.pop-up_opened');
//     closeModal(openedModal);
//   }
// };

// Universal open/close functions
// const openModal = (modal) => {
//   modal.classList.add("pop-up_opened");
//   document.addEventListener("keydown", closeByPressEsc);
// };

// const closeModal = (modal) => {
//   modal.classList.remove("pop-up_opened");
//   document.removeEventListener("keydown", closeByPressEsc);
// }

// Function to fill in form with profile values, implemented in fn above
// const openProfileModalWindow = () => {
//   nameInput.value = profileTitle.textContent;
//   descriptionInput.value = profileSubtitle.textContent;
//   openModal(profileModalWindow);
// };

// Function to handle profile form submission, implemented in class!
// const handleProfileFormSubmit = (evt) => {
//   evt.preventDefault();
//   profileTitle.textContent = nameInput.value;
//   profileSubtitle.textContent = descriptionInput.value;
//   closeModal(profileModalWindow);
//   // reset the validation state of the form elements and remove any error messages.
//   formValidatorEdit.resetValidation();
// };

// Function to open an image fully, implemented in PopupWithImg class
// function openImgModalWindow(name, link) {
//   fullSizeImg.src = link;
//   fullSizeImg.alt = name;
//   fullSizeImgCap.textContent = name;
//   openModal(imgModalWindow);
// };

// Function to handle card form submission, implemented in class PopWithForm!
// const handleCardFormSubmit = (evt) => {
//   evt.preventDefault();
//   if (!placeNameIn.value || !placeImgLinkIn.value) {
//     // reset the validation state of the form elements and remove any error messages.
//     formValidatorAdd.resetValidation();
//   } else {
//     const newCard = {
//       name: placeNameIn.value,
//       link: placeImgLinkIn.value,
//     };
//     renderCard(newCard);
//     evt.target.reset();
//     closeModal(cardModalWindow);
//     // reset the validation state of the form elements and remove any error messages.
//     formValidatorAdd.resetValidation();
//   }
// };

// A fn to create and render card
const renderCard = (item) => {

  const card = new Card(item, "#place-card", (name, link) => {
    const popup = new PopupWithImage(imgModalWindow);
    popup.open(name, link);
    popup.setEventListeners();
  });

  const cardElement = card.createCard();
  cardList.addItem(cardElement);
};

const cardList = new Section(
  {
    items: primeCards,
    renderer: renderCard
  },
  cardsGrid
);

cardList.renderItems();

// // function to create a new card
// const createCard = (data, cardId, openImgModalWindow) => {
//   const card = new Card(data, cardId, openImgModalWindow);
//   return card.createCard();
// };

// // function to render new card
// const renderCard = (card) => {
//   const placeCard = createCard(card, "#place-card", openImgModalWindow);
//   cardsGrid.prepend(placeCard);
// };

// // ↑
// primeCards.forEach(renderCard);

// Event listeners to open and submit modals
profileEditBtn.addEventListener("click", openProfileModal);
profileAddBtn.addEventListener("click", openCardModalWindow);
editProfileModal.setEventListeners();
createCardModal.setEventListeners();

// profileForm.addEventListener("submit", handleProfileFormSubmit);
// cardForm.addEventListener("submit", handleCardFormSubmit);

// Close buttons functions to close modals,
// ReFuck these later into single forEach fn
// const profileModalCloseBtn = profileModalWindow.querySelector(".pop-up__close-butt");
// profileModalCloseBtn.addEventListener("click", () => closeModal(profileModalWindow));

// const cardModalCloseBtn = cardModalWindow.querySelector(".pop-up__close-butt");
// cardModalCloseBtn.addEventListener("click", () => closeModal(cardModalWindow));

// const imgModalCloseBtn = imgModalWindow.querySelector(".pop-up__close-butt");
// imgModalCloseBtn.addEventListener("click", () => closeModal(imgModalWindow));

// An array with applied on it forEach method to close modals when click appears outside of a modals
// const modalWindows = [profileModalWindow, cardModalWindow, imgModalWindow];

// modalWindows.forEach(modalWindow => {
//   modalWindow.addEventListener('click', event => {
//     if (event.target === modalWindow) {
//       closeModal(modalWindow);
//     }
//   });
// });
