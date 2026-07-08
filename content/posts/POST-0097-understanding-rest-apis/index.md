---
title : Understanding Rest Apis
url : rest-apis
description : Here is a blog post to understand how to design apis restful way. And most importantly what not to do!
date: '2026-01-27T11:23:20.617Z'
draft : false
tags : ['web', 'apis']
thumbnail : "images/RestApis.png"
images : ["images/RestApis.png"]
---

# What's to understand?

Everyone is writing rest apis now a days. What is there to understand about rest apis?

Apparently, there are lot of misconceptions about rest apis. There are many questions that people are not able to answer when they are asked to create new endpoints.

For example, 

* Shall I use `/users` or `/user` for the endpoint?
* What should be the url for other kind of resources?
* How to map non crud operations to the urls
* Appropriate response code for given scenarios
* How to manage versions
* How to add download functionality to existing endpoitns

## Source
Most of the reading is done from the book - REST API Design Rulebook by Mark Masse and [MDN reference page for http headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/418)

# Rest Semantics

## URIS

REST API designers should create URIs that convey a REST API's resource model to its potential client developers.

### URI Format

RFC 3986 defines the generic URI syntax. http://www.rfc-editor.org/rfc/rfc3986.txt

`URI = scheme "://" authority "/" path [ "?" query ] [ "#" fragment ]

#### Forward slash ("/") must be used to indicate a hierarchical relationship
#### A trailing forward slash should not be included in URIs
Adds no semantic value and can create confusion. Some use 301 moved permanently to make forgiving apis
#### Hyphens should be used to improve readability
Title case and camel cases all are difficult to read. Underscore also makes it difficult to see links based on the client rendering them
#### Do not use underscore
Sometimes, the underscore can get partially obscured or hidden by client's underlining, to avoid this use hyphens

`http://api.movies.com/users/amt8u/blog/understanding-rest-apis-for-the-first-time`

#### Lowercase letters should be preferred in the path section

1. `http://api.movies.com/my-blogs/my-entry`
2. `HTTP://API.MOVIES.COM/my-blogs/my-entry`
3. `http://api.movies.com/My-Blogs/My-Entry`

URI format scpefication RFC 3986 considers 1 and 2 identical. It says that scheme and host components are case insensitive, while rest can be case sensitive.

Thus, `3` is not the same as `1` and `2`.

#### File extentions should not be included in URIs
Type shoudl be referred from media type through the `Content-Type` header. Adding the file extension is just redundant. Moreover many times resources are identified by their mime type which can change based on the client server negotiation using the `Accept` header. In some cases, you can use query parameter, but don't do this.

```shell
http://api.users.com/users/1234/papers/2005/jan.json
http://api.users.com/users/1234/papers/2005/jan
```

### URI Authority

#### Consistent subdomain names
The toplevel domain and first subdomain should identify the service owner. Add a subdomain `api` to it

```sh
http://api.soccer.restapi.org
```

Many rest apis have associated website known as developer portal. If an api provides a develolper portal, by convention it should have a subdomain labeled developer.

```
http://developer.soccer.restapi.org
```

## Resource Modelling
The api path conveys a REST api's resource model with each forward slash separated path segment corresponding to a unique resources withtin the hierarchy. For example below should work for all the paths.

```
http://api.movie.restapi.org/movies/1234/cast
http://api.movie.restapi.org/movies/1234
http://api.movie.restapi.org/movies
```

Resource modelling is similar to data modelling for a relational database schema or class based modelling in OOPS.

You have to give some time to design the api paths.

## Resource archetypes

Like design patterns, archetypes helps in communicating the structure of the apis

* document
* collection
* store
* controller

### Document

Document is like object instance or database record. A singular thing.

Each URI represents a document resource

```
http://api.movie.restapi.org/movies/1234/
http://api.movie.restapi.org/movies/1234/characters/3456/
```

### collection

Server managed directory of resources. Clients can propose to add new resources. Generally specified by plural forms

```
http://api.movies.restapi.org/movies/
http://api.movies.restapi.org/movies/1234/characters
http://api.movies.restapi.org/movies/1234/credits/
```

### Store

Client-managed resource repository. Something which the api client can save arbitarily. These are not server validated. Clients can put and delete as and when they want. These do not create new resources

eg.

```
http://api.movies.restapi.org/users/1234/favorites/4567
```

### Controller

For actions which cannot be mapped to any standard method like PUT, PATCH, POST etc.
They typically come at the last segment of the URI with no child resources to follow.
eg.

```
POST /alerts/45678/resend
```

## URI Path design

The whole point of REST design is to clearly communicate the hierarchical structure of resource model

```
collection/store/document
```

`collection` contains `store`
`store` stores `document`

### Rules of 

#### Singular noun for document name

A URI representing a document resource should be named with a singular noun or noun phrase path segment

```
http://api.movies.restapi.org/movies/1234/characters/bahubali
```

#### Plural noun for collection names

```
http://api.movies.restapi.org/movies/1234/characters
```

#### Plural noun for store names

```
http://api.movies.restapi.org/movies/1234/playlists
```

#### Verb for controller names

```
http://api.movies.restapi.org/movies/1234/resync
http://api.movies.restapi.org/movies/1234/activate
http://api.movies.restapi.org/movies/1234/deactivate
```

As per chatgpt, even `activate` and `deactivate` should not be used like this. If you are just changing the state, then use a `PATCH` method

```
PATCH /movies/1234

{
    status: "enabled"
}
```
And in case if the activation results in a complex workflow which indirectly changes the state, then a better alternative is

```
POST /movies/1234/actions/activate
```

#### Variable path segments substitute by identity based values

```
http://api.movies.restapi.org/movies/{movieId}/characters/{characterId}
```

#### CRUD function names should not be used in URIs

URIs should not be used to indicate that a CRUD function is performed. URIs should only identify resources.

All below are examples of what not to do
```
http://api.movies.restapi.org/movies/create
http://api.movies.restapi.org/createMovie
http://api.movies.restapi.org/deleteMovie
http://api.movies.restapi.org/movies/1234/delete
```
## URI Query design

How to write the query params. The parameters that you see after the question mark.

```
http://api.movies.restapi.org/movies?language="hindi"
```

### Query component can be used to filter a collection

```
http://api.movies.restapi.org/movies?genre="action"
```

### Query component can be used to paginate collection

```
http://api.movies.restapi.org/movies?pageSize=10&pageOffset=2
```

When the query starts becoming complex, then you need to create a special controller (e.g. a POST request) which can accept the full complex body as input.

```
POST http://api.movies.restapi.org/movies/search
```
# Request methods

