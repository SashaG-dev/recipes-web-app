class recipeDisplayView {
  _pElement = document.querySelector(".recipes__container");
  _data;

  showId() {
    const location = window.location.href;
    if (location.includes("#") && !location.slice(-5).includes("#")) {
      const id = window.location.href.slice(-5);
      return id;
    }
  }

  changeEvent(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, function (e) {
        handler();
      })
    );
  }

  renderInfo(data) {
    this._data = data;

    const markup = this._createFinalMarkup();
    this._pElement.insertAdjacentHTML("afterbegin", markup);

    this._pElement.querySelector(".recipe").classList.add("recipe--show");
    this._pElement.closest("body").classList.add("recipe-visible");
    window.scrollTo(0, 0);
  }

  _createFinalMarkup() {
    const markup = `
    <article class="recipe">
    <div class="recipe__main-container">
      <div class="recipe__img-container">
        <img src="${this._data.image}" alt="${
      this._data.name
    }" class="recipe__img" />
      </div>

      <div class="recipe__titles">
        <h2 class="heading-2 recipe__name mb-sm">${this._data.name}</h2>
        <p class="recipe-cuisine">${this._data.cuisine}</p>
        <p class="recipe-category">${this._data.category}</p>
      </div>
    </div>

    <div class="recipe__info-container">
      <div class="recipe__ingredients">
        <h2 class="heading-2 recipe__ingredients-heading mb-sm">
          Ingredients:
        </h2>
        <ul class="recipe__ingredients-container">
          ${this._createIngredientsMarkup()}
        </ul>
      </div>

      <div class="recipe__steps">
        <h2 class="heading-2 recipe__steps-heading mb-sm">
          Instructions:
        </h2>
        <div class="recipe__steps-link mb-sm">
          <p>
            Watch the YouTube tutorial
            <a
              href="${this._data.video}"
              target="_blank"
              class="recipe__cta"
              title="Go to the YouTube tutorial"
              >here!</a
            >
          </p>
        </div>

        <ol class="recipe__steps-container">
          ${this._createStepsMarkup()}
        </ol>
      </div>
    </div>

    <a href="#back" class="recipe__close"><i class="bi bi-x-lg"></i></a>
  </article>
    `;

    return markup;
  }

  _createIngredientsMarkup() {
    const ingredients = this._data.ingredients;
    return ingredients
      .map(
        (ing, i) =>
          `<li class="recipe__ingredient">${this._data.measurements[i]} ${ing}</li>`
      )
      .join("");
  }

  _createStepsMarkup() {
    const steps = this._data.instructions;
    return steps
      .replaceAll("\r\n", "+")
      .replaceAll(/STEP [0-9]/gi, "+")
      .split("+")
      .map((step) => (step ? `<li class="recipe__step">${step}</li>` : ""))
      .join("");
  }
}

export default new recipeDisplayView();
