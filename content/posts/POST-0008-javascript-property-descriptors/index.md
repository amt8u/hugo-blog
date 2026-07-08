---
title : Javascript property descriptors
url : javascript-property-descriptors
summary : We all know Javascript is all about objects and functions. And an object is just a collection of properties. And of course every function
author: amt8u
date: '2020-02-03T10:33:02.000Z'
lastmod: '2021-06-07T19:00:39.000Z'
draft : false
tags : ['javascript']
thumbnail: images/json-icon.png
images: ['images/json-icon.png']
---

Below you can see a simple example of objects having properties and functions with properties.

``` javascript
var panel = {
    height : 600,
    width : 800,
    name : "modal"
}

function CreatePanel(h,w,n){
    this.height = h;
    this.width = w;
    this.name = n;
    this.render = function(){
        // some render logic
    }
    this.destroy = function(){
        // remove all listeners and do cleanup
    }
}

console.log(panel) // logs panel object
console.log(CreatePanel) // logs function definition
console.dir(CreatePanel) // logs function as object 
```

# Property Descriptor

Property descriptor is itself another object which contains some flags which determine the behavior of object properties. Those are - 
* `writable` - determines if the property value can be changed
* `enumerable` - determines if the property gets listed while using in loops
* `configurable` - determines if property descriptor itseld can be modified or not

Aside from above 3 things, there is one more attribute `value` which contains the actual value of the property

There are various methods available to interact with property descriptors. We will see a few of them in action here
###Object.getOwnPropertyDescriptor()

``` javascript
Object.getOwnPropertyDescriptor(panel, "name")
```

``` javascript
{
    value: "modal"
    writable: true
    enumerable: true
    configurable: true
    __proto__: Object
}
```
<br/>
Few key points to remember 
* The function getOwnPropertyDescriptor() is a static function of Object class
* It is called with 2 arguments, an object and its property name
* Don't forget to put the property name in qoutes, otherwise the compiler will take it as a variable

As stated earlier, every function itself is an object, you can always find out about properies of existing functions. That will help you understand the importance of descriptors. Why are they even needed in the first place.
``` javascript
Object.getOwnPropertyDescriptor(Object, "getOwnPropertyDescriptor");
```

### Object.defineProperty()
This function can be used to create new properties with custom descriptors
``` javascript
Object.defineProperty(panel, "class", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "container"
})
```

# Why god why?
Now that we understand how to read and create descriptors, lets get in to why they are required.

``` javascript
var fruits = ["orange", "apple", "grapes"];
console.log(fruits.length); // logs 3
```

When you try logging the complete array object you will see an output like below. The **length** and __proto__ properties will be light in color.
``` javascript
(3) ["orange", "apple", "grapes"]
    0: "orange"
    1: "apple"
    2: "grapes"
    length: 3
    __proto__: Array(0)
```

And if you want to see the descriptor of **length** property
``` javascript
Object.getOwnPropertyDescriptor(fruits, "length")
```

``` javascript
value: 3
writable: true
enumerable: false
configurable: false
```
If you read the descriptor of the length property you will notice that its **enumerable** is set to false. Thus when you iterate over the array elements, the iterator skips over the length property and returns you a count of 3 even though the object has 4 properties. Also remember that JS arrays are not like java or C arrays. 

Also remember that __proto__ is not a property on the object directly but an inherited property and will not show up as object's own property. That's why the function is named aptly **"getOwnPropertyDescriptor"**

# Use it with caution
Yes the property descriptors are something which we do not use in general application programming. They are also a place where we can mess up the page completely. A simple example is 

``` javascript
Object.getOwnPropertyDescriptor(Object.prototype, "hasOwnProperty");
```
``` javascript
value: ƒ hasOwnProperty()
writable: true
enumerable: false
configurable: true
__proto__: Object
```
As you can see that the function can be overridden easily and with a different property descriptor like below
``` javascript
Object.defineProperty(Object.prototype, "hasOwnProperty", {
    value: 41,
    writable: true,
    enumerable: false,
    configurable: true 
})
```
``` javascript
panel.hasOwnProperty("height");
// VM1680:1 Uncaught TypeError: panel.hasOwnProperty is not a function
```

Similarly you can also create readonly properties like below.
``` javascript
Object.defineProperty(panel, "id", {
    value: "abcd-1",
    writable: false,
    enumerable: false,
    configurable: true 
})
```
If you try to write a value to this property it will fail silently and you will never get to know. In strict mode you will get an error that the property is non-writable
```javascript
(function(){
    'use strict'
    panel.id = 44;
})();
```
```javascript
VM1819:3 Uncaught TypeError: Cannot assign to read only property 'id' of object '#<Object>'
```

And also you can create constants by making the **writable** and **configurable** properties to false for example
``` javascript
Object.defineProperty(user, "name", {
  value: "Cool",
  writable: false,
  configurable: false
});
```

# Conclusion
Property descriptors are not something that we use in our daily application development but are mostly used by frameworks to implement various functionalities. For example in React you can see its usage in one file ReactElement.js under react/src/

``` javascript
// To make comparing ReactElements easier for testing purposes, we make
// the validation flag non-enumerable (where possible, which should
// include every environment we run tests in), so the test framework
// ignores it.
Object.defineProperty(element._store, 'validated', {
  configurable: false,
  enumerable: false,
  writable: true,
  value: false,
});
```

# References 
Use below MDN pages to know more
* [Object.getOwnPropertyDescriptor()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
* [Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
