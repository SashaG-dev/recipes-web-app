class searchBarView {
  _pElement = document.querySelector(".search");

  showQuery() {
    const query = this._pElement.querySelector(".search__input").value;
    this._clearInput();
    const searchbar = this._pElement.querySelector(".search__label");

    if (searchbar.classList.contains("show-search"))
      searchbar.classList.remove("show-search");

    return query;
  }

  searchEvent(handler) {
    this._pElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  _clearInput() {
    this._pElement.querySelector(".search__input").value = "";
  }

  showMobileSearch() {
    this._pElement
      .closest(".header")
      .querySelector(".form-container .show-search__btn")
      .addEventListener("click", function (e) {
        e.preventDefault();
        const searchbar = e.target
          .closest(".form-container")
          .querySelector(".search__label");
        searchbar.classList.add("show-search");
      });
  }

  hideMobileSearch() {
    this._pElement
      .querySelector(".search__btn-mobile--close")
      .addEventListener("click", function (e) {
        e.preventDefault();
        const searchbar = e.target.closest(".search__label");
        searchbar.classList.remove("show-search");
      });
  }
}

export default new searchBarView();
