
function isSimpleType(data) {
  return !data || ['number', 'string', 'boolean'].includes(typeof data);
}

function deepEqual( x, y ) {
  // if both x and y are simple type values
  if ( isSimpleType(x) )
    return [x].includes(y);

  // if they are not strictly equal, they both need to be Objects
  if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) )
    return false;

  // they must have the exact same prototype chain, the closest we can do is
  // test there constructor.
  if ( x.constructor !== y.constructor )
    return false;

  // Works in case when functions are created in constructor.
  // Comparing dates is a common scenario. Another built-ins?
  // We can even handle functions passed across iframes
  if ((typeof x === 'function' && typeof y === 'function') ||
    (x instanceof Date && y instanceof Date) ||
    (x instanceof RegExp && y instanceof RegExp) ||
    (x instanceof String && y instanceof String) ||
    (x instanceof Number && y instanceof Number)) {
    return x.toString() === y.toString();
  }

  for ( var p in x ) {
    // other properties were tested using x.constructor === y.constructor
    if ( ! x.hasOwnProperty( p ) ) continue;

    // allows to compare x[ p ] and y[ p ] when set to undefined
    if ( ! y.hasOwnProperty( p ) ) return false;

    // if they have the same strict value or identity then they are equal
    if ( x[ p ] === y[ p ] ) continue;

    // Numbers, Strings, Functions, Booleans must be strictly equal
    if ( typeof( x[ p ] ) !== "object" ) return false;

    // Objects and Arrays must be tested recursively
    if ( ! equals( x[ p ],  y[ p ] ) ) return false;
  }

  for ( p in y ) {
    if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
    // allows x[ p ] to be set to undefined
  }
  return true;
}

function getValue(data, val) {
  if (typeof data === 'function')
    return data(val);

  return data;
}

module.exports = {
  getValue,
  deepEqual,
  isSimpleType,
};
