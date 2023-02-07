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
    this.instructions = recipeInfo.instructions;
    this.name = recipeInfo.name;
    this.tags = recipeInfo.tags;
  }

  getIngredientNames() {
    return this.ingredients.map(ingredient => ingredient.ingredient.name);
  }

  getIngredientCost() {
    return this.ingredients.map(ingredient => ingredient.quantity.amount * ingredient.ingredient.ingredientCost);
  }

  getInstructions() {
    const sortedInstructions = this.instructions.sort((instructionA, instructionB) => {
      if (instructionA.number > instructionB.number) {
        return 1;
      } else if (instructionA.number < instructionB.number) {
        return -1;
      } else {
        return 0;
      }
    })
    return sortedInstructions.map(instruction => instruction.instruction);
  }
}

export default Recipe;
