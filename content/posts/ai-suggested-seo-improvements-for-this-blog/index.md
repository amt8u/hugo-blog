---
title : AI Suggested SEO Improvements for This Blog
url : ai-suggested-seo-improvements-for-this-blog
description : A practical walkthrough of SEO improvements applied to this Hugo blog — robots.txt, structured data, sitemap config, OpenGraph fixes, and more — identified and implemented with AI assistance.
date: '2026-05-28T10:57:00+05:30'
draft : false
tags : ['seo', 'hugo', 'blog', 'meta', 'web']
keywords : ['hugo seo', 'hugo blog seo improvements', 'schema.org json-ld hugo', 'hugo sitemap config', 'opengraph hugo', 'hugo robots.txt']
thumbnail : "images/seo-improvements.svg"
images : ["images/seo-improvements.svg"]
---

I asked an AI assistant to audit this blog for SEO issues and implement fixes. This post documents every change that was made, why it matters, and where to learn more.

The blog is built with [Hugo](https://gohugo.io/) using a custom fork of the [hugo-coder](https://github.com/luizdepra/hugo-coder) theme, deployed on Netlify.

---

# What Was Audited

The audit covered four areas:

1. Hugo configuration (`config-hugo-coder-custom.toml`)
2. Theme layout templates (`layouts/`)
3. Content frontmatter (per-post metadata)
4. The default archetype for new posts

---

# Changes Made

## 1. Enable `robots.txt` Generation

**File:** `config-hugo-coder-custom.toml`

```toml
enableRobotsTXT = true
```

Hugo does not generate a `robots.txt` by default. Without it, search engine crawlers get no guidance on which pages to index or avoid. Enabling this setting causes Hugo to auto-generate a `robots.txt` at the site root based on your content structure.

**Why it matters:** `robots.txt` is one of the first files a crawler fetches. Without it, Googlebot proceeds with no restrictions, which is generally fine, but having it explicitly present signals a well-maintained site. You can also extend it later to block crawling of specific paths (e.g. draft preview URLs).

> Reference: [Google — robots.txt introduction](https://developers.google.com/search/docs/crawling-indexing/robots/intro)

---

## 2. Enable `enableGitInfo`

**File:** `config-hugo-coder-custom.toml`

```toml
enableGitInfo = true
```

Hugo can read git commit metadata to automatically set the `lastmod` date for every page — without you manually adding `lastmod:` to each post's frontmatter. This is especially useful for a blog with 100+ posts.

**Why it matters:** Google uses `lastmod` in sitemaps as a signal for recrawl prioritisation. Pages with a recent `lastmod` are more likely to be recrawled sooner when content changes. Without `enableGitInfo`, the `lastmod` falls back to the build time, which is misleading.

> Reference: [Hugo Docs — Git Info Variables](https://gohugo.io/methods/page/gitinfo/)

---

## 3. Explicit Sitemap Configuration

**File:** `config-hugo-coder-custom.toml`

```toml
[sitemap]
  changefreq = "monthly"
  priority = 0.5
  filename = "sitemap.xml"
```

Hugo generates a sitemap automatically, but without explicit configuration the `changefreq` and `priority` fields are omitted. Adding them gives crawlers a hint about how often content changes and its relative importance.

**Why it matters:** While Google has [stated](https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping) that it largely ignores `priority` and `changefreq`, Bing and other crawlers still respect them. More importantly, making the sitemap configuration explicit makes it easier to override per-section if needed in the future.

> Reference: [Hugo Docs — Sitemap Templates](https://gohugo.io/templates/sitemap/)

---

## 4. Remove Unused Language (pt-br)

**File:** `config-hugo-coder-custom.toml`

The `hugo-coder` theme ships with a Portuguese (`pt-br`) language example in its sample config. This blog has no Portuguese content, but the language block was present, which caused Hugo to generate `<link rel="alternate" hreflang="pt-br">` tags on every page.

**Why it matters:** `hreflang` alternate links pointing to non-existent URLs are a known crawl issue. Google's Search Console flags these as errors, and they waste crawl budget by signalling URLs that return 404. Removing the unused language block eliminates this entirely.

> Reference: [Google — hreflang and alternate pages](https://developers.google.com/search/docs/specialty/international/localized-versions)

---

## 5. Improved Global Site Description and Keywords

**File:** `config-hugo-coder-custom.toml`

**Before:**
```toml
description = "amt8u's blog"
keywords = "blog,developer,personal"
```

**After:**
```toml
description = "cybercafe.dev — a personal blog by amt8u covering web development, JavaScript, DevOps, gaming, gadget reviews, and tech experiments."
keywords = "blog,web development,javascript,devops,gaming,tech reviews,hugo,nodejs"
```

These values are used as fallbacks when individual posts do not have their own `description` or `keywords` in frontmatter. The old values were too generic to be useful in search results.

**Why it matters:** The `description` meta tag is what Google typically shows as the snippet under your page title in search results. A vague description like "amt8u's blog" does not give a user any reason to click. Specific, keyword-relevant descriptions improve click-through rate (CTR).

> Reference: [Google — Control your snippets in search results](https://developers.google.com/search/docs/appearance/snippet)

---

## 6. Improved Homepage `<title>` Tag

**File:** `themes/hugo-coder-custom/layouts/_default/baseof.html`

**Before:**
```html
<title>{{ block "title" . }}{{ .Site.Title }}{{ end }}</title>
```

**After:**
```html
<title>{{ block "title" . }}{{ if .IsHome }}{{ .Site.Title }} — Web Dev, Gaming &amp; Tech by amt8u{{ else }}{{ .Site.Title }}{{ end }}{{ end }}</title>
```

The homepage was rendering as just `cybercafe.dev` in browser tabs and search results. Individual post pages correctly render as `Post Title · cybercafe.dev` via their own template override. The fix only affects the homepage — post titles are unchanged.

**Why it matters:** The `<title>` tag is the most heavily weighted on-page SEO element. For the homepage specifically, it is what appears as the blue link in Google results. A descriptive title helps both relevance ranking and user click-through.

> Reference: [Google — Title link best practices](https://developers.google.com/search/docs/appearance/title-link)

---

## 7. JSON-LD Structured Data (Schema.org)

**File:** `themes/hugo-coder-custom/layouts/partials/head/jsonld.html` *(new file)*

The theme already included Hugo's built-in OpenGraph and Twitter Card templates, but had no [JSON-LD](https://json-ld.org/) structured data. A new partial was created and wired into `extensions.html`:

- **Homepage** gets a `WebSite` schema with `name`, `url`, `description`, and `author`
- **Every post** gets a `BlogPosting` schema with `headline`, `description`, `url`, `datePublished`, `dateModified`, `author`, `publisher`, and `image`

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "datePublished": "2026-05-28T10:57:00+05:30",
  "dateModified": "2026-05-28T10:57:00+05:30",
  "author": { "@type": "Person", "name": "amt8u" },
  "publisher": { "@type": "Organization", "name": "cybercafe.dev" }
}
```

**Why it matters:** JSON-LD is Google's preferred format for structured data. It enables **rich results** in Google Search — things like article dates, author names, and breadcrumbs displayed directly in the SERP, which increases visibility and CTR without any ranking signal change. OpenGraph handles social sharing previews (Facebook, LinkedIn, Slack etc.) but does not contribute to Google rich results.

> References:
> - [Google — Understand how structured data works](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
> - [Schema.org — BlogPosting](https://schema.org/BlogPosting)
> - [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## 8. Per-Post SEO Frontmatter (Casio Review Post)

For the article `the-real-review-of-casio-g-shock-gbx-100`, several specific issues were fixed:

### a. Improved `description`

**Before:** `An honest review of the Casio G-Shock GBX-100..`

**After:** `A real-world review of the Casio G-Shock GBX-100 — MIP display, step counter, 1-year battery life, notifications, and whether it is worth buying in India at Rs 12000.`

A good meta description is 120–155 characters, includes the primary keyword naturally, and reads like a human wrote it for a human — not stuffed with keywords.

### b. Added `keywords` to frontmatter

```yaml
keywords : ['casio g-shock gbx-100 review', 'gbx-100 india', 'g-shock step counter', 'mip display watch', 'casio watch battery life']
```

While Google [no longer uses the keywords meta tag](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag) for ranking, Bing still does, and having them defined per post is good practice for content clarity and consistency.

### c. Fixed `thumbnail`/`images` extension mismatch

```yaml
# Before
thumbnail : "images/casio-g-shock-gbx-100.jpg"
images : ["images/casio-g-shock-gbx-100.jpeg"]  # wrong extension

# After
images : ["images/casio-g-shock-gbx-100.jpg"]
```

The `images` field is used by Hugo's built-in OpenGraph template to set the `og:image` meta tag — what appears as the preview image when the post is shared on social platforms. A wrong extension produces a broken image URL in the OG tag, meaning no preview image on LinkedIn, Twitter, or Slack.

### d. Added alt text to all images

All images with empty alt text (`![]()`) were updated with descriptive text. Example:

```markdown
![Casio G-Shock GBX-100 front view](./images/IMG_8220.jpeg)
```

**Why it matters:** Alt text serves two purposes — accessibility for screen readers, and Google Images indexing. Google uses alt text to understand what an image depicts. Descriptive, keyword-relevant alt text can drive traffic from Google Images and improves overall page relevance signals.

> Reference: [Google — Image SEO best practices](https://developers.google.com/search/docs/appearance/google-images)

---

## 9. Updated Default Archetype

**File:** `archetypes/default.md`

**Before:** Only had `title`, `date`, and `draft`.

**After:**

```yaml
---
title : '{{ replace .File.ContentBaseName "-" " " | title }}'
url : '{{ .File.ContentBaseName }}'
description : ''
date: '{{ .Date }}'
draft : true
tags : []
keywords : []
thumbnail : ""
images : []
---
```

Every new post created with `hugo new posts/my-post` now includes all SEO-relevant frontmatter fields pre-populated, so they cannot be accidentally omitted.

---

## 10. Thumbnail Image for This Post

As a practical demonstration of the image-related improvements above, a thumbnail was created for this very article and set in the frontmatter via `thumbnail` and `images` fields.

![SEO improvements thumbnail for this article](./images/seo-improvements.svg)

The image was generated as an SVG and visually represents the key concepts covered in this post — a search bar, rising bar chart, an upward trend line, and floating SEO-related terms (`<meta>`, `robots.txt`, `sitemap.xml`, `JSON-LD`, `og:image`, `schema.org`). Using SVG keeps it resolution-independent and adds no external dependencies.

The `images` frontmatter field ensures it is picked up by Hugo's built-in OpenGraph template as the `og:image`, so when this post is shared on social platforms it renders with a meaningful preview instead of a blank card.

---

# What Still Needs Attention

- **~86 posts are missing a `description`** — they fall back to the auto-generated `.Summary` (first 70 words). These need to be written manually, one post at a time. There is no automated shortcut that produces quality descriptions.
- **Image alt text** on older posts — only the new Casio post was fixed. Other posts with images should be reviewed similarly.
- **No analytics configured** — the config has placeholders for Google Analytics, Plausible, GoatCounter etc., all commented out. Without analytics you cannot measure the impact of these SEO changes.

---

> End
