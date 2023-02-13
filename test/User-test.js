import User from "../src/classes/User";
import { expect } from "chai";
import recipeSampleData from "../src/data/recipes-sample";
import usersSampleData from "../src/data/users-sample";

describe('User', () => {
    let user;
    
    beforeEach(() => {
        user = new User(usersSampleData[0]);
    });

    it('Should be a function', () => {
        expect(User).to.be.a('function');
    });

    it('Should be an instance of the user class', () => {
        expect(user).to.be.an.instanceOf(User);
    });

    it('Should have a name', () => {
        expect(user.name).to.equal("Saige O'Kon");
    });

    it('Should have an id', () => {
        expect(user.id).to.equal(1);
    });

    it('Should have a pantry', () => {
        expect(user.pantry).to.deep.equal(usersSampleData[0].pantry);
    });

    it('Should have an array of recipes to cook', () => {
        expect(user.recipesToCook).to.deep.equal([]);
    });

    it('Should be able to add a recipe to the recipes to cook array', () => {
        user.addRecipeToCook(recipeSampleData[0]);
        expect(user.recipesToCook).to.deep.equal([recipeSampleData[0]]);
        expect(user.recipesToCook[0].name).to.equal("Loaded Chocolate Chip Pudding Cookie Cups");
    });

    it('Should be able to remove a recipe from the recipes to cook array', () => {
        user.addRecipeToCook(recipeSampleData[0]);
        user.addRecipeToCook(recipeSampleData[1]);
        user.addRecipeToCook(recipeSampleData[2]);
        user.removeRecipeToCook(recipeSampleData[1]);
        expect(user.recipesToCook).to.deep.equal([recipeSampleData[0], recipeSampleData[2]]);
    });

    it('Should be able to filter recipes to cook by a tag', () => {
        user.addRecipeToCook(recipeSampleData[0]);
        user.addRecipeToCook(recipeSampleData[1]);
        user.addRecipeToCook(recipeSampleData[2]);

        expect(user.filterRecipeToCookByTag('appetizer')).to.deep.equal([recipeSampleData[0]]);   
    });

    it('Should be able to filter recipes to cook by a name', () => {
        user.addRecipeToCook(recipeSampleData[0]);
        user.addRecipeToCook(recipeSampleData[1]);
        user.addRecipeToCook(recipeSampleData[2]);

        expect(user.filterRecipeToCookByName("Dirty Steve's Original Wing Sauce")).to.deep.equal([recipeSampleData[2]]);
    });
});