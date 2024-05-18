---
title : Playing with arrow functions
url : playing-with-arrow-functions
summary : Arrow functions added in ES6 provide a good replacement for function expressions. But do you understand them completely? This is a small test to check it out.
author: amt8u
date : 2020-11-09
draft : false
tags : ['javascript', 'ES6']
---

## Quiz
Before starting with the post, take a [quick test](https://cybr.cafe/arrow-functions/index.html) to check your understanding about arrow functions.

## Arrow functions
Arrow functions came to Javascript with ES6. Also known as fat arrow functions, their primary aim is to replace function expressions with lexical `this`. A [chapter](https://exploringjs.com/es6/ch_arrow-functions.html) from Axel's exploringjs book is an excellent resource for more info on arrow functions.


## Caution
Some of the snippets are truly edge cases and we may not encounter them in real life. While having deep understanding of any syntax is always appreciated but you should refrain yourself from asking these type of questions in interviews. In terms of actual development, it would be better to avoid most of the scenarios using linter rules to prevent confusion rather than relying on the developer's conscience. 

## Points to note before dealing with them
* Most of the snippets are using IIFE construct. It helps in running the code directly by copying and pasting without interfering with the scope. Also it benefits in running individual snippets independently. Otherwise you might end up adding variables to the scope running some examples one after another.

* All the snippets have been tested on chrome **Version 86.0.4240.183 (Official Build) (x86_64)**. Depending on the browser and its version the results may vary. Please be cautious.

* All explanations are my own understanding. I maybe wrong somewhere. Please feel free to correct if you find the explanation misleading.

* All snippets have the code in question first in the block and then the output below it. Explanation come later on.

* All snippets were tested without 'use strict' modifier. With it enabled, the results might change.

## Here we go!


<hr>

```js
(_ => _)(99)
```
<br>

`99`

Underscore is a valid identifier. In this case the function is just accepting an argument as `_` and returning it as it is.


<hr>

```js
((x=>{})(),(x=>x=>x)())(()=>true)(false)
```
<br>

`true`

The obscurity is because of the formatting and multiple IIFEs. If you prettify the code, you can understand the expressions. There are a lot of things going here. There are 4 IIFEs in this particular statement. `(x=>{})()` and `(x=>x=>x)()` are two comma separated expressions which form the inner IIFEs. 

The second expression just returns a function which itself on execution will return whatever is sent to it as argument. Then there is an outer IIFE which calls the function returned by the inner IIFEs. 

`()=>true` is the parameter passed to the outer IIFE. So it becomes `(x=>x)(()=>true)(false)`. Now the function `()=>true` is just another arrow function which will always return true irrespective of the argument. So even if we are passing `false` as parameter to it, it will return `true`.

<hr>

```js
var undefined = undefined => undefined;
```
<br>

`undefined`

This is a very interesting snippet. At the first look, you might feel that this will result into syntax error. But behold! There is nothing wrong here with respect to syntax. `undefined` is still a valid identifier in Javascript even though it is a special keyword. 

This seems a bit strange and it is indeed. In previous versions of Javascript, it was even possible to overwrite the global `window.undefined` property breaking all your code. But now `window.undefined` is a read-only property and if you run the above code, your code will fail silently. 

But if you use this statement inside a function, you will be able to create a new variable with `undefined` identifier which will act as a regular value. And also the arrow function will accept the argument as `undeefined` which will shadow the `undefined` variable declared in outer scope and will return the value as it is. So the above code can also be represented as `var x = x => x;`

A related article available [here](https://cybercafe.dev/javascript-void-0/)

<hr>

```js
null => null
```

<br/>

`"Uncaught SyntaxError: Malformed arrow function parameter list"`

At least `null` is a reserved word! In this case the issue is that the formal parameter cannot be named *null*. Though you can use `null` as the return value perfectly.

<hr/>

```js
null, undefined => null
```

<br/>

`undefined => null`

The comma separates two expressions here. First expression is nothing but just returns null, while the second one is an arrow function accepting a value in a variable `undefined` but doing nothing with it. Just returning `null` always, just like me in chemistry tests:-P. Do note that we are not calling the returned function though. So as output you will see the function definition and not `null` value.

<hr/>

```js
(({})({}))
```

<br/>

`Uncaught TypeError: {} is not a function`

If you just type in `{}`, you will create an empty object. If you use parenthesis `({})`, you still would create an empty object. These are just expressions using object literal way to create objects. But the second set of parenthesis makes the expression a function call - `({}) ()`. Since the first expression is just returing an object, you cannot call it. Thereby giving you the relevant error.

<hr />

```js
(() => {x:1})()
```
<br />

`undefined`

This is one of the difficult ones. At the first glance, it looks like a simple arrow function which will return an object `{x:1}`. But instead, if you run this, you will see that it returns `undefined`. There are two ways to create arrow functions - 

Without braces - expressions
`x => x` or `x => (x)`

With braces - statements
`x => { return x; }`

The braces create a block while the former way implicitly returns the value of the single expression. In our case, we are using the braces, which is creating a block and not an object. Now the second thing is the `x:1` part. Though I have never used it, this syntax creates [labels](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label) in javascript. And thus doing nothing but returning `undefined`.

<hr>

```js
(() => ({x:1}))()
```

<br>

`{x:1}`

Now that we know how labels affect the code. Another similar question. But in this one you will get the object as the return value. **Why?** Because we have added the surrounding parenthesis which in turn made the `{x:1}` part an expression and not a statement. The expression is nothing but an object. And thus in this case, you will get the object as the return value.

<hr>

```js
(() => arguments)(99)
```

<br>

`Uncaught ReferenceError: arguments is not defined`

`arguments` object used to be a popular candidate for dealing with all parameters. It was available for all functions whether you defined formal parameters or not. 

We used to work directly with actual values at runtime. Of course, there were side effects like converting the object first into array to perform array based operations etc. 

But with arrow functions this  power is no longer available. Instead we have the new super power called the **rest operator**.

But do remember the arrow functions still follow the lexical scope. So if there is an outer scope where arguments is present, the code will work. `(function() { return (()=>arguments)(); })(99)` will return the arguments object.


<hr>

```js
((x,y,z) => (1,2,3))(4,5,6)
```

<br>

`3`

In this construct there are 3 parameters namely `x`, `y` and `z` which are taking values as `4`, `5` and `6` respectively. But the return value is a set of expressions. The expressions are evaluated left to right and the last expression value is returned. This is regular javascript behavior and nothing special about the arrow functions.

<hr>

```js
() => () => () => {}
```

<br>

`() => () => () => {}`

This is an example of nested functions. The outermost function is just returning another arrow function which is again returning an arrow function which finally is retuning undefined with empty block. Since we are not executing the functions, we shall get the whole function body as output in the console.

<hr>

```js
() => {} == () => {}
```

<br>

`Uncaught SyntaxError: Unexpected token '=='`

Arrow functions by themselves are not expressions. You need to be careful while defining them. Braces and parenthesis make a lot of other construct in javascript. To create arrow functions in this case, you need to group the expressions like `(() => {}) == (() => {})` which of course would result in `false`.

<hr>

```js
(() => { return this;})()
```

<br>

`window`

`this` is not easy to digest. There are multiple [chapters](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch1.md) on it. Arrow functions have lexical scoping. In other words, their scope is same as the outer function. So whatever is available to outer function, the arrow function can read and write those values.

<hr>

```js
() => ()
```

<br>

`Uncaught SyntaxError: Unexpected token ')'`

This ends in error because the expression in the return value is empty. Just add something in the expression and you are good to go.
* `() => ({})`
* `() => ('')`
* `() => (0)`
* `() => (this)`
* `() => (undeclaredVariable)` // function will get defined but will run into error while executing

<hr>

```js
(() => {return})()
```

<br>

`undefined`

As always it feels as if its a syntax error, but being a liberal language, its **not**. If you just put `return` without a value in front, js automatically inserts semicolon and returns `undefined`. Something simliar to void functions which do not return a value. This is another regular js behavior and is applicable to regular functions too.

<hr>

```js
x => false()
```

<br>

`x => false()`

If you are thinking that we are calling false as a function. You are right! But the trick is that the call will not execute until we call the arrow function itself. Right now we are just defining the function. Being a valid expression, the function gets defined. Though it will run into error when called.

<hr>

```js
(() => [()=>(1)])()[0]()
```

<br>

`1`

Reformatting the statement will probably help. `() => [()=>(1)])` creates an arrow function which returns an array with 1 element and that element is itself another arrow function `()=>(1)` which just returns `1` on execution.

What we are essentially doing is evaluating the function which gives the array and then we are accessing the `0th` element which is also a function and then calling it to finally get the output as `1`.

<hr>

```js
(let => let)("Really?")
```

<br>

`"Really?"`

I am not quite sure why this works. Why is `let` not a reserved word? Will update this post once I get to understand this.

<hr>

```js
(const => const)("Really again?")
```

<br>

`Uncaught SyntaxError: Unexpected token 'const'`

Well, since it works with `let`, the guess would be, it should work with `const` too. But I am afraid, `const` is an invalid indentifier.

<hr>

```js
var y = (var) => {var}
```

<br>

`Uncaught SyntaxError: Unexpected token 'var'`

And true for `var` too. As expected `var` is not a valid identifier.

<hr>

```js
`${() => 3}`
```

<br>

`"() => 3"`

The template literal has one expression `() => 3`. This expression is nothing but a body of an arrow function. While evaluating the string literal, all values are converted to string. Functions also have a `toString()` prototype method attached to them which returns the function body in string format. That's why this result.

<hr>

```js
(() => Function()())()
```

<br>

`undefined`

As we know arrow functions return expression evaluation when there is only one statement. Here that expression is `Function()()`. `Function()` creates an anonymous empty function which then gets evaluated to return `undefined`. 

<hr>

```js
typeof ()=>{}
```

<br>

`Uncaught SyntaxError: Malformed arrow function parameter list`

While this does not work with arrow functions, it works for our regular function expressions. So `typeof function(){}` and `typeof function wannaDoSomething(){}` return `function`.

More info on this [here](https://exploringjs.com/es6/ch_arrow-functions.html#sec_syntactic-pitfalls-arrow-functions)

<hr>

## Conclusion
Though we use generic constructs in our day to day life, its always helpful to understand the syntax in detail. It gives an insight to what is actually happening and you will be in a better position while troubleshooting some edge case issues.

While adding more and more features to the language but still keep the existing constructs valid is really a daunting task. Most of the issues are because of the same as per my understanding.

> End

