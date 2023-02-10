// IMPORTS
import './styles.css';
import './micromodal.css';
import getUsers from './apiCalls';
import MicroModal from 'micromodal';
import './images/turing-logo.png'
import './images/magnify.svg'
import User from './classes/User';
import usersData from './data/users';
import RecipeRepository from './classes/RecipeRepository';
import ingredientsDataGood from './data/ingredients';
// Global Variables
let user, currentRecipes, selectedRecipe, recipeRepository;
let favView = false;
//let usersData = getUsers().then(users => users);

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
  const userPromise = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users');
  const recipePromise = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes');
  const ingredientPromise = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients');
  let fetchPromises = [userPromise, recipePromise, ingredientPromise]
  let recipeData;
  Promise.all(fetchPromises)
    .then(responses => {
      const jsonResponses = responses.map(response => response.json());
      Promise.all(jsonResponses).then(data => {
        data.forEach((dataset,i) => {
          if(i === 0){
            const users = dataset.usersData;
            user = new User(users[getRandomUserIndex(users)]);
          }else if(i === 1){
            recipeData = dataset.recipeData;
          }else if(i === 2){
            recipeRepository = new RecipeRepository(recipeData, dataset.ingredientsData);
            currentRecipes = recipeRepository.recipes;
            populateTagFilter();
            refreshRecipes();
          }
        })
      })
    })
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

filterByTagButton.addEventListener('click', (event) => {
  event.preventDefault();
  if(tagSection.value == 'select-value' && !favView) {
    currentRecipes = recipeRepository.recipes;
  } else if (tagSection.value == 'select-value' && favView) {
    currentRecipes = user.recipesToCook;
  } else if (!favView) {
    currentRecipes = recipeRepository.filterByTag(tagSection.value);
  } else if (favView) {
    currentRecipes = user.filterRecipeToCookByTag(tagSection.value);
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

// Will need to replace usersData with fetched data file later
const getRandomUserIndex = (array) => Math.floor(Math.random() * array.length);
