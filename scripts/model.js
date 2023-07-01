import { getItems } from "./helpers.js";
import { getJSON } from "./helpers.js";

export const state = {
  recipe: {},
  search: {
    allResults: [],
  },
};

// For click on a single meal
export const fetchRecipe = async function (input) {
  try {
    const data = await getJSON("search.php?s=", input);

    if (!data.meals) throw new Error("No recipe found. Please try again!");

    //for testing
    console.log(data);

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
      ingredients: getItems(recipe, "strIngredient"),
      measurements: getItems(recipe, "strMeasure"),
    };
  } catch (err) {
    console.error(err);
  }
};

// For searchbar query
export const fetchSearchResults = async function (input) {
  try {
    const data = await getJSON("search.php?s=", input);
    if (!data.meals) throw new Error("No recipes found. Please try again!");
    state.search.allResults = data.meals.map((meal) => {
      return {
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        category: meal.strCategory,
        cuisine: meal.strArea,
      };
    });

    // for testing
    console.log(state.search.allResults);
  } catch (err) {
    console.error(err);
  }
};
