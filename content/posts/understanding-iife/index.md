---
title : Understanding IIFE - Immediately Invoked Function Expression
url : immediately-invoked-function-expression
description : IIFE is an advanced design pattern used in Javascript. Because of the quirky syntax and how functions work in javascript, its a little difficult to understand concept.
date : 2020-08-03
draft : false
tags : ['javascript']
---

![Feature Image](https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2000&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ)

An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined.

> MDN

If we take the above definition into account then what about the below scenario? We are running a function as soon as it is defined. There is no statement between the definition and the call. Does that make an IIFE? 

```js
function printGreeting(x){
	console.log("Hello " + x);
}
printGreeting("Baby"); // prints Hello Baby
```

The first `I` in *IIFE* stands for `immediately` but it does not signifies that immediately running a function makes the function an IIFE. I am also intrigued by the use case everybody uses in their tutorials - _If you want to write a function and call it immediately_. Did you ever come across such a scenario? Functions are there for a purpose. They give you the power of **reusability**. If you write a function that means you want to re-use it.

In this article I shall try to explain the practical use case of IIFEs and where they fit in our day to day development. I have read almost all the articles which appear on the first page of google on searching for `IIFE`. I have watched many videos on youtube explaining IIFE. And it turns out that each of them fails to explain the idea behind IIFE and its use case. 

IIFEs are hard to grasp because it requires a deep understanding of other Javascript concepts. You need to know below items before you can start appreciating IIFEs.
* How closures work
* How globals work in Javascript
* Function declaration vs Function expression
* Function scope and nesting scopes
* Hoisting
* Operator precedence and grouping - Very important!
* How expressions work in Javascript
* Idea of how code is parsed by the compiler
* Javascript's non-modular architecture(Prior to ES6 Modules)

Almost everyone focuses on the scope created by the IIFE. Though in reality its about the parent scope. We shall learn every bit in a minute. Web is filled with contrived examples like below which work but miss the point of having an IIFE.

```js
// Logs '10' ten times because of closure
for(var i=0;i<10;i++) {
    // Creates a timeout for each iteration with a new function 
    // but all the new functions have closure on 'i'
    setTimeout(function() {
        // all functions refer to the same value of 'i' after 1 second of timeout
        console.log(i);
	}, 1000)

}
```

A common way to solve the above problem is to add an IIFE to the code.

```js
// Logs numbers from 0 to 10
for(var i=0;i<10;i++) {
    // IIFE creates new function for each iteration
	(function (x) {
        // x now keeps a local copy of i for each iteration
        // remember that if you use 'i' here, you will still have the same problem
        // as the function will have closure on parent scope
    	setTimeout(function(){
        	console.log(x);
		}, 1000)
	})(i);
}
```

This works but its not because of IIFE. You can achieve it using regular functions also. All you need to do is to remove the closure of `i` so that the setTimeout function gets a different value each time.

```js
// Logs numbers from 0 to 10
for(var i=0;i<10;i++){
    // declare a function for each iteration
    function customPrint(x){
        // x now keeps a local value of i for each iteration
        // this gets rid of the closure on i
 		setTimeout(function() {
        	console.log(x);
		}, 1000)
	}
    // call the function with current value of i
	customPrint(i);
}
```

Similarly there are number of articles which talk about other things like advantage of having a private scope with IIFE. Yes, that is true but its just that all those advantages are just because == every IIFE is a function ==.

Another improper representation of iife

![Medium](images/Medium.png)

My intention is not to ridicule but you can see that almost 3k people liked the above post. They all are now mis-informed that the whole purpose of IIFE is to protect its scope and variables in it. When I started learning javascript and encountered IIFE first time, the question that came to my mind is what Michael asked on this post.

![Ultimate question about iife](images/medium_question-1.png)

