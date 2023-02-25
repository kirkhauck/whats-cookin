//IMPORTS
import './styles.css';
import './micromodal.css';
import {fetchAllData, postFavorite, fetchApi} from './apiCalls';
import MicroModal from 'micromodal';
import User from './classes/User';
import RecipeRepository from './classes/RecipeRepository';
import { Convert } from "easy-currencies";
import CurrencyList from 'currency-list';

//GLOBAL VARIABLES
let user, currentRecipes, selectedRecipe, recipeRepository;
let view = 'home';
let currentC = 'USD';
const currencyList = CurrencyList.getAll('en_US');

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
const currencyDropdown = document.getElementById('currencyDropdown');

//EVENT LISTENERS
window.addEventListener('load', () => {
  fetchAllData()
    .then(apiData => {
      const users = apiData[0].users;
      const recipes = apiData[1].recipes;
      const ingredients = apiData[2].ingredients;
      //user = new User(users[getRandomIndex(users)]);
      recipeRepository = new RecipeRepository(recipes, ingredients);
      currentRecipes = recipeRepository.recipes;
      user = new User(users[0], recipeRepository);
      populateTagFilter();
      refreshRecipes();
      populateCurrencyDropdown();
    });
});

toggleHomeFaveButton.addEventListener('click', () => {
  if(view === 'home') {
    currentRecipes = user.getFavoritesFromID();
    toggleHomeFaveButton.innerText = 'Show Home';
    view = 'fave';
  }else if(view === 'fave'){
    currentRecipes = recipeRepository.recipes;
    toggleHomeFaveButton.innerText = 'Show Favorites';
    view = 'home';
  }
  clearTagAndName();
})

clearTagAndNameButton.addEventListener('click', () => clearTagAndName())

recipeSection.addEventListener('click', (event) => {
  if(event.target.id !== 'recipes-section') {
    selectedRecipe = recipeRepository.getRecipeByID(event.target.dataset.recipeid);
    toggleFavorite();
    updateModal(selectedRecipe);
  }
});

searchInputName.addEventListener('keyup', (event) => {
  event.preventDefault();
  if(!searchInputName.value) {
    hide(clearTagAndNameButton);
  } else if(searchInputName.value){
    show(clearTagAndNameButton);
  }
  tagSection.value = 'select-value';
  updateCurrentRecipes();
  refreshRecipes();
})

searchButtonName.addEventListener('click', (event) => {
  event.preventDefault();
  if(!searchInputName.value) {
    hide(clearTagAndNameButton);
  } else {
    show(clearTagAndNameButton);
  }
  tagSection.value = 'select-value';
  updateCurrentRecipes();
  refreshRecipes();
});

tagSection.addEventListener('change', function(event) {
  event.preventDefault();
  if(tagSection.value !== 'select-value'){
    show(clearTagAndNameButton);
  } else {
    clearTagAndName();
    return;
  }
  searchInputName.value = '';
  updateCurrentRecipes();
  refreshRecipes();
});

favoriteButton.addEventListener('click', () => {
  if(!user.getFavoritesFromID().includes(selectedRecipe) ) {
    user.addRecipeToCook(selectedRecipe)
    .then( () => {
      fetchAllData()
      .then(apiData => {
        const users = apiData[0].users;
        user.recipesToCook = users[0].recipesToCook;
        updateCurrentRecipes();
        toggleFavorite();
        refreshRecipes();
      });
    });
  }; 
});

currencyDropdown.addEventListener('change', () => {
  currentRecipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      Convert(ingredient.ingredient.ingredientCost).from(currentC).to(currencyDropdown.value)
      .then(data => ingredient.ingredient.ingredientCost = data)
    })
  })
  currentC = currencyDropdown.value;
  refreshRecipes();
})

// FUNCTIONS
const clearTagAndName = () => {
  hide(clearTagAndNameButton);
  searchInputName.value = ''
  tagSection.value = 'select-value';
  updateCurrentRecipes();
  refreshRecipes();
}

const populateCurrencyDropdown = () => {
  const currencyKeys = Object.keys(currencyList);
  currencyKeys.forEach(key => 
    currencyDropdown.innerHTML += `<option value="${key}">${currencyList[key].name} - ${currencyList[key].symbol_native}</option>`
  )
  currencyDropdown.value = 'USD';
}

const updateCurrentRecipes = () => {
  if(view === 'home') {
    if(searchInputName.value) currentRecipes = recipeRepository.filterByName(searchInputName.value);
    else if(tagSection.value !== 'select-value') currentRecipes = recipeRepository.filterByTag(tagSection.value);
    else currentRecipes = recipeRepository.recipes;
  }

  if(view === 'fave') {
    if(searchInputName.value) currentRecipes = user.filterRecipeToCookByName(searchInputName.value);
    else if(tagSection.value !== 'select-value') currentRecipes = user.filterRecipeToCookByTag(tagSection.value);
    else currentRecipes = user.getFavoritesFromID();
  }
}

const refreshRecipes = () => {
  recipeSection.innerHTML = '';

  if(currentRecipes.length === 0) {
    recipeSection.innerHTML = '<p>Sorry, there\'s nothing here to show you!</p>';
  }

  currentRecipes.forEach(recipe => {
    recipeSection.innerHTML += `
    <figure role="button" tabindex='0' data-recipeid="${recipe.id}" data-custom-open="modal-1" class="recipeCard">
      <img class="ignore-pointer-event" src="${recipe.image}" alt="picture of ${recipe.name}">
      <figcaption class="ignore-pointer-event">
        <h2 class="recipe-tag">${recipe.tags[0]}</h2>
        <h2 aria-hidden="true" class= "recipe-title">${recipe.name}</h2>
        <div class="time"><span class="material-symbols-outlined timer">timer</span><p>${recipe.getIngredientTime()}</p></div>
      </figcaption>
    </figure>`;
  });

  MicroModal.init({
    openTrigger: 'data-custom-open'
  });

  let recipeCards = document.querySelectorAll('.recipeCard');

  recipeCards.forEach(recipeCard => {
    recipeCard.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        recipeCard.click();
      }
    })
  })
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
        <th>${currencyList[currentC].symbol_native}${recipe.getIngredientCost()[i]}</th>
      </tr>
    `;
  });

  modalIngredients.innerHTML += `
      <tr>
        <th>&nbsp</th>
        <th>&nbsp</th>
        <th class="total-cost">Total: ${currencyList[currentC].symbol_native}${recipe.getIngredientTotalCost()}</th>
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

const toggleFavorite = () => {
  if (user.getFavoritesFromID().includes(selectedRecipe)) {
    heart.classList.add('full-heart');
  } else {
    heart.classList.remove('full-heart');
  }
  
  if (user.getFavoritesFromID().includes(selectedRecipe)) {
    favoriteButton.ariaLabel = 'remove recipe from favorites';
  } else {
    favoriteButton.ariaLabel = 'add recipe to favorites';
  }
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
