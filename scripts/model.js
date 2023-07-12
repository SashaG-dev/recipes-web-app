import { getItems } from './helpers.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    allResults: [],
  },
};

export const fetchRecipe = async function (type, input) {
  try {
    const data = await getJSON(type, input);
    if (!data.meals) return;
    const recipe = data.meals[0];
    state.recipe = {
      id: recipe.idMeal,
      name: recipe.strMeal,
      category: recipe.strCategory,
      cuisine: recipe.strArea,
      instructions: recipe.strInstructions,
      image: recipe.strMealThumb,
      tags: recipe.strTags,
      video: recipe.strYoutube,
      ingredients: getItems(recipe, 'strIngredient'),
      measurements: getItems(recipe, 'strMeasure'),
    };
  } catch (err) {
    throw err;
  }
};

export const fetchAllResults = async function (type, input) {
  try {
    const data = await getJSON(type, input);
    if (!data.meals)
      throw 'Oops! No recipes were found. Please try a different search!';
    state.search.allResults = data.meals.map((meal) => {
      return {
        query: input,
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        category: meal.strCategory,
        cuisine: meal.strArea,
        instructions: meal.strInstructions,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const fetchClickedRecipe = async function (id) {
  return fetchRecipe('lookup.php?i=', id);
};

export const fetchSearchResults = async function (input) {
  return fetchAllResults('search.php?s=', input);
};

export const fetchRandomRecipe = async function () {
  return fetchAllResults('random.php', '');
};

export const fetchCategory = async function (category) {
  return fetchAllResults('filter.php?c=', category);
};

export const fetchCuisine = async function (cuisine) {
  return fetchAllResults('filter.php?a=', cuisine);
};
