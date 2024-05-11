# Warning
First I will talk about the recommended way which apparently didn't work for me, but I figured out another approach which was best suited for my requirement.

# The need
Since I have my blog up and running, I can now focus on creating articles which might involve some working examples. Its always helpful to present the reader with a live example where he could test out the working. I will be writing on various topics from simple javascript concepts like hoisting, inheritance etc to complex full scale apps involving various libraries and deployment cycles.

For trivial things like code snippets, the best way right now would be a codepen snippet. Easily shareable and maintainable. With the amount of configuration available, you can tecnically create full projects on it too.

But I wanted to have more control where I can host apps and maybe in future host services too, which would connect to the app for data management.

# Github pages
Github would be the best option if you have static files to deploy. It does provide jekyll build though. I have not used it till now and not sure if github supports npm/yarn builds. A good article about github pages can be found [here](https://blog.kushalbhalaik.xyz/github-pages-a-comprehensive-guide-w-images-part-2/).


# Netlify
After using netlify for sometime, I could say that for static sites its one of the easiest platforms to use. Specially the interface. You just need to authorise your github account and done. With every push you will get a new build deployed.

It supports various frameworks like *react*, *vue*, *next*, *gatsby* etc. I won't say it is a zero config platform, but definitely a convenient one. There are other features that I like about netlify - 

* Auto deployment
* Free and *automatic* SSL configuration
* Smooth custom domain integration
* Generous limits for free tier
* Forms submission - Though I am yet to try it out

So basically in layman terms - You commit your change in some `.jsx` file and push it to your repository, netlify will trigger the build on their server and publish the build folder to make your site live.

# The repository connection
Netlify's model is built around the thought - **One site for one repo**. And my requirement contradicts that thought. 

* Have single main repository deployed on one site
* Have other repositories deployed on sub-directories

The second requirement cannot be fulfilled because netlify doesn't allow deploying on sub directories. Though with mono repo support just added which allows deploying parts of a single repo on different sites.

# Proxies
While searching over my options I landed up on a community [post](https://community.netlify.com/t/support-guide-can-i-deploy-multiple-repositories-in-a-single-site/179) which presented to me a new config option - Proxies.

What proxy does is essentially re-directs your http request to another URL without changing the original URL. So for the browser it would look like that the response is from the same server but internally netlify connects with different website.

At first glance it looked like this solved my problem. I could create re-direct rules in my main repo while I can host my other apps on netlify with their `.netlify.app` URL. The main repo will serve a homepage and sub-paths would serve other projects.

# Redirect rule
You need to create a plaintext file `_redirects` in your main repo. While deploying the repo, netlify will read the redirect configuration and will create internal redirects.

```yaml
/speed-maths/*  https://speed-maths.netlify.app/:splat  200
```

But the problem with this approach is that the first page would be served perfectly, but the other links on the page will break. For example, the static file links such as css and js files will have a malformed URL. 

This problem could be solved by deploying the project in sub directory and would need changes in many places. It would also mean that you will have to change the config for each repo every time if you would want to deploy them on their own site.

There is a [workaround](https://github.com/facebook/create-react-app/issues/165) though but that also would need a sub-directory to be created.

# Final solution
I am still trying to search for a better solution but for now I used the below approach to deal with it
* Keep your repos as it is
* Build projects locally by changing the `homepage` in package.json to "."
* Add the `build` folder to main repo
* Update main repo with new links
* Push the main repo
* Netlify will auto deploy to one main site

Do note that you may want to revert the `homepage` property change in package.json if you would like to keep the absolute URLs in your build. More info available on [CRA docs for relative paths](https://create-react-app.dev/docs/deployment/#building-for-relative-paths)

With this procedure, there is only one caveat, that I will lose the netlify's auto build feature. But at least I would get the site to work as per my requirement.

Now my demo site to complement all my articles with its own namespace is [live](https://cybr.cafe).

> End