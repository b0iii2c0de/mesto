export default class Section {
  constructor({ items, renderer}, containerSelector) {
    // an array of data to be added to the page
    // when the class is initialized
    this._itemsArray = items;
    // a fn to create and render a data on the page
    this._renderer = renderer;
    // a cb-fn to take created elements and put 'em into container
    this._container = document.querySelector(containerSelector);
  }

  // a method to add a DOM el-t into container
  addItem(element) {
    this._container.prepend(element);
  }

  // a method to render all elements
  renderItems() {
    Array.isArray(this._itemsArray)
    ? this._itemsArray.forEach(item => {
        this._renderer(item);
      })
    : this._renderer(this._itemsArray);
  }
}
