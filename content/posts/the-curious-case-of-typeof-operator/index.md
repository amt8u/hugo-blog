---
title : The curious case of Javascript's typeof operator
url : the-curious-case-of-typeof-operator
summary : As we all know Javascript is weakly typed language and in general we don't consider the type beforehand and just var it. Variables in JavaScript
author: amt8u
date : 2020-04-26
draft : false
tags : ['javascript']
thumbnail: images/question-mark.jpg
images: ['images/question-mark.jpg']
---

As we all know Javascript is weakly typed language and in general we don't consider the type beforehand and just `var` it. Variables in JavaScript are not directly associated with any particular value type, and any variable can be assigned (and re-assigned) values of all types. This was okay till the scripts were small. But now a days scripts can be anywhere from 10 lines to 1000 lines of unwrapped, unformatted, minified code. 

When you are writing code at this scale you need a type system in place. As expected, frameworks did came up with their own type checking. 

* React checks with `PropTypes`
* Angular uses `typescript`

All these custom type checking mechanisms are build around some library's design but in vanilla Javascript we do have somethings around types. And its none other than the obnoxious `typeof` operator.

> The typeof operator returns a string indicating the type of the unevaluated operand.
	-MDN

``` js
typeof("number") // string
typeof "number" // string
typeof "" // string
typeof(45) // number
typeof 45 // number
typeof 45.8 // number
```

Below are the possible return values of typeof operator. For more details checkout [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) page

``` js
* Undefined	- "undefined"
* Null	    - "object" (see below)
* Boolean	- "boolean"
* Number	- "number"
* BigInt    - (new in ECMAScript 2020)	"bigint"
* String	- "string"
* Symbol    - (new in ECMAScript 2015)	"symbol"
* Function  - (implements [[Call]] in ECMA-262 terms)	"function"
* Object	- "object"
```

## Whats the fuss then?

If you are going to use **typeof** for any type check there are a few edge cases which you need to keep in mind. 

## isNaN
In javscript all numbers are just numbers with type "number". But when there is any expression which results in NaN. That is also a type of number.

``` js
var myNumber = 42 - "somestring";
console.log(myNumber) // NaN
console.log(typeof myNumber); // number
```

## null
If you see the list above you will see `typeof undefined` gives `undefined` while `typeof null` gives `object`. Shouldn't it give `null`. This has been a problem since the inception of Javascript.

Values in javascript are stored as a type tag and a value. Something like below
`0x22`. `null` is stored as null pointer `0x00` which means that the typetag for null is `0` and since the typetag for objects is also `0`, the `typeof` operator returns `object`.

This has been an error for long. There was even an attempt to fix this in previous versions of javascript but that fix didn't work out and would result in a lot of sites to not work, and thereby leaving with us no choice but to accept this behaviour.

## Function
Apart from the primitive values, in javascript world everything is an object. Even functions are first class objects. So that would mean that `typeof ()=>{}` would return object right? No. It returns `function`. 
For all callable objects, the `typeof` operator returns `function` which is still a good representation. But then we expect `typeof []` to return `array` coz that is how it should behave right?

## Array
Array is just a special kind of object like functions are. But arrays are still not so special to have a different type altogether for them. Think of arrays more like `regex`, `new Date`, `new Number`. These all are just objects having different prototypes. 

``` js
typeof [] // object
```
Then the question comes, how can we identify if a var is an array? Prior to ES5 there was no reliable way but there were a few tricks using the toString method. With ES5 we got a static function `Array.isArray()` which returns `true/false`. But do remember arrays are indeed objects. Specifically every array is just an extention of `Array.prototype` object.

###typeof or typeof()
Its always confusing for beginners when they try using this operator. Although `typeof` is an operator but people can confuse it to be a function. Partly because a lot of us use it like below

``` js
typeof 42 // number
typeof(42) // number
```

The brackets are only used to group the expressions. Always remember `typeof` is an unary operator. It will operate on one single value. It will come before the value and the brackets are only to group expressions after the operator so as to determine which value the operator should operate on.

``` js
var foo = 42;
var bar = "is a number";
console.log(typeof foo) // number
console.log(typeof bar) // string
console.log(typeof foo + bar) // numberis a number
console.log(typeof (foo + bar)) // string
```

## Error
Until ES5 typeof guranteed to return a string. But with ES6 after introduction of let/const, there is a new scenario that popped up with the **Temporal Dead Zone** for variables declared with `let/const`.

``` js
console.log(typeof badValue); // Uncaught ReferenceError: badValue is not defined
let badValue = 42; 
```

This is a very wierd behaviour and requires understanding of how hoisting works with block scoped variables. In the above example, 
* if you use `var` instead of `let` you will not get an error.
* if you use `let` before doing the typeof check, you will not get error.
* if you already have a variable named `badValue` in the outer scope, you will still get the error because in the current block's scope, let has already declared the value(hoisting) but is not yet ready to use.

I tried to write about all the edge cases with the typeof operator and how it should be used. I might have missed a few things, but for reference please do have a look at these pages. This should be the source of truth for all

## References
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
* https://tc39.es/ecma262/#sec-ecmascript-data-types-and-values