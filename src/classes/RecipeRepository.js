import Recipe from './Recipe';

class RecipeRepository {
  constructor(recipeRepo) {
    this.recipes = recipeRepo.map(recipe => new Recipe(recipe))
  }

  filterByTag(tag) {
    const filteredRecipes = this.recipes.filter((recipe) => {
      return recipe.tags.includes(tag)
    });

    return filteredRecipes;
  }

  filterByName() {

  }
}

export default RecipeRepository;