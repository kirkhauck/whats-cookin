import Ingredient from './Ingredient';


class Recipe {
  constructor(recipeInfo, ingredientsData) {
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
    const sortedInstructions = this.instructions.sort((instructionA, instructionB) => instructionA.number - instructionB.number)
    return sortedInstructions.map(instruction => instruction.instruction);
  }
}

export default Recipe;
