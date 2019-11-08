const check = require('../src');
const Chai  = require('chai');
const {
  expect,
} = Chai;

describe('regexp', function () {

  it('should match literal regexp', function () {
    const result = check('usd')
      .regexp(/^[\w]{3}$/)
      .then(val => 'regexp matched!')
      .else('not matched!');
    expect(result).equals('regexp matched!');
  });

});
