---
title : Learning Typescript in 2023 part 4 - Advanced typing 
url : learning-typescript-in-2023-part-4-advanced-typing
summary : In this article we will learn about some advanced typing constructs in TS.
author: amt8u
date : 2024-02-23
draft : false
tags : ['typescript', 'javascript', 'nodejs']
thumbnail: images/typescript-logo.jpeg
---

# Excerpt


# Intersection

Build new types with intersecting types

```typescript
type Admin = {
    name: string;
	permissions: string[];
}

type Employee = {
    name: string;
	startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: "",
	permissions: ["badalna", "banana", "hatana"],
	startDate: new Date()
}
```
## Intersecting custom types
Here numerical is `number` or `string`, while `alphabetical` is string, so their intersection is `string` and thus you get an error while assigning a `number`.
```typescript
type numerical = number | string;
type alphabetical = string;
type alphanumerical = numerical & alphabetical;

let value1: alphanumerical = "1";
let value2: alphanumerical = 1; // TS2322: Type 'number' is not assignable to type 'string'.
```

# Type guards
## Using typeof
When TS cannot infer types automatically, you can add custom logic to infer the type and then operate on the values.
```typescript
type Alphabetical = string | number;
type Numerical = number | boolean;
type Alphanumerical = Alphabetical & Numerical;
function add(a: Alphanumerical) {
    return a.length; // TS2339: Property 'length' does not exist on type 'number'.
}
```

You can add a typeguard using `typeof` in above code
```typescript
type Alphabetical = string | number;
type Numerical = number | boolean;
type Alphanumerical = Alphabetical & Numerical;
function add(a: Alphanumerical, b:Alphanumerical) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
}
```
## Using `in`
Sometimes `typeof` isn't perfect and may not be sufficient to deduce types. For e.g. below we cannot determine actor is of type `Killer` or `Saver` by using `typeof` since for both `typeof` will return `object`.
```typescript
type Killer = {
    name: string;
    kills: number;
}
type Saver = {
    name: string;
    saves: number;
}
type UnknownActor = Killer | Saver;

function printActorInformation(actor: UnknownActor) {
    console.log(actor.kills); // TS2339: Property 'kills' does not exist on type 'UnknownActor'. Property 'kills' does not exist on type 'Saver'.
}
```
You may think that we can just use the truthy check for this, but TS still warns us because we are tyring to access something which does not exist. 
```typescript
// also cannot be used since TS tries to warn that kills is not available
if (actor.kills) {} 
```
In this case we can use some cool JS tactics to type guard our code
```typescript
function printActorInformation(actor: UnknownActor) {
    // by using this mechanism we can skip TS to check for kills under actor
    if ("kills" in actor) {
        console.log(actor.kills);
    }
}
```
## Using `instanceOf`
```typescript
class Truck {
    drive() {
        console.log("Driving truck");
    }
    loadCargo() {
        console.log("Loading cargo");
    }
}
type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();

function useVehicle(veh: Vehicle) {
    veh.drive();
    if (veh instanceof Truck) {
        veh.loadCargo(); // loadCargo is fine here, coz we already checked if veh is an instanceOf Truck
    }
}

useVehicle(v1);
useVehicle(v2);

```

# Discriminated Unions
Pattern which makes using typeguards easier. While the name is confusing, the approach is pretty easy to understand.
 Basically what we do here is assign a specific property to the `interface` which we can then use while doing our type checks
```typescript
interface Killer {
    type: "killer"; // assign a type property with some string value
    kills: number;
}
interface Saver {
    type: "saver";
    saves: number;
}
type Mafia = Killer | Saver;

function printMafia(p: Mafia) {
    if (p.type === "killer") { // check for that custom property
        console.log(p.kills);
    }
}
```
Now if we try to pass something which is not present in the interface, TS recognizes it
```typescript
printMafia({type: "killer", kills: 22}) // works fine
printMafia({type: "killer", saves: 33}) // TS2345: Argument of type '{ type: "killer"; saves: number; }' is not assignable to parameter of type 'Mafia'. Object literal may only specify known properties, and 'saves' does not exist in type 'Killer'.
```

# type casting
When you want to convert a type to another type
```typescript
// cast HTMLElement to HTMLInputElement explicitly because by default TS will not be able to make out if its an Input element
const element = <HTMLInputElement>document.getElementById("someInputBox");
const element2 = document.getElementById("someInputBox") as HTMLInputElement; // For react files  since <> conflicts with react jsx
const inputElement = element as HTMLInputElement; //  you can type cast anytime
```

# Index properties
When you want to make objects, and you don't know even the keys that may come. Kind of ironic here that you are creating a type for something that you don't know. Types exist because you know what structure would be there. Never mind.
```typescript
interface DynamicObject {
    [prop: string]: string;
}
let ekdumDynamicObject: DynamicObject = {
    id: "1",
    songName: "keh ke lunga",
    writer: "varun grover"
};
```

# Function overloading
When you want to make it clear when functions have different types
```typescript
function add(n: number):number;
function add(a: number, b:number):number;
function add(a: string, b: string):string {
    return a + b;
}
```

# Optional chaining and Nullish Coalescing
As of today both are available in plain JS too. Looks like these two came from TS only.
```typescript
let a = data?.work?.name; // check for existence before getting the property
let b = data?.work?.name ?? "NO_WORK"; // check if value is "null" or "undefined". 
```

# Generics
A generic type is a type which is kind of connected with some other type and is really flexible regarding which exact type the other type is
```typescript
const names: Array<string> = []; // you can write this as string[] as well
```
If we specify the type of return data of the promise, then TS will start complaining if we try to perform operations on the return data which are not compatible with that type. This is kind of a good feature. I always end up doing a `typeof` check in these situations. It helps in making it clear what are we expecting in the return data.
```typescript
// TS2345: Argument of type 'string' is not assignable to parameter of type 'number | PromiseLike '.
const promise: Promise<number> = new Promise((res, rej) => {
    res("kaat daalo is string ko");
});
promise.then(data => {
    // TS2339: Property 'split' does not exist on type 'number'
    console.log(data.split(""));
})
```
## generic function
When you don't want to force types in the function parameters. Basically instead of mentioning the types, you make it `generic` and say whatever type it is, just return a value of that type.
```typescript
function merge<Type1, Type2>(a: Type1, b:Type2) {
 return Object.assign(a,b);
}
console.log(merge(["yeh array hai"],{b:"yeh object hai"}));
```