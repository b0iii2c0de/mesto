// Get the modal elements
const profileModalWindow = document.querySelector(".profile-pop-up");
const cardModalWindow = document.querySelector(".card-pop-up");
const imgModalWindow = document.querySelector(".img-pop-up");
const profileForm = document.querySelector(".pop-up__form");
const cardForm = document.querySelector(".pop-up__form_submit");

// Get profile values and input values
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const nameInput = profileModalWindow.querySelector("#name");
const descriptionInput = profileModalWindow.querySelector("#description");

// Get card input values
const placeNameIn = cardModalWindow.querySelector("#place-name");
const placeImgLinkIn = cardModalWindow.querySelector("#img-link");

// Get img element values
const fullSizeImg = imgModalWindow.querySelector(".pop-up__image");
const fullSizeImgCap = imgModalWindow.querySelector(".pop-up__caption");

// Get buttons
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");

// Get template
const placeCardTemplate = document.querySelector("#place-card").content;
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

const openModal = (modal) => modal.classList.add("pop-up_opened");
const closeModal = (modal) => modal.classList.remove("pop-up_opened");

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
};

// Functions to open card & img modal-windows
const openCardModalWindow = () => openModal(cardModalWindow);
const openImgModalWindow = (evt) => {
  fullSizeImg.src = evt.target.src;
  fullSizeImg.alt = evt.target.alt;
  fullSizeImgCap.textContent = evt.target.alt;
  openModal(imgModalWindow);
};

// Function to handle card form submission
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const newCard = creatCard(placeImgLinkIn.value, placeNameIn.value);
  cardsGrid.prepend(newCard);
  evt.target.reset();
  closeModal(cardModalWindow);
};

// Function for deletion of a card
const deleteCard = (evt) => {
  evt.target.closest(".elements__item").remove();
};

// Function to switch state of a button
const toggleBtn = (e) => {
  e.target.classList.toggle("elements__butt_liked");
};

// Function to creat a new card
const creatCard = (link, name) => {
  const placeCard = placeCardTemplate.querySelector(".elements__item").cloneNode(true);
  const cardImage = placeCard.querySelector(".elements__img");
  cardImage.src = link;
  cardImage.alt = name;
  placeCard.querySelector(".elements__name").textContent = name;
  cardImage.addEventListener("click", openImgModalWindow);
  placeCard.querySelector(".elements__butt").addEventListener("click", toggleBtn);
  placeCard.querySelector(".elements__bin").addEventListener("click", deleteCard);

  return placeCard;
};

// Function to preload an array
primeCards.forEach((item) => {
  const elementCreatCard = creatCard(item.link, item.name);
  cardsGrid.prepend(elementCreatCard);
});

// Event listeners
profileEditBtn.addEventListener("click", openProfileModalWindow);
profileAddBtn.addEventListener("click", openCardModalWindow);
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);

// Close buttons functions
const profileModalCloseBtn = profileModalWindow.querySelector(".pop-up__close-butt");
profileModalCloseBtn.addEventListener("click", () => closeModal(profileModalWindow));

const cardModalCloseBtn = cardModalWindow.querySelector(".pop-up__close-butt");
cardModalCloseBtn.addEventListener("click", () => closeModal(cardModalWindow));

const imgModalCloseBtn = imgModalWindow.querySelector(".pop-up__close-butt");
imgModalCloseBtn.addEventListener("click", () => closeModal(imgModalWindow));
