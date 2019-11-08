const check = require('../src');
const Chai  = require('chai');
const {
  expect,
} = Chai;

describe('matches.then', function () {

  it('should match null', function () {
    const result = check(null)
      .matches(null)
      .then(val => 'null matched!')
      .else('not matched!');

    expect(result).equals('null matched!');
  });

  it('should match NaN', function () {
    const result = check(NaN)
      .matches(NaN)
      .then(val => 'NaN matched!')
      .else('not matched!');

    expect(result).equals('NaN matched!');
  });

  it('should match object', function () {
    const result = check({foo: 'hi'})
      .matches({foo: 'hi'})
      .then(val => 'Object matched!')
      .else('not matched!');

    expect(result).equals('Object matched!');
  });

  it('should match callback result', function () {
    const result = check({foo: 'hi'})
      .matches(() => ({foo: 'hi'}))
      .then(val => 'callback result matched!')
      .else('not matched!');

    expect(result).equals('callback result matched!');
  });

  it('should match arrow functions by body', function () {
    const foo = () => 'hi';
    const bar = () => 'hi';
    const result = check(foo)
      .matches(bar)
      .then(val => 'function matched!')
      .else('not matched!');

    expect(result).equals('function matched!');
  });

  it('should match functions by body', function () {
    function foo (){ return 'hi'};
    function bar (){ return 'hi'};

    let result = check(foo)
      .matches(foo)
      .then(bar => 'function matched!')
      .else('not matched!');
    expect(result).equals('function matched!');

    result = check(foo)
      .matches(bar)
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
      .matches(ClassFoo)
      .then(val => 'function matched!')
      .else('not matched!');
    expect(result).equals('function matched!');

    result = check(ClassFoo)
      .matches(ClassBar)
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
      .matches(foo)
      .then(val => 'function matched!')
      .else('not matched!');
    expect(result).equals('function matched!');

    result = check(foo)
      .matches(bar)
      .then(val => 'function matched!')
      .else('not matched!');
    expect(result).equals('not matched!');
  });

  it('should match array', function () {
    const result = check([33,44])
      .matches([33,44])
      .then(val => 'array matched!')
      .else('not matched!');
    expect(result).equals('array matched!');
  });

  it('should match array values by order', function () {
    const result = check([33,44])
      .matches([44, 33])
      .then(val => 'array matched!')
      .else('not matched!');
    expect(result).equals('not matched!');
  });

  it('should match RegExp objects', function () {
    const result = check(new RegExp('[\w]{2}'))
      .matches(/[w]{2}/)
      .then(val => 'RegExp matched!')
      .else('not matched!');

    expect(result).equals('RegExp matched!');
  });

});
