const check = require('../index');
const Chai  = require('chai');
const {
  expect,
} = Chai;

describe('.also nested expressions', function () {

  it('.also .then should work if condition was matched', function () {
    let result = check('hi')
      .matches(val => val[0] === 'h')
        .also
          .matches(val => val.length === 2)
            .then(val => 'nested value matched!')
          .else('nested not matched!')
      .else('not matched!');

    expect(result).equals('nested value matched!');
  });

  it('.also .else should work if no condition was matched', function () {
    let result = check('hi')
      .matches(val => val[0] === 'h')
        .also
          .matches(val => val.length === 3)
            .then(val => 'nested value matched!')
          .else('nested not matched!')
      .else('not matched!');

    expect(result).equals('nested not matched!');
  });

  it('.else above .also should work if no condition was matched', function () {
    let result = check('hi')
      .matches(val => val[0] === 'x')
        .also
          .matches(val => val.length === 2)
            .then(val => 'nested value matched!')
          .else('nested not matched!')
      .else('not matched!');

    expect(result).equals('not matched!');
  });

  it('3 level condition .then should work if matched', function () {
    let result = check('hi')
      .matches(val => val[0] === 'h')
        .also
          .matches(val => val.length === 2)
            .also
              .matches(val => val[1] === 'i')
                .then(val => 'hi value matched!')
              .else('hi not matched!')
          .else('nested not matched!')
      .else('not matched!');

    expect(result).equals('hi value matched!');
  });

  it('3 level condition .else should work if not matched', function () {
    let result = check('hi')
      .matches(val => val[0] === 'h')
        .also
          .matches(val => val.length === 2)
            .also
              .matches(val => val[1] === 'x')
              .then(val => 'hi value matched!')
              .else('hi not matched!')
          .else('nested not matched!')
      .else('not matched!');

    expect(result).equals('hi not matched!');
  });

  it('2nd level condition .then should work if matched', function () {
    let result = check('hi')
      .matches(val => val[0] === 'h')
        .also
          .matches(val => val.length === 3)
            .also
              .matches(val => val[1] === 'i')
                .then(val => 'hi value matched!')
              .else('hi not matched!')
          .else('nested not matched!')
      .else('not matched!');

    expect(result).equals('nested not matched!');
  });

});
