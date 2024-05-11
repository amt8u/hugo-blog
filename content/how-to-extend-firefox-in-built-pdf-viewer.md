# In built pdf viewer

Unlike chrome, firefox comes with a very versatile pdf viewer. When you open pdf links in firefox, the viewer loads the page with the pdf content but as an html document. You can modify the css for any part and get a custom page layout with custom colors.

# The need
One of my friends was checking out some pdf files on firefox and identified a need to modify the background colors of white pages so he could read the pdfs in dark.

Quickly he discovered that the html rendered can easily be changed by applying some styles in the dev tools. But doing this everytime on page load was becoming a little cumbersome for him.

Soon he found out a small script which can do the same task by running a small js code that can change the color after loading the page.

# Using script
The crux of the script is to update the stylesheet information for the document.
```js
document.styleSheets[0].insertRule(".textLayer {background: rgba(1,1,1,0.8);}", 1)
```
Basically it just adds a new css rule for `.textLayer` class with a background color value. This class holds the page's background when the pdf is rendered as html on the page. You can always change the color to anything you like and also update any other elements on page such as titles, headings etc.

# Page reload
Since we are just injecting some styles on the page, on page reload or navigation to other pages, the styles are lost. It doesn't matter whether you are changing the style in the inspector or using javascript code to inject the style. The changes are always lost. This is by design.

Now the requirement comes in to make the script run everytime whenever any page is opened. This called for an extension. Since I have never created one but being a front-end developer I knew that this could be done using a firefox extension.

# Building the extension
With one search you land up on the [firefox guide](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension) to create new extension from scratch.

The steps are quite simple. 
* Create a `manifest.json` file to add all extension related metadata
* Add a pattern to identify where to run the extention
* Create a script file which shall run on the matched pages
* Add an icon to the extension

You can goto `about:debugging` in firefox and then Load your extension temporarily for testing.

# Created a local extension
I created a simple extension with the script to change the color of the `textLayer` element and loaded it into firefox for local testing. I encountered an error related to pattern matching but for now I fixed it by using `<all_urls>`. More details [here](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns).

# Didn't work
I opened up a pdf file and discovered that my extension is not working. There are no changes on the `textLayer` class. Somehow extension was not getting loaded. Just to verify the same, I added a `console log` statement in the extension script.

Reloaded the extension and then refreshed the page. Still no luck. I tried to open another page and while looking at the console I can see the log from my extension.

After some investigation I found that the extension is working for all sites except the one which I was checking. I tried with other pdf links from other random sites but the same issue.

Apparently when you open a pdf link on any site, firefox downloads the file temporarily on your system. The URL will point to the site, but the file will be loaded from the local disk. And on clicking the site information button you will see the message - "This file is stored on your computer".

So now my intuition lead me to search for - "How to enable extension for schemes such as `file://`. Soon I discovered the [permissions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions) page. It did have some explicit permissions but didn't had what I needed to fix my issue.

# PDF viewer - Extensions not allowed
While looking out for solution, I stumbled upon a [blog post](https://pncnmnp.github.io/blogs/firefox-dark-mode.html#) by Parth which explicitly mentioned that extensions are not allowed for firefox in built pdf viewer. This ended my journey to create an extension.

It also mentions that firefox has added this feature after version 60. Some discussion around the same available on [bugzilla](https://bugzilla.mozilla.org/show_bug.cgi?id=1454760).

The post also prescribed an alternate way to achieve the same but I haven't tried it yet.

# Workaround
One workaround suggested by some user on the bugzilla thread is to use the firefox [pdf viewer's web version](https://mozilla.github.io/pdf.js/web/viewer.html). Since it will be just another site and extensions should work for this site, you can get the custom css loaded here.

> End