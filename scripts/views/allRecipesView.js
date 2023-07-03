class allRecipesView {
  _pElement = document.querySelector(".recipes__container");
  _data;
  _errorMessage = "No recipes found. Please try again!";

  renderInfo(data) {
    this._data = data;
    this._clearPage();

    const header = this._pElement
      .closest(".recipes")
      .querySelector(".recipes__heading");
    if (this._data.length) {
      header.classList.add("recipes__heading--show");
    } else header.classList.remove("recipes__heading--show");

    const markup = this._createFinalMarkup();
    this._pElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clearPage() {
    this._pElement.innerHTML = "";
  }

  _createFinalMarkup() {
    const count = this._pElement
      .closest(".recipes")
      .querySelector(".recipes__heading .recipes__total");
    if (this._data.length && this._data.length > 1) {
      count.textContent = `${this._data.length} Recipes`;
    } else if (this._data.length && this._data.length === 1)
      count.textContent = `${this._data.length} Recipe`;

    return this._data.map((recipe) => this._createEachMarkup(recipe)).join("");
  }

  _createEachMarkup(recipe) {
    return `
    <div class="recipe-card">
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
      recipe.name.split(" ").length >= 6
        ? `${recipe.name.split(" ").slice(0, 5).join(" ")}...`
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

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="recipes__error">
            <p class="error-message">
              <i class="bi bi-x-octagon"></i> ${message}
            </p>
          </div>
    `;

    const header = this._pElement
      .closest(".recipes")
      .querySelector(".recipes__heading");
    header.classList.remove("recipes__heading--show");

    this._clearPage();
    this._pElement.insertAdjacentHTML("afterbegin", markup);
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
    this._pElement.insertAdjacentHTML("afterbegin", loading);
  }
}

export default new allRecipesView();
