'use strict';

import * as model from './model.js';
import searchBarView from './views/searchBarView.js';
import allRecipesView from './views/allRecipesView.js';
import recipeDisplayView from './views/recipeDisplayView.js';
import sideBarView from './views/sideBarView.js';
import randomRecipeView from './views/randomRecipeView.js';
import listRecipesView from './views/listRecipesView.js';
import homeDisplayView from './views/homeDisplayView.js';

const controlHome = async function () {
  try {
    await model.categoryFetch(model.state.home.category);
    homeDisplayView.renderCategory(model.state.search.allResults);
    await model.cuisineFetch(model.state.home.cuisine);
    homeDisplayView.renderCuisine(model.state.search.allResults);
  } catch (err) {
    console.error(err);
  }
};

const controlAllRecipes = async function (search) {
  try {
    const query = search;
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
    allRecipesView.renderError(err);
  }
};

const controlRandomRecipe = async function () {
  try {
    randomRecipeView.renderLoading();
    await model.fetchRandomRecipe();
    randomRecipeView.renderInfo(model.state.search.allResults);
  } catch (err) {
    console.error(err);
    allRecipesView.renderError(err);
  }
};

const controlLists = async function (item, type) {
  try {
    allRecipesView.renderLoading();
    await model[`${type}Fetch`](item);
    listRecipesView.renderInfo(model.state.search.allResults);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  searchBarView.searchEvent(controlAllRecipes);
  searchBarView.refreshEvent(controlAllRecipes);
  searchBarView.hashchangeEvent(controlAllRecipes);
  recipeDisplayView.recipeDisplayEvent(controlSingleRecipe);
  recipeDisplayView.reshowRecipeEvent(controlSingleRecipe);
  sideBarView.sidebarEvents(controlRandomRecipe);
  sideBarView.categoryEvent(controlLists);
  sideBarView.cuisineEvent(controlLists);
  sideBarView.refreshEvent(controlLists);
  sideBarView.hashchangeEvent(controlLists);
  homeDisplayView.homePageEvent(controlHome);
};

init();
