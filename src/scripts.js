//IMPORTS
import './styles.css';
import './micromodal.css';
import fetchAllData from './apiCalls';
import MicroModal from 'micromodal';
import User from './classes/User';
import RecipeRepository from './classes/RecipeRepository';

//GLOBAL VARIABLES
let user, currentRecipes, selectedRecipe, recipeRepository;
let view = "all";

//SELECTORS
const recipeSection = document.getElementById('recipes-section');
const tagSection = document.querySelector('.tags');
const searchInputName = document.getElementById('search-input-name');
const searchButtonName = document.getElementById('search-button-name');
const showFavoritesButton = document.getElementById('showFavoritesButton');
const showAllButton = document.getElementById('showAllButton');
const favoriteButton = document.getElementById('favoriteButton');
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

recipeSection.addEventListener('click', (event) => {
  if(event.target.id !== 'recipes-section') {
    selectedRecipe = recipeRepository.getRecipeByID(event.target.dataset.recipeid);
    toggleHeart();
    updateModal(selectedRecipe);
  }
});


searchButtonName.addEventListener('click', (event) => {
  event.preventDefault();
  show(showAllButton);
  show(showFavoritesButton);
  showFilterBySearch();
  tagSection.value = 'select-value';
  refreshRecipes();
});

tagSection.addEventListener('change', function(event) {
  event.preventDefault();
  show(showAllButton);
  show(showFavoritesButton);
  if(this.value == 'select-value' && view === "all") {
    currentRecipes = recipeRepository.recipes;
    showFavoritesButton.innerText = 'Show Favorites';
  } else if (this.value == 'select-value' && view === "fave") {
    currentRecipes = user.recipesToCook;
    showFavoritesButton.innerText = 'Show Favorites';
  } else if (view === "all") {
    currentRecipes = recipeRepository.filterByTag(this.value);
    showFavoritesButton.innerText = 'Show Favorites';
  } else if (view === "fave") {
    currentRecipes = user.filterRecipeToCookByTag(this.value);
    showFavoritesButton.innerText = 'Show All Favorites';
  }
  searchInputName.value = '';
  refreshRecipes();
});

showFavoritesButton.addEventListener('click', () => {
  view = "fave";
  hide(showFavoritesButton);
  show(showAllButton);
  currentRecipes = user.recipesToCook;
  tagSection.value = 'select-value';
  searchInputName.value = '';
  refreshRecipes();
});

showAllButton.addEventListener('click', () => {
  view = "all";
  showFavoritesButton.innerText = 'Show Favorites';
  hide(showAllButton);
  show(showFavoritesButton);
  currentRecipes = recipeRepository.recipes;
  tagSection.value = 'select-value';
  searchInputName.value = '';
  refreshRecipes();
});


favoriteButton.addEventListener('click', () => {
  !user.recipesToCook.includes(selectedRecipe) ? user.addRecipeToCook(selectedRecipe) : user.removeRecipeToCook(selectedRecipe);
  toggleHeart();
  refreshRecipes();
});

// FUNCTIONS
const showFilterBySearch = () => {
  if(searchInputName.value === '' && view === "all") {
    currentRecipes = recipeRepository.recipes;
    showFavoritesButton.innerText = 'Show Favorites';
  } else if (searchInputName.value === '' && view === "fave") {
    currentRecipes = user.recipesToCook;
    showFavoritesButton.innerText = 'Show Favorites';
  } else if (view === "all") {
    currentRecipes = recipeRepository.filterByName(searchInputName.value);
    showFavoritesButton.innerText = 'Show Favorites';
  } else if (view === "fave") {
    currentRecipes = user.filterRecipeToCookByName(searchInputName.value);
    showFavoritesButton.innerText = 'Show All Favorites';
  }
}

const refreshRecipes = () => {
  recipeSection.innerHTML = '';
  currentRecipes.forEach(recipe => {
    recipeSection.innerHTML += `
    <figure tabindex='0' data-recipeid="${recipe.id}" data-custom-open="modal-1" class="recipeCard"><img class="ignore-pointer-event" src="${recipe.image}" alt="${recipe.name} alt"><figcaption class="ignore-pointer-event">${recipe.name}</figcaption></figure>`;
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