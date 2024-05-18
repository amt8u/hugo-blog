---
title : How authentication works?
url : how-authentication-works
description : Lets learn about authentication in depth. At least the shallow depth that I can cover. Encryption, SSO, MFA.
date : 2022-01-30
draft : true
tags : ['security', 'web']
---

# Need
In one of my earlier posts, I covered  the difference between [authentication and authrorization](https://cybercafe.dev/authentication-vs-authorization/). In this one, I will dig **deep** into authentication.

# Intro

# The Illusion of session
Once you login into an application using your username and password, any page/link that you were not able to access now becomes accessible. For most of the web, the underlying protocol is `HTTP` which is `stateless`. Which means that every request is independent and there is nothing in the connection that identifies who created the request. 

So if you login on chrome and firefox with different accounts on the same computer, and you visit your settings page, you are actually requesting the exact same page.

For the server these are just same requests coming from same IP address and it cannot differentiate who initiated which request. But still somehow the correct page opens up in each browser.

The magic is `session-id`.

Every request that goes to the server contains a special value called session identifier which identifies who requested that page. Ther server compares it with its stored value and depending on that it returns the page. But then the question is where this value comes from.

Generally the value is just a simple string. Every request carries this and thus is the actual identifier.

The jist is that every request needs to be authenticated. There are two ways to achieve this
* Pass Credentials in every request
* Pass a mutually agreed key in every request

Passing credentials in every request is not a good idea. You will have to ask username/password on every page which obviously nobody will like.

So the web guys came up with a mechanism called `token`. On the first request which has your username and password, the server generates a fresh random string and sends back to the browser. The browser then stores that string into its memory. For each subsequent request to the same domain(that is important!), the browser sends the stored `token` everytime. And yes everytime is again very important. 

In simpler terms, each page request(or api call if you work in SPA) needs its own authentication which is kind of overhead but thats how the protocol works.

> Thats how the users see it as session while in the background there is no such session.

# Session Id
Mostly, the id we discussed in the above section is just a random unique value and nothing else. Unique only for the time its associated with your profile. Once it expires, it could repeat with other user's profile value. But of course, at that time you won't have the previous values with you. On every login, the server creates it and keeps a copy of 
it for validating future requests. The copy is maintained for a predefined period of time as per the server's policies. And that's why your session expires if you do not do any activity for sometime.

So if, somebody, somehow manages to get your `token`, he/she/they can recreate your session in their computer. Without knowing the username/password the attacker is able to access your data. This technique is called [session hijacking](https://en.wikipedia.org/wiki/Session_hijacking) and can easily be done if you are not connected via SSL connection. Anybody who can intercept your http request will be able to see your session id. How `SSL` prevents your request from being read by interceptor is a separate topic of discussion.

> Take your sessionId as seriously as you take your password.

# HTTP authentication

The HTTP protocol defines how each request should be [verified or authenticated](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes). But again its upto the server(the guys who create the platform) to implement how do they want to authenticate each request.

You will find many schemes listed in the page, but most common ones are `basic` and `bearer`. You can read about them on the MDN page. But in simpler terms
* **basic** - provide credentials with every request
* **bearer** - provide a token with every request

There is even an already defined [header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate) in http protocol which says what all schemes are supported.

But again, its upto the server to manage how the authentication is done. Big companies like facebook, netflix will have many layers of protection to avoid authentication breaches.

# Encrypting password before sending
I recently observed that a few sites encrypt the user password before sending it to the server even if you are on a SSL connection. Of course not everybody is doing that. The question is why do you need to encrypt your password if you are already on `https` connection which means that every request is always encrypted.

I am not sure about this and there seems to be very [less information](https://duckduckgo.com/?q=encrypt+password+before+sending+to+server&t=brave&ia=web) about it available online. There are few [outdated debates](https://security.stackexchange.com/questions/133453/is-encryption-of-passwords-needed-for-an-https-website) but I didn't find any strong evidence to 

What I feel is that this helps in preventing credential theft from other techniques like installing malicious browser extentions. Sometimes people are also tricked into running javascript code which can inject functions in background and can intercept the login call even before its encrypted by the browser.

Thats why you see a big warning when you open `console` on facebook.com.
![facebook-console-warning](images/facebook_console.png)

The attackers are not totally wrong! At least someone is getting hacked :-P






http header - MDN auth page https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization

authenticatin shemees - https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes

HOBA - https://datatracker.ietf.org/doc/html/rfc7486#section-1.1
take screenshot of point no. 7 which session that eventually a session cookie will be set

bearer - simple way to say that i have a token and not credentials

SSO
OAuth

multi factor auth
Session Management
sessionsIds
JWT
any token
encrypted session-id
url encoding
base64 encoding
encrypting




