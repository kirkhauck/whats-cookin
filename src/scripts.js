//IMPORTS
import './styles.css';
import './micromodal.css';
import './images/turing-logo.png'
import './images/magnify.svg'
import fetchAllData from './apiCalls';
import MicroModal from 'micromodal';
import User from './classes/User';
import RecipeRepository from './classes/RecipeRepository';

//GLOBAL VARIABLES
let user, currentRecipes, selectedRecipe, recipeRepository;
let favView = false;

//SELECTORS
const recipeSection = document.getElementById('recipes-section');
const tagSection = document.querySelector('.tags');
const filterByTagButton = document.getElementById('tagButton');
const searchInputName = document.getElementById('search-input-name');
const searchButtonName = document.getElementById('search-button-name');
const showFavoritesButton = document.getElementById('showFavoritesButton');
const favoriteButton = document.getElementById('favoriteButton');
const heart = document.getElementById('heart');
const modalTitle = document.getElementById('modal-1-title');
const modalIngredients = document.getElementById('modal-ingredients');
const modalInstructions = document.getElementById('modal-instructions');

//EVENT LISTENERS
window.addEventListener('load', () => {
  fetchAllData()
    .then(apiData => {
      // console.log(apiData)
      const users = apiData[0].usersData;
      const recipes = apiData[1].recipeData;
      const ingredients = apiData[2].ingredientsData
      user = new User(users[getRandomIndex(users)]);
      recipeRepository = new RecipeRepository(recipes, ingredients);
      currentRecipes = recipeRepository.recipes;
      populateTagFilter();
      refreshRecipes();
    });
});

recipeSection.addEventListener('click', (event) => {
  selectedRecipe = recipeRepository.getRecipeByID(event.target.dataset.recipeid);
  toggleHeart();
  updateModal(selectedRecipe);
});

searchButtonName.addEventListener('click', (event) => {
  event.preventDefault();
  if(searchInputName.value === '' && !favView) {
    currentRecipes = recipeRepository.recipes;
  } else if (searchInputName.value === '' && favView) {
    currentRecipes = user.recipesToCook;
  } else if (!favView) {
    currentRecipes = recipeRepository.filterByName(searchInputName.value);
  } else if (favView) {
    currentRecipes = user.filterRecipeToCookByName(searchInputName.value);
  }
  tagSection.value = 'select-value';
  refreshRecipes();
});

// filterByTagButton.addEventListener('click', (event) => {
//   event.preventDefault();
//   if(tagSection.value == 'select-value' && !favView) {
//     currentRecipes = recipeRepository.recipes;
//   } else if (tagSection.value == 'select-value' && favView) {
//     currentRecipes = user.recipesToCook;
//   } else if (!favView) {
//     currentRecipes = recipeRepository.filterByTag(tagSection.value);
//   } else if (favView) {
//     currentRecipes = user.filterRecipeToCookByTag(tagSection.value);
//   }
//   searchInputName.value = '';
//   refreshRecipes();
// });
tagSection.addEventListener('change', function(event) {
  if(this.value == 'select-value' && !favView) {
    currentRecipes = recipeRepository.recipes;
  } else if (this.value == 'select-value' && favView) {
    currentRecipes = user.recipesToCook;
  } else if (!favView) {
    currentRecipes = recipeRepository.filterByTag(this.value);
  } else if (favView) {
    currentRecipes = user.filterRecipeToCookByTag(this.value);
  }
  searchInputName.value = '';
  refreshRecipes();
});

showFavoritesButton.addEventListener('click', () => {
  favView = !favView;
  if(favView) {
    currentRecipes = user.recipesToCook;
    showFavoritesButton.innerText = 'Show All Recipes';
  } else {
    currentRecipes = recipeRepository.recipes;
    showFavoritesButton.innerText = 'Show Favorites';
  }
  tagSection.value = 'select-value';
  searchInputName.value = '';
  refreshRecipes();
});

favoriteButton.addEventListener('click', () => {
  if (!user.recipesToCook.includes(selectedRecipe)) {
    user.addRecipeToCook(selectedRecipe);
  } else {
    user.removeRecipeToCook(selectedRecipe);
  }
  toggleHeart();
  refreshRecipes();
});

// FUNCTIONS
const refreshRecipes = () => {
  recipeSection.innerHTML = '';
  currentRecipes.forEach(recipe => {
    recipeSection.innerHTML += `
    <figure data-recipeid="${recipe.id}" data-custom-open="modal-1"><img class="ignore-pointer-event" src="${recipe.image}" alt="${recipe.name} alt"><figcaption class="ignore-pointer-event">${recipe.name}</figcaption></figure>`;
  });

  MicroModal.init({
    openTrigger: 'data-custom-open'
  });
};

const updateModal = (recipe) => {
  modalTitle.innerText = recipe.name;

  modalIngredients.innerHTML = `
    <tr>
      <th class="table-head">Amount</th>
      <th class="table-head">Ingredient</th>
      <th class="table-head">Cost</th>
    </tr>`;
  recipe.ingredients.forEach((ing,i) => {
    modalIngredients.innerHTML += `
      <tr>
        <th>${ing.quantity.amount} ${ing.quantity.unit}</th>
        <th>${ing.ingredient.name}</th>
        <th>$${recipe.getIngredientCost()[i]}</th>
      </tr>
    `
  })
  modalIngredients.innerHTML +=
  `<tr>
    <th>&nbsp</th>
    <th>&nbsp</th>
    <th class="total-cost">Total: $${recipe.getIngredientTotalCost()}</th>
  </tr>`

  modalInstructions.innerHTML = '';
  recipe.getInstructions().forEach(instruction => {
    modalInstructions.innerHTML += `
      <li>${instruction}</li>
    `
  })
};

const populateTagFilter = () => {
  const recipeTags = [...new Set(recipeRepository.recipes.flatMap(recipe => recipe.tags))].sort();
  recipeTags.forEach(tag => {
    tagSection.innerHTML += `
      <option value="${tag}">${tag}</option>`;
  });
}

const toggleHeart = () => {
  if (user.recipesToCook.includes(selectedRecipe)) {
    heart.classList.add('full-heart');
  } else {
    heart.classList.remove('full-heart');
  }
};

const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

const handleError = (error) => recipeSection.innerText = `${error}, sorry!`;

export default handleError;