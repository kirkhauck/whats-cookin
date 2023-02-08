import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import RecipeRepository from './classes/RecipeRepository';
import recipeData from './data/recipes';
import ingredientsData from './data/ingredients';

const recipeSection = document.getElementById('recipes-section');
const recipeRepository = new RecipeRepository(recipeData, ingredientsData);
const tagSection = document.querySelector('.tags');
const filterByTagButton = document.getElementById('tagButton');


console.log('Hello world');

// User should be able to view a list of all recipes.

window.addEventListener('load', () => {
    recipeRepository.recipes.forEach(recipe => {
        recipeSection.innerHTML += `
        <figure><img src="${recipe.image}"><figcaption>${recipe.name}</figcaption></figure>
        `
    })
})

window.addEventListener('load', () => {
    const recipeTags = [...new Set(recipeRepository.recipes.flatMap(recipe => recipe.tags))].sort();
    recipeTags.forEach(tag => {
        tagSection.innerHTML += `
        <option value="${tag}">${tag}</option>
        `
    })
})

