import Ingredient from './Ingredient';


class Recipe {
  constructor(recipeInfo, ingredientsData) {
    this.id = recipeInfo.id;
    this.image = recipeInfo.image;
    this.ingredients = this.getRecipeIngredients(recipeInfo, ingredientsData);
    this.instructions = recipeInfo.instructions;
    this.name = recipeInfo.name;
    this.tags = recipeInfo.tags;
  }

  getIngredientNames() {
    return this.ingredients.map(ingredient => ingredient.ingredient.name);
  }

  getIngredientCost() {
    return this.ingredients.map(ingredient => ((ingredient.quantity.amount * ingredient.ingredient.ingredientCost) / 100).toFixed(2));
  }

  getIngredientTotalCost() {
    return (this.ingredients.reduce((acc, ingredient) => {
      acc += (ingredient.quantity.amount * ingredient.ingredient.ingredientCost);
      
      return acc;
    },0) / 100).toFixed(2);
  }

  getInstructions() {
    return this.instructions.map(instruction => instruction.instruction)
      .sort((instructionA, instructionB) => instructionA.number - instructionB.number);
  }

  getRecipeIngredients(recipeInfo, ingredientsData) {
    recipeInfo.ingredients.map(ingredient => {
      const findIngredient = ingredientsData.find(ingredientData => ingredientData.id === ingredient.id);
      return {
        ingredient: new Ingredient(findIngredient), 
        quantity: ingredient.quantity
      };
    });
  }
}

export default Recipe;