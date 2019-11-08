const { deepEqual } = require('./utils');

const STATES = {
  initial: 'initial',
  condition_set: 'condition_set',
  expression_set: 'expression_set',
  else_set: 'else_set',
};


function getValue(data, val) {
  if (typeof data === 'function')
    return data(val);

  return data;
}

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
  function then(data) {
    if (exp.matched)
      exp.result = getValue(data, condition);

    return states[STATES.expression_set];
  }
  function els(data) {
    if (!exp.matched)
      return getValue(data, condition);

    return exp.result;
  }

  const states = {
    [STATES.initial]: {
      equals: equals,
      else: els,
    },
    [STATES.condition_set]: {
      then,
    },
    [STATES.expression_set]: {
      equals,
      else: els,
    },
    [STATES.else_set]: undefined,
  };

  return states[STATES.initial];
}

module.exports = check;
