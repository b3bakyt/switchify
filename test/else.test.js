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

  it('should return object value if no equal match found', function () {
    const result = check(10)
      .else({foo: 11});

    expect(result.foo).equal(11);
  });

  it('should return callback function value if no equal match found', function () {
    const result = check(10)
      .else(val => 'Number '+ val);

    expect(result).equal('Number 10');
  });

});
