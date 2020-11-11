## FOUC
You must have heard about **FOUC** - Flash Of Unstyled Content. This has been there since ages. Read about it more on below articles

[FOUC Problem](https://webkit.org/blog/66/the-fouc-problem/)

[FOUC Solution](https://www.techrepublic.com/blog/web-designer/how-to-prevent-flash-of-unstyled-content-on-your-websites/)

## FODS
After I added the user-chosen theme persistence using local storage, I started facing a similar problem. I don't know if there is a name for this but I will name it **Flash of Default Style** - *FODS*.

## Persisting theme preference
The technique that I was using to achieve the theme persistence is below
* Check the localstorage for `theme` property
* If its `light` theme, do nothing
* If its `dark` theme, add a `dark` class to the `<html>` tag. And also setup the button to display the current active theme and add functionality to it to toggle the theme.
* On click of the theme toggle icon, run the toggleTheme logic above and set the value to localstorage
* On page load repeat above steps

## Problem
The whole logic was written in a `.js` file which was loaded for each page in the end of `<body>` tag. Which meant that the page would render first and then the file will run thereby introducing a slight delay. 

Since I am using a service worker to cache all resources, the resources gets loaded pretty fast, but the `js` file takes time to run. So appending the class `dark` takes a fraction of a second and then the whole page re-renders with dark theme. This caused a flash of default style - The white theme.

## Solution
There can be many solutions to this. But the easiest would be to add the `dark` class before the browsers starts rendering the page.

This could be done by running javascript code in the `<HEAD>` of the document. We know that scripts are by default render-blocking which means if browser sees a script somewhere, it will download it execute it and then proceed towards rendering the rest of the page.

That's why to prevent render blocking and make the page available for user interaction as soon as possible, its preferred to add scripts to the end of `<body>` tag.

You can also use `defer` attribute on scripts to asynchronously download and execute scripts but that itself comes with its own caveats.

## Adding the code
Now that we know where to put the code, we also need to be careful what we can write. Without giving a second thought I just copied my theme logic directly into the `<head>` section and realized that it didn't work.

```js
// To prevent Flash of default theme, add class to html before any rendering
var currentTheme = window.localStorage.getItem("theme");
if (currentTheme == "dark") {
    $("html").addClass(theme);
}  
```

On debugging I found the error which was so obvious. `Uncaught ReferenceError: $ is not defined`.

Since we are still in the `<head>` section, jQuery is still not available. Either initialize jQuery here before using it or just don't use it. Since I don't need jQuery for such a trivial task, I can easily use `document.getElementsByTagName` function.

```js
document.getElementsByTagName("html")[0].classList.add("dark");
```

Rest of the things like, changing the button icon and adding event listener to the button can be done with jquery since that code is still in the `app.js` file which loads once jquery has already loaded.

Now there is no flash on changing pages and the blog runs superfast too:-D

> End