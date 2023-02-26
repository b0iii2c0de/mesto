// Get the modal elements
const modalWindow = document.querySelector(".pop-up");
const submitPopupForm = modalWindow.querySelector(".pop-up__form");

// Get profile values and input values
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const nameInput = modalWindow.querySelector("#name");
const descriptionInput = modalWindow.querySelector("#description");

// Get buttons
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileCloseBtn = document.querySelector(".pop-up__close-butt");

// Open and close modal functions
const openModal = () => modalWindow.classList.add("pop-up_opened");
const closeModal = () => modalWindow.classList.remove("pop-up_opened");

// Function to fill in form with profile values
const openModalWindow = () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileSubtitle.textContent;
  openModal();
};

// Function to handle form submission
const handleSubmit = (event) => {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = descriptionInput.value;
  closeModal();
};

// Event listeners
profileEditBtn.addEventListener("click", openModalWindow);
profileCloseBtn.addEventListener("click", closeModal);
submitPopupForm.addEventListener("submit", handleSubmit);

// Event listener to close modal when clicking outside of it
modalWindow.addEventListener("click", (event) => {
  if (event.target === modalWindow) {
    closeModal();
  }
});
