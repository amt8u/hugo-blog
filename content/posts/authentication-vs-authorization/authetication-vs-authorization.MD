---
title : Authentication vs Authorization
url : authentication-vs-authorization
description : Authentication vs Authorization
date : 2020-09-13
draft : false
---

TLDR;
#### **Authentication** - Check if the person is allowed to enter the system
#### **Authorization** - Check if the entered person is allowed to perform specfific operation

<br/>

# What others say about it

This is again one of the topics which I put into the category where you will appreciate the definition after understanding the whole concept.

Lets talk about why this is confusing for many. First of all numerous examples which do not describe the real usecase and present with irrelevant examples.

* **[GeekForGeeks](https://www.geeksforgeeks.org/difference-between-authentication-and-authorization/)** - This is the first result when I search for "Authentication vs Authorization". Either I am not qualified enough or it looks like somebody has intentionally written the bad text. It doesn't make any sense at all.

> Both Authentication and Authorization area unit utilized in respect of knowledge security that permits the safety on an automatic data system. Each area unit terribly crucial topics usually related to the online as key items of its service infrastructure. However, each the terms area unit terribly completely different with altogether different ideas. whereas it’s true that they’re usually employed in an equivalent context with an equivalent tool, they’re utterly distinct from one another.

* **[Okta](https://www.okta.com/identity-101/authentication-vs-authorization/)** - This page is better but still messed up while explaining the difference. In the start it says

> Authentication confirms that users are who they say they are. 

> Authorization gives those users permission to access a resource.

But then in the next section under Authentication they are saying

> Giving someone permission to download a particular file on a server or providing individual users with administrative access to an application are good examples of authentication.

Giving someone permission comes under authorization and not authentication.

* **[Javatpoint](https://www.javatpoint.com/authentication-vs-authorization)** - Another article which touches over the same definition. Though this one gives you some examples of authentication and authorization but that doesn't seem to help much.

* **[aboutssl.org](https://aboutssl.org/authentication-vs-authorization/)** - Mostly its the same as the javatpoint's article but with slight improments. There main takeaway is 

> Authentication is used for the verification process to identify user’s credentials, and Authorization is used for validating user’s rights to access the resource. 

> Authentication is the first step, and after that, Authorization takes place.

# Is authentication related to authorization?

Generally its said that authentication is followed by authorization which is because how most services or apps are developed. You can even perform authorization without authentication.

## Authorization without authentication? 
You want to create a web site whose admin page is only accessbile to people visiting from Europe servers. Though its totally an absurd requirement, but its just for understanding the concept.

You can analyze the IP address and evaluate if this IP is in Europe or not, and thereby showing the visitor a different page. For all other outside users you can show another page where they won't be able to change anything.

This is also kind of authrorization. We have not done any authentication, rather we are just checking the permissions of the users based on their IP addresses. Of course, anybody can use a VPN and switch to an Europian IP address, but then as I mentioned, its a non-sense requirement.

## Authorization after authentication?
Lets say you unlock your mobile phone using your fingerprint. Is it authentication or authorization? If its authentication then any action after this would fall under authorization? After unlocking the phone, you try to access facebook app which is passcode protected, is it athentication or authorization? After unlocking the app you have to login with your facebook username and password. Is that again authentication?

We need to understand that authentication and authorization are two independent processes which can occur many times based on what you are doing. Because of how our systems are built, mostly authorization comes after authentication but thats not always true.

Quoting from [html spec for 403 Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)

> If authentication credentials were provided in the request, the server considers them insufficient to grant access.  The client SHOULD NOT automatically repeat the request with the same credentials.  The client MAY repeat the request with new or different credentials.  However, a request might be forbidden for reasons unrelated to the credentials.

One more thing we need to understand is that when we say authorization comes after authentication, we generally put it from the perspective of one service/system. So in this example, the phone is one system in which there is app management system which then opens an app which itself could be called as a system. Even in this trivial example we can see 3 layers of systems. Here are a few actions that the user can do in different layers with authentication and authorization done.

### Mobile Phone layer
* **Authenticated**
  * Can access the phone homescreen
  * Can click on icons
  * Can see what is there on the homescreen

* **Authorized**
  * Can remove an app
  * Can change the wallpaper
  
### App Layer
* **Authenticated** 
  * Can see the app homepage
  * Can switch to different screens within the app

* **Authorized**
  * Can post something from the app
  * Can open camera from the app

### App Service layer
* **Authenticated**
  * Can see the homepage of the logged in user
  * Can view profile page

* **Authorized**
  * Can update the own profile

The above points are just illustrations of what authentication and authorization would mean in general sense on every layer. When we are working with enterprise systems, there can be several layers and each layer could have its own authentication and authorization mechanism.

# 401 vs 403
Lets come to the technical implementation for this concept. As always status codes are just standards that have been built over time so that its easy to integrate new systems. You can always have your own codes but while using any software you need to follow standards to achieve efficiency.

HTTP spec gives us some special codes which determine whether the user is authenticated and authrorized. Sadly the naming has made it more confusing.

* [HTTP 401](https://tools.ietf.org/html/rfc7235#section-3.1) - Though this is about authentication, the status message is `401 Unauthorized`. This code represents that the system is unable to validate the user.
* [HTTP 403](https://tools.ietf.org/html/rfc7231#section-6.5.3) - The message is `403 Forbidden`. This code represents that the server got the request but because of some reasons like permissions etc, it is unable to process it.

> End

