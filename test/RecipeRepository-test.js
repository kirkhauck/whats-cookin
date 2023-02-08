import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';
import recipeSampleData from '../src/data/recipes-sample';
import ingredientsSampleData from '../src/data/ingredients';

describe('RecipeRepository', () => {
  let sampleRecipes, recipeRepository;
  beforeEach('instantiate RecipeRepository', () => {
    sampleRecipes = recipeSampleData;
    recipeRepository = new RecipeRepository(sampleRecipes, ingredientsSampleData);
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('Should be an instance of RecipeRepository', () => {
    expect(recipeRepository).to.be.an.instanceOf(RecipeRepository);
  });

  it('Should have a list of recipes', () => {
    const recipe = new Recipe(sampleRecipes[0], ingredientsSampleData)
    expect(recipeRepository.recipes[0]).to.deep.equal(recipe);
  });

  it('should return a filtered list based on tag', () => {
    const snackRecipes = recipeRepository.filterByTag('snack');
    expect(snackRecipes[0].tags).to.deep.equal(recipeRepository.recipes[0].tags);
  });

  it('should return a filtered list based on name', () => {
    const snackRecipes = recipeRepository.filterByName('Loaded Chocolate Chip Pudding Cookie Cups');
    expect(snackRecipes[0].name).to.deep.equal(recipeRepository.recipes[0].name);
  });

  it('should return a filtered list based on non-matching name', () => {
    const snackRecipes = recipeRepository.filterByName('bad cookies string');
    expect(snackRecipes).to.deep.equal([]);
  });
});
