const { deepEqual, getValue } = require('./utils');

const STATES = {
  initial: 'initial',
  condition_set: 'condition_set',
  else_set: 'else_set',
};


function check(checkValue) {

  const exp = {
    matched: false,
    result: undefined,
  };

  function matches(val) {
    if (val instanceof RegExp && !(checkValue instanceof RegExp)) {
      exp.matched = val.test(checkValue);
      return states[STATES.condition_set];
    }

    if (typeof val === 'function' && typeof checkValue !== 'function') {
      exp.matched = val(checkValue);
      return states[STATES.condition_set];
    }

    if (deepEqual(checkValue, val))
      exp.matched = true;

    return states[STATES.condition_set];
  }
  function _in(val) {
    if (!Array.isArray(val))
      throw new Error('"in" operator argument must be an array.');

    if (val.includes(checkValue))
      exp.matched = true;

    return states[STATES.condition_set];
  }
  function then(data) {
    if (exp.matched)
      exp.result = getValue(data, checkValue);

    return states[STATES.initial];
  }
  function _else(data) {
    if (!exp.matched)
      return getValue(data, checkValue);

    return exp.result;
  }

  const states = {
    [STATES.initial]: {
      matches,
      in: _in,
      else: _else,
    },
    [STATES.condition_set]: {
      then,
    },
    [STATES.else_set]: undefined,
  };

  return states[STATES.initial];
}

module.exports = check;
