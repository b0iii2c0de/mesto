// Styles import ↓
import "../pages/index.css";

// Import modules
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupConfirmation from "../components/PopupConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

// Api import
import Api from "../components/Api.js";

import {
  classSelectors,
  profileUpdateBtnAvatar,
  profileAddBtn,
  profileEditBtn,
  formEditProfile,
  formAddProfile,
  formUpdateAvatar,
  nameProfileEdit,
  aboutProfileEdit,
  avatarProfileUpdateAvatar,
} from "../utils/constants.js";

let userId;

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    authorization: "b7b4a57e-3ff3-4a0f-b13e-3d48be18375f",
    "Content-Type": "application/json",
  },
});

// The function of creating cards by an instance of the Card class
function createCard(data) {
  const card = new Card(
    data,
    "#place-card",
    popupImgModalWindow,

    userId,
    async () => {
      try {
        const res = await api.addLike(data._id);
        card.like();
        card.likesCount(res);
      } catch (err) {
        return console.log(`Error message: ${err}`);
      }
    },
    async () => {
      try {
        const res = await api.deletedLike(data._id);
        card.dislike();
        card.likesCount(res);
      } catch (err) {
        return console.log(`Error message: ${err}`);
      }
    },
    () => {
      popupConfirmation.open(card);
    }
  );

  return card.createCard();
}

// Avatar update form
async function submitFormAvatar(data) {
  popupAvatar.updateText();
  api
    .updateAvatar(data)
    .then((ans) => {
      user.setUserInfo(ans);
      popupAvatar.close();
    })

    .catch((err) => {
      console.log(`Error message: ${err}`);
    });
}

// Form for adding cards
async function submitFormAddCard(data) {
  popupAdd.updateText();
  api
    .addCard(data)
    .then((ans) => {
      cardSection.addItem(createCard(ans));
      popupAdd.close();
    })

    .catch((err) => {
      console.log(`Error message: ${err}`);
    });
}

// Profile editing form
async function submitFormEdit(data) {
  popupEdit.updateText();
  api
    .editProfileUser(data)
    .then((ans) => {
      user.setUserInfo(ans);
      popupEdit.close();
    })

    .catch((err) => {
      console.log(`Error message: ${err}`);
    });
}

// Open img fullsize
function popupImgModalWindow(name, link) {
  popupImage.open(name, link);
}

const user = new UserInfo({
  name: nameProfileEdit,
  about: aboutProfileEdit,
  avatar: avatarProfileUpdateAvatar,
});

// For each pop-up, create your own instance of the PopupWithForm
const popupImage = new PopupWithImage(".img-pop-up");
popupImage.setEventListeners();

const popupAdd = new PopupWithForm(".card-pop-up", submitFormAddCard);

popupAdd.setEventListeners();

const popupEdit = new PopupWithForm(".profile-pop-up", submitFormEdit);

popupEdit.setEventListeners();

const popupAvatar = new PopupWithForm(
  ".update-avatar-pop-up",
  submitFormAvatar
);

popupAvatar.setEventListeners();

profileEditBtn.addEventListener(
  "click",
  () => {
    popupEdit.open();
    popupEdit.setInputValue(user.getUserInfo());
    formValidatorEdit.resetValidation();
  },
  false
);

profileUpdateBtnAvatar.addEventListener(
  "click",
  () => {
    popupAvatar.open();
    formValidatorAvatar.resetValidation();
  },
  false
);

profileAddBtn.addEventListener(
  "click",
  () => {
    popupAdd.open();
    formValidatorCard.resetValidation();
  },
  false
);

// For each form being validated, a new instance of the class FormValidator
const formValidatorEdit = new FormValidator(classSelectors, formEditProfile);

formValidatorEdit.enableValidation();

const formValidatorCard = new FormValidator(classSelectors, formAddProfile);

formValidatorCard.enableValidation();

const formValidatorAvatar = new FormValidator(classSelectors, formUpdateAvatar);

formValidatorAvatar.enableValidation();

const popupConfirmation = new PopupConfirmation(
  ".confirmation-pop-up",
  async (card) => {
    api
      .deletedCard(card._id)
      .then(() => {
        card.remove();
        popupConfirmation.close();
      })
      .catch((err) => console.log(`Error message: ${err}`));
  }
);

popupConfirmation.setEventListeners();

// Downloading cards from the server
const cardSection = new Section(
  {
    renderer: (data) => {
      const card = createCard(data);

      cardSection.addItem(card);
    },
  },
  ".elements__grid"
);

// Rendering cards from the server + rendering user data
Promise.all([api.getUser(), api.getInitialCards()])
  .then(([userProfile, cards]) => {
    user.setUserInfo(userProfile);
    userId = userProfile._id;
    cardSection.renderItems(cards.reverse());
  })

  .catch((err) => console.log(`Error message: ${err}`));
