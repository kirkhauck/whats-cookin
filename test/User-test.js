import User from "../src/classes/User";
import { expect } from "chai";
import usersSampleData from "../src/data/users-sample";

describe('User', () => {
  let user;

  beforeEach(() => {
    user = new User(usersSampleData[0]);
  });

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should be an instance of the user class', () => {
    expect(user).to.be.an.instanceOf(User);
  });

  it('Should have a name', () => {
    expect(user.name).to.equal("Saige O'Kon");
  });

  it('Should have an id', () => {
    expect(user.id).to.equal(1);
  });
});