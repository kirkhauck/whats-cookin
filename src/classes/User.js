import { postFavorite } from "../apiCalls";

class User {
  constructor(userData) {
    this.name = userData.name;
    this.id = userData.id;
    this.recipesToCook = userData.recipesToCook;
  }

  addRecipeToCook(recipe) {
    //this.recipesToCook.push(recipe);
    postFavorite(this.id, recipe.id);
  }

  removeRecipeToCook(recipe) {
    this.recipesToCook.splice(this.recipesToCook.indexOf(recipe), 1);
  }

  filterRecipeToCookByTag(tag) {
    const filteredRecipes = this.recipesToCook.filter((recipe) => {
      return recipe.tags.includes(tag);
    });
  
    return filteredRecipes;
  }

  filterRecipeToCookByName(name) {
    const filteredRecipes = this.recipesToCook.filter((recipe) => {
      return recipe.name.toLowerCase().includes(name.toLowerCase());
    });
    
    return filteredRecipes;
  }
};

export default User;
