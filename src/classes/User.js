import RecipeRepository from "./RecipeRepository";

class User {
    constructor(userData) {
        this.name = userData.name;
        this.id = userData.id;
        this.pantry = userData.pantry;
        this.recipesToCook = [];
    }

    addRecipeToCook(recipe) {
        this.recipesToCook.push(recipe);
    }

    removeRecipeToCook(recipe) {
        this.recipesToCook.splice(this.recipesToCook.indexOf(recipe), 1);
    }
};

export default User;