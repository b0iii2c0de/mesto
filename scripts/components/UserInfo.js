export default class UserInfo {
  constructor({ userNameSelector, descriptionSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo(userInfo) {
    this._userName.textContent = userInfo.name;
    this._description.textContent = userInfo.description;
  }
}
