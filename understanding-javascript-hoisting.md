# Excerpt
Hoisting is an advanced and difficult to understand concept of Javascript. It becomes more challenging to follow when you deal with multiple scopes and declarations. 

# Can you guess the output for the below program?

```js
console.log(hoisting);
var hoisting = "Its a variable"
console.log(hoisting);
function hoisting(){
    return "Its a function";
}
console.log(hoisting);
var hoisting = "What is it?"
console.log(hoisting);
```

To know the actual answer you can go to the bottom of the post. If you are starting with javascript and cannot digest the answer, this post is for you.

To start with, hoisting is defined by the dictionary as *Hoisting to raise or lift, especially by some mechanical appliance* which basically means *to move up*.

`Hoisting` is JavaScript's default behavior of moving declarations to the top.*
> w3schools.com


# Why do you need to move?

Lets start with simplest example. Fire up your devtools and type in the below line.

```js
// Uncaught ReferenceError: someRandomName is not defined
console.log(someRandomName); 
```

In the above case you will get an error while in the below example you will get `undefined` as return value.

```js
// undefined
console.log(someRandomName);
var someRandomName;
```

For somebody who is starting to learn JS, this is just totally illogical. At first glance you will say "ah.. declarations are given priority". Great. But then if you run the below example, your start losing trust.

```js
// undefined
console.log(someRandomName);
var someRandomName = "Are you trying to find logic here?";
```

# Whats wrong?

Before I explain what hoisting is, you need to unlearn the definition that you have been fed from various sources - Hoisting is *not* moving the variable declarations to the top. Though once you understand the concept, you would probably agree to the definition. But the problem is when you haven't yet understood, the definition brings more confusion rather than clarity.

# Javascript is interpreted languange?

