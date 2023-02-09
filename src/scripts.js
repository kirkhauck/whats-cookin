// IMPORTS
import './styles.css';
import './micromodal.css';
import apiCalls from './apiCalls';
import MicroModal from 'micromodal';
import './images/turing-logo.png'
import './images/magnify.svg'
import User from './classes/User';
import RecipeRepository from './classes/RecipeRepository';
import recipeData from './data/recipes';
import ingredientsData from './data/ingredients';
import usersData from './data/users';

// Global Variables
let user, recipeRepository, currentRecipes, selectedRecipe;
let favView = false;

//Selectors
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

// EVENT LISTENERS
window.addEventListener('load', () => {
  user = new User(usersData[getRandomUserIndex()]);
  recipeRepository = new RecipeRepository(recipeData, ingredientsData);
  currentRecipes = recipeRepository.recipes;
  refreshRecipes();
});

window.addEventListener('load', () => {
  const recipeTags = [...new Set(recipeRepository.recipes.flatMap(recipe => recipe.tags))].sort();
  recipeTags.forEach(tag => {
    tagSection.innerHTML += `
      <option value="${tag}">${tag}</option>`;
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
  refreshRecipes();
});

filterByTagButton.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(tagSection.value)
  console.log(typeof tagSection.value)
  if(tagSection.value == 'select-value' && !favView) {
    currentRecipes = recipeRepository.recipes;
  } else if (tagSection.value == 'select-value' && favView) {
    currentRecipes = user.recipesToCook;
  } else if (!favView) {
    currentRecipes = recipeRepository.filterByTag(tagSection.value);
  } else if (favView) {
    currentRecipes = user.filterRecipeToCookByTag(tagSection.value);
  }
  refreshRecipes();
});

showFavoritesButton.addEventListener('click', () => {
  favView = !favView;
  currentRecipes = user.recipesToCook;
  refreshRecipes();
});

favoriteButton.addEventListener('click', () => {
  if (!user.recipesToCook.includes(selectedRecipe)) {
    user.addRecipeToCook(selectedRecipe);
  } else {
    user.removeRecipeToCook(selectedRecipe);
  }
  toggleHeart();
});
  
const refreshRecipes = () => {
  recipeSection.innerHTML = '';
  currentRecipes.forEach(recipe => {
    recipeSection.innerHTML += `
    <figure data-recipeid="${recipe.id}" data-custom-open="modal-1"><img class="ignore-pointer-event" src="${recipe.image}"><figcaption class="ignore-pointer-event">${recipe.name}</figcaption></figure>`;
  });

  MicroModal.init({
    openTrigger: 'data-custom-open'
  });
};

const updateModal = (recipe) => {
  modalTitle.innerText = recipe.name;

  modalIngredients.innerHTML = `
    <tr>
      <th>Amount</th>
      <th>Ingredient</th>
      <th>Cost</th>
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
    <th></th>
    <th></th>
    <th>$${recipe.getIngredientTotalCost()}</th>
  </tr>`

  modalInstructions.innerHTML = '';
  recipe.getInstructions().forEach(instruction => {
    modalInstructions.innerHTML += `
      <li>${instruction}</li>
    `
  })
};

const toggleHeart = () => {
  if (user.recipesToCook.includes(selectedRecipe)) {
    heart.classList.add('full-heart');
  } else {
    heart.classList.remove('full-heart');
  }
};

// Will need to replace usersData with fetched data file later
const getRandomUserIndex = () => Math.floor(Math.random() * usersData.length);