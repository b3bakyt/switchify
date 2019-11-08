const check = require('../src');
const Chai  = require('chai');
const {
  expect,
} = Chai;

describe('equals.then', function () {

  it('should return simple type value if equal match found', function () {
    const result = check(10)
      .equals(10)
      .then(11)
      .else(false);

    expect(result).equals(11);
  });

});
