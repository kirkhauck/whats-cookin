import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';

describe('Ingredient', () => {
  let sampleIngredients, ingredient;

  beforeEach(() => {
    console.log("cabbage")
    sampleIngredients =
      {
        "id": 20081,
        "name": "wheat flour",
        "estimatedCostInCents": 142
      }
    
    ingredient = new Ingredient();
  });

  it('Should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });

  it('Should be an instance of Ingredient', () => {
    // const sampleIngredients =
    // {
    //   "id": 20081,
    //   "name": "wheat flour",
    //   "estimatedCostInCents": 142
    // }
  
    // const ingredient = new Ingredient(sampleIngredients);

    expect(ingredient).to.be.an.instanceOf(Ingredient);
  });

  it('Should have an id', () => {
    // const sampleIngredients =
    // {
    //   "id": 20081,
    //   "name": "wheat flour",
    //   "estimatedCostInCents": 142
    // }
  
    // const ingredient = new Ingredient(sampleIngredients);

    expect(ingredient.id).to.equal(20081);
  });

  it('Should have a name', () => {
    // const sampleIngredients =
    // {
    //   "id": 20081,
    //   "name": "wheat flour",
    //   "estimatedCostInCents": 142
    // }
  
    // const ingredient = new Ingredient(sampleIngredients);

    expect(ingredient.name).to.equal('wheat flour');
  });

  it('Should have a estimated cost', () => {
    // const sampleIngredients =
    // {
    //   "id": 20081,
    //   "name": "wheat flour",
    //   "estimatedCostInCents": 142
    // }
  
    // const ingredient = new Ingredient(sampleIngredients);

    expect(ingredient.ingredientCost).to.equal(142);
  });
});