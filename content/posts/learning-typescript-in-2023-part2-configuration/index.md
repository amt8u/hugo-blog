---
title : Learning Typescript in 2023 part 2 - Configuration
url : learning-typescript-in-2023-part-2-configuration
summary : In this article we will learn about Typescript configuration and various options provided to make our life easier while coding.  
author: amt8u
date : 2024-02-23
draft : false
tags : ['typescript', 'javascript', 'nodejs']
thumbnail: images/typescript-logo.jpeg
---

# watch mode
Enabling watch mode with tsc compiler.
```shell
tsc app.ts -w
```
## watch project
Create a `tsconfig.json` file with some basic defaults. You can now run `tsc -w` to watch over the complete project and whenever a file changes, it will recognize that change and compile all the files.

```shell
tsc --int
```

## Exclude
Use exclude option in the `tsconfig` to exclude files that should not be compiled by tsc.

```json
{
  "exclude": [
    "analytics.ts", // exclude single file
    "analytics.dev.ts", // exclude some specific extension
    "*.dev.ts", // exclude all files with some specific extension
    "**/*/dev.ts", // exclude all files in all folders with specific extention
    "node_modules" // exclude node_modules
  ]
}
```
Do note that `node_modules` is by default excluded even if you don't have an exclude block. But if you have exclude block, then do remember to exclude `node_modules` explicitly.

## Include
Set the include files when you want to specify the what should be compiled. And as it is with `exclude`, if you give the include list then you will have to provide all the files which you want to include. 

So basically it is Include first and then exclude and then compile.

## files
You just specify the files and no folders. Its better to have set this via `include` as it is more flexible.

# Compiler options

## target
```json
   "target": "es2016"
```
Set the javascript target like `es5`, `es6` etc as per your need. The more recent version you select, the less transpilation would occur. Depending on your project setup you may go for an older version like `es5` when you don't have babel setup, or `es6` when you are converting to js using some babel config after ts compilation.

## module

## lib
Allows to specify what features TS knows. 

Consider below example. How would TS know that there is a `document` identifier and then there is a function `addEventListener` which is available inside it? Yes ofcourse this is valid JS code when run in browser but while compiling too you need to know whether these browser objects are there or not. TS by default enables some `lib` support which allows us to write code without manually adding platform apis like dom. But if you really insist then there is `lib` config that you can override to let TS know about what features to enable.
```typescript
let el = document.getElementById("policewala")!;
el.addEventListener("click", function(){
    console.log("click kiya gaya hai");
})
```

By default below are the libs activated by TS.
```json
{
  "lib": [
	"dom",
	"es6",
	"dom.iterable",
	"scripthost"
  ]
}
```

## other config

```json 
{
  "allowJs" : true, 	// compile JS files too.
  "checkJs" : true, 	// report syntax errors in js files
  "jsx" : "preserve", 	// helps with react js
  "declaration" : true,
  "declarationMap" : true, // .dts files required when you are writing library code.
  "sourceMap": true, 	// generates sourcemap
  "outFile": "./",
  "outDir": "dist", 	// where to store the compiled files
"rootDir": "", 			// set the source of TS files. It also make sure that the project structure in dist folder
  "removeComments" : true, // remove comments from TS
  "noEmit": true, 		// just check if TS files are correct and do not create JS files
  "downllevelIteration": true, // some odd behaving for loops when you are compiling for older js versions
  "noEmitOnError": true // Thats whay I was thinking could be solved with config and it is
}
```
## strict options

```json
{
  "strict": true // set all strict to true
  "noImplicitAny": true, // prevents implicit any declarations
  "strictNullCheck": true, // warns for values that might potentially hold null values - kind of a null pointer exception prevention, you need to add a dynamic runtime check like if()
  "strictFunctionTypes" : true, // will learn later
  "strictBindCallApply" : true, // checks the bind calls for parameter matching
  "alwaysStrict": true // makes sure generated js is also strict

```

## code quality options
```json
{
  "noUnusedLocals" : true, // warns by default, but you can set to error
  "noUnusedParameters" : true, // same as above
  "noUnusedReturns" : true // checks if all branches in a function return some value. You can explicitly return undefined if needed
}
```

Note that TS does not validate unUnsed globals because it cannot reliably do that.

# Debuggging

* **Eslint**
* **Prettier** to format
* **[Debugger for chrome extension for VScode](https://code.visualstudio.com/docs/typescript/typescript-debugging)** - Simulate running in browser with debugging in IDE

# Resources
* **Typescript docs** - https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
* **Compiler config docs** - https://www.typescriptlang.org/docs/handbook/compiler-options.html





