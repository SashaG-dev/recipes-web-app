class recipeDisplayView {
  _pElement = document.querySelector('.recipes__container');
  _data;

  renderInfo(data) {
    this._data = data;
    const markup = this._createFinalMarkup();
    this._pElement.classList.remove('recipes__container--hide');
    this._pElement.insertAdjacentHTML('afterbegin', markup);
    this.renderLoading();
    this._recipe = this._pElement.querySelector('.recipe');
    this._focusRecipe();
    this._closeRecipe();
    this._clearUnselectedRecipes();
  }

  showId() {
    const location = window.location.href;
    if (location.includes('rec')) {
      const id = location.slice(-5);
      return id;
    }
  }

  recipeDisplayEvent(handler) {
    ['hashchange', 'load'].forEach((event) =>
      window.addEventListener(event, (e) => {
        if (!window.location.href.includes('que')) {
          this._clearClosedRecipes();
          handler();
        } else this._clearRecipes();
      })
    );
  }

  reshowRecipeEvent(handler) {
    const recipes = Array.from(document.querySelectorAll('.recipe'));
    window.addEventListener('click', (e) => {
      if (
        (e.target.classList.contains('recipe-card__link') ||
          e.target.classList.contains('recipe-card__img')) &&
        !recipes.length
      ) {
        handler();
      } else this._clearRecipes();
    });
  }

  _clearRecipes() {
    const recipes = Array.from(document.querySelectorAll('.recipe'));
    const overlays = Array.from(document.querySelectorAll('.loading-overlay'));
    document.querySelector('body').classList.remove('recipe-visible');
    this._pElement.classList.remove('recipe-visible');
    document.querySelector('.recipes').classList.remove('recipe-visible');
    recipes.forEach((r) => r.classList.remove('recipe--show'));
    setTimeout(() => recipes.forEach((r) => r.remove()), 500);
    overlays.forEach((o) => o.remove());
  }

  _clearUnselectedRecipes() {
    const url = window.location.href.slice(-5);
    const recipes = Array.from(document.querySelectorAll('.recipe'));
    recipes.forEach((recipe) => {
      if (recipe.dataset.id !== url) recipe.remove();
    });
  }

  _clearClosedRecipes() {
    const url = window.location.href;
    const origin = window.location.origin + '/';
    if (url === origin || url.includes('que')) this._clearRecipes();
  }

  _focusRecipe() {
    this._recipe.classList.add('recipe--show');
    this._recipe.setAttribute('tabindex', '0');
    this._recipe.focus();
    this._pElement.classList.add('recipe-visible');
    document.querySelector('body').classList.add('recipe-visible');
    document.querySelector('.recipes').classList.add('recipe-visible');
  }

  _closeRecipe() {
    this._pElement.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('bi-x-lg') ||
        e.target.classList.contains('recipe__close')
      ) {
        const currentRecipe = document.querySelector('.recipe');
        currentRecipe.classList.remove('recipe--show');
        this._clearRecipes();
      }
    });
  }

  _createFinalMarkup() {
    const markup = `
    <article class="recipe" data-id="${this._data.id}" role="dialog">
    <button class="recipe__close"><i class="bi bi-x-lg" aria-label="Close recipe details" title="X"></i></button>
    <div class="recipe__main-container">
      <div class="recipe__sticky">
        <div class="recipe__img-container">
          <img
            src="${this._data.image}"
            alt="${this._data.name}"
            class="recipe__img"
          />
        </div>
      </div>
    </div>
    <div class="recipe__info-container">
      <div class="recipe__titles mb-sm">
        <h2 class="heading-2 recipe__name mb-sm">${this._data.name}</h2>
        <div class="recipe__subtitles">
          <p class="recipe-cuisine">${this._data.cuisine}</p>
          <p class="recipe-category">${this._data.category}</p>
        </div>
      </div>
      <div class="recipe__ingredients">
        <h2 class="heading-2 recipe__ingredients-heading mb-sm">
          Ingredients:
        </h2>
        <ul class="recipe__ingredients-container">
          ${this._createIngredientsMarkup()}
        </ul>
      </div>
      <div class="recipe__steps">
        <h2 class="heading-2 recipe__steps-heading mb-sm">Instructions:</h2>
        <div class="recipe__steps-link mb-sm">
          <p>  
            <a
              href="${this._data.video}"
              target="_blank"
              class="recipe__cta"
              title="Go to the YouTube tutorial"
              >Visit Youtube to watch the tutorial! (opens new tab)</a
            >
          </p>
        </div>
        <ol class="recipe__steps-container">
          ${this._createStepsMarkup()}
        </ol>
      </div>
    </div>
  </article>
    `;
    return markup;
  }

  _createIngredientsMarkup() {
    const ingredients = this._data.ingredients;
    return ingredients
      .map((ing, i) => {
        const amount = this._data.measurements[i] || '';
        return ing
          ? `<li class="recipe__ingredient">${amount} ${ing}</li>`
          : '';
      })
      .join('');
  }

  _createStepsMarkup() {
    const steps = this._data.instructions;
    return steps
      .replaceAll('\r\n', '+')
      .replaceAll(/STEP [0-9]/gi, '+')
      .split('+')
      .map((step) => (step ? `<li class="recipe__step">${step}</li>` : ''))
      .join('');
  }

  renderLoading() {
    const loading = `
      <div class="loading-overlay"></div>
    `;
    this._pElement.insertAdjacentHTML('afterbegin', loading);
  }
}

export default new recipeDisplayView();