[RFC 2616](http://www.rfc-editor.org/rfc/rfc2616.txt) defines the Request-Line syntax as below

```
Request-Line = Method SP Request-URI SP HTTP-Version CRLF
```

GET - retrieve a representation of resource's state
HEAD - retrieve the metadata associated with the resource's state
PUT - add a new resource to a store or update a resource
DELETE - removes a resource
POST - create a new resource

### GET and POST must not be used to tunnel other request methods

### GET must be used to retrieve a representation of a resource

Clients count on being able to repeat GET requests without causing side effects. Caching should be handled by the headers.

### HEAD should be used to retrieve response headers

Return empty body but send the headers only. This is used when client needs to know whether a resource exists or read its metadata.

```
curl --head http://api.movies.com/movies
```

HTTP/1.1 200 OK

Like a `GET` request, a `HEAD` request may contain headers but no body.

### PUT must be used to both insert and update a stored resource

PUT must be used to update or repalce an already stored resource. The PUT request message must include a representation of a resource that the client wants to store.

Not quite clear about this. Will go back again later.

### `PUT` must be used to update mutable resources

### `POST` must be used to create new resource in a collection

The request body contains the initial state of the resource. An by POST it actually meant posting on a bulletin board.

### `POST` must be used to execute controllers

For anything that cannot be mapped to existing `GET`, `PATCH`, `DELETE` etc, we need to use `POST`

HTTP designates POST as semantically open-ended. It allows the method to take any action, regardless of its repeatability or side effects. 

Can include body and headers.

`POST` is unsafe and non-idempotent. Rerunning it may result in undesirable side effects.

### `DELETE` must be used to remove a resource

`DELETE` should be used to remove a resource from the collection or store. And on successful execution, the client should get `404` for the same resource after that.

It must not be overloaded i.e. you should not use `DELETE` to run some arbitary operation like execute a function which does something but doesn't delete the resource.

### `OPTIONS` should be used to retrieve metadata that describes a resource's available action

Clients may use the `OPTIONS` request method to retrieve resource metadata that includes an Allow header value. eg. 

```
Allow: GET, PUT, DELETE
```

# Response Status Codes
RFC 2616 defines the `Status-Line`syntax as shown below

```
Status-Line = HTTP-Version SP Status-Code SP Reason-Phrase CRLF
```

Status codes are divided uinto 5 categories

1. Informational - Transfer protocol level information
2. Success - Indicates request was accepted successfully
3. Redirection - Indicates that the client must take some additional action in order to complete the request
4. Client error - Obviously
5. Server error - Server says - something wrong with me only

`200` - Should include a response body

`201` - In case of `POST` calls, server should return this to indicate successfull resource creation

`202` - To indicate successful start of an async action. Generally to be sent by controller resources.

`204` - "No Content" should be used when the request body is intentionally empty.In response to a `PUT`, `POST` or `DELETE`. An api may send `204` in a `GET` request as well to indicate that the reqeusted resource exists but has no tstate representation to include - Not sure what this means though :-D.

`301` - "Moved Permanently" should be used to relocate resource
Incdicates that the design has changed, and resource has been moved to a new location. The nwe locatino is specified by `Location` header in the response header.


`302` - "Found" is similar to `307` Temporary Redirect. The only difference is that `307` guarantees that the client will not change the request method asnd body when the redirected request is made. With `302`, older clients incorrectly changed the method to `GET`. Will need to dig deeper into this. Not able to understand the use case. 

`303` "See Other" should be used to refer the client to different URI. URI of a response resource. Basically so that client will not need to download the state but will still have a response to refer when needed. This is used when a controller resource has finishe its work, but instead of sending unwanted body, it sends the URI of a response resource.

`304` "Not modified" should be used to preserve bandwidth. Server says that the response hasn't changed yet. Please use what you have.

This is sent when the request is conditional. `If-None-Match` or `If-Modified-Since` headers are sent and it evaluates to false. This confirms that the resource cached by the client is still valid. This is part of [HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching).

The response must not contain a body and must include the headers that would have been sent in an equivalent `200` resposne.

`307` "Temporary Redirect" should be used to resubmit the original request. The difference is highlighted in `302` section

`400` "Bad request" to indicate nonspecific value. Generic client side error when no other 4xx error is suitable

`401` "Unauthorized" when the server cannot authenticate the user

`403` "Forbidden" when the server cannot validate the permissions after authentication

`404` "Not found" must be used when a client' URI cannot be mapped to a resource

`405` "Method not allowed" when http method is not supported. A 405 response must include the `Allow` header which lists the http methods that the resource supports.

`406` "Not acceptable" must be used when the re quested media type cannot be served. If a server returns `406`, the body of the message should contain the list of available representations for the resource, alllowing the user to choose, although no standard way for this is defined.

`409` "Conflict" to indicate violation of resource state.

`412` "Precondition failed" should be used to support conditional operations. This is to tell the server to perform the reqeuest only if the conditions are met. A `412` response means those conditions were not met. This can prevent conflicts mid air collissions.

`415` "Unsupported Media Type" must be used when media type of request payloac cannot be processed. This can happen when the client sends payload as json but `Content-Type` header is missing.

`418` "I'm a teapot` is a joke and had to be continued since websites started using this in production to respond to spam requests :-D

`500` "Internal Server Error" should be used to indicate api malfunction.



> End




