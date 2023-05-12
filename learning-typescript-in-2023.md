# Excerpt
Learning typescript part 1 - Just making a post on learning typescript in 2023 from scratch.

# Why so late?
TS was released when I started my career i.e. 2012. At that time I was doing the type checks with weird syntax using [picture clause](https://www.ibm.com/docs/en/cobol-zos/6.3?topic=clause-character-string-representation). After that I have worked on many projects, and incidentally I never got a chance to work on a project which uses typescript. I know that being a [front-end](https://www.reddit.com/r/ProgrammerHumor/comments/nzqzt8/look_if_youre_a_frontend_developer/) dev, I must learn all the technologies around it but there are just [too many things](https://roadmap.sh/frontend) to keep up. Now I do need to know so here goes my impressions on learning TS.

# Type checking
We do have `typeof` operator in javascript so why do we need whole another tool(or language) to do the type checking.

We can always check the type before doing the operation as mentioned below. But the key difference is that using below method, we can do the type check only at runtime. While `typescript` lets us perform the **typecheck at compile time**. And as we all know "Prevention is better than cure". Moreover, typecheck using typeof is really cumbersome and then there is [The curious case of Javascript's typeof operator](https://cybercafe.dev/the-curious-case-of-typeof-operator/).

```javascript
function add(a,b) {
    // Everybody has done this
    if (typeof a !== 'number' || typeof b !== 'number') {
        return "Invalid input";
	} else {
        return a+b;
	}
} 
```

# Basic types
Let's start how we assign types in TS. The type is denoted by an identifier appending just after the variable using a `:`. Do note that basic types use all lowercase names and not classnames like `Number`, `String`. Their usage is weird and will come back to them later.

```typescript
// returns a number by doing specified operation
function operate(a:number, b:number, c:string) {
    switch (c) {
		case "+":
            return a+b;
		case "-":
            return a-b;
		case "*":
            return a*b;
		case "/":
            return a/b;
		default:
            throw "Not supported operator" + c;
	}
}
```

But beware it doesn't prevent you from performing operations with multiple types like below. In other languages, this will fail at compile time as you are trying to add a string to a number.
```typescript
function add(x:number, y:number) {
  return "Good luck "+x+y;
}
console.log(add(2,4));
```
![TS gone wrong](./images/learning-typescript-in-2023/adding-numbers.png)
# Type inference

```typescript
let a = 5; // TS auto infers that a is a number from the initialization value
let b;
b = "tumse na ho payega"; // TS auto infers from the first assignment
let c: number = 5; // You explicitly say that it will be a number
```

# Object
Although it looks easy at first, but this is more of a class kind of thing. We know that in JS you can just manipulate object as you like. Add/remove keys as you want at the runtime. There is just nothing stopping you.

But with statically typed languages generally we have a blueprint of an object, and we can only manipulate the values that are defined while creating the class.

Similarly, TS also restricts us to change only those keys which are defined in the object. This can be an explicit way by writing the type while creating the object.

```typescript
const person:object = {
  name: "Faisal",
  age: 88
}
person.work = "Kill"; // TS2339: Property 'work' does not exist on type 'object'.
```

Even when you don't define the type `object`, it infers from the assignment and warns you
```typescript
const person = {
    name: "Fazlu", 
    age: 33
}
person.work = "Dhokebaazi"; // TS2339: Property 'work' does not exist on type '{ name: string; age: number; }'.
```
But there is more to this. In the above examples you are defining the type while creating the object whereas in statically typed languages you define the type before creation. TS gives you a way to do that too.

Using `:{}` instead of `:object` converts the object declaration into a type declaration which means it's not an object that will get created, but a blueprint of what the object should look like. You can think of it as writing members of a class. `work` was not defined in the blueprint, and thus we get an error while assigning an object with key as `work`.

```typescript
const person: {
  name: string;
  age: number;
} = {
  name: "Ramadhir",
  age: 77,
  work: "Neta" // TS2322: Type '{ name: string; age: number; work: string; }' is not assignable to type '{ name: string; age: number; }'.   Object literal may only specify known properties, and 'work' does not exist in type '{ name: string; age: number; }'.
}
```
There is a small caveat with this though. You can put anything in the type declaration and TS will accept is as a type. I believe it is because the types can be user defined as well and not necessarily just primitives. But still declaring a value with a type `0` doesn't make sense or does it([play vsauce music here](https://youtu.be/mQ0hS7l9ckY?t=27)). See below [# Literal Types](#literal-types).

```typescript
const person:{
  name: string;
  age: 0;
} = {
  name: "Ramadhir",
  age: 77 // TS2322: Type '77' is not assignable to type '0'.
}
```

# Array[s] :-)

Just append the type in the declaration with `[]` to let TS know that you will be storing an array. 
```typescript
let values: string[]; // array of string
let numbers: number[]; // array of numbers
let objects: object[]; // array of numbers
let functions: Function[]; // array of functions
```

Do note one thing that even if TS says that something is wrong, it still compiles the code and the code may be valid js and can work perfectly. Perhaps there's some config to prevent TS to compile to JS if there are TS errors. Will check later.
```typescript
let values: string[];
values = [["mera"], ["joota"], ["fake","leather"]]; // TS2322: Type '[string]' is not assignable to type 'string'.
for (const val of values) { // TS evaluates that each value should be a string because values is an array of strings as per our type definition and thus the below TS error
    val.map(i => console.log(i)); // TS2339: Property 'map' does not exist on type 'string'.
}
```

```bash
mera
joota
fake
leather
```

# Tuple - Some say it as 'tyupal'
We learned that we can mark arrays of numbers/strings/objects etc. in TS. So that if we try to assign a mixed type, TS will throw an error

```typescript
let arr :string[] = [2, "Rupiya"]; //TS2322: Type 'number' is not assignable to type 'string'.
```

But what if we really want to store mixed data in an array. One quick example of it could be the highcharts where we store the data as category and its value in an array
```javascript
let data = [['Yellow', 10], ['Red', 12]];
```

* One way is to have a mixed type defined like below.
```typescript
let work: (string | number)[] = [0 , "Zero"];
```

* The other way is to define a tuple. A `tuple` is a predefined set of fields in an array with defined type for each value. The `department` in below example will always have an array of two values with first being a number and second being a string.
```typescript
let person: {
  name: string;
  age: number;
  department: [number, string];
} = {
  name: "Shamshad alam",
  age: 35,
  department: [1234, "lohe ka vyapaar"]
}
```
One thing to remember about tuples is that, TS has the capability to check the type when we assign the values, but somehow it cannot validate when we use `Array.prototype.push()`.
```typescript
person.department.push("kashmeer ke seb"); // You can push a new value to the values of a tuple without TS error
```
And I believe that must be true for other Array methods like `pop()`, `shift()`, `unshift()` etc.

```typescript
person.department.push("dhokha");
person.department.pop();
person.department.unshift("katal")
console.log(person.department); //(3) ['katal', 1234, 'lohe ka vyapaar']
```

# Enums
You know how we declare constants in regular Javascript world.
```javascript
const AREA = "wasseypur";
const AREA_MAP = {
    WASSEYPUR: "WASSEYPUR",
	DHANBAAD: "DHANBAAD"
};
```

TS makes this more convenient with `enum` which is just another way to represent numbers without knowing which one is which
```typescript
enum AREA_MAP {"WASSEYPUR", "DHANBAAD"};
const sameArea = AREA_MAP.WASSEYPUR === AREA_MAP.DHANBAAD;
console.log(sameArea); // returns false
```
Thing to remember here is that the values internally are automatically set to numbers. So doing below will give you the internal value which would be an auto generated index for that enum.

```typescript
enum AREA_MAP {WASSEYPUR, DHANBAAD};
const dialogue = AREA_MAP.DHANBAAD + " me hota hai koyle ka vyapaar";
console.log(dialogue); // "1 me hota hai koyle ka vyapaar" since AREA_MAP.DHANBAAD is at second position
```

You can also override the default behaviour to assign custom values.
* Start the enum with a different index
```typescript
enum AREA_MAP {WASSEYPUR = 100, DHANBAAD};
console.log(AREA_MAP.DHANBAAD); // 101 as it auto generates indices for rest of the enum values
```
* Assign custom numbers
```typescript
enum AREA_MAP {WASSEYPUR = 100, DHANBAAD = 200};
console.log(AREA_MAP.DHANBAAD); // 200
```
* Assign custom strings
```typescript
enum AREA_MAP {WASSEYPUR = "ramadhir_ka_area", DHANBAAD = "sardar_khan"};
console.log(AREA_MAP.DHANBAAD); // sardar_khan
```
* Assign mixed values
```typescript
enum AREA_MAP {WASSEYPUR = "ramadhir_ka_area", DHANBAAD = 200};
console.log(AREA_MAP.DHANBAAD); // 200
```

# Any
When you are not sure of what the values are, you can use `any` as a type. But then again if you start using it everywhere, you are basically moving back to JS and defeating the whole purpose of having TS in the first place. So when to use it?

It's good for rare occasions when something is preventing you from determining the type. Like below example
```typescript
let data: any[]; // You know api will return an array but it could be an array of anything
data = await getDataFromExternalApi();
```

# Union
While it may sound not a good idea at first, but sometimes you need one variable that can hold different types of value depending on how the function was called.
For e.g. `element` can be an array or a value. If it's an array, go inside and read each of its values and go on recursively until the end of the world:-P else print the value.
```javascript
let readRecursively = function(element) {
    if (Array.isArray(element)) {
        element.map(i => readRecursively(i));
	} else if (typeof element === "object") {
        for (let key in element) {
            readRecursively(key);
		}
	} else {
        console.log(element);
	}
}
```
So to make the above definition typed, you will add `any` to the function param. 
```typescript
let readRecursively = function(element: any) {} // element can be anything now
```
If you know that element can only be of type `number`, `string`, `object` or `array` then instead of `any` you can do a union of types as below which makes it flexible enough and not completely devoid of types
```typescript
let readRecursively = function(element: array | number | string | object) {} 
```
There is a _gotcha_ with this approach. When you provide union types, TS cannot reliably validate your operators. For e.g. below even if `+` operator is valid for both `number` and `string` individually but with union type, TS throws error. While this is weird for many, Microsoft states that its [by design](https://github.com/microsoft/TypeScript/issues/2031). Basically it says there are multiple types and `+` is only allowed when each value has single type.
```typescript
function combine(a:number | string, b: number | string) {
    return a+b; // TS2365: Operator '+' cannot be applied to types 'string | number' and 'string | number'.
}
```
There is a way out of this by checking the type at runtime. TS will catch that and understand the types are now same so it won't complain. But again this is kind of overhead.

```typescript
function combine(a:number | string, b: number | string) {
    if(typeof a === "number" && typeof b === "number"){
        return a + b;
    } else {
        return a.toString() + b.toString();
	}
}
```

# Literal types
When you specify the type as a literal value. This can be useful when you want a variable to have a value out of a specific set. You can assign any value as a type and TS will check for it. Kind of a set of values. In plain JS you can achieve this with a `Set` and check if value is present in it or not, but having a feature like this makes it even more convenient. Obviously this feels useful in conjunction with union types, otherwise it becomes kind of constant.
```typescript
let a: -1 | 0 | 1;
a = 0; 	// works
a = 2; 	// TS2322: Type '2' is not assignable to type '0 | 1 | -1'.
a = -1; // works
```

# type - custom types
When you are tired of writing a string again and again, you assign it to a variable and use the variable.
Similarly, when you are tired of writing union types `string | number | boolean | object`, what you do - You create an alias of this union type and use that alias.
```typescript
type Strumber = string | number;
let aValueThatCanHaveStringOrNumber: Strumber;
aValueThatCanHaveStringOrNumber = "ek number";
aValueThatCanHaveStringOrNumber = 1;
```
You can utilize the power of literal types with custom types and can create some concise types.
```typescript
type Badla = "baap" | "bhai" | "dada";
let badla: Badla;
let person = {
    name: "faisal",
    currentBadla: badla
}
person.currentBadla = "baap"; // this works
person.currentBadla = "dost"; // TS2322: Type '"dost"' is not assignable to type 'Badla'.
```

And of course you can extend this alias construct to create complex object types

![complex object type](./images/learning-typescript-in-2023/complex-object-type.png)

# Function return type
Just like other statically typed languages a function also needs to have a return type which makes it clear what would be the kind of value returned by a function. And when a function just does something and doesn't return there is a special keyword generally used `void`.

Similarly, TS provides us a construct where we can specify the return type of function

```typescript
function add(a: number, b: number): number {
    return "tumse na ho payega"; // TS2322: Type 'string' is not assignable to type 'number'.
}
console.log(add(4,3));
```
And when there is nothing to return we can use `void`.
```typescript
function printFullName(firstName: string, lastName: string): void {
    console.log(firstName + " " + lastName);
}
console.log(printFullName("Shamshad", "Alam"));
```

Again there is a catch with `void`. We know in javascript, if the function is not returning anything, it implicitly returns `undefined`, so by that logic using `undefined` should also work in case of above kind of functions. But you know how JS defies all logic! 
```typescript
function printFullName(firstName: string, lastName: string): undefined { // TS2355: A function whose declared type is neither 'void' nor 'any' must return a value.
    console.log(firstName + " " + lastName);
}
console.log(printFullName("Sardar", "Khan"));
```
TS wanted to make it more clear and reduce any ambiguity so their logic is - use `void` when nothing is returned and use `undefined` when a function explicitly returns `undefined`. You may think that why would we ever return `undefined`? There are scenarios when a returned value needs to be undefined because the outer function has a check on `undefined`. In that case `void` will prevent you from returning `undefined`.
```typescript
function printFullName(firstName: string, lastName: string): undefined {
    console.log(firstName + " " + lastName);
    return undefined;
}
console.log(printFullName("Ramadhir", "Singh"));
```
Btw, as a side note `void` itself is a keyword in Javascript and was used primarily to create undefined value. You can read my previous article [about void usage](https://cybercafe.dev/javascript-void-0/).

# Function as type
While it seems obvious that we can use `Function` as a type
```typescript
function add(a: number, b: number) {
    return a+b;
}
let anotherFunction: Function;
anotherFunction = add; // assign a function to a variable which can have functions only
anotherFunction = "yeh toh galat hai"; // TS2322: Type 'string' is not assignable to type 'Function'.
```

Just like objects, we can also structure the function type as well. And TS figures out the parameters and the return type of function from the definition.
```typescript
function add(a: number, b: number): number {
    return a+b;
}
function print(a: number):void {
    console.log(a);
}
let anotherFunction: (a:number, b:number) => number;
anotherFunction = add;
anotherFunction = print; // TS2322: Type '{ (): void; (a: number): void; }' is not assignable to type '(a: number, b: number) => number'. Type 'void' is not assignable to type 'number'.
```


# Callbacks
You can define the type of function parameters and its return value while defining the callback type.
```typescript
function squareAndCall(a: number, cb: (num: number) => number) {
    let value = a*a;
    cb(value);
}
function getHalf(a: number):number {
    return a/2;
}
squareAndCall(5, getHalf);
```

So if you pass a callback function with different signature, you will get TS error
```typescript
function squareAndCall(a: number, cb: (num: number) => number) {
    let value = a*a;
    cb(value);
}
function getHalf(a: number):string { // notice how return type is string here
    return "You entered " + a;
}
squareAndCall(4, getHalf); // TS2345: Argument of type '(a: number) => string' is not assignable to parameter of type '(num: number) => number'. Type 'string' is not assignable to type 'number'.
```

Using `void` in callback return type is a little different though. Essentially `void` here means that we are ignoring the return value. We(the squareAndCall function) says that I don't care if the callback returns something.
```typescript
function squareAndCall(a: number, cb: (num: number) => void) { // using void here
    let value = a*a;
    cb(value);
}
function getHalf(a: number):string {
    return "You entered " + a;
}
squareAndCall(4, getHalf);
```

# unknown
`any` makes your code typeless, nut `unknown` is itself a type and basically says that you determine the type and assign value.
* This fails
```typescript
let a: unknown;
let b: string;
a = "bolo";
b = a; // TS2322: Type 'unknown' is not assignable to type 'string'.
```

* This passes
```typescript
let a: unknown;
let b: string;
a = "bolo";
if (typeof a === "string") { // explicit check and thus the type is inferred by TS and is not unknown anymore
    b = a;
}
```

# never
Everybody has heard of [You don't know JS](https://cybercafe.dev/book-review-you-dont-know-js-yet/) so why should TS be behind in weirdness.

* `void` is when the function doesn't return anything but runs to its entirety
* `undefined` is when the function returns exactly `undefined`
* `null` is when the function returns exactly `null`

So what should be the return type when the function is unable to run completely? Well, in that case the stack will never expect a value and obviously every function will either return a value or it won't. If a function dies in between, the script will fail and specifying a return type doesn't make sense.

But TS wants to make sense out of this and provides us a type `never`.
```typescript
function throwError(err: string, code: number): never {
    throw {
        error: err,
        code
    };
}
throwError("sardar khan toh mar gaya", 404);
```
And in case you don't want to use `never`, TS infers the type automatically as `void` which still makes sense but just not perfect I believe.

> End
















