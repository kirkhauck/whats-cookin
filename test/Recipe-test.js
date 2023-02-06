import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';

describe('Recipe', () => {
  it('Should be a function', () => {
    expect(Recipe).to.be.a('function');
  });
})