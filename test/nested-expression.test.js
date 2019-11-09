const check = require('../src');
const Chai  = require('chai');
const {
  expect,
} = Chai;

describe('.after nested expressions', function () {

  it('.after .then should work if condition was matched', function () {
    let result = check('hi')
      .matches(val => val[0] === 'h')
        .after
          .matches(val => val.length === 2)
          .then(val => 'nested value matched!')
          .else('nested not matched!')
      .else('not matched!');

    expect(result).equals('nested value matched!');
  });

});
