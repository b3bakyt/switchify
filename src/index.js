
const STATES = {
  initial: 'initial',
  condition_set: 'condition_set',
  expression_set: 'expression_set',
  else_set: 'else_set',
};

function getValue(data, val) {
  if (typeof data === 'function')
    return data(val);

  return val;
}

function check(condition) {

  const exp = {
    matched: false,
    value: undefined,
    result: undefined,
  };

  function equals(val) {
    if (condition = val) {
      exp.matched = true;
      exp.value = val;
    }

    return states[STATES.condition_set];
  }
  function then(expression) {
    if (exp.matched)
      exp.result = expression(exp.value);

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
