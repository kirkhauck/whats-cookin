import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';

describe('Ingredient', () => {
  it('Should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });
})