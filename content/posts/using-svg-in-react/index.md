---
title : Using SVG in React
url : using-svg-in-react
summary : There are many ways to use svg in React. We can directly use the svg as src in the img tag or we can create custom component to render the svg as paths in html. In this article we will create a simple React app using svg image.
author: amt8u
date : 2021-01-09
draft : false
tags : ['react', 'svg']
---

# What's special about SVG with React
At first, it might feel a trivial task. But if you want interaction with svg elements, you need to create custom component so that the svgs are rendered as path and not just an image.

There are multiple ways to add svg to react components.

* Using `<img>` tag
Just import the svg file and set the src of the img to the imported file. With this approach you will get the file rendered but it will render as plain img. You would not be able to utilize the svg elements.
```js
import Map from './india.svg';

function App() {
  return (
    <div className="App">
      <img src={Map} alt="indiamap"/>
    </div>
  );
}

export default App;

```

* You can directly use svg images out of box with [Create React APP 2.0](https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs). Just import the svg image with this predefined syntax. The webpack config for the CRA does all the work for you behind the scene. As a result, you don't need to run around for plugins for simple use cases.

* Using svg custom component. For this to work you need to convert your svg file into a React component. If its a small file, you can convert the file manually otherwise you can use [svgr](https://react-svgr.com/playground/?expandProps=start&svgo=false) utility.

# Creating an interactive SVG app in React
The best way to learn anything is to try out. I usually don't work with svgs directly but I do understand their dynamics and use cases. I just wanted to play around with them. For this I fired up the console and started working 

* Create a new project with [CRA](https://create-react-app.dev/docs/getting-started)

```bash
npx create-react-app map-game
```

* If you are using git, probably its a good time to do first commit, so that in case you do any mistake, you can revert. Reverting first commit is possible but slightly [tricky](https://stackoverflow.com/questions/10911317/how-to-remove-the-first-commit-in-git/32765827#32765827).

```bash
git add .
git commit -m "Created Base App"
```

* I tried using the default React's method to import svg directly as component, but somehow it [didn't work](https://stackoverflow.com/questions/59820954/syntaxerror-unknown-namespace-tags-are-not-supported-by-default) for me because of namespace tags present in the file. I had to use the online [svgr utility](https://react-svgr.com/playground/?expandProps=start&svgo=false) to convert the svg image to React component. There are command line options also available, but for me the online playaround just worked fine. I had to disable the [SVGO](https://github.com/svg/svgo/) option so that the `id` and `title` remain intact. As I would be using those values for interaction.

* Import the file as component

```js
import './App.css';
import './Map.css';
import IndiaMap from './IndiaMap';
import data from "./data.js";

function App() {
  return (
    <div className="App">
      <div className="map-container">
        <IndiaMap/>
      </div>
    </div>
  );
}

export default App;
```

* Add the `onclick` function to the svg map. Since the props are transferred to svg, the onclick is also propagated to the svg element

```js
  function onMapClick(e) {
    // Get the title given to the svg path in the file. You can also get the id if you need
    let title = e.target.getAttribute("title");
    // Put your js logic here.
  }

function App() {
  render() {
    return <IndiaMap onClick={onMapClick}/>
  }
}
```

* Add various functions to App. Please find the [github repo](https://github.com/z00md/map-game) for full function code.
```js
  function nextQuestion() {}
  function updateScore(answer) {}
  function endGame() {}
  function onMapClick(e) {}
  function startGame(){}
```
* Add a little bit of styling to the svg map
```css
.map-container {
  padding: 50px 20px;
}

path {
  stroke: rgb(91, 91, 91);
  fill:rgb(236,236,236);  
  cursor: pointer;
}

path:hover {
  fill: rgb(130, 130, 130);
}
```

* Build the project. Of course, run and debug using CRA's localhost server
```bash
npm run build
```

* Deploy - Once you have the `build` folder ready, you can just serve it on any static server. Since I already have my [netlify site](https://cybr.cafe) where I post all my demo apps, I copied the build directory and pushed it to my netlify site. 

* Play - Even though its a very simple example, A lot of things needs to be in place to make it work. 


If you would like to checkout a [Live demo](https://cybr.cafe/map-game/index.html)


# Resources used for this demo app

* [Github Repo](https://github.com/z00md/map-game) for this sample app
* **SVG map of India** from [mapsvg.com](https://mapsvg.com/maps/india) used under [Creative Commons License](https://creativecommons.org/licenses/by/4.0/)
* Create React App from [React](https://create-react-app.dev/docs/getting-started)
* [Related article](https://medium.com/better-programming/create-react-app-and-svgs-70970ac715f2) about using svgs in React
* [svgr](https://react-svgr.com/playground/?expandProps=start&svgo=false) utility to convert svgs to React Components
* [CRA article](https://create-react-app.dev/docs/adding-images-fonts-and-files/#adding-svgs) about how to use svgs directly with React

> End

