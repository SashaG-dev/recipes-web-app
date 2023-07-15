import View from './View.js';

class allRecipesView extends View {
  _heading = document.querySelector('.recipes__heading');

  _createFinalMarkup() {
    this._showHeadingCount();
    return this._data.map((recipe) => this._createEachMarkup(recipe)).join('');
  }

  _createEachMarkup(recipe) {
    return `
    <div class="recipe-card">
            <div class="recipe-card__img-container">
              <a href="#recipe=${
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
              }" class="recipe-card__link" title="View the full recipe">${
      recipe.name.split(' ').length >= 6
        ? `${recipe.name.split(' ').slice(0, 5).join(' ')}...`
        : recipe.name
    }</a>
            </h3>
            <div class="recipe-card__details">
              <p class="recipe-cuisine">${recipe.cuisine}</p>
              <p class="recipe-category">
                ${recipe.category}
              </p>
            </div>
          </div>
    `;
  }
}

export default new allRecipesView();
