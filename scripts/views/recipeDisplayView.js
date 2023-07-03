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

  hashchangeEvent(handler) {
    window.addEventListener("hashchange", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new recipeDisplayView();
