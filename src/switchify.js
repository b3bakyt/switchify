const { deepEqual, getValue } = require('./utils');

const STATE = {
  initial: 'initial',
  after: 'after',
  condition_set: 'condition_set',
  else_set: 'else_set',
};

const matches = exp => val => {
  if (exp.pass)
    return APP_STATE[STATE.condition_set](exp);

  if (val instanceof RegExp && !(exp.checkValue instanceof RegExp)) {
    exp.matched = val.test(exp.checkValue);
    return APP_STATE[STATE.condition_set](exp);
  }

  if (typeof val === 'function' && typeof exp.checkValue !== 'function') {
    exp.matched = val(exp.checkValue);
    return APP_STATE[STATE.condition_set](exp);
  }

  if (deepEqual(exp.checkValue, val))
    exp.matched = true;

  return APP_STATE[STATE.condition_set](exp);
};

const _in = exp => data => {
  if (exp.pass)
    return APP_STATE[STATE.condition_set](exp);

  if (!Array.isArray(data))
    throw new Error('"in" operator argument must be an array.');

  if (data.includes(exp.checkValue))
    exp.matched = true;

  return APP_STATE[STATE.condition_set](exp);
};

const then = exp => data => {
  if (exp.pass)
    return APP_STATE[STATE.initial](exp);

  if (exp.matched)
    exp.result = getValue(data, exp.checkValue);

  return APP_STATE[STATE.initial](exp);
};

const _else = exp => data => {
  const result = exp.matched ? exp.result : getValue(data, exp.checkValue);

  if (exp.parentExp) {
    exp.parentExp.result = result;
    return APP_STATE[STATE.else_set](exp.parentExp);
  }

  return result;
};


const and = exp => ({
  matches: val => {
    const prevMatched = exp.matched;
    const nextState = matches(exp)(val);
    exp.matched = prevMatched && exp.matched;

    return nextState;
  },
  in: val => {
    const prevMatched = exp.matched;
    const nextState = _in(exp)(val);
    exp.matched = prevMatched && exp.matched;

    return nextState;
  },
});

const or = exp => ({
  matches: val => {
    const prevMatched = exp.matched;
    const nextState = matches(exp)(val);
    exp.matched = prevMatched || exp.matched;

    return nextState;
  },
  in: val => {
    const prevMatched = exp.matched;
    const nextState = _in(exp)(val);
    exp.matched = prevMatched || exp.matched;

    return nextState;
  },
});

const after = parentExp => {
  const exp = {
    parentExp: parentExp,
    pass: !parentExp.matched,
    matched: false,
    result: undefined,
    checkValue: parentExp.checkValue,
  };

  return APP_STATE[STATE.initial](exp);
};

const APP_STATE = {
  [STATE.initial]: exp => ({
    matches: matches(exp),
    in: _in(exp),
    else: _else(exp),
  }),
  [STATE.condition_set]: exp => ({
    or: or(exp),
    and: and(exp),
    then: then(exp),
    after: after(exp),
  }),
  [STATE.else_set]: exp => ({
    else: _else(exp),
  }),
};


function check(checkValue) {
  const expression = {
    parentExp: undefined,
    initialState: STATE.initial,
    pass: false,
    matched: false,
    result: undefined,
    checkValue,
  };

  return APP_STATE[STATE.initial](expression);
}

module.exports = check;
