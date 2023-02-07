import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';

const recipe = {
  "id": 595736,
  "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
  "ingredients": [
    {
      "id": 20081,
      "quantity": {
        "amount": 1.5,
        "unit": "c"
      }
    },
    {
      "id": 18372,
      "quantity": {
        "amount": 0.5,
        "unit": "tsp"
      }
    },
    {
      "id": 1123,
      "quantity": {
        "amount": 1,
        "unit": "large"
      }
    },
    {
      "id": 19335,
      "quantity": {
        "amount": 0.5,
        "unit": "c"
      }
    },
    {
      "id": 19206,
      "quantity": {
        "amount": 3,
        "unit": "Tbsp"
      }
    },
    {
      "id": 19334,
      "quantity": {
        "amount": 0.5,
        "unit": "c"
      }
    },
    {
      "id": 2047,
      "quantity": {
        "amount": 0.5,
        "unit": "tsp"
      }
    },
    {
      "id": 1012047,
      "quantity": {
        "amount": 24,
        "unit": "servings"
      }
    },
    {
      "id": 10019903,
      "quantity": {
        "amount": 2,
        "unit": "c"
      }
    },
    {
      "id": 1145,
      "quantity": {
        "amount": 0.5,
        "unit": "c"
      }
    },
    {
      "id": 2050,
      "quantity": {
        "amount": 0.5,
        "unit": "tsp"
      }
    }
  ],
  "instructions": [
    {
      "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
      "number": 1
    },
    {
      "instruction": "Add egg and vanilla and mix until combined.",
      "number": 2
    },
    {
      "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
      "number": 3
    },
    {
      "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
      "number": 4
    },
    {
      "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
      "number": 5
    },
    {
      "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
      "number": 6
    }
  ],
  "name": "Loaded Chocolate Chip Pudding Cookie Cups",
  "tags": [
    "antipasti",
    "starter",
    "snack",
    "appetizer",
    "antipasto",
    "hor d'oeuvre"
  ]
}


describe('Recipe', () => {
  let recipeInstance;
  beforeEach(() => {
    recipeInstance = new Recipe(recipe);
  });

  it('Should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('Should be an instance of Recipe', () => {
    expect(recipeInstance).to.be.an.instanceOf(Recipe);
  });

  it('Should be able to have an id', () => {
    expect(recipeInstance.id).to.equal(recipe.id);
  });

  it('Should be able to have an image', () => {
    expect(recipeInstance.image).to.equal(recipe.image);
  });

  it('Should be able to have an array of Ingredients', () => {
    expect(recipeInstance.ingredients[0].ingredient).to.be.an.instanceOf(Ingredient);
  });

  it('Should have Ingredient instance for all ingredients', () => {
    expect(recipeInstance.ingredients.length).to.equal(recipe.ingredients.length);
  });
  
  it('Should have Ingredient with correct ingredient data', () => {
    expect(recipeInstance.ingredients[0].ingredient.id).to.equal(recipe.ingredients[0].id);
  });

  it('Should have an instructions array', () => {
    expect(recipeInstance.instructions).to.deep.equal(recipe.instructions);
  });

  it('Should have a name', () => {
    expect(recipeInstance.name).to.equal(recipe.name);
  });

  it('Should have an array of tags', () => {
    expect(recipeInstance.tags).to.deep.equal(recipe.tags);
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
