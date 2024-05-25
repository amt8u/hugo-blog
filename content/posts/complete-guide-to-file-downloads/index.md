---
title : Complete guide to file download in browsers
url : complete-guide-to-file-download-in-browsers/
summary : Have you ever come across a requirement to create download functionality? This article will go over all the possible solutions.
author: amt8u
date : 2020-12-07
draft : false
tags : ['web', 'download']
thumbnail : images/code.jpg
images : ['images/code.jpg']
---

# Problem about downloading in 2020? Really?
I have been using internet for more than 15 years and might have downloaded gazillion files. Downloading should be a piece of cake in 2020 looking at the pace web browsers have evolved.

Before I start with my findings, I would like to pinpoint the use case around saving files. There are two ways by which you can open a file from any site.

* Opening a file in the browser and then using the save as menu to save the file
* Download the file directly to the directory without opening

The first method is quite simple and works like a charm. This article is about the second approach.

Apparently [downloading a file is not as simple as you might think](https://html.spec.whatwg.org/multipage/links.html#downloading-resources).

# Searching for answers
As usual, I started looking with basic keywords like `download file`, `how to download file` etc. which gave me little hope to find an answer. The results mostly were around how to download a file and not - how to implement the download feature.

With some highly advanced searching skills:-P, I looked for `how to download file on button click` and there I found my first relevant post - [a stackoverflow question](https://stackoverflow.com/questions/11620698/how-to-trigger-a-file-download-when-clicking-an-html-button-or-javascript).

Aptly the first comment on the question says - *Thanks to you "how to trigger a file download in javascript" would give answers much faster for any future searcher.*

If you read the answers and respective comments, you will find that there is no one straight forward way. There are some limitations for every use case. In this article I shall try to cover all approaches and discuss their consequences.

# Is downloading a front-end task?
Though at first, it seems downloading is something that belongs to the front-end world. Since you have the complete file URL, you should be able to tell the browser to download the file instead of displaying it in the browser window. But.

> Enabling download is a server functionality and not front-end

Before you all judge me, I know there are various ways through which you can create files using just html and javascript which we shall see later. But as a matter of fact, the recommended and reliable way to let users download files is still server dependent.

As per my understanding this limitation is purposely put to prevent security issues. If you allow unrestricted downloading, it would increase the risk of people getting infected with malware etc.

There are already some mechanisms built into the browser by their developers. Its upto the browser to prevent abuse while keeping the functionality intact. A simple example that I could think of is - When you try to download `.exe` files, chrome warns you that it could harm your computer. 

Another feature you might have observed is that whenever you click on a file, or click *Save As* option, the browser doesn't instantaneously downloads, rather presents you with a Save As dialog on which you need to click *OK* which gets enabled only after a few seconds. Also consecutive downloads trigger a warning - *Prevent additional dialogs to open*.

# content-disposition header
Whether the file will open in a window or download depends on a very important header - `content-disposition`. I don't know why this header was named like this. Perhaps it would have been easier if the header could be called - `allow-content-download` or something similar. 

This header needs to be set in the response with a value from a predifined set. Whenever you click on a URL, the server responds with the data(which could be a file) including the http headers. If the `content-disposition` header is set to `attachment`, the file will be downloaded irrespective of the filetype. But if its not set, the browser will check the mime type of the file and if it thinks it can open it, it will, otherwise it will just download the file. 

That's why you see that installers and zip files don't need this header. A simple link to the file will download it. While for files like pdf and images, the browsers are capable and thereby open them in a new window or same window depending on how you created the link.

I would recommend reading the [content-disposition rfc](https://tools.ietf.org/html/rfc6266) to better understand the header. Other than the disposition there are a few important parameters like filename etc.

# Downloading via javascript?
When we say downloading via javascript, the ask is whether there is a way so that we can write code like below. Basically triggering the download without manipulating the existing DOM.

```js
fetch("https://path-to-some-endpoint").then(data => {
  // some api which allows saving the response to file
  window.save(data);
})
```

Apparently giving javascript the power to handle user's system files is not a great idea. So the answer to the question - Can you download using javascript? is *NO*.

> With great power comes great responsibility! 

But then again you will see various posts describing how to achieve the "download with javascript" using similar syntax like below. Technically its just creating a link and simlulating the click.


```js
function downloadFile() {
  let url = "https://images.unsplash.com/photo-1594535483297-b23201bee10f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=z00md-BHrA5cSuDq4-unsplash.jpg";
  let a = document.createElement('a')
  a.href = url
  a.download = url.split('/').pop()
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
```

Similarly there are other tricks that you can use but ultimately its just simulating the browser's default link behavior. Do note that it will depend on the response if it has the right `content-disposition` header, otherwise the file won't download, instead will open in the window.


* Using window.open method
```html
Button with onclick
<button type="submit" onclick="window.open('https://images.unsplash.com/photo-1594535483297-b23201bee10f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=z00md-BHrA5cSuDq4-unsplash.jpg')">Download!
</button>
```

* Modifying window.location property
```html
Button with onclick - open file in same window
<button type="submit" onclick="window.location ='https://images.unsplash.com/photo-1594535483297-b23201bee10f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=z00md-BHrA5cSuDq4-unsplash.jpg'">Download!</button>
```

* Using iframe
```html
Button click
<button onclick="downloadFileUsingIframe()">Download</button>
<iframe id="invisible" style="display:none;"></iframe>
<Script>
function downloadFileUsingIframe() {
var iframe = document.getElementById('invisible');
iframe.src = "https://images.unsplash.com/photo-1594535483297-b23201bee10f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=z00md-BHrA5cSuDq4-unsplash.jpg";
}
</Script>
```


# download attribute solves evertything or does it?
You may have seen this as a solution for the download problem on many sites. This attribute was added with HTML5. Using it is not straight forward. You might get confused if you start adding it without understanding the limitations. Thats why you see many people in stackoverflow responding to answers suggesting not to use it. I would recommend reading the [MDN page](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) first.

To summarize here are the pointers from the above page

* download only works for same-origin URLs, or the blob: and data: schemes. - This one is very important. You cannot enable download from a link to a document on some other site from your app. But if the linked file has `content-disposition` header set to `attachment`, you don't even need to use this attribute
* The filename is determined by an algorithm that maybe imlemented differently in different browsers
* Another important point is what if `content-disposition` is `inline` and you use the download attribute? - In that case again, browsers behave differently. In fact firefox version before 82 prioritize the header rather than the attribute.

# Progress bar for downloading large files?
Though it might seem trivial, but getting hold of the download process is not possible at all. The download is done by the browser and there is no way to communicate back to the requester(which would be our link in our page) to inform about the download. Whether it failed or was successful.


# Creating files without server
As we have discussed, handling the file system using javascript can be hazardous. But there are few ways by which we can create files without the need of server. Obviously these are not suitable for the general purpose download but maybe for some unique use-cases these can be an option

There are a couple of ways to create files

* Using createObjectUrl
* Using data:scheme

You can create a [blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) on the UI with any data in it. Once you have the blob ready, you can use a static method `URL.createObjectUrl()` to create a DOMString. Now you can just use this new URL to create new links and simulate a click with download attribute. Since this blob will have the same origin, the download attribute will work and you can save your content as file. Of course, the browser will ask for the permission to save.

```html
<button onclick="downloadFileWithObjectUrl()">Using object URL</button>
<script>
function downloadFileWithObjectUrl() {
  fetch('https://images.unsplash.com/photo-1594535483297-b23201bee10f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=z00md-BHrA5cSuDq4-unsplash.jpg')
	.then(resp => resp.blob())
	.then(blob => {
	  const url = window.URL.createObjectURL(blob);
	  const a = document.createElement('a');
	  a.style.display = 'none';
	  a.href = url;
	  // the filename you want
	  a.download = 'custom-name';
	  document.body.appendChild(a);
	  a.click();
	  window.URL.revokeObjectURL(url);
	  alert('File download done');
	})
	.catch(() => alert('Error while downloading'));
}
</script>
```

You can also achieve the same using the data:scheme. The idea is same - Create a link with download attribute and simulate the click.

```html
Using data scheme
<button onclick="initiateDownloadByData()">Download by data</button>
<script>
function downloadByData(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function initiateDownloadByData() {
  downloadByData("hello.txt","This is the content of my file :)");
}
</script>
```

All these js based solutions are merely tricks and should be avoidable for majority of usecases. Unless you are doing something which requires a file to be downloaded on UI. Maybe some configuration user has created on UI and would like to save that. Instead of passing the whole config to server, we can use the above methods to create file locally.

# Third party options
Of course being a very tedious task to implement every trick and fall back, there is a third party option available. - [File Saver.js](https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js)

But if you look at the source code, essentially it is doing the same thing. Utilizing the download attribute and simlulating click event on a background link. But they have also created a [quick wiki](https://github.com/eligrey/FileSaver.js/wiki/Saving-a-remote-file) to help you out identify your use case.

Another more advanced way is using [StreamSaver.js](https://github.com/jimmywarting/StreamSaver.js). Unfortunately this requires a lot of setup and I was not able to test its efficiency. But you can very well read its [README](https://github.com/jimmywarting/StreamSaver.js#how-does-it-work) to understand how it works.


All mentioned links

[HTML spec](https://html.spec.whatwg.org/multipage/links.html#downloading-resources)

[createObjectUrl](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)

[Stackoverflow Question](https://stackoverflow.com/questions/11620698/how-to-trigger-a-file-download-when-clicking-an-html-button-or-javascript)

[content-disposition RFC](https://tools.ietf.org/html/rfc6266)

[Unsplash photo with content-disposition:attachment](https://images.unsplash.com/photo-1594535483297-b23201bee10f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=z00md-BHrA5cSuDq4-unsplash.jpg)

[Unsplash photo without content-disposition:attachment](https://unsplash.com/photos/BHrA5cSuDq4/download)

[FileSaver quick wiki](https://github.com/eligrey/FileSaver.js/wiki/Saving-a-remote-file)

PS - Most of the above solutions are taken from various posts and stackoverflow answers.

> End

