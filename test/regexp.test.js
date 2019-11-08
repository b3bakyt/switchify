const check = require('../src');
const Chai  = require('chai');
const {
  expect,
} = Chai;

describe('matches', function () {

  it('should match literal matches', function () {
    const result = check('usd')
      .matches(/^[\w]{3}$/)
      .then(val => 'matches matched!')
      .else('not matched!');

    expect(result).equals('matches matched!');
  });

  it('should run else if not matched literal matches', function () {
    const result = check('us')
      .matches(/^[\w]{3}$/)
      .then(val => 'matches matched!')
      .else('not matched!');
    expect(result).equals('not matched!');
  });

  it('should match matches object', function () {
    const result = check('usd')
      .matches(new RegExp('^[\\w]{3}$'))
      .then(val => 'matches matched!')
      .else('not matched!');
    expect(result).equals('matches matched!');
  });

});
