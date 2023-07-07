class searchBarView {
  _pElement = document.querySelector('.search');
  _searchbar = document.querySelector('.search__label');

  showQuery() {
    const query = this._pElement.querySelector('.search__input').value;
    this._clearInput();
    this._hideSearch();
    return query;
  }

  searchEvent(handler) {
    this.showMobileSearch();
    this.hideMobileSearch();
    this._pElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  _clearInput() {
    this._pElement.querySelector('.search__input').value = '';
  }

  _hideSearch() {
    if (this._searchbar.classList.contains('show-search'))
      this._searchbar.classList.remove('show-search');
  }

  showMobileSearch() {
    this._pElement.previousElementSibling.addEventListener(
      'click',
      function (e) {
        e.preventDefault();
        const searchbar = e.target
          .closest('.form-container')
          .querySelector('.search__label');
        searchbar.classList.add('show-search');
        setTimeout(() => searchbar.focus(), 10);
      }
    );
  }

  hideMobileSearch() {
    this._pElement
      .querySelector('.search__btn-mobile--close')
      .addEventListener('click', function (e) {
        e.preventDefault();
        const searchbar = e.target.closest('.search__label');
        searchbar.classList.remove('show-search');
      });
  }
}

export default new searchBarView();
