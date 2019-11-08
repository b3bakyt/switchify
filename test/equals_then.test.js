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

  it('should match arrow functions by body', function () {
    const foo = () => 'hi';
    const bar = () => 'hi';
    const result = check(foo)
      .equals(bar)
      .then(val => 'function matched!')
      .else('not matched!');

    expect(result).equals('function matched!');
  });

  it('should match functions by body', function () {
    function foo (){ return 'hi'};
    function bar (){ return 'hi'};

    let result = check(foo)
      .equals(foo)
      .then(bar => 'function matched!')
      .else('not matched!');
    expect(result).equals('function matched!');

    result = check(foo)
      .equals(bar)
      .then(val => 'function matched!')
      .else('not matched!');
    expect(result).equals('not matched!');
  });

  it('should match class', function () {
    class ClassFoo {
      name = 'Ted';
      method = function() {
        return 'hi';
      }
    }
    class ClassBar {
      name = 'Ted';
      method = function() {
        return 'hi';
      }
    }

    let result = check(ClassFoo)
      .equals(ClassFoo)
      .then(val => 'function matched!')
      .else('not matched!');
    expect(result).equals('function matched!');

    result = check(ClassFoo)
      .equals(ClassBar)
      .then(val => 'function matched!')
      .else('not matched!');
    expect(result).equals('not matched!');
  });

  it('should match objects constructed by class', function () {
    class ClassFoo {
      name = 'Ted';
      method = function() {
        return 'hi';
      }
    }
    class ClassBar {
      name = 'Ted';
      method = function() {
        return 'hi';
      }
    }

    const foo = new ClassFoo();
    const bar = new ClassBar();

    let result = check(foo)
      .equals(foo)
      .then(val => 'function matched!')
      .else('not matched!');
    expect(result).equals('function matched!');

    result = check(foo)
      .equals(bar)
      .then(val => 'function matched!')
      .else('not matched!');
    expect(result).equals('not matched!');
  });

  it('should match array', function () {
    const result = check([33,44])
      .equals([33,44])
      .then(val => 'array matched!')
      .else('not matched!');
    expect(result).equals('array matched!');
  });

  it('should match array values by order', function () {
    const result = check([33,44])
      .equals([44, 33])
      .then(val => 'array matched!')
      .else('not matched!');
    expect(result).equals('not matched!');
  });

});
