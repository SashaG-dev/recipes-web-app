# CRAVIN': The Recipe Hunter

## A web app for finding and saving unique recipes.

![alt text][img]

[img]: https://github.com/SashaG-dev/recipes-web-app/blob/main/assets/img/website-preview.png "Image of CRAVIN' web app homepage"

CRAVIN' was created with HTML5, SASS/SCSS, and Vanilla JavaScript, with all recipes being fetched from [The Meal Database](https://www.themealdb.com/api.php). CRAVIN' has a few features, with the main features including:

1. A landing page that's updated weekly with featured categories and cuisines.
2. A functional search that returns recipes related to the query entered.
3. Recipe results that, when clicked, display full recipe details.
4. A working side menu with:
   - A full list of all recipe categories
   - A full list of all recipe cuisines
   - A 'Surprise Me' button that generates a random recipe!
5. A responsive, minimalist design that's aimed towards creating a good end-user experience.

## Visual Guides

### Search bar functionality

![alt text][gif-1]

[gif-1]: https://github.com/SashaG-dev/recipes-web-app/blob/main/assets/img/search-tutorial.gif 'Search bar functionality tutorial'

### Side bar Cuisines and Categories

![alt text][gif-2]

[gif-2]: https://github.com/SashaG-dev/recipes-web-app/blob/main/assets/img/cuisines-and-categories-tutorial.gif 'Side bar menus tutorial'

### 'Surprise Me!'

![alt text][gif-3]

[gif-3]: https://github.com/SashaG-dev/recipes-web-app/blob/main/assets/img/random-recipe.gif 'Random recipe button functionality tutorial'

## Getting Started

1. Head to the [CRAVIN' website](https://cravin-web-app.netlify.app/). It's live!
2. Find a new recipe by:
   - Selecting a featured recipe in the home section.
   - Entering a keyword in the to search bar (e.g. 'cake', 'pie', etc.)
   - Opening the sidebar and selecting a certain category or cuisine, or hitting the 'Surprise Me!' button.
3. Find a recipe and get its ingredients, instructions, and a link to a YouTube tutorial!

## Known Issues and Future Features

Although this site can be used in its current version, there are still a few bugs that are being fixed! Here's the major ones:

- User login and new users joining not available.
- Some recipe instructions don't display correctly when viewing a full recipe.
- Clicking on a recipe renders multiple loading overlays.
- Clicking on a recipe on the homepage makes the recipe section visible; this adds extra padding to the bottom of the page.
- There is an issue with a media query breakpoint at around 1500px screen width.

While these bugs are currently being worked on, there's also some upcoming features that will be added in future versions! Here's a few of them:

- User login and authorization to be added! New features for logged in users include:
  - Bookmark favorite recipes and view them in the user sidebar.
  - Create personal recipes and save them for later.
- A 'Load More' button so that searches that return more than 10 recipes only loads the first 10, then the next 10 on click, and so on.

## More Information

This web app gets all of it's recipes and recipe information from [The Meal Database API](https://www.themealdb.com/api.php). If you'd like, you can support them and their awesome work!
