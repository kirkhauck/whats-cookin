import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';
import recipeSampleData from '../src/data/recipes-sample';
import ingredientsSampleData from '../src/data/ingredients-sample';

describe('Recipe', () => {
  let recipeInstance;
  
  beforeEach(() => {
    recipeInstance = new Recipe(recipeSampleData[0], ingredientsSampleData);
  });

  it('Should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('Should be an instance of Recipe', () => {
    expect(recipeInstance).to.be.an.instanceOf(Recipe);
  });

  it('Should be able to have an id', () => {
    expect(recipeInstance.id).to.equal(595736);
  });

  it('Should be able to have an image', () => {
    expect(recipeInstance.image).to.equal('https://spoonacular.com/recipeImages/595736-556x370.jpg');
  });

  it('Should be able to have an array of Ingredients', () => {
    expect(recipeInstance.ingredients[0].ingredient).to.be.an.instanceOf(Ingredient);
  });

  it('Should have Ingredient instance for all ingredients', () => {
    expect(recipeInstance.ingredients.length).to.equal(3);
  });
  
  it('Should have Ingredient with correct ingredient data', () => {
    expect(recipeInstance.ingredients[0].ingredient.id).to.equal(20081);
  });

  it('Should have an instructions array', () => {
    const instruction = {
      "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
      "number": 1
    }
    expect(recipeInstance.instructions[0]).to.deep.equal(instruction);
  });

  it('Should have a name', () => {
    expect(recipeInstance.name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups');
  });

  it('Should have an array of tags', () => {
    const tags = [
      "antipasti",
      "starter",
      "snack",
      "appetizer",
      "antipasto",
      "hor d'oeuvre"
    ];
    expect(recipeInstance.tags).to.deep.equal(tags);
  });

  it('Should be able to return an array of all ingredient names', () => {
    expect(recipeInstance.getIngredientNames()[0]).to.equal("wheat flour");
    expect(recipeInstance.getIngredientNames().length).to.equal(3);
  })

  it('Should be able to return an array of cost in cents per ingredient', () => {
    expect(recipeInstance.getIngredientCost()[0]).to.equal('2.13');
    expect(recipeInstance.getIngredientCost().length).to.equal(3);
  })

  it('Should return an array of the recipe instructions', () => {
    expect(recipeInstance.getInstructions()[0]).to.equal("In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.");
    expect(recipeInstance.getInstructions()[2]).to.equal("Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.");
  });
});