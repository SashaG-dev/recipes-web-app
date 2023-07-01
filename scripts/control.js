"use strict";

import * as model from "./model.js";
import searchBarView from "./views/searchBarView.js";

const controlRecipe = async function () {
  try {
    const query = searchBarView.showQuery();
    if (!query) return;

    model.fetchSearchResults(query);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  searchBarView.searchEvent(controlRecipe);
  searchBarView.showMobileSearch();
  searchBarView.hideMobileSearch();
};

init();
