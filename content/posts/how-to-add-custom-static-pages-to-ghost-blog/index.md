---
title : How to add custom static pages to ghost blog
url : how-to-add-custom-static-pages-to-ghost-blog
description : Ever in need of adding custom pages to your ghost blog integrated with your theme and menus. Here I present a step by step guide to add pages with minimal effort.
date : 2020-07-28
draft : false
tags : ['ghostjs', 'html']
thumbnail : "images/amt8u-bike.jpg"
---

![Feature Image](https://images.unsplash.com/photo-1588200908342-23b585c03e26?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2000&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ)

Ghost has a feature in the admin area to create custom pages. But those pages are only limited to ghost editor. You can add content to those pages in the same way as you edit a post.

# Who needs custom pages?

If you want to create an alternate site structure or if you want to have a personalized homepage with animations and all, maybe to demo your working examples or as some experiments you are doing, you need to integrate those with ghost system.

Of course when the hosting is under your control, you can always put in your static pages directly on the server and add links in any of the posts. You can even put your pages on a totally different sub domain.


But in that case, your pages will be totally outside ghost and there will be no integration possible except link sharing. Having pages as a part of ghost gives you a better integration and easier maintainability.


* Static pages will have same theme across the site
* Static pages can also have accompanying data from a page available like tags etc
* The assets will be managed by ghost theme helpers which help in better caching
* Static pages will get all the metadata automatically for SEO
* And the most important thing is every page will be a part of the site

A live demo for a static custom page on my blog [cybercafe.dev](https://cybercafe.dev/game/cricket-fielding-positions/)

# Step by step guide to build a custom page for ghost blog.

### Step 1 - custom routes

Custom routes gives you the power to create custom templates within the theme and map specific URLs to a template. As you must already be aware that a template is nothing but a handlebars file `.hbs`. You can write anything in the page and the route will load that page for you. To add new entries to your routes, download the current `routes.yaml` file from Admin's Labs page under Beta feature category.

It should be something like below. `routes` will be empty if you haven't yet setup any pages before.

```yaml
routes:

collections:
  /:
    permalink: /{slug}/
    template: index

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/
```

Add new entry to routes like below. 

```yaml
routes:
  /any/url/you/like: custom-template
```

* URL can be anything that does not conflict with any existing page
* `custom-template` can be any template you created in the theme
* The template does not needs `.hbs` extension

After this the url will behave as a permalink to your custom-template page. Learn more about custom routes on official docs https://ghost.org/docs/api/v3/handlebars-themes/routing/routes/


### Step 2 - Custom template

Create a file in the theme directory with the `custom-template.hbs`. Add generic header and footer partials if you intend to have a consistent look. Otherwise you can always ignore that.

```handlebars
{{!--
Author: amt8u
Date: 28 July 2020
This template is used for custom page. If you would like to render this as a page-template, 
create a page with the same slug that this template will be using in the routes.yaml
--}}

{{!-- The tag below means: insert everything in this file
into the {body} of the default.hbs template --}}
{{!< default}}

{{!-- Special header.hbs partial to generate the <header> tag --}}
{{#page}}
  {{> site-header}}
{{/page}}

{{!-- The main content area --}}
<main id="site-main" class="site-main outer">
        <h2 class="game-header">Do you know all cricket positions?</h2>
        <div class="container" >
            <section id="chart-container"></section>
            <section id="score-container"></section>
        </div>
    
</main>

<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="../../assets/js/game/cricket/data.js" defer></script>
<script src="../../assets/js/game/cricket/index.js" defer></script>

```

Since I am not using any module manager for this example, I had to include the `defer` attribute so that my custom scripts run only after the scripts from CDN are executed. But hold on, this would not work now. We need to update our `gulpfile` to enable the task runner to bundle our custom assets in the built directory. We would see that in the next step.

### Step 3 - Add assets

Now that we have created a custom template, its time to add other assets like js files.

Create few js files under any directory. I used the `/assets/js/game` directory.

One way to add static assets is to just add new files under `/assets` directory, but with that done, your js bundle will become larger and will be downloaded everytime with every page. What you need is that download scripts only when the page is loaded.

Here you can utilize the power of bundler tool whichever you are using or the theme came with. Since `casper` uses gulp as a task runner, we need to update our `gulpfile.js`

```js
function customjs(done) {
    pump([
        src([
            // pull in all custom js files
            'assets/js/game/*/*.js'
        ], {sourcemaps: false}),
        dest('assets/built/custom', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}
```

As a side note, since this is for demo purpose, I have removed the **uglify** and **concat** tasks which are used by the existing `jsWatcher` in the `gulpfile.js`.

Add a watcher if you want to reload the build everytime you make a change in any custom file

```js
const customjsWatcher = () => watch('assets/js/**', customjs);
```

Add the custom files to existing watcher

```js
const watcher = parallel(cssWatcher, hbsWatcher, jsWatcher, customjsWatcher);
```

Add the customjs task to build task so that the files will be added while building the project. If you ignore this, your local live environment will work, but your theme's zip file will not have the required js files.

```js
const build = series(css, js, customjs);
```

Once this is done, your page is ready to load. Start your ghost instance and theme dev tool

```bash
ghost start
```

```bash
yarn dev
```

### Step 4 - Deploy theme

Create a zip file for your theme using 

```bash
yarn zip
```

Upload the theme using the Ghost admin panel and it should work. Couple of points though. For me the header was not rendering. To get that to work, I had to render the page with a page-template. This can be done as below

Add custom route with a pre defined context

```yaml
routes:
  /game/cricket-fielding-positions/: 
    template: custom-template
    data: page.cricket-fielding-positions

collections:
  /:
    permalink: /{slug}/
    template: index

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/

```

By specifying the data attribute, we are saying to ghost that push all data available for the cricket-fielding-positions page to this custom template. Now in the template you will have access to the page data like title, tags etc. Also you will be able to render the page with a `page template`.

```handlebars
{{!-- Special header.hbs partial to generate the <header> tag --}}
{{#page}}
  {{> site-header}}
{{/page}}
```

> End








