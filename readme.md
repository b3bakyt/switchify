# Switchify

Simple and powerful functional alternative for JavaScript switch and if ternary operator expressions.


## Installation

```
npm i -S switchify
```

### Usage

```
const result = check(10)
      .matches(10)
      .then(val => '10 matched!')
      .else('not matched!');
// result: '10 matched!'
```
First let's call check() to set an expression to match  
```
check(10)
```
After use one of matching functions:

- matches
- in
- else

#### matches

matches function accepts:
- number
- string
- boolean
- null
- NaN
- Object
- Array
- Class
- RegExp
- Date
- function

If function was passed it will be evaluated if expression is not a function also, 
in this case a stringified values will be compared.
```
const result = check({foo: 'hi'})
      .matches(() => ({foo: 'hi'}))
      .then(val => 'callback result matched!')
      .else('not matched!');      
// result: 'callback result matched!'

const foo = () => 'hi';
const bar = () => 'hi';
const result = check(foo)
  .matches(bar)
  .then(val => 'functions matched!')
  .else('not matched!');
// result: 'functions matched!'
```

If RegExp was passed it will test it against matching expression if it's not a RegExp also, 
in this case a stringified values will be compared. 
```
const result = check('usd')
      .matches(/^[\w]{3}$/)
      .then(val => 'usd matched!')
      .else('not matched!');
// result: 'usd matched!'

const result = check(new RegExp('[\w]{2}'))
      .matches(/[w]{2}/)
      .then(val => 'RegExp matched!')
      .else('not matched!');
// result: 'RegExp matched!'
```

If object or array was passed it will do deep comparison:
```
const result = check({foo: 'hi'}])
      .matches({foo: 'hi'})
      .then(val => 'object matched!')
      .else('not matched!');
// result: 'object matched!'

const result = check([33,44])
      .matches([33,44])
      .then(val => 'array matched!')
      .else('not matched!');
// result: 'array matched!'
```
#### in
Checks if expression is included in passed array
```
const result = check(10)
      .in([3, 10, 5])
      .then(val => '10 in [3, 10, 5]!')
      .else('not matched!');
// result: '10 in [3, 10, 5]!'
      
```
#### else
to finish you need to call a mandatory function else()
