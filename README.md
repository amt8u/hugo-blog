# My blog in hugo
Read https://cybercafe.dev/why-hugo-static-site-generator-for-blog/ for details

# Status
[![Netlify Status](https://api.netlify.com/api/v1/badges/56b6ef1b-4b4a-4dc5-897f-c10ba037e76f/deploy-status)](https://app.netlify.com/sites/cybercafe-dev/deploys)

# Start server

Start the server with the config-archie theme. Currently, I am using this theme with extensive modifications. All the modifications are under `/layouts` directory.
`hugo server --config config-archie.toml`

# Create a post
You can use hugo command `hugo new post/hello-world.md` to bootstrap a new post, or just add a new directory under `/content/posts/`.
* Create an `index.md` file.
* Add frontmatter like below
```yaml
---
title: Creating first AWS Lambda function
url: creating-first-aws-lambda-function
date: 2024-07-01T07:05:30.760Z
summary: Hello world is just pointless. Let's dive into creating a real-world lambda function for building a web scraping tool.
thumbnail: images/lambda-logo.png
images: ['images/lambda-logo.png']
tags: ['aws', 'nodejs']
draft: false
---
```
* Add images to `/images` if needed
* Set `draft` to false or use below command to start server to show draft posts
```
hugo server -D --config config-archie.toml
```

# Deploy
Once you are satisfied with the post, just commit it and push. Netlify will auto deploy it.