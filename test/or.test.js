const check = require('../index');
const Chai  = require('chai');
const {
  expect,
} = Chai;

describe('.or expressions', function () {

  it('should run .then if either of two conditions are matched', function () {
    let result = check(10)
      .matches(10)
      .or
      .matches(100)
      .then(val => 'value matched!')
      .else('not matched!');
    expect(result).equals('value matched!');
  });

  it('should run .else if both conditions was not matched', function () {
    let result = check(10)
      .matches(11)
      .or
      .matches(100)
      .then(val => 'value matched!')
      .else('not matched!');
    expect(result).equals('not matched!');
  });

});
