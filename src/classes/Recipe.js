import Ingredient from './Ingredient';
import ingredientsData from '../data/ingredients';

class Recipe {
  constructor(recipeInfo) {
    this.id = recipeInfo.id;
    this.image = recipeInfo.image;
    this.ingredients = recipeInfo.ingredients.map(ingredient => {
      const findIngredient = ingredientsData.find(ingredientData => ingredientData.id === ingredient.id);
      return {
        ingredient: new Ingredient(findIngredient), 
        quantity: ingredient.quantity}
      })
    this.name = recipeInfo.name;
    this.tags = recipeInfo.tags;
  }
}

export default Recipe;
