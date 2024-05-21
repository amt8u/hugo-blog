---
title : Creating simple mock server using nodejs
url : creating-simple-mock-api-server-using-nodejs
summary : While developing frontend apps we often need sample data. In this article I will share a very easy way to setup a mock-server using Nodejs native http module having enough flexibility required for custom logic.
author: amt8u
date : 2021-08-11
draft : false
tags : ['nodejs']
thumbnail : images/create-mock-server-using-nodejs.png
---

# When do we need mock server?
Sometimes its not possible to connect to the backend even if you are using a proxy. Having mock-apis in hand just makes UI development easier. Sometimes you need to test your screens for various error scenarios like 404, 504 etc.

# What about json-server?
Well, it all depends on your use case. If your app follows rest principles and api calls are structured accordingly, you can always just directly spawn a new instance of [json-server](https://github.com/typicode/json-server) and it should be sufficient.

But in practice, what you need is

* Lightweight server which should not need build/deploy etc
* Should be quick to start/restart so that any file change can be done quickly
* Can load data from files depending on the route
* Can simulate service errors like 400, 403, 500 etc
* Should be de-coupled from your dev server

# Nodejs [**http**](https://nodejs.dev/learn/the-nodejs-http-module) module
Of course you can use any tech stack for the above requirements but generally front-end devs are familiar with Javascript and having a node library for the same makes it a breeze.

* Import the `http` and `fs`(optional) modules. You can always use simple strings if you don't want to deal with files.

```js
const http = require("http");
const fs = require("fs");
```

* Create constants or maybe a separate file altogether `mock-routes.json` to store the URL to data mapping.

```json
{
  "/user-service/user/1234567890": "user/data.json",
  "/user-service/user/0987654321": "user/data2.json",
  "/role-service/role/manager": "user/manager.json"
}
```

* Use `createServer` method to create an instance of the server

```js
let routes = JSON.parse(fs.readFileSync("mock-server/mock-routes.json", "utf8"));
const requestListener = function(req, res) {
  // Set contentType properly as per need
  res.writeHead(200, {"Content-Type": "application/json"});
  // Return response
  res.end(fs.readFileSync(__dirname + routes[req.url], "utf8"););
};

// pass on the request listener
const server = http.createServer(requestListener);

// set port number as per choice
server.listen(7000);
```

* Log the routes to standard output for additional debugging

```js
console.log("----- Routes -----");
console.log(routes);
console.log("----- Routes -----");
```

* If you need custom headers. You can always put this in a conditional statement.

```js
  res.setHeader("custom-header", 999999);
```

* Optional fallback if no route matched

```js
  // Read file only if route matched
  if (routes[req.url]) {
    res.writeHead(200, {"Content-Type": "application/json"});
    response = fs.readFileSync(path + routes[req.url], "utf8");
  } else {
    res.writeHead(404, {"Content-Type": "applciation/json"});
  }
```

* Set content type properly as per the resource if you want to serve data other than json

```js
  // For various static resources
  if (req.url.includes("fonts")) {
    contentType = "application/x-font-ttf";
    path = path + "/fonts/";
  } else if (req.url.includes("img")) {
    contentType = "image/svg+xml";
    path = path + "/images/";
  } else if (req.url.includes("png")) {
    contentType = "image/png";
    path = path + "/images/";
  } else {
    contentType = "application/json";
    encoding = "utf8";
  }
```

* Optionally log the hits for troubleshooting

```js
  // Output redirection path
  console.log("\n", req.url, " -> ", routes[req.url]);
```

# Start the server

```bash
node mock-server.js
```

# Output

![Server running](./images/mock-server-running.png)

# Alternatives



