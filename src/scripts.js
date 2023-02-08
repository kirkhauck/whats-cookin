// IMPORTS
import './styles.css';
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
  console.log(event.target.dataset.recipeid);
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
  currentRecipes = recipeRepository.filterByTag(tagSection.value);
  refreshRecipes();
});
  
const refreshRecipes = () => {
  recipeSection.innerHTML = '';
  currentRecipes.forEach(recipe => {
    recipeSection.innerHTML += `
    <figure data-recipeid="${recipe.id}" data-custom-open="modal-1"><img class="ignore-pointer-event" src="${recipe.image}"><figcaption class="ignore-pointer-event">${recipe.name}</figcaption></figure>`;
  });

  MicroModal.init({
    onShow: modal => modalTitle.innerText = `${currentRecipes[0].name}`,
    onClose: modal => console.info(`${modal.id} is hidden`), // [2]
    openTrigger: 'data-custom-open'
  });
};