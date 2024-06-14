---
title : Learning Go Part 1
url : learning-go-part-1
date: '2024-06-13T18:58:58.000Z'
summary : Learning Go Part 1
author: amt8u
lastmod: '2024-06-13T18:58:58.000Z'
tags : ['go']
draft : true
thumbnail: images/ts2.png
images: ['images/ts2.png']
---

# Why?
When I [decided to move on from GhostJs to Hugo for my blog](https://cybercafe.dev/why-hugo-static-site-generator-for-blog/), I was quite impressed with the build speed of the site. I understand that my blog is not a very big project, but still, changing a small thing here and there, and rebuilding the whole 200 pages instantly is remarkable. I also see [people praising it a lot](https://stackoverflow.blog/2020/11/02/go-golang-learn-fast-programming-languages/).


# A little history
As its with any other tech, lets checkout the history of `Go`. As per wikipedia, Go is statically typed, compiled high-level programming language.

Going through [one of the talks presented by Go team in 2009](https://www.youtube.com/watch?v=rKnDgT73v8s). The [slides are here](https://go.dev/talks/2009/go_talk-20091030.pdf) 

Robert Griesemer, Ken Thompson and Rob Pike started the project in late 2007. By mid 2008 the language was mostly designed and the implementation starting to work.

## Inspiration

At that time there were many popular system languages, but none of them were designed with below factors in mind. And that's why they needed Go

* sprawling libraries & dependency chains
* dominance of networking
* client/server focus
* massive clusters
* multi-core performance

Robert Griesmer says - 

> Clumsy type systems drive people to dynamically typed languages.

And that's what happened with JS I guess, People came to JS to quickly create programs that can run without thinking whether you are passing a string or a number. Rob has given a lot of importance to type safety in his talk and says that type safety is kind of fundamental. And here we are in 2024 with the most popular language being **Javascript**.

Goals what they wanted to achieve

* type-safe and memory-safe
* good support for concurrency & communication
* latency free garbage collection
* high speed compilation

## Design Principles
* **Orthogonal concept** - Interface & implementation are totally separate objects
* **Grammar** - Regular context free simple grammar : Makes it easy to write IDE plugins, debuggers etc.
* **Type** - Reduce typing
* **Type hierarchy** - No type hierarchy, but still object oriented in a better way than say Java and C++

Some more pointers

* Clean concise syntax
* Lieghtweight type system
* No implicit conversion - I can say implicit conversions are good when your programs are small. When your code grows, its just a recipe for failure.

Checkout all the talks at `https://go.dev/talks/`

# Syntax basics

Declares a number. A plain number, not a float, not a double, just a number
```go
const N = 1024
```

Declare a plain string
```go
const str = "this is a unicode string\n"
```

Declare variables using `var` keyword. In `C`  `*float` is first and then the variables `x` and `y`

```go
var x, y *float
var ch = '\u1234'
```

Define and use a type `T`. The `:=` syntax enables you to declare and initialize which is used a lot in Go. 

```go
type T struct { a, b int }
var t0 *T = new(T);
t1 := new(T);
```

Control structures are similar to **C**. Just that parenthesis not needed for the if condition. Blocks still need to be defined with `{` and `}`
```go
if len(str) > 0 { ch = str[0]}
```

## Real program example

```go
package main

import "os"
import "flag"

var nFlag = flag.Bool("n", false, `no \n`)

func main() {
    flag.Parse();
    s := "";
    for i := 0; i < flag.NArg(); i++ {
        if i > 0 { s += " " }
        s += flag.Arg(i)
    }
    if !*nFlag { s += "\n" }
    os.Stdout.WrteString(s);
}
```

`package main` has some meaning but may get muted. Still thinking about simplifying.

Program begins execution by calling `main.main`

`import` is just importing the packages.

The `main` function will start execution after the `nFlag` variable is initialized. All the global variables initialized before the main starts.

### Contants

Contants in Go are typeless.

Define a type `TZ` with integer type and then define two contants `UTC` and `EST` with values as numbers. Paranthesis around the const is distributing the const declaration so that you don't have to write `const` every line.

```go
type TZ int
const (
    UTC TZ = 0*60*60;
    EST TZ = -5*60*60;
)
```

And then there is a thing called `iota`. Its an enumerator which iterates over the declarations done using the paranthesis. For each const declaration it counts which element you are on. `iota` starts at 0 for every const.

```go
const (
    bit0, mask0 uint32 = 1<<iota, 1<<iota - 1;
    bit1, mask1 uint32 = 1<<iota, 1<<iota - 1;
    bit2, mask2; // implicitly same text
)
```

High precision. Arbitary precision. Below is a valid declaration and we can compute log base 2.

```go
const Ln22 = 0.62129834712983456128934761234012481273489124\123471238947129348712348172034127341234129384712
const Log2E  = 1/Ln2 // precise reciprocal
```

### Values
Array like type called slice. We use a reference type called slice. Here weekend is a slice with two strings in it. `timeZones` is a map over `TZ`. To me it feels like a simple object.

```go
weekend := []string{ "Saturday", "Sunday" }

timeZones := map[string]TZ {
    "UTC": UTC, "EST": EST, "CST": CST, //....
}
```

Functions are declared as below with types defined after the variable identifier.
```go
func add(a, b int) in { return a+b }
```

Declaration of a function type. For eg. below takes two integers and returns an int. So function defined above `add()` is of type `Op`
```go
type Op func (int, int) int
```

Struct type. Here creating a new type `RPC` with `a` and `b` as integers, `op` as `Op` and `result` as a pointer to an integer. In the last line we are creating an instance of type `RPC` using the colon equals syntax by passing the values inside the curly braces.
```go
type RPC struct {
    a, b int;
    op Op;
    result *int;
}
rpc := RPC{ 1, 2, add, new(int) };
```

### Methods
Methods are different from functions. Also in Go, there is a special meaning to identifiers that start with capital letters. In Go, whether an identifier is visible outside the package depends on whether it starts with an uppercase os lowercase. Here type `Point` is visible to clients of this package and its members `X` and `Y` are exported from this package. Inside a global struct if a field or method starts with Uppercase its visible to clients of the package. 

```go
type Point struct {
    X, Y float // Upper case means exported
}
```

Methods are not part of struct. Methods and struct are independent ideas. You can have methods on things other than structs. Before the name of the function - `Scale`, pass a pointer to the type `Point` which act as receiver. The method gets associated with that struct. `Scale` is a method of type `*Point` and it takes a float argument.
```go
func (p *Point) Scale(s float) {
    p.X *= s; p.Y *= s;
}

```

Create a new instance of type `Point` initialized with values `3` and `4`. Using `&` everytime it will create a new instance.
```go
x := &Point{ 3, 4}
x.Scale(5);
```


# References

* **Official Go Blog** - https://go.dev/blog/all
* **Golang google group** - https://groups.google.com/g/golang-dev?pli=1