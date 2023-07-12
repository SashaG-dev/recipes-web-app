import View from './View.js';

class randomRecipeView extends View {
  _heading = document.querySelector('.random-card__heading');

  _createFinalMarkup() {
    return this._data.map((recipe) => {
      const markup = `
      <div class="random-card">
      <div class="random-card__img-container">
        <a href="#${
          recipe.id
        }" class="random-card__link" title="View the full recipe">
          <img
            src="${recipe.image}"
            alt="${recipe.name}"
            class="random-card__img"
          />
        </a>
      </div>
  
      <div class="random-card__info">
        <h2 class="heading-2 random-card__title">
          <a href="#${
            recipe.id
          }" class="random-card__link" title="View the full recipe">
            ${
              recipe.name.split(' ').length >= 6
                ? `${recipe.name.split(' ').slice(0, 5).join(' ')}...`
                : recipe.name
            }</a
          >
        </h2>
        <div class="random-card__descriptions">
          <p class="recipe-cuisine">${recipe.cuisine}</p>
          <p class="recipe-category">${recipe.category}</p>
        </div>
        <p class="preview-text">
          ${recipe.instructions.split(' ').slice(0, 10).join(' ')}...
        </p>
      </div>
    </div>
      `;

      return markup;
    });
  }
}

export default new randomRecipeView();
