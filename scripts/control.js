'use strict';

import * as model from './model.js';
import searchBarView from './views/searchBarView.js';
import allRecipesView from './views/allRecipesView.js';
import recipeDisplayView from './views/recipeDisplayView.js';
import sideBarView from './views/sideBarView.js';
import randomRecipeView from './views/randomRecipeView.js';
import listRecipesView from './views/listRecipesView.js';

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

const controlRandomRecipe = async function () {
  try {
    randomRecipeView.renderLoading();
    await model.fetchRandomRecipe();
    randomRecipeView.renderInfo(model.state.search.allResults);
  } catch (err) {
    console.error(err);
  }
};

const controlCategory = async function (category) {
  try {
    allRecipesView.renderLoading();
    await model.fetchCategory(category);
    listRecipesView.renderInfo(model.state.search.allResults);
  } catch (err) {
    console.error(err);
  }
};

const controlCuisine = async function (cuisine) {
  try {
    allRecipesView.renderLoading();
    await model.fetchCuisine(cuisine);
    listRecipesView.renderInfo(model.state.search.allResults);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  searchBarView.searchEvent(controlAllRecipes);
  recipeDisplayView.recipeDisplayEvent(controlSingleRecipe);
  sideBarView.sidebarEvents(controlRandomRecipe);
  sideBarView.categoryEvent(controlCategory);
  sideBarView.cuisineEvent(controlCuisine);
};

init();
