const check = require('../src');
const Chai  = require('chai');
const {
  expect,
} = Chai;

describe('else', function () {

  it('should return simple type value if no equal match found', function () {
    const result = check(10)
      .else(11);

    expect(result).equal(11);
  });

});
