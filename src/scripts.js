import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import RecipeRepository from './classes/RecipeRepository';
import recipeData from './data/recipes';
import ingredientsData from './data/ingredients';

const recipeSection = document.getElementById('recipes-section');


console.log('Hello world');

// User should be able to view a list of all recipes.

window.addEventListener('load', () => {
    const recipeRepository = new RecipeRepository(recipeData, ingredientsData);
    recipeRepository.recipes.forEach(recipe => {
        recipeSection.innerHTML += `
        <figure><img src="${recipe.image}"><figcaption>${recipe.name}</figcaption></figure>
        `
    })
})