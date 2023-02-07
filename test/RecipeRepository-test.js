import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import RecipeRepository from '../src/classes/RecipeRepository';

describe.only('RecipeRepository', () => {
  let sampleRecipes, recipeRepository;

  beforeEach('instantiate RecipeRepository', () => {
    sampleRecipes = [{
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
    },
    {
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
        },
        {
          "id": 12115,
          "quantity": {
            "amount": 1,
            "unit": ""
          }
        },
        {
          "id": 4047,
          "quantity": {
            "amount": 6,
            "unit": "tablespoons"
          }
        },
        {
          "id": 10019071,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 8212,
          "quantity": {
            "amount": 1,
            "unit": "Handful"
          }
        },
        {
          "id": 19911,
          "quantity": {
            "amount": 5,
            "unit": "tablespoons"
          }
        },
        {
          "id": 8121,
          "quantity": {
            "amount": 3,
            "unit": "cups"
          }
        },
        {
          "id": 12142,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        },
        {
          "id": 2047,
          "quantity": {
            "amount": 0.25,
            "unit": "teaspoon"
          }
        },
        {
          "id": 2050,
          "quantity": {
            "amount": 1,
            "unit": "teaspoon"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Preheat the oven to 325 degrees F.Coarsely chop the almonds and pecans.",
          "number": 1
        },
        {
          "instruction": "Combine the oats, almonds, pecans, and salt in a bowl. Toss to combine.In a medium-sized bowl, combine the coconut oil (measure exactly when it's melted and not in the hardened state), and 1/2 cup chocolate chips.Microwave in bursts of 15 seconds stirring in between each burst for 15 seconds until completely melted.Stir in the brown sugar (measured lightly packed), honey or maple syrup, and vanilla extract.",
          "number": 2
        },
        {
          "instruction": "Pour the chocolate wet mixture into the oat and nut mixture and stir until well combined.",
          "number": 3
        },
        {
          "instruction": "Spread the granola evenly onto a parchment lined baking sheet.",
          "number": 4
        },
        {
          "instruction": "Bake for 20-30 minutes (depending on the heat of your oven) making sure to flip and stir the granola around every 6-8 minutes.",
          "number": 5
        },
        {
          "instruction": "Remove and allow the granola to harden and set up. (It may be soft and not very \"granola-like\", but it hardens as it dries out so be careful to not over-cook it). Mine generally takes about 21 minutes to be fully baked.Allow the granola to sit at room temperature for a few hours to harden and set up.Once the granola is hardened, stir in the remaining 1/2 cup chocolate chips and the toasted flaked coconut.To make a yogurt bowl: fill a bowl with the coconut cream yogurt, add a swirl of nut butter, add some fruit such as a banana, add the granola, and finish with chia seeds. Enjoy immediately.",
          "number": 6
        }
      ],
      "name": "Creamy Coconut Yogurt Bowl with Chocolate Granola (Video)",
      "tags": [
        "side dish"
      ]
    }];

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
    const snackRecipes = recipeRepository.filterByTag('snack')
    // console.log('snackRecipes ', snackRecipes);
    // console.log('sampleRecipes ', sampleRecipes);
  });

});