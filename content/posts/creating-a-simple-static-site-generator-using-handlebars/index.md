---
title : Creating a simple static site generator using handlebars
url : creating-a-simple-static-site-generator-using-handlebars
summary : How to create a simple html generator using handlebars and nodejs.
author: amt8u
date : 2020-11-10
draft : false
tags : ['nodejs', 'html']
---

## The need
I was planning to create a pretty basic single page quiz application which I could deploy anywhere without any backend. All the questions would be in a json file. 

Being familiar with frameworks my first obvious choice would be react. creating interactive apps is more intuitive to build with some help from a library like react or backbone. It gives you a handy way to manage the state and model.

Also you don't have to deal with the nitty gritty of browser's apis. Thus it seemed an obvious choice. But that would have been an overkill for such kind of app. Having static site is the easiest and SEO friendly way to deploy apps.

So I started to look around for a tool which can convert my json to html. I found plenty of Static Site Generators but all of them turned out to be too complex for such a basic need. And most of them were just converters for framework based apps such as React etc. After spending some time searching for such a solution, I stumbled upon some articles

* https://www.webdevdrops.com/en/build-static-site-generator-nodejs-8969ebe34b22/

* https://stackoverflow.com/questions/21617468/node-js-generate-html

Method 2 from the stackoverflow answer was somewhat in line to what I was looking for. But creating html natively is daunting. Managing all the markup manually would be too much work.

A popular templating tool Handlebars might have helped. Having some experience with it, I started looking for a solution involving handlebars. But most of the articles were expressjs+handlebars solutions. 

## A good find

A few days back one of my colleague introduced me to a trendy tool [jsonresume](https://jsonresume.org/). Though the idea is very basic, but the implementation would be complex. Looking at the github projects for this tool, I figured, it might be doing what I intend to do. The tool generates static html using resume data from json file.

In just few minutes I got my solution in one of their projects. Coincidently  the project was also using handlebars. The relevant file is [this](https://github.com/jsonresume/jsonresume-theme-boilerplate/blob/master/index.js)

The only important line is I was looking for is

```js
return Handlebars.compile(tpl)({
	css: css,
	resume: resume
});
```

<hr>

## Setting up nodejs project

Referring to the project above I created a new nodejs project. I wanted to keep it simple and modular enough so that I can create different quizes with different json data. Essentially I just need to build a script which would read my `.hbs` template and `.json` data from two different files and generate single html file. 


Obviously there would be some css and js that can be attached later on as it won't depend on the generated content.

Also created *package.json* and added *handlebars* dependency.

```js
// index.js
var fs = require('fs');
var path = require('path');
var Handlebars = require("handlebars");

console.log("Reading json data from ", process.argv[2]);

var questionsJson = fs.readFileSync(process.argv[2], "utf-8");
// questionsJson is a buffer
var html = buildHtml(JSON.parse(questionsJson));

function buildHtml(fileData) {
  var template = fs.readFileSync(path.resolve(path.join(__dirname, 'template.hbs')), "utf-8");
  var renderTemplate = Handlebars.compile(template);
  // console.log(fileData);
  var html = renderTemplate(fileData);
  // Write to build folder. Copy the built file and deploy
  fs.writeFile("./build/index.html", html, err => {
    if (err) console.log(err);
    console.log("File written succesfully");
  });
}
```
<hr>

## Running the project

Now that I have my script ready which I can run by running nodejs manually

```bash
node index.js /javascript/questions 
```

But as expected I got errors and the way to get rid of them is to have debugging enabled. 

## Enabling debugging in VS Code

You can directly run the file using the Run menu in VS Code. Just after selecting the start debugging option it will ask you to select the environment where you would like to run the script. There will be a few options like chrome, node etc. I chose node and it worked!

But selecting the env everytime was bothering me. Alternatively you could create a *launch.json* file in the project directory. Once done, you can quickly start your app in debug mode by pressing F5.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "build", "./javascript/questions.json"]
    }
  ]
}
```

## Setting up npm run script

Now I could debug and complete the project. But I wanted to pass in the questions json file dynamically so that I could just update the json data and run a command to build my html. The ideal candidate for this would be *npm script*.

To achieve this I added a new script in `package.json`.

```json
"scripts": {
  "build": "node index.js"
},
```

Now I can different html quizes with just one command

```bash
npm run build ./javascript/questions
npm run build ./html/questions
```

## Publishing

Now that I can generate html from json, I also need a way to deploy the generated content. Right now I haven't setup any automated scripts thus I need to manually copy all the built files to my other repo which I can then push to github and that eventually auto-deploys to a netlify site.

You can take a look at the generated page [here](https://cybr.cafe/arrow-functions)

The sourcecode for this project is present on my [github account](https://github.com/amt8u/static-quiz-generator)

> End
