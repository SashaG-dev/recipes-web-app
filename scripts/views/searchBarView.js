class searchBarView {
  _pElement = document.querySelector('.search');
  _searchbar = document.querySelector('.search__label');

  showQuery() {
    const query = this._pElement.querySelector('.search__input').value;
    sessionStorage.setItem('search', query);
    window.location.href = `${window.location.origin}/#que=${query}`;
    this._clearInput();
    this._hideSearch();
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
      const lastQuery = sessionStorage.getItem('search');
      if (
        window.location.href !== `${window.location.origin}/#que=${lastQuery}`
      )
        handler(this.showRefreshQuery());
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
