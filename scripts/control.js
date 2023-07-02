"use strict";

import * as model from "./model.js";
import searchBarView from "./views/searchBarView.js";
import allRecipesView from "./views/allRecipesView.js";

const controlRecipe = async function () {
  try {
    const query = searchBarView.showQuery();
    if (!query) return;
    allRecipesView.renderLoading();
    await model.fetchSearchResults(query);
    allRecipesView.renderInfo(model.state.search.allResults);
  } catch (err) {
    allRecipesView.renderError(err);
  }
};

const init = function () {
  searchBarView.searchEvent(controlRecipe);
  searchBarView.showMobileSearch();
  searchBarView.hideMobileSearch();
};

init();
