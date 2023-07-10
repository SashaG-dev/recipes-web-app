export default class View {
  _pElement = document.querySelector('.recipes__container');
  _heading;
  _data;

  renderInfo(data) {
    this._data = data;
    this._clearPage();
    this.renderHeading();
    const markup = this._createFinalMarkup();
    this._pElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clearPage() {
    this._pElement.innerHTML = '';
  }

  _createFinalMarkup() {
    this._showHeadingCount();
    return this._data.map((recipe) => this._createEachMarkup(recipe)).join('');
  }

  renderHeading() {
    const headings = Array.from(
      document.querySelectorAll('.recipes .heading-2')
    );
    headings.forEach((heading) => heading.classList.remove('heading--show'));
    if (this._data.length) this._heading.classList.add('heading--show');
    else this._heading.classList.remove('heading--show');
  }

  _showHeadingCount() {
    const count = this._heading.querySelector('.recipes__total');
    if (this._data.length > 1) {
      count.textContent = `${this._data.length} Recipes`;
    } else if (this._data.length === 1)
      count.textContent = `${this._data.length} Recipe`;
  }

  renderLoading() {
    const loading = `
    <div class="loading">
    <div class="loading__bubble loading__bubble--1"></div>
    <div class="loading__bubble loading__bubble--2"></div>
    <div class="loading__bubble loading__bubble--3"></div>
  </div>
    `;
    this._clearPage();
    this._pElement.insertAdjacentHTML('afterbegin', loading);
  }

  renderError(message) {
    const markup = `
    <div class="recipes__error">
            <p class="error-message">
              <i class="bi bi-x-octagon"></i> ${message}
            </p>
          </div>
    `;
    this._heading.classList.remove('heading--show');
    this._clearPage();
    this._pElement.insertAdjacentHTML('afterbegin', markup);
  }
}
