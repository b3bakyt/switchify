const check = require('../index');
const Chai  = require('chai');
const {
  expect,
} = Chai;

describe('in', function () {

  it('should match value in array', function () {
    const result = check(10)
      .in([3, 10, 5])
      .then(val => 'value matched!')
      .else('not matched!');
    expect(result).equals('value matched!');
  });

});
