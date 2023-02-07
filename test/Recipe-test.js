import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';
import recipeSampleData from '../src/data/recipes-sample';
import ingredientsData from '../src/data/ingredients';

describe('Recipe', () => {
  let recipeInstance;
  beforeEach(() => {
    recipeInstance = new Recipe(recipeSampleData[0], ingredientsData);
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
    expect(recipeInstance.ingredients.length).to.equal(11);
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
    ]
    expect(recipeInstance.tags).to.deep.equal(tags);
  });

  it('Should be able to return an array of all ingredient names', () => {
    expect(recipeInstance.getIngredientNames()[0]).to.equal("wheat flour");
    expect(recipeInstance.getIngredientNames().length).to.equal(11)
  })

  it('Should be able to return an array of cost in cents per ingredient', () => {
    expect(recipeInstance.getIngredientCost()[0]).to.equal(213)
    expect(recipeInstance.getIngredientCost().length).to.equal(11)
  })

  it('Should return an array of the recipe instructions', () => {
    expect(recipeInstance.getInstructions()[0]).to.equal("In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.")
    expect(recipeInstance.getInstructions()[5]).to.equal("Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.")
  })
})
