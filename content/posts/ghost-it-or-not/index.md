---
title : Ghost it or not!
url : ghost-it-or-not
summary : "I always wanted to have a personal blog so I started looking out for options. One of the options was to create one. My requirement was just to have a working site where people can read articles and probably can comment on."
author: amt8u
date : 2020-01-26
draft : false
tags : ['hosting']
thumbnail: images/IMG_20200126_093318-2.jpg
---

![painting-by-wife](images/IMG_20200126_093318-2.jpg)

I always wanted to have a **personal blog** so I started looking out for options. One of the options was to **create one**. My requirement was just to have a working site where people can `read` articles and probably can `comment` on.

My search for a simple content management system lead me to **Wordpress**. It is powerful, it is simple, gives a lot of customizations, has a pleothera of themes and millions of websites are already built on it. So its well tested and supported.

I wanted to host the blog myself but that brought a lot of challenges


* Which `host` should I choose?
* How would that impact `SEO`?
* How much it will `cost`?
* Will I be able to `maintain` it?


With my money constraints and limited time, I ended up with WordPress as I could find all affordable hosting only with LAMP stack. Node.js was way out of league.


# The first step

I started out looking for free hosting and created an account on https://000webhost.com. At that time it was giving away good amount of data with no ads. With time I tried with other free hosting options like Freehostia. Most of the options were fine but the most important thing `SEO` didn't work.

# The second step
Managing free hosting was becoming difficult. With all the data limits and 1 mysql database I always felt restricted. So I ventured around looking for **cheap hosting** services. Those were the names that were popular at that time


* **Hostinger**
* **BigRock**
* **GoDaddy**
* **DigitalOcean**
* **Bluehost**


I found hostinger the cheapest with somewhere around half a dollar a month. I could finally create multiple websites with multiple databases. I could now purchase new domains and update their nameservers and can have multiple websites to experiment with.

# The third step
I created a few sites with different wordpress installations. While putting effort in creating and configuring those, it was time for SEO optimizations. I tried with wordpress internal LiteSpeed cache. I tried cloudflare. I tried experimenting with browser's cache. But still whenever I opened my site in a fresh Chrome's private window, it took `12 seconds` to load the page.

In fact if I go to the site after a few days, sometimes it took around 30 seconds to get the first render. Subsequent fetches were fast. 

I know that you can always buy SEO optimization feature for wordpress but I did not want to go in that direction.

# The fourth step
One of my colleagues who goes by the codename [far11ven](https://www.kushalbhalaik.xyz) introduced me to **GhostJs** after learning about my experience. I was still not ready to move out to a new blogging system. In fact when I looked at the pricing on ghost's official blog, [I was thrown out](https://ghost.org/pricing/)

But then ghost being open source and has well [documented steps](https://ghost.org/docs/concepts/hosting/) to install on self hosted servers I gave it a try. Though making it work with SSL and other parts were a little tricky.

I found digitalocean to be a good host when it came to nodejs hosting. There are many in the market but I guess you have to chose one.

And it turns out that it was a good choice. Even though the site is not as blazing fast as some other [sites](https://dev.to) are. But I am satisfied for now.

# The fifth step
Static site generators - Yes you heard it right. Will do this in future when I will get time.

1. You develop your site in react. 
2. You convert it into pages. 
3. You host pages. 
4. Browser gets html/css and a little bit of js. 
5. Pages are pre-fetched. 
6. Navigation becomes instant.


# The last step
There is no such thing as the last step. The technology evolves and with it I will have to. Probably this will go on and looking at the pace the internet is growing I might have to write 50 steps soon.


> End