Apparently, there is only a single post from the hundreds which actually explains IIFE in its entirety with purpose and usefulness. And surprisingly its from 2010 by [Bel Alman](https://www.linkedin.com/in/benalman/). Do check it out. It even gives an intro why we call this concept as IIFE.

[http://benalman.com/news/2010/11/immediately-invoked-function-expression/](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)

# The Need

Libraries like Jquery need to instantiate only once and return a variable like `$` or `jquery` to the global scope, they need a mechanism for this. And before ES6 it was only possible with IIFEs. We will go in-depth in a minute. 

With ES6 modules you no longer need IIFEs for the most part. Thus they were mostly reserved for library creators or framework architects. As an application developer you would not use IIFE in your day to day work.

# The Scope dilemma

One aspect that I think everybody gets wrong about IIFE is the clause - `prevents global scope pollution`. Though its true but it does not gives you the differentiating factor. There are several caveats attached to it.

Lets understand the whole scope pollution thing in detail. Every where its mentioned that `any variable declared inside an IIFE is local to it and does not pollute the global scope`.

The statement is factually correct *BUT* remember that every **IIFE** is just another function. So as a result anything declared inside an **IIFE** will be available only inside the function body and will not be visible outside thereby preventing the outside scope to get modified. There is nothing special here. Every function has the same characteristic. 

*Thats the whole purpose of having functions in a language.*

```js
// Regular function
function regularFunction() {
	var a = 20; // a is visible only within the function
    console.log(a*a);
}
regularFunction();

// IIFE
(function (){
	var a = 20; // a is visible only within the function
    console.log(a*a);
})()
```

In fact you can accidentally create global variables in IIFE just how you would do in a regular function. Thereby modifying(you can say polluting) the parent scope.

```js
function accident() {
	someTypo = 43; // accidentally create a global variable
}
accident();

// IIFE
(function(){
	someType = 43; // accidentally create a global variable
})()
```

You can also modify the parent scope with arguments just as what you can do with normal functions.

```js
function accident(win) {
	win.$ = "What are you doing?"; // overriding window.$ with a string
}
accident(window);
console.log($); // $ is now just a string

// IIFE
(function(win){
	win.$ = "What are you doing?"; // overriding window.$ with a string
})(window)
console.log($); // $ is now just a string
```

Remember IIFEs are just functions. So everything that is applicable to functions is valid for IIFEs. Then what's the fuss?

##Its all in the name

There are two ways to declare new functions in javascript.

* Function declaration
* Function expression

In the declaration you are creating a function named loadData which will be available in the parent scope. The parent scope could be global or it could be another function scope.

```js
// loadData is defined at this point because of function hoisting
console.log(loadData) // logs function body

function loadData(id) {
	// ... some code
}

// loadData is defined at this point
console.log(loadData) // logs function body

// identifier available in parent scope
loadData(1234);
```

In the expression, its slightly different, but still you are creating a variable named `loadData` in the parent scope. The only difference is that the value of the variable will be a function and will only be assigned to the variable after the assignment statement executes.

```js
// loadData is undefined at this point because of variable hoisting
console.log(loadData) // undefined

var loadData = function(id) {
	// ... some code
}

// loadData is now defined
console.log(loadData) // logs the function body

// identifier available in parent scope
loadData(1234);
```

As you can see in both of them, you are eventually creating an identifier `loadData` in the parent scope. In essence whatever you do, you would have to ultimately modify(you can say pollute) the parent scope to run your code.

This is where IIFE comes into picture. IIFE gives you the power to run code without modifying the parent scope. And this is the only thing that makes it different from regular functions. Everything else is just a side-effect of being a function.

```js
// parent scope before IIFE

(function(id) {
	// ... some code
})(1234);

// parent scope after IIFE remains as it is 
```

Any other characteristic is just an utility of IIFE. For example its said that if you want to run some code exactly once, you should use IIFE. *No. You don't need to use IIFE.* You can always write your code within a function(which makes it modular) and just call it once in your application. 

Unless you are creating a library or creating a module, 99% of the time you would not need an IIFE. You could, but you should not!

```js
// declare your function anywhere
function setupPageWidth() {
	$("#main").style({width: "800px"});
}

// run this once in your project
setupPageWidth();
```

# Practical use case of IIFE

Jquery uses IIFE to instantiate itself. Remember that jquery does modify the parent scope but it does so without adding any function identifier. Depending on whether you are using the `noConflict` flag, jquery will add `$` or `jquery` to the window object.

Below is the trimmed down version of jquery.

```js
/*!
 * jQuery JavaScript Library v3.5.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2020-05-04T22:49Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function(window, noGlobal){} );
```

You can see that jquery covers all its code inside an IIFE. In the parameters it passes the window object and the factory function. The factory function itself is an anonymous function expression but within jquery code it is referred to as variable `factory`.

After removing the comments it becomes easier to identify the IIFE.

```js
( function( global, factory ) {
	factory( global ); // Add jquery to global object
} )( global, function factory(window, noGlobal){} );
```

Further if I rename the variables, you can easily make out the structure of the function. `x` and `y` are values passed in from the parent scope as arguments to the IIFE. 

```js
// IIFE 
( function( a, b ) {
	// all the code goes here...
} )( x, y);
```

The IIFE function does not change the parent scope. So you do not have to do something like this in your script.

```js
jquery();
```

Since IIFE accepts arguments just like a regular function and then operates on those arguments thereafter. In this case the first parameter is the global object and second parameter is the factory function. It doesn't matter if parent scope is `window` or `global` or anything else. Within the function its always referred to as `a`. 


Do remember that since `a` is just a reference to the outer scope value, you can still modify it. And that's what jquery does. It attaches itself to the `window`/`gloabl` object. Now you must have understood that using an IIFE just makes it possible to run the whole code without creating a function identifier in the scope.

# Other examples

Almost every library would use IIFE to setup initially which is required to be run only once when you load the appliaction.

```js
//     Backbone.js 1.4.0

//     (c) 2010-2019 Jeremy Ashkenas and DocumentCloud
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(factory) {

  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
  // We use `self` instead of `window` for `WebWorker` support.
  var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global;

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore'), $;
    try { $ = require('jquery'); } catch (e) {}
    factory(root, exports, _, $);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, root.jQuery || root.Zepto || root.ender || root.$);
  }

})(function(root, Backbone, _, $) { /* library code */});
```

```js
/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.6 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */

var requirejs, require, define;
(function (global, setTimeout) {
    /* library code*/
}(this, (typeof setTimeout === 'undefined' ? undefined : setTimeout)));
```

# So many ways to create

Now you know that you can create an IIFE by just surrounding any function with parenthesis and another set of parenthesis to call that function.

```js
(function(){})()
```

But this is not the only way to create an IIFE. You can use below techniques as well

```js
(function(){}()) // undefined
~function(){}() // -1
!function(){}() // true
+function(){}() // NaN
-function(){}() // NaN
void function(){}() // undefined
true && function(){}() // undefined
var result = function(){return "Are you nuts?"}() // undefined but assigns string to result
;(function(){})() // Just to make sure that after minification you don't execute the previous statement as function
```

What you can derive from the above snippet is that you just need to tell the javascript engine that please take my function as an expression and not declaration. Anything that converts your function into an expression is a possible candidate to create an IIFE. The most common method to tell the parser that you are writing an expression is to put everything in parenthesis `(` and `)`.


And that's why mostly IIFEs are created using parenthesis. This method also has two varieties.

```js
(function() {}())
(function() {})()
```

The difference is whether you want to call the expression result or the function expression individually. This is better understood when there are more expressions in a group.

```js
(function(){}, "str")() // Uncaught TypeError: ((intermediate value) , "str") is not a function at <anonymous>:1:22
```

In the above example the group has two expressions. One is a function and the second is a string. Yes an individual string is also a valid expression. More on that in a different article. Grouping operator works from left to right and will return the last expression result. So in this case it returns a string `str`. That expression result is then called because of the outer parenthesis. Since `str` is not callable, this goes into error.

```js
(function(){}(), "str") // returns "str"
```

If you move the parenthesis inside the group, you segregate the expression call. Your first expression in the group becomes an IIFE and second expression is just a string. On completion of all the expressions in the group, the result is the value of the last expression which here is a string. Now we are not doing anything with this result and therefore we do not get any error.

The former is the most used method but Crockford recommends the latter one. Maybe its because you can mess up the IIFE the moment you add another expression to the group.

Crockford's view on IIFE - https://www.youtube.com/watch?v=eGArABpLy0k

# Named IIFE vs Anonymous IIFE

Another confusing thing about IIFEs is the name of the function. As mentioned earlier that the whole idea behind using an IIFE is that it saves you from declaring a name in the parent scope. Then if we give a name to the function does it stop being an iife and gets converted into a normal function?

```js
(function isThisAnIIFE(){})()
```

The answer is **No**. The name that we have given to the function is only for its own scope. This name does not go out to parent scope. You would ask then is there any benefit of giving a name like this? Yes, the name can be then used within the function if required.

```js
(function print(x){
    if(x > 0) {
		console.log(x); // Logs current value of x
    	print(x-1) // Recursive call to itself
    }
}(10))
```

Below is another good read to understand how functions work - http://kangax.github.io/nfe/


> End




