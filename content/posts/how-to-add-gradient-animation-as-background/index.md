---
title : How to add gradient animation as site header in ghost blog
url : how-to-add-gradient-animation-as-background
description : Add simple background gradient animation to website header
date : 2020-10-01
draft : false
tags: ['css']
thumbnail : "images/cybercafe.dev-header.png"
---

# Using Presets

There is a great tool to start with. Head over to below link and create your gradient config. You can always modify everything later on.

https://www.gradient-animator.com/

# Add to your site

If you are using a ghost instance, there are two ways
* Add to code injection 
* Update the theme css files

# Code injection

```css
.css-selector {
    background: linear-gradient(308deg, #000000, #000000, #f75900, #000000);
    background-size: 800% 800%;

    -webkit-animation: moveit 21s ease infinite;
    -moz-animation: moveit 21s ease infinite;
    animation: moveit 21s ease infinite;
}

@-webkit-keyframes moveit {
    0%{background-position:0% 14%}
    50%{background-position:100% 87%}
    100%{background-position:0% 14%}
}
@-moz-keyframes moveit {
    0%{background-position:0% 14%}
    50%{background-position:100% 87%}
    100%{background-position:0% 14%}
}
@keyframes moveit {
    0%{background-position:0% 14%}
    50%{background-position:100% 87%}
    100%{background-position:0% 14%}
}
```

Inside the site header code injection box, add a new style tag and just paste the above css directly.

Just remember to change the `css-selector` to whichever element you would like to have the effect.

You can always tweak the css properties directly to achieve the desired result. You can also try changing the animation properties to create some wonderful but pretty simple effects.

# Updating theme

You can also edit your theme directly if you are using a custom theme. Just add the same css anywhere in the `style.css` file. 

Create a new zip version of the theme and upload it to your ghost installation.

```bash
yarn zip
```

# Troubleshooting
If your changes are not reflecting
* Try disabling cache in the browser and reloading the page
* Check if the classname you are using is correct
* Check if any other element is not overlapping preventing you to see the effect
* Check in the console if you see any errors. If the `<style>` tag has invalid syntax, other css files might not load.

> End

