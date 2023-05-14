// Selectors
const classSelectors = {
  typeErrorModeration: "pop-up__input_type-error",
  errorActiveModeration: "pop-up__input-error_active",
  inputElement: ".pop-up__input",
  saveBtnElement: ".pop-up__sub-butt",
  saveBtnElementOff: "pop-up__sub-butt_disabled",
};

// find the edit form by its name
const formEditProfile = document.forms.profileEditForm;

// find the form for creating cards by its name
const formAddProfile = document.forms.placeAddForm;

// find the avatar update form by its name
const formUpdateAvatar = document.forms.editAvatarForm;

// profile constants
const nameProfileEdit = document.querySelector(".profile__title");
const aboutProfileEdit = document.querySelector(".profile__subtitle");
const avatarProfileUpdateAvatar = document.querySelector(".profile__avatar");

// modals open buttons
const profileUpdateBtnAvatar = document.querySelector(".profile__edit-avatar");
const profileAddBtn = document.querySelector(".profile__add-btn");
const profileEditBtn = document.querySelector(".profile__edit-btn");

export {
  classSelectors,
  profileAddBtn,
  profileEditBtn,
  formEditProfile,
  formAddProfile,
  formUpdateAvatar,
  profileUpdateBtnAvatar,
  nameProfileEdit,
  aboutProfileEdit,
  avatarProfileUpdateAvatar,
};
