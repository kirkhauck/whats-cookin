import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';

describe('Ingredient', () => {
  let sampleIngredients, ingredient;

  beforeEach(() => {
    console.log("cabbage")
    sampleIngredients = [
    {
      "id": 20081,
      "name": "wheat flour",
      "estimatedCostInCents": 142
    }];
    
    ingredient = new Ingredient(sampleIngredients[0]);
  });

  it('Should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });

  it('Should be an instance of Ingredient', () => {
    expect(ingredient).to.be.an.instanceOf(Ingredient);
  });

  it('Should have an id', () => {
    expect(ingredient.id).to.equal(20081);
  });

  it('Should have a name', () => {
    expect(ingredient.name).to.equal('wheat flour');
  });

  it('Should have a estimated cost', () => {
    expect(ingredient.ingredientCost).to.equal(142);
  });
});