import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import RecipeRepository from '../src/classes/RecipeRepository';

describe.only('RecipeRepository', () => {
  let sampleRecipes, recipeRepository;

  beforeEach('instantiate RecipeRepository', () => {

    sampleRecipes = [ 
      new Recipe({
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
        }
      ],
      "instructions": [
        {
          "instruction": "Whisk together",
          "number": 1
        },
        {
          "instruction": "Add egg and vanilla",
          "number": 2
        },
        {
          "instruction": "Add dry ingredients",
          "number": 3
        }
      ],
      "name": "Loaded Chocolate Chip Pudding Cookie Cups",
      "tags": [
        "antipasti",
        "starter",
        "snack",
      ]
    }),
    new Recipe ({
      "id": 721146,
      "image": "https://spoonacular.com/recipeImages/721146-556x370.jpg",
      "ingredients": [
        {
          "id": 12061,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 19334,
          "quantity": {
            "amount": 6,
            "unit": "tablespoons"
          }
        },
        {
          "id": 12104,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Preheat",
          "number": 1
        },
        {
          "instruction": "Combine",
          "number": 2
        },
        {
          "instruction": "Pour the chocolate",
          "number": 3
        }
      ],
      "name": "Creamy Coconut Yogurt Bowl with Chocolate Granola (Video)",
      "tags": [
        "side dish",
        "yummy",
        "mystery"
      ]
    })];

    recipeRepository = new RecipeRepository(sampleRecipes);
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('Should be an instance of RecipeRepository', () => {
    expect(recipeRepository).to.be.an.instanceOf(RecipeRepository);
  });

  // Will need to test once Recipe.js is finished
  it.skip('Should have a list of recipes', () => {
    expect(recipeRepository.recipes).to.deep.equal(sampleRecipes);
  });

  it('should return a filtered list based on tag', () => {
    const snackRecipes = recipeRepository.filterByTag('snack');
    
    expect(snackRecipes).to.deep.equal([sampleRecipes[0]]);
  });

});