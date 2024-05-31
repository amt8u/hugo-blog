---
title: Why I chose hugo static site generator for my blog
url: why-hugo-static-site-generator-for-blog
date: 2024-05-17T05:59:33.239Z
summary: What were the top reasons which made me choose Hugo over other static site generators for my blog
thumbnail: images/hugo-logo-big.png
images: ['images/hugo-logo-big.png']
tags: ['web', 'html', 'hugo']
---

# Why?
My blog was running on self-hosted [Ghostjs](https://ghostjs.org) instance since 2020. It is a good platform for bloggers. The advantage for me was that it uses handlebar templates which I was already familiar with. Moreover, it provided a clean and secure option ([unlike WordPress](https://blog.sucuri.net/2022/01/why-are-wordpress-sites-targeted-by-hackers.html)) and I can write content in `Markdown`. 

But anyway spending 5$ a month for a few static pages doesn't make much sense when you have better alternatives. One popular option was GitHub pages, but somehow I couldn't continue with Jekyll. Installing ruby is so much pain as described [here](https://www.moncefbelyamani.com/how-to-install-xcode-homebrew-git-rvm-ruby-on-mac/#step-1-install-homebrew-and-the-command-line-tools). There is even a [dedicated paid automation](https://www.rubyonmac.dev/?utm_campaign=install-ruby-guide) to get ruby installed.

In one of my previous articles I briefly touched on the subject of [creating static quiz using handlebars templates](/creating-a-simple-static-site-generator-using-handlebars). That was an attempt to create some static pages to compliment my articles on various subjects. 

## My requirements in order of priority

* **Write in markdown** - Ever since I started writing Markdown, no other format made sense to me. Even if you don't do markdown to html conversion, the raw text itself is readable enough. It frees you from platform dependent features. If you want to switch from `Ghostjs` to `WordPress`, you don't need to worry about losing embedded links etc. Just copy the text.
* **Platform-agnostic** - In some platforms, even if you are using Markdown, there may be cases where some flavour of markdown is not supported by the other platform. If you are using features like image gallery in ghostjs, you won't be easily able to replicate it in other systems. I wanted to have my content completely `isolated` from the hosting and deployment perspective.
* **Auto deploy on push** - With Ghostjs, I had to go the admin UI, write the article, copy and paste images, update several meta details and then publish. For even a small change same process again. To my surprise their posts page doesn't even have "search". You have to manually scroll and find for your published post. Since my main source of articles is the GitHub repo, I had to do multiple things. Sometimes I forget to commit the article, sometimes the content is not in sync with the deployed site. But that is fixed with providers like `Netlify` and `Vercel`. Thanks to GitHub actions workflow, I have to just commit and push my changes. The site gets auto build(Markdown to html) and deployed.
* **Content to be stored in GitHub repo** - Again, didn't want myself tied to any system and also keep an easily accessible backup for all the content, best choice for now is `GitHub`.
* **Write anywhere** - With systems such as WordPress and GhostJS, you have to write in their respective `editors` which maybe fine for some people. My requirement was that I should be able to write anywhere on any system and should not be dependent on internet.
* **Minimum cost** - Self hosted ghostjs instance costs a minimum of 5$ a month and [Ghostjs cloud pricing](https://ghost.org/pricing/) is a little on the steeper side. Having a VPS for a few static pages doesn't make much sense. Yes, the platform has features that will be difficult to integrate with static sites, but I am not going to use them. With platforms like `Netlify` which provide unlimited static sites for `free`, it makes a very good deal. Of course, you will lose a few functions here and there.

## Best static site generator for `Markdown`.
So I started looking out for the best SSG which I can quickly use. I already have my posts in Markdown format. I should be able to plug in the generator and go.

It turns out that it's not that trivial. Of course generating html from content is straight forward, but I wanted to have it `organized` as I can so that it would be easier in future to `migrate` or to add posts and pages.

A popular place to find out all the generators is https://jamstack.org/generators/ But when you have 355 options, choice becomes more difficult.

Having React experience and good knowledge of Javascript, I put my bet on [GatsbyJS](http://gatsbyjs.org/). But after completing a quick crash course I realized its not really what I was looking for. You have to first learn `graphql` and then understand how to create optimized queries to be used in the pages. Plus every gatsby theme is different and expects content to be in different structure. I did not want my content to be based on framework so that in case tomorrow I want to switch, I should not be updating my markdown content.

Just to create a template I have to create a React application with properly structured components, created optimized graphql queries, understand various plugins like images, use a css system like css-modules etc. In the end I felt it was too much work, better lookout for alternative. And not to mention the terrible Gatsby [caching issues](https://stackoverflow.com/questions/61535548/need-to-gatsby-clean-with-essentially-every-code-change). I myself faced this multiple times while building simple components.

The next popular option was [Hugo](https://gohugo.io). Did a crash course for hugo as well from [LinkedIn](https://www.linkedin.com/learning/learning-static-site-building-with-hugo-2/), but it wasn't enough to understand the nitty gritties. It was more of a getting started kind of thing. 

# Why Hugo?

Here are a few things that made me like Hugo
* **Speed** - I never thought any dev application with live reload can be so much fast. You change your content, it reloads, you change your css, it reloads. But yes, sometimes you have to stop and restart the server, but once you have the setup running, it is quite fast. In fact right now I am using the dev server to see a live preview of my article. It actually shows how it will look in the browser.
* **Dependencies** - The only dependencies for hugo are git, go and Dart Sass. Refer https://gohugo.io/installation/macos/#prerequisites. You don't need to npm install, npm update, npm list, npm last, npm lost, npm aaaaahhhh. 
* **Themes** - Eventually I end up creating my own theme, but to start with, you need to refer existing code. Especially when you don't have experience in `Go`. With so many themes available, it becomes easier to refer existing code. https://themes.gohugo.io is a good place to get a feel of what Hugo can generate. I tried almost all the themes on my local setup to see which one is the best(best as in fills all my reqs). At last, I ended up with [Archie theme](https://themes.gohugo.io/themes/archie/) which was not perfect but had all the basic things I wanted
  * Simple layouts
  * Simple config
  * No complicated processing
  * No npm dependencies
  * Dark mode toggle(Although it wasn't mentioned in the theme docs, but I found it in the code)
  * No sass, just plain simple css
  * No integration bloatware
  * Responsive
  * Had a programmer feel to it
  * Syntax highlighting for code with support for multiple styles(More on that later)

I had to tweak many things to make it fit my needs.

# Inspiration
It is really difficult to find genuine content nowadays. Everyone wants to make their site a place to earn. **Google** search and even **DuckDuckGo** don't search for what you are looking for. They provide you content for what they are getting money for, which is fair enough as I am not paying for using them. But because of this, the objective of every website owner turns towards pushing the page to be at the top of the search. And with all the [irritating Google Ads](https://cybercafe.dev/my-experience-with-google-ads/), the whole experience becomes messy. While learning Gatsby and Hugo, I tumbled upon https://512kb.club and went through many entries on this list. I found a lot of sites, mostly blogs with genuinely good content without any bloat. I also saw some cool designs. I discovered that there is a specific term `small web` for these sites where you get real content and not commercially oriented bloat.

* Coder theme  - https://qtrnn.io/2020/10/04/hello-world/
* Plain and simple - https://nih.ar
* Dark and simple - https://www.stchris.net
* Retro look - https://devcara.com
* Best ***ing website - https://bestmotherfucking.website/
* Terminal style - https://gaikanomer9.com
* Small web - https://erikjohannes.no/posts/20231122-places-to-discover-the-small-web/
* Another small web catalog - https://blogs.hn
* Interesting reads - https://nikhilism.com/post/
* Something what I also do - https://jasonthai.me/blog/2019/07/18/changes-i-made-for-my-blogs-theme/
