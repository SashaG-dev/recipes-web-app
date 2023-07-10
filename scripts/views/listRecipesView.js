import View from './View.js';

class listRecipesView extends View {
  _heading = document.querySelector('.recipes__heading');

  _createEachMarkup(recipe) {
    return `
    <div class="recipe-card recipe-card--lists">
            <div class="recipe-card__img-container">
              <a href="#${recipe.id}" class="recipe-card__link">
                <img
                  src="${recipe.image}"
                  alt="${recipe.name}"
                  class="recipe-card__img"
                />
              </a>
            </div>
            <h3 class="heading-3 recipe-card__title">
              <a href="#${recipe.id}" class="recipe-card__link">${
      recipe.name.split(' ').length >= 6
        ? `${recipe.name.split(' ').slice(0, 5).join(' ')}...`
        : recipe.name
    }</a>
            </h3>
          </div>
    `;
  }
}

export default new listRecipesView();
