import Recipe from './Recipe';

class RecipeRepository {
  constructor(recipeRepo) {
    this.recipes = recipeRepo.map(recipe => new Recipe(recipe))
  }

  
}

export default RecipeRepository;