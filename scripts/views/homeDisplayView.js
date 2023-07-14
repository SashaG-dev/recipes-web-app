import View from './View.js';

class homeDisplayView extends View {
  renderInfo(data, type) {
    this._data = data.slice(0, 6);
    this._pElement = document.querySelector(`.home__container--${type}`);
    const markup = this._createFinalMarkup();
    this._pElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderCategory(data) {
    this.renderInfo(data, 'category');
  }

  renderCuisine(data) {
    this.renderInfo(data, 'cuisine');
  }

  homePageEvent(handler) {
    window.addEventListener('DOMContentLoaded', () => {
      if (window.location.href === window.location.origin + '/') {
        handler();
      } else {
        document.querySelector('.home').innerHTML = '';
      }
    });
  }

  showPage() {
    window.addEventListener('hashchange', function () {
      const recipes = Array.from(
        document.querySelectorAll('.recipe-card--home')
      );
      if (
        window.location.href === window.location.origin + '/' &&
        !recipes.length
      ) {
        location.reload();
      }
    });
  }

  _createFinalMarkup() {
    return this._data.map((recipe) => this._createEachMarkup(recipe)).join('');
  }

  _createEachMarkup(recipe) {
    return `
    <div class="recipe-card recipe-card--lists recipe-card--home">
            <div class="recipe-card__img-container">
              <a href="#${
                recipe.id
              }" class="recipe-card__link" title="View the full recipe">
                <img
                  src="${recipe.image}"
                  alt="${recipe.name}"
                  class="recipe-card__img"
                />
              </a>
            </div>
            <h3 class="heading-3 recipe-card__title">
              <a href="#${
                recipe.id
              }" title="View the full recipe" class="recipe-card__link">${
      recipe.name.split(' ').length >= 6
        ? `${recipe.name.split(' ').slice(0, 5).join(' ')}...`
        : recipe.name
    }</a>
            </h3>
          </div>
    `;
  }
}

export default new homeDisplayView();
