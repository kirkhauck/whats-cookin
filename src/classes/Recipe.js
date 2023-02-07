import Ingredient from './Ingredient';

class Recipe {
  constructor(recipeInfo) {
    this.id = recipeInfo.id;
    this.image = recipeInfo.image;
    this.ingredients = recipeInfo.ingredients.map(ingredient => new Ingredient(ingredient));
    this.insructions = recipeInfo.insructions;
    this.name = recipeInfo.name;
    this.tags = recipeInfo.tags;
  }
}

export default Recipe;
