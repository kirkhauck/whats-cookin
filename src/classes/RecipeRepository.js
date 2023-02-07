import Recipe from './Recipe';

class RecipeRepository {
  constructor(recipeRepo, ingredientsData) {
    this.recipes = recipeRepo.map(recipe => new Recipe(recipe, ingredientsData))
  }

  filterByTag(tag) {
    const filteredRecipes = this.recipes.filter((recipe) => {
      return recipe.tags.includes(tag)
    });

    return filteredRecipes;
  }

  filterByName(name) {
    const filteredRecipes = this.recipes.filter((recipe) => {
      return recipe.name === name;
    });

    return filteredRecipes;
  }
}

export default RecipeRepository;
