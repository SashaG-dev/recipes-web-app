class searchBarView {
  _pElement = document.querySelector('.search');
  _searchbar = document.querySelector('.search__label');

  showQuery() {
    const location = window.location.origin + '/';
    const query = this._pElement.querySelector('.search__input').value;
    sessionStorage.setItem('search', query);
    query === '' ? '' : (window.location.href = `${location}#que=${query}`);
    this._clearInput();
    return query;
  }

  showRefreshQuery() {
    if (window.location.href.includes('/#que=')) {
      const search = window.location.origin + '/#que=';
      const query = window.location.href.replace(search, '');
      return query;
    }
  }

  searchEvent(handler) {
    this.showMobileSearch();
    this.hideMobileSearch();
    this._pElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this._hideSearch();
      handler(this.showQuery());
    });
  }

  refreshEvent(handler) {
    window.addEventListener('DOMContentLoaded', () => {
      if (window.location.href.includes('que'))
        handler(this.showRefreshQuery());
    });
  }

  hashchangeEvent(handler) {
    window.addEventListener('hashchange', (e) => {
      const location = window.location.href;
      const lastQueryUrl = `${
        window.location.origin
      }/#que=${sessionStorage.getItem('search')}`;
      const recipes = Array.from(document.querySelectorAll('.recipe-card'));
      const displayedRecipe = document.querySelector('.recipe');
      if (
        (location !== lastQueryUrl &&
          location !== window.location.origin &&
          recipes.length) ||
        (location === lastQueryUrl &&
          location !== window.location.origin &&
          recipes.length) ||
        (location.includes('que') && displayedRecipe)
      ) {
        handler(this.showRefreshQuery());
      }
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
        setTimeout(() => searchbar.focus(), 20);
      }
    );
  }

  hideMobileSearch() {
    this._pElement
      .querySelector('.search__btn-mobile--close')
      .addEventListener('click', (e) => {
        e.preventDefault();
        this._hideSearch();
      });
  }
}

export default new searchBarView();
