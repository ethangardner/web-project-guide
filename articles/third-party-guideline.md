---
layout: article
title: Third Party Guidelines
date: 2023-06-13
teaser: Balancing the business needs with user experience when using third party tools.
tags:
- Third Party
- Web Performance
audience:
- Developers
- Marketing
- Researchers
---
Third party scripts can be beneficial pieces of information or important features for a site. While these features can be great additions for users and provide information on how users are interacting with our online products, they also come at a site performance cost and must be balanced to make sure the user experience is preserved.

The type of product the third party script provides should inform how it goes on our site.

## Content-oriented
Content-oriented third parties are mechanisms we might use to deliver our content to a user within page feature or the article body of a site. This includes vendors and products such as:

  - YouTube
  - Brightcove
  - Libsyn
  - Fireworks
  - ChatGPT
  - etc

It also includes personalization, which we introduced for promotional purposes in the form of Omeda user journeys.

Other types of third party products that fit into the content-oriented category you may have seen around the internet include reviews (e.g. Trustpilot) or comments (e.g. Disqus), although we currently do not use third party comments or reviews on our sites.

## Revenue Generating
Revenue generating third parties are ads, plain and simple.

These include vendors such as:
  - Google Ad Manager
  - Teads
  - Nativo
  - Prebid

## Site Intelligence
The largest category in terms of number of vendors is the site intelligence category. These are tracking scripts we place on our sites to get information about how people are using our products.

- User research and revenue attribution
  - Google Analytics
  - Pinterest Tag
  - Facebook Pixel
  - TikTok Analytics
  - Olytics
  - Heap analytics
  - Survey Gizmo
  - etc
- Experimentation and Testing
  - Google Optimize
  - VWO
- Real User Monitoring
  - Cloudflare Analytics
- Session Replay and Heatmaps
  - Hotjar

With the move in 2022 to Google Tag Manager, there are some guidelines we'd like to adhere to for new third party additions that fit into the user research category.

### Questions to ask yourself
#### Do we have anything currently that provides the  information you're looking for?
Particularly with analytics, there are a lot of different packages we use to get data about how someone uses our site. If there is already a product on the site that tells you what you need to know, we favor that approach instead of adding another vendor's analytics package. If it's a question of accessing this information, we are happy to help get you what you need.

#### What pages does the tool need to be active on?
We favor an approach where we implement third party tools only on the page templates where they are needed. For example, if you want to see session replay for the project guides, the session replay package would only need to be active on project guide pages and *not* on other pages like the home page, category pages, or standard article pages.

#### When the contract expires, will I tell someone so the tool can be removed from the site?
Pretty please do this. Code from vendors we no longer use has a habit of sticking around on the site like an old can of paint. If we don't use a product, it competes for bandwidth with other things that we do use.

### Questions to ask the vendor
When you're assessing a new tool, here are some questions to ask the vendor.

#### How is it implemented?
Usually, the vendor provides a will give you a snippet of JavaScript or a script tag that goes on the page. If this is the case, the script tag should be able to accommodate the following:

- Able to be loaded with Google Tag Manager, ideally with a [native tag configuration](https://support.google.com/tagmanager/answer/3281060?hl=en).
- Does not use `document.write()`
- Can be used with `async` or `defer`
- Is [optimized for bfcache](https://web.dev/bfcache/#optimize-your-pages-for-bfcache)
- 2 or fewer variables introduced into the global scope
- Any CSS used by the third party should be scoped using high specificity, a scoped selector, or by compiled CSS module.
- Compliant with current user privacy data regulations and laws
- Does not use synchronous XHR

It is often the case that the vendor will provide hosting for the script and request that it be loaded from one of their domains. If that is the case, the following statements should be true:

- Assets are served with appropriate content-type header. e.g. `text/javascript` for JavaScript files, `text/html` for HTML files, and `text/css` for CSS files.
- Assets are served over HTTPS using HTTP/2 or greater
- Uses a Content Delivery Network (CDN) for delivery
- Assets are loaded from 2 domains or less
- Does not use redirects
- All assets are served with compression such as gzip or brotli. The total combined transfer size of all assets after compression should be < 50kb.
