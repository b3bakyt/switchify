const check = require('../index');
const Chai  = require('chai');
const {
  expect,
} = Chai;

describe('nested .and expressions', function () {

  it('should match both conditions', function () {
    let result = check('hello')
      .matches(val => val[0] === 'h')
      .and
      .matches(val => val.slice(-1) === 'o')
      .then(val => 'value matched!')
      .else('not matched!');
    expect(result).equals('value matched!');

    result = check('hello')
      .matches(val => val[0] === 'h')
      .and
      .matches(val => val.slice(-1) === 'l')
      .then(val => 'value matched!')
      .else('not matched!');
    expect(result).equals('not matched!');

    result = check('hello')
      .matches(val => val[0] === 'e')
      .and
      .matches(val => val.slice(-1) === 'o')
      .then(val => 'value matched!')
      .else('not matched!');
    expect(result).equals('not matched!');
  });

  it('should match .in conditions', function () {
    let result = check('hi')
      .matches(val => val[0] === 'h')
      .and
      .in(['hi', 'hello'])
      .then(val => 'value matched!')
      .else('not matched!');

    expect(result).equals('value matched!');
  });

});
