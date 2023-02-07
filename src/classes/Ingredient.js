class Ingredient {
  constructor(ingredient) {
    this.id = ingredient.id;
    this.name = ingredient.name;
    this.ingredientCost = ingredient.estimatedCostInCents;
  }
}

export default Ingredient;