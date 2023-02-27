class User {
  constructor(userData, repository) {
    this.name = userData.name;
    this.id = userData.id;
    this.recipesToCook = userData.recipesToCook;
    this.repository = repository;
  }

  filterRecipeToCookByTag(tag) {
    const filteredRecipes = this.getFavoritesFromID().filter((recipe) => {
      return recipe.tags.includes(tag);
    });
  
    return filteredRecipes;
  }

  filterRecipeToCookByName(name) {
    const filteredRecipes = this.getFavoritesFromID().filter((recipe) => {
      return recipe.name.toLowerCase().includes(name.toLowerCase());
    });
    
    return filteredRecipes;
  }

  getFavoritesFromID() {
    return this.recipesToCook.map(recipeID => this.repository.recipes.find(recipe => recipe.id === recipeID));
  }
};

export default User;
