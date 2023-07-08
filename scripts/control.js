'use strict';

import * as model from './model.js';
import searchBarView from './views/searchBarView.js';
import allRecipesView from './views/allRecipesView.js';
import recipeDisplayView from './views/recipeDisplayView.js';
import sideBarView from './views/sideBarView.js';

const controlAllRecipes = async function () {
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

const controlSingleRecipe = async function () {
  try {
    const id = recipeDisplayView.showId();
    if (!id) return;
    recipeDisplayView.renderLoading();
    await model.fetchClickedRecipe(id);
    recipeDisplayView.renderInfo(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  searchBarView.searchEvent(controlAllRecipes);
  recipeDisplayView.recipeDisplayEvent(controlSingleRecipe);
  sideBarView.toggleBar();
};

init();