Its [debatable](https://softwareengineering.stackexchange.com/questions/138521/is-javascript-interpreted-by-design), but the simple answer is - its **NOT**. Javascript is also not a typical compiled language. It lies somewhere in  between. 

```js
console.log("Before :", x, y);
var x=1;
console.log("In between :", x, y);
var y=2;
console.log("After :", x, y);
```

```js
Before : undefined undefined
In between : 1 undefined
After : 1 2
```

# What is it then?

When you supply the script to the js engine, which in most cases would be a browser, it would first parse your script. It will read your script line by line and find out all the declarations made in the scope. Remember it only looks for declarations in the current scope. So by default when it loads the script, it only looks in the global scope.

# What all it looks for?

The parser would look for all `var` and `function` declarations. With ES6, it will also look for `const` and `let`. But its mostly the same approach except one edge case which we shall cover in a minute. A simple statement like `var x=6` has two parts -
* declaration - `var x`
* statement - `x=6`

Only the declarations are read, assignments are *NOT*. Assignments are just statements which will be run only in the second stage. 

Once all the declarations are identified, the parser keeps a note in memory and asks the engine to start executing the same script line by line. So basically the same code is read twice. Though it will not be technically correct, we can say the first pass is compilation and the second pass is execution of the same code. In traditional compiled languages, compiled version of the original code is executed.

Thats why it doesn't matter where you declare the variable or function. If there is any `var` anywhere, it will be registered as declared without a value which by default is represented by `undefined`. But if its a function, the function definition also becomes a part of declaration and is stored at the same time.

```js
console.log(x)
var x="Move it";
console.log(x);
```

Above code can also be represented as below snippet. Many tutorials/articles say that above code gets translated into the below code. That does not happen. This is just an illustration. The parser does not alter/modify your code. **Its just how the code is read two times which makes you feel as if the declarations moved from their original location in the code to the top of the function.**

```js
var x;
console.log(x);
x = "Move it";
console.log(x);
```

# Got it?

Now that you understand how a script is read and parsed, its time for another confusion

```js
console.log(foo);
function foo(){
    return "This is a function.";
}
var foo = "Are you kidding!"
console.log(foo);
```

As per our understanding till now, the above code should output as below

```js
undefined
Are you kidding!
```

Instead you will get the below output

```js
ƒ foo(){
    return "This is a function.";
}
Are you kidding!
```

In the first parse, the engine will identify that there is a `foo` function declaration, so it assigns an identifier and also associates a function definition to it. Remember function *declarations* are read differently than *assignments* as mentioned earlier.

On encountering the second declaration for the same keyword `foo`, the engine should override the previously identified function right? But that doesn't happen. Function declarations are always given priority over var declarations. It doesn't matter how many times you write var, after the first parse, only function declaration will be kept.

```js
var bar =  56;
var bar = 99;
function bar(){ return "Function is high priority";}
var bar = "Assign some string";
```

But what about this case? Multiple function declarations with same name. This time your intuition is right. The last one is taken into account.

```js
foo()
function foo(){console.log("First one");}
foo()
function foo(){console.log("Again!");}
foo()
function foo(){console.log("Not again!");}
foo()
```

```js
Not again!
Not again!
Not again!
Not again!
```

# Is there any other catch?

**let** there be. When you ask what is the difference between let and var, a common accepted answer is - `let/const` declarations are not hoisted. Consider the below example. If we go by the accepted answer, `let` declaration will be ignored in the first parse. In the execution phase, line#1 should create a global variable and assign a string "Gotcha!" to it. And then of course, it would print that value and on line#3 there will be a new local block scoped variable created and assigned a value "Bad karma!".

```js
foo = "Gotcha!";
console.log(foo);
let foo = "Bad karma!";
console.log(foo);
```

But if you run the code in a fresh window, you will see that it gives an error. A special kind of error.

```js
Uncaught ReferenceError: Cannot access 'foo' before initialization
```

## It turns out that `let/const` declarations are also hoisted but assigning values to them is *restricted* until the line where the declaration is made, gets executed.

The above phoenomenon is called as Temporal Dead Zone. And is only applicable to `let/const` block scoped variables.

# But why god why?

Now that we know what hoisting is, we shall also dig into - Why its there? 
* Whats the purpose of having such a confusing feature?
* Whats the point in executing the script like this?
* Executing line by line would have been much easier?

This is just my perception and I might be wrong here but after reading about JS from multiple sources, I guess it all boils down to the fact that - 

> Javascript was for content writers. NOT programmers.

When Brendan was asked to come up with a scripting language, the whole idea was to give some control to the HTML creators so that they can create simple actions on the client side. You must have seen code like this on legacy products 

```html
<button onClick="showUserData()" name="getdata">Show User Details</button>
```

```js
function showUserData() {
	// update the DOM to show user data on screen.
}
```

The function `showUserData` just toggles some div on the UI. This function can be called from many places, and not just the click event. Some other event can also trigger this function. To make it simple for the creators where they should not worry about defining the variables and functions before using them, Brendon might have come up with this approach. 

This method would have made sense at that time when scripts were like 100-200 lines. Only a small set of functions to manage which can be used anywhere in the script as well as html easily.

But slowly `JS` started to grow because of the endless possibilities and the rich interactions it provided which `HTML` was unable to offer. We started writing scripts with 1000 lines of code and of course imposing practices from other languages which do not fit with the JS design, we have the end result where every thing which was a feature at some point of time is now considered a bad design.

Nevertheless, if you understand the base concept, it becomes easy to program and helps in understanding other's code as well.

# Further reading

* A good article about TDZ can be found at [jsrocks.org](http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified)

* Another excellent in-depth read about hoisting- 
https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch5.md#chapter-5-the-not-so-secret-lifecycle-of-variables

* Some more gotcha moments here on Axel's blog - https://2ality.com/2015/10/why-tdz.html

# Output of the code at the top of the article

```js
// Answer to the code sample on the top of the page
ƒ hoisting(){
    return "Its a function";
}
Its a variable
Its a variable
What is it?
```

** Update 07 March 2024 **
While browsing the internet I stumbled upon one SO question https://stackoverflow.com/questions/15005098/why-does-javascript-hoist-variables which refered to a couple of tweets by [@BrendonEich ](https://twitter.com/BrendanEich)

* https://twitter.com/BrendanEich/status/522395336615428097
* https://twitter.com/BrendanEich/status/522394590301933568

Essentially what he wants to say is 
* Functions were intentionally hoisted while `var` was an unintentional behaviour. The reasons that he gives are 
  * `let rec` for free - It refers to some concept that exists in [scheme language](https://docs.racket-lang.org/reference/let.html#%28form._%28%28lib._racket%2Fprivate%2Fletstx-scheme..rkt%29._letrec%29%29) and I believe some of the inspiration for JS came from scheme
  * `top down decomposition` - Didn't give much insights into it, but I guess it could be because he wanted to somehow get the top functions in the script first. Maybe for attaching the listeners to the DOM?
  * `call before declare` - Again not clear why it would be needed, but I suppose it also boils down to the same reason. You would want to associate the functions with the DOM as and when you see them in the DOM attributes like `onclick`. So that it doesn't matter whether you keep your script at the top or bottom of the page.

So the confusion I mentioned above in the [Got it](https://cybercafe.dev/understanding-javascript-hoisting/#gotit section actually is kind of a bug in the language. Maybe in later versions it should have been fixed, but to prevent the internet from going down, they kept it and now we are facing the consequences of that.

> End