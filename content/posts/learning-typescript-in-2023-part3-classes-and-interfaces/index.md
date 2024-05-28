---
title : Learning Typescript in 2023 part 3 - Classes and Interfaces
url : learning-typescript-in-2023-part-3-classes-and-interfaces
summary : In this article we will understand how we can build classes and interfaces in typescript 
author: amt8u
date: '2024-02-23T08:25:08.000Z'
lastmod: '2024-02-23T08:26:18.000Z'
draft : false
tags : ['typescript', 'javascript', 'nodejs']
thumbnail: images/typescript-logo.jpeg
images: ['images/typescript-logo.jpeg']
---

# Classes

Depending on the target you will have different code generated for class.

```typescript
class Department {
    name: string = "DEFAULT";
    constructor(n: string) {
        this.name = n;
    }
}

let d1 = new Department("Looting");
```

The above code could be converted to functions if you set the target to 'ES5'.

# Methods
```typescript
class Department {
    name: string = "DEFAULT";
    constructor(n: string) {
        this.name = n;
    }
    describe() {
        console.log("Describing " + this.name);
	}
}
```

There is special syntax to specify `this` for a function inside class

```typescript
class Department {
    name: string;
    describe(this: Department) { // this should refer to Department kind of object
        console.log("Department is " + this.name);
	}
}
```

And you can also mark fields as private by using private keyword. While in [S, there is a provision to mark [private fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields) by using `#`.

```typescript
class Department {
    private name: string;
    describe(this: Department) {
        console.log("Department is " + this.name);
	}
}
```

## Initialization shortcut
Shortcut declaration of properties in the constructor allows you to skip writing declarations. Do note that this is just a TS feature, the generated JS still has the declarations and assignments.
```typescript
class Department {
    // private id: string;
    // private name: string;
    constructor(private id: string, public name: string) {
        // You also don't need to assign the values within the constructor
        // this.id = id;
        // this.name = name;
    }
}
```
## readonly

Allows you to create field which gets a value at the time of initialization and cannot be changed later. Again this is a TS feature and not JS.

```typescript
class Department {
    constructor(private readonly id: string, public name: string) {
    }
}
```
## inheritance
Just like regular inheritance, use `extends`. Only thing to take care is that `super()` needs to be called first before operating on any property. If we are using the shortcut syntax in the constructor then it's automatically handled by TS.
```typescript
class Department {
    constructor(private readonly id: string, public name: string) {
    }
}

class ChildDepartment extends Department{
    constructor(private readonly id: string, private reports: string[]) {
        super(id, 'Child');
    }
}
```

## protected
Making a field `private` only allow access to that field in the base class. To access the field in the child class, mark it as `protected`
```typescript
class Department {
    protected address: string;
    constructor(private readonly id: string, public name: string) {
    }
}

class ChildDepartment extends Department{
    constructor(private readonly id: string, private reports: string[]) {
        super(id, 'Child');
    }
    changeAddress(add) {
        this.address = add;
	}
}
```
## abstract classes
You can mark methods as abstract to force implementations to write the logic for those methods. Do note that you need to mark the class as abstract too in this case. And if you don't provide the implementation, you will get TS error. 
```typescript
abstract class Department {
    protected address: string;
    abstract describe();
    constructor(private readonly id: string, public name: string) {
    }
}

class ChildDepartment extends Department{ // Method describe from class Department is not implemented
    constructor(private readonly id: string, private reports: string[]) {
        super(id, 'Child');
    }
    changeAddress(add) {
        this.address = add;
	}
}
```

# Interface
An interface describes the structure of an object. Not sure how it is different from `type` but will see if it is. You can use `readonly` to mark fields as to be set only once.
```typescript
interface Person {
    name: string;
    age: number;
    greet(phrase: string): void;
}

let user1: Person;

user1 = {}; // TS2739: Type '{}' is missing the following properties from type 'Person': name, age, greet
```

# interface vs type
* interface is clear
* interface can be used to create classes with multiple inheritance
* You can extend an interface with other interfaces
```typescript
interface Greetable {
    name: string;
	greet(phrase: string): void;
}
interface GoodGreetable extends Greetable{
    goodGreet(str: string): void;
}

class Person implements GoodGreetable {
    name: string;
    goodGreet(str: string) {
        console.log("good" + this.name);
    }

    greet() {
        console.log("hi", this.name);
    }
}
```
## Function interface
You can define an interface for functions too below syntax. This now seems to be a stretch. Looks like TS wants to "interfacialize" everything that is there in JS :-P. It would be better to use custom `type` instead as this interface makes it more complex and confusing.
```typescript
interface AddFn {
    (a: number, b: number) : number;
}
let add: AddFn;
add = (n1: number, n2: number) => {
    return n1 + n2;
}
add(2,3);
```
## optional properties

```typescript
interface Person {
    name?: string;
    age: number;

    greet(phrase: string): void;
}

class Human {
    constructor(public name:string, public age:number) {
    }
}

let user1: Person;
user1 = new Human("ola", 34);

```

# Summary
```javascript
"JS" + "TS" === "Java"
```

# Compatability table
Check what all features are compatible across JS and TS. 
https://kangax.github.io/compat-table/es6/

# Next gen JS
* Arrow functions
```javascript
const add = (a:number, b:number) => a+b;
```