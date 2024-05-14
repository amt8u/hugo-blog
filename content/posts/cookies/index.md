---
title : Should I accept or reject cookies?
url : should-i-accept-or-reject-cookies
summary : What is a cookie? Should you accept or reject them; Does it make any sense to reject a cookie? And are cookies really files? 
author: amt8u
date : 2022-10-14
draft : false
tags : ['web', 'browsers']
---

# Should you accept or reject cookies?
I am sure you must have seen a dialog or a section asking for permission to save cookies when you visit a site for the first time.

![www.gov.uk_accept_cookies_message](./images/www.gov.uk_accept_cookies_message.PNG)

And I am also sure that most of the time you just click `Accept all` and continue. Sometimes there are options to chose from and sometimes there is an option to reject everything. In this post I will try to put forth my views on whether that selection really makes sense or is just for decoration.

# What are cookies exactly?

As per the first search result - an article from [kaspersky.com](https://www.kaspersky.com/resource-center/definitions/cookies) says

```
HTTP cookies are essential to the modern Internet but a vulnerability to your privacy. 
As a necessary part of web browsing, HTTP cookies help web developers give you more personal, convenient website visits. 
Cookies let websites remember you, your website logins, shopping carts and more. 
But they can also be a treasure trove of private info for criminals to spy on.
```

Although technically the above statement is completely correct but a little misleading. We shall soon cover why I feel that the above definition is not helpful.

Cookies are always presented as if they are `evil`. There is a broad categorization of cookies as well which you may find at most of the places

* First Party
* Third Party
* Session
* Persistent
* Necessary
* Non-necessary

All these categories are just for the sake of being there; for the browser `a cookie is a cookie`. It all depends on how the website developers/owners utilize those cookies.

# What is a cookie?

> In simple words, cookie is just a stored value associated with a domain and always sent with every request/url to the same domain.

Whether it's essential or not, depends on how the site is structured. Plus as a user, you cannot decide if a cookie is an essential one or not. Developers came up with a way to make everybody happy by letting the users think that they are in control of their data.

# Can users check stored cookies?

Next question you would ask is - How will a user determine if their choice of cookies is really respected and is there a way to double-check if the site is really just storing the essential cookies? The answer to this question is - `It depends!`

Yes, there are dev tools that you can quickly open(Press F12) and goto the `Application` tab and click the section `cookies`. On the right side you will see all the cookies associated with the current domain. But what exactly do you see?

If you do this activity for any of the popular sites like facebook etc., you will see some values like below. Since I have not yet logged in, these are generic ones, but once you log in, you may see many more having big random values.

![](./images/facebook.com_cookies.png)

Do they mean anything to you? Can you identify if the third cookie is a non-essential marketing one? Maybe on a few sites you can, but not always.

> Saying cookies are bad is like saying browsers are bad. 

Yes browsers can do harm if you open up a malicious site, similarly cookies can do harm if the sites are designed intentionally to cause malicious actions.


# But cookies hamper privacy?
Let's understand one thing that `Cookies` are just a medium to persist data across requests. There is no inherent property of a cookie which makes it a concern for privacy. It's the way sites have started using the cookies to track users which in turn resulted in privacy issues. In a way, any storage medium which identifies you across http calls can be used for tracking as well.

The nature of the problem lies in how sites process your data and not what piece of technology they use. Remember it's all about the `intentions`. Even if you opt out of all the non-essential cookies, sites can easily track you with their essential(as what they may say) cookies. They just need to save the data with a different name.

There are some tips or guidelines generally provided to the users which may help them to avoid privacy related issues with cookies. Let's take example from [norton](https://us.norton.com/internetsecurity-privacy-should-i-accept-cookies.html#) on when to reject cookies and understand if they make sense.

1. **Unencrypted websites** - _You shouldn’t accept cookies when you’re on an unencrypted website_ :
This is an inherent issue in the http protocol and not related to cookies. Yes, having a value not stored is better than having a value stored and being at risk of theft - but then It's not just the cookies - In fact, you should never enter your usernames/passwords and other confidential data like credit cards etc. on any unencrypted sites.
2. **Third party cookies** - _It’s a good idea to decline third-party cookies._
Sites can track you if they want. They can create a system which works on their domain and thus no point in blocking third party cookies. But again in today's world, the way third party systems are integrated, this one is the most convenient way to stop sites to track you. Although not guaranteed, but this certainly is one way to stop the majority of third party trackers.
3. **Slowed computer speed**. _Having new cookies stored in your browser over and over also could slow down your computer_
It may be true 10 years back, but nowadays browsers are fast enough so that a value here and there will not make much difference in processing or storing speeds, unless there are like hundreds of values occupying kilobytes of data. So this one is totally unhelpful. Maybe Norton needs to update their article.
4. **Flagged cookies** - _Antivirus software may flag suspicious cookies_
Antivirus software do not have access to your cookies unless you have a browser extension which can read cookies from domains other than its own. Even then the antivirus software cannot determine which one is bad. They may flag some of them by analysing cookies history but again, it's not perfect.
5. **Use of private information**. _If you’re sharing private data like your Social Security number (SSN) or banking information, you should decline the use of cookies to keep it safe._

This is the most absurd advice anybody could provide regarding cookies. No you should not decline cookies when you are to provide your SSN or banking details. In fact cookie is the only mechanism by which these kind of sites can function properly. But do note that cookies are not meant for saving your SSN numbers. If any site is doing that, probably that's a bad design.

# Why do we need cookies?

By design HTTP is a [stateless protocol](https://www.rfc-editor.org/rfc/rfc2616#:~:text=is%20a%20generic%2C-,stateless,-%2C%20protocol%20which%20can) which means that every request is an independent request and each request should contain everything that the server needs to know about the client and the request parameters.

But almost every site consists of multiple `http` calls. It could be a call to a totally different page on the same site or an [ajax](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX) call for the data, or may be a resource call for images, gifs etc. The server receives thousands of calls from thousands of clients, and it needs to correctly map each call to all other calls from the same client. Being [`stateless`](https://en.wikipedia.org/wiki/Stateless_protocol), the server do not store any connection between independent requests and thus there needs to be something present in each request which identifies the client uniquely.

This was all good for sites which do not need user data to process, or if needed, the user would have to enter it everytime on every page. I am sure people would get frustrated if they had to enter username and password after each click. To avoid this, the developers came up with a small mechanism by which the server can match each request to its respective client.

* The server shall generate a unique number on the first call(when you enter your username and password on the login page) which the server will then keep a copy of(probably in a DB). And also pass the same number in the response of the that first request to the client.
* The client receives the response and persists that number in some storage
* The client attaches that number with each subsequent request for the same domain(website).
* The server will now check for that unique number and would assume the request is from the same client. The unique number in the request determines who is the client irrespective of the source(IP address).

And that some storage is what they call cookies.

# Are cookies files?
Almost every popular article on cookies says that "cookies are small files" stored on your computer. Technically, yes cookies are stored `in files` but not like text files. Technically speaking, almost everything is a file eventually. Browsers like chrome, firefox, apps like vlc, netflix etc. are all files stored on the computer. Its just that those are executable files and not human-readable. Similarly, cookies are also stored in files which the browser can only read. So even if you are able to find the [location of a cookie](https://stackoverflow.com/questions/31021764/where-does-chrome-store-cookies), you will not be able to understand the stored data. Perhaps it's better to say that cookies is information stored by the client locally.

Maybe in early days, the browsers might be storing data in plaintext files, but its no longer done now, and we should avoid using the misleading definition.

Also note one thing, cookie is not only for browsers like chrome, firefox, opera, safari etc. Cookies are applicable to any app that connects to internet and keeps a track of user sessions. So even your shopping app on your mobile manages cookies in background.

# Sidenote
BTW, cookies are not the only mechanism by which sites can store data on the client. There are other ways too

* Session Storage and Local Storage
* Cache
* Service worker cache

# Sources

* [HTTP Cookies Standard](https://www.rfc-editor.org/rfc/rfc6265#section-1) - This one supersedes [RFC2109](https://www.rfc-editor.org/rfc/rfc2109) and [RFC2965](https://www.rfc-editor.org/rfc/rfc2965) and is now the http cookies standard
* [Kaspersky's unhelpful article](https://www.kaspersky.com/resource-center/definitions/cookies) - The article goes on saying that cookies are used to store username and password which is totally misleading. Nobody stores credentials, they store tokens.
* [An excellent paper by David M Kristol's](https://arxiv.org/pdf/cs/0105018.pdf?) - One of the best resources about cookies. I came across this paper after I finished the article and quite happy to see that my understanding was spot on.










