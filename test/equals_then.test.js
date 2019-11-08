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

  it('should return object value if equal match found', function () {
    const result = check(10)
      .equals(10)
      .then({foo: '11'})
      .else(false);

    expect(result.foo).equals('11');
  });

  it('should return callback function value if equal match found', function () {
    const result = check(10)
      .equals(10)
      .then(val => ({foo: 'Foo '+ val}))
      .else(false);

    expect(result.foo).equals('Foo 10');
  });

  it('should match null', function () {
    const result = check(null)
      .equals(null)
      .then(val => 'null matched!')
      .else('not matched!');

    expect(result).equals('null matched!');
  });

  it('should match NaN', function () {
    const result = check(NaN)
      .equals(NaN)
      .then(val => 'NaN matched!')
      .else('not matched!');

    expect(result).equals('NaN matched!');
  });

  it('should match object', function () {
    const result = check({foo: 'hi'})
      .equals({foo: 'hi'})
      .then(val => 'Object matched!')
      .else('not matched!');

    expect(result).equals('Object matched!');
  });

  it('should match function', function () {
    const foo = () => 'hi';
    const result = check(foo)
      .equals(foo)
      .then(val => 'function matched!')
      .else('not matched!');

    expect(result).equals('function matched!');
  });

});
