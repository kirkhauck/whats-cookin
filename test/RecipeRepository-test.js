import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';

describe('RecipeRepository', () => {
  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });
})