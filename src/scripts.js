//IMPORTS
import './styles.css';
import './micromodal.css';
import fetchAllData from './apiCalls';
import MicroModal from 'micromodal';
import User from './classes/User';
import RecipeRepository from './classes/RecipeRepository';

//GLOBAL VARIABLES
let user, currentRecipes, selectedRecipe, recipeRepository;
let view = 'home';

//SELECTORS
const recipeSection = document.getElementById('recipes-section');
const tagSection = document.querySelector('.tags');
const searchInputName = document.getElementById('search-input-name');
const searchButtonName = document.getElementById('search-button-name');
const favoriteButton = document.getElementById('favoriteButton');
const clearTagAndNameButton = document.getElementById('clearTagAndName');
const toggleHomeFaveButton = document.getElementById('toggleHomeFave');
const heart = document.getElementById('heart');
const modalTitle = document.getElementById('modal-1-title');
const modalIngredients = document.getElementById('modal-ingredients');
const modalInstructions = document.getElementById('modal-instructions');

//EVENT LISTENERS
window.addEventListener('load', () => {
  fetchAllData()
    .then(apiData => {
      const users = apiData[0].usersData;
      const recipes = apiData[1].recipeData;
      const ingredients = apiData[2].ingredientsData;
      user = new User(users[getRandomIndex(users)]);
      recipeRepository = new RecipeRepository(recipes, ingredients);
      currentRecipes = recipeRepository.recipes;
      populateTagFilter();
      refreshRecipes();
    });
});

toggleHomeFaveButton.addEventListener('click', () => {
  if(view === 'fave') {
    currentRecipes = user.recipesToCook;
    toggleHomeFaveButton.innerText = 'Favorites';
    view = 'home';
  }else if(view === 'home'){
    currentRecipes = recipeRepository.recipes;
    toggleHomeFaveButton.innerText = 'Home';
    view = 'fave';
  }
  refreshRecipes();
})

clearTagAndNameButton.addEventListener('click', () => {
  refreshRecipes();
})

recipeSection.addEventListener('click', (event) => {
  if(event.target.id !== 'recipes-section') {
    selectedRecipe = recipeRepository.getRecipeByID(event.target.dataset.recipeid);
    toggleHeart();
    updateModal(selectedRecipe);
  }
});

searchButtonName.addEventListener('click', (event) => {
  event.preventDefault();
  updateCurrentRecipes(searchInputName.value, '', 'Name');
  tagSection.value = 'select-value';
  refreshRecipes();
});

tagSection.addEventListener('change', function(event) {
  event.preventDefault();
  updateCurrentRecipes(tagSection.value, 'select-value', 'Tag');
  searchInputName.value = '';
  refreshRecipes();
});

favoriteButton.addEventListener('click', () => {
  !user.recipesToCook.includes(selectedRecipe) ? user.addRecipeToCook(selectedRecipe) : user.removeRecipeToCook(selectedRecipe);
  toggleHeart();
  refreshRecipes();
});

// FUNCTIONS
const updateCurrentRecipes = (value, inputDefault, type) => {
  if(value == inputDefault && view === "home") {
    currentRecipes = recipeRepository.recipes;
  } else if (value == inputDefault && view === "fave") {
    currentRecipes = user.recipesToCook;
  } else if (view === "home") {
    if(type === 'Name') currentRecipes = recipeRepository.filterByName(value);
    if(type === 'Tag') currentRecipes = recipeRepository.filterByTag(value);
  } else if (view === "fave") {
    if(type === 'Name') currentRecipes = user.filterRecipeToCookByName(value);
    if(type === 'Tag') currentRecipes = user.filterRecipeToCookByTag(value);
  }
}

const refreshRecipes = () => {
  recipeSection.innerHTML = '';
  currentRecipes.forEach(recipe => {
    recipeSection.innerHTML += `
    <figure data-recipeid="${recipe.id}" data-custom-open="modal-1"><img class="ignore-pointer-event" src="${recipe.image}" alt="${recipe.name} alt"><figcaption class="ignore-pointer-event">${recipe.name}</figcaption></figure>`;
  });

  MicroModal.init({
    openTrigger: 'data-custom-open'
  });
}

const updateModal = (recipe) => {
  modalTitle.innerText = recipe.name;

  modalIngredients.innerHTML = `
      <tr>
        <th class="table-head">Amount</th>
        <th class="table-head">Ingredient</th>
        <th class="table-head">Cost</th>
      </tr>
    `;

  recipe.ingredients.forEach((ing,i) => {
    modalIngredients.innerHTML += `
      <tr>
        <th>${ing.quantity.amount} ${ing.quantity.unit}</th>
        <th>${ing.ingredient.name}</th>
        <th>$${recipe.getIngredientCost()[i]}</th>
      </tr>
    `;
  });

  modalIngredients.innerHTML += `
      <tr>
        <th>&nbsp</th>
        <th>&nbsp</th>
        <th class="total-cost">Total: $${recipe.getIngredientTotalCost()}</th>
      </tr>
    `;

  modalInstructions.innerHTML = '';
  recipe.getInstructions().forEach(instruction => {
    modalInstructions.innerHTML += `<li>${instruction}</li>`;
  });
}

const populateTagFilter = () => {
  const recipeTags = [...new Set(recipeRepository.recipes.flatMap(recipe => recipe.tags))].sort();
  recipeTags.forEach(tag => {
    tagSection.innerHTML += `<option value="${tag}">${tag}</option>`;
  });
}

const toggleHeart = () => {
  user.recipesToCook.includes(selectedRecipe) ? heart.classList.add('full-heart') : heart.classList.remove('full-heart');
}

const hide = (element) => {
  element.classList.add('hidden');
}

const show = (element) => {
  element.classList.remove('hidden');
}

const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

const handleError = (error) => recipeSection.innerText = `${error}, sorry!`;

export default handleError;
