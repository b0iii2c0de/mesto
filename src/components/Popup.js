export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("pop-up") ||
        evt.target.classList.contains("pop-up__close-butt")
      ) {
        this.close();
      }
    });
  }

  open() {
    this._popupSelector.classList.add("pop-up_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('pop-up_opened');
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
