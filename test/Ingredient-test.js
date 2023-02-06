import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';

describe('Ingredient', () => {
  let sampleIngredients, ingredient;

  beforeEach(() => {
    sampleIngredients = [
      {
        "id": 20081,
        "name": "wheat flour",
        "estimatedCostInCents": 142
      },
      {
        "id": 18372,
        "name": "bicarbonate of soda",
        "estimatedCostInCents": 582
      },
      {
        "id": 1123,
        "name": "eggs",
        "estimatedCostInCents": 472
      }
    ];

    ingredient = new Ingredient();
  });

  it('Should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });

  it('Should be an instance of Ingredient', () => {
    expect(ingredient).to.be.an.instanceOf(Ingredient);
  });

  it('Should have an id', () => {
    expect(ingredient[0].id).to.be(20081);
  });

  it('Should have a name', () => {
    expect(ingredient[0].name).to.be('wheat flour');
  });

  it('Should have a estimated cost', () => {
    expect(ingredient[0].estimatedCostInCents).to.be(142);
  });
});