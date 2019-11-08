const { deepEqual, getValue } = require('./utils');

const STATES = {
  initial: 'initial',
  condition_set: 'condition_set',
  expression_set: 'expression_set',
  else_set: 'else_set',
};


function check(condition) {

  const exp = {
    matched: false,
    result: undefined,
  };

  function equals(val) {
    if (deepEqual(condition, val))
      exp.matched = true;

    return states[STATES.condition_set];
  }
  function _in(val) {
    if (!Array.isArray(val))
      throw new Error('"in" operator argument must be an array.');

    if (val.includes(condition))
      exp.matched = true;

    return states[STATES.condition_set];
  }
  function then(data) {
    if (exp.matched)
      exp.result = getValue(data, condition);

    return states[STATES.expression_set];
  }
  function _else(data) {
    if (!exp.matched)
      return getValue(data, condition);

    return exp.result;
  }

  const states = {
    [STATES.initial]: {
      equals: equals,
      in: _in,
      else: _else,
    },
    [STATES.condition_set]: {
      then,
    },
    [STATES.expression_set]: {
      equals,
      in: _in,
      else: _else,
    },
    [STATES.else_set]: undefined,
  };

  return states[STATES.initial];
}

module.exports = check;
