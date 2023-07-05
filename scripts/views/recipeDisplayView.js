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

    const recipe = this._pElement.querySelector(".recipe");
    recipe.classList.add("recipe--show");
    recipe.setAttribute("tabindex", "0");
    recipe.focus();
    this._pElement.closest("body").classList.add("recipe-visible");
  }

  closeRecipe() {
    this._pElement.addEventListener("click", function (e) {
      if (
        e.target.classList.contains("bi-x-lg") ||
        (window.location.href.slice(-4) !== "back" &&
          document.querySelector(".recipe"))
      ) {
        const recipe = document.querySelector(".recipe");
        recipe.classList.remove("recipe--show");
        document.querySelector("body").classList.remove("recipe-visible");
        setTimeout(function () {
          recipe.remove();
        }, 500);
      }
    });
  }

  _createFinalMarkup() {
    const markup = `
    <article class="recipe">
    <a href="#back" class="recipe__close"><i class="bi bi-x-lg"></i></a>

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
  </article>
    `;

    return markup;
  }

  _createIngredientsMarkup() {
    const ingredients = this._data.ingredients;
    return ingredients
      .map((ing, i) => {
        const amount = this._data.measurements[i]
          ? this._data.measurements[i]
          : "";
        return ing
          ? `<li class="recipe__ingredient">${amount} ${ing}</li>`
          : "";
      })
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
