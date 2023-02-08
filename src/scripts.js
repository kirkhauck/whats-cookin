// IMPORTS
import './styles.css';
import './micromodal.css';
import apiCalls from './apiCalls';
import MicroModal from 'micromodal';
import './images/turing-logo.png'
import './images/magnify.svg'
import RecipeRepository from './classes/RecipeRepository';
import recipeData from './data/recipes';
import ingredientsData from './data/ingredients';

// SELECTORS
let recipeRepository, currentRecipes;
const recipeSection = document.getElementById('recipes-section');
const tagSection = document.querySelector('.tags');
const filterByTagButton = document.getElementById('tagButton');
const searchInputName = document.getElementById('search-input-name');
const searchButtonName = document.getElementById('search-button-name');
const modalTitle = document.getElementById('modal-1-title');
const modalIngredients = document.getElementById('modal-ingredients');
const modalInstructions = document.getElementById('modal-instructions');
const modalTotal = document.getElementById('modal-total');

// EVENT LISTENERS
window.addEventListener('load', () => {
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
  const selectedRecipe = recipeRepository.getRecipeByID(event.target.dataset.recipeid);
  updateModal(selectedRecipe);
})

searchButtonName.addEventListener('click', (event) => {
  event.preventDefault();
  if(searchInputName.value === '') {
      currentRecipes = recipeRepository.recipes
  } else {
      currentRecipes = recipeRepository.filterByName(searchInputName.value);
  }
  refreshRecipes();
});

filterByTagButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (tagSection.value === 'select-value') {
    currentRecipes = recipeRepository.recipes;
  } else {
    currentRecipes = recipeRepository.filterByTag(tagSection.value);
    refreshRecipes();
  }
  });
  
const refreshRecipes = () => {
  recipeSection.innerHTML = '';
  currentRecipes.forEach(recipe => {
    recipeSection.innerHTML += `
    <figure data-recipeid="${recipe.id}" data-custom-open="modal-1"><img class="ignore-pointer-event" src="${recipe.image}"><figcaption class="ignore-pointer-event">${recipe.name}</figcaption></figure>`;
  });

  MicroModal.init({
    // onShow: modal => modalTitle.innerText = `${currentRecipes[0].name}`,
    // onClose: modal => console.info(`${modal.id} is hidden`), // [2]
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
}
