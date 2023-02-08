import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/magnify.svg'
import RecipeRepository from './classes/RecipeRepository';
import recipeData from './data/recipes';
import ingredientsData from './data/ingredients';

let recipeRepository, currentRecipes;
const recipeSection = document.getElementById('recipes-section');
const searchInputName = document.getElementById('search-input-name');
const searchButtonName = document.getElementById('search-button-name');


window.addEventListener('load', () => {
    recipeRepository = new RecipeRepository(recipeData, ingredientsData);
    currentRecipes = recipeRepository.recipes;
    refreshRecipes();
})

searchButtonName.addEventListener('click', (event) => {
    event.preventDefault();
    if(searchInputName.value === ''){
        currentRecipes = recipeRepository.recipes
    }else{
        currentRecipes = recipeRepository.filterByName(searchInputName.value);
    }
    refreshRecipes();
})

const refreshRecipes = () => {
    recipeSection.innerHTML = '';
    currentRecipes.forEach(recipe => {
        recipeSection.innerHTML += `
            <figure><img src="${recipe.image}"><figcaption>${recipe.name}</figcaption></figure>
        `
    })
}
