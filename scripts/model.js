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
    if (!data.meals)
      throw new Error(
        'There was an error while getting this recipe. Please try again!'
      );
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
    console.error(err);
  }
};

// For searchbar query
export const fetchAllResults = async function (type, input) {
  try {
    const data = await getJSON(type, input);
    if (!data.meals) throw new Error('No recipes found. Please try again!');
    state.search.allResults = data.meals.map((meal) => {
      return {
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        category: meal.strCategory,
        cuisine: meal.strArea,
        instructions: meal.strInstructions,
      };
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// For click on a single meal
export const fetchClickedRecipe = async function (id) {
  return fetchRecipe('lookup.php?i=', id);
};

// For searchbar results
export const fetchSearchResults = async function (input) {
  return fetchAllResults('search.php?s=', input);
};

// For random result
export const fetchRandomRecipe = async function () {
  return fetchAllResults('random.php', '');
};
