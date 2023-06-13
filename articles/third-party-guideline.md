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
Third party scripts can provide beneficial pieces of information or important features for a site. While these features can be great additions for users and provide information on how users are interacting with our online products, they also come at a site performance cost and must be balanced to make sure the user experience is preserved.

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
#### Do we have anything currently that provides the information you're looking for?
Particularly with analytics, there are a lot of different packages we use to get data about how someone uses our site. If there is already a product on the site that tells you what you need to know, we favor that approach instead of adding another vendor's analytics package. If it's a question of accessing this information, we are happy to help get you what you need.

#### What pages does the tool need to be active on?
We favor an approach where we implement third party tools only on the page templates where they are needed. For example, if you want to see session replay for the project guides, the session replay package would only need to be active on project guide pages and *not* on other pages like the home page, category pages, or standard article pages.

#### How does the tool support business goals?
Is there a business cost associated with not using the tool. In other words, is there some critical, actionable insight we will miss without the information collected by the product. If there isn't something really important to be gleaned from the information the tool collects, consider if it's really needed. 

#### What is the vendor's incident response policy?
Many of these vendors in this category collect data. If there was a data breach, it still reflects poorly on us, even if the breach happened on the vendor's side. Do we have a clear communication channel with the vendor to address any emergencies or urgent support needs?

#### Who is their largest client?
We want to make sure the vendor has the ability to accommodate our scale. We don't have to be their smallest client, but we don't want to be their largest either because that has product reliability implications.

#### What is the typical use case for their product?
If our intention with their product isn't one of the core use cases, we might have to fight with the product to get it to do the things we need it to do. There might be a better tool out there on the market already that would allow us to do things without friction.

#### When the contract expires, will I tell someone so the tool can be removed from the site?
Pretty please do this. Code from vendors we no longer use has a habit of sticking around on the site like an old can of paint. If we don't use a product, it competes for bandwidth with other things that we do use.

### Questions to ask the vendor
When you're assessing a new tool, here are some questions to ask the vendor. Usually, the vendor will provide a snippet of JavaScript or a script tag that goes on the page. If that is the case, there are certain conditions that should be met that indicate the quality of the product. The following list of questions was assembled using guidance from government organizations, as well as the input of several trusted engineers who work at some impressive companies (e.g. Google, Fastly, Akamai, Speedcurve, and Estée Lauder). The questions were tweaked to be more or less in line with the vendors who are already on our sites to best meet Taunton's needs.

You can use the following script in an email to the vendor as you're assessing their product:

#### Sample script

Hi {vendor/sales rep},

I'm interested in your product. I know that most products will provide a snippet of JavaScript to put on the site, but our development team has asked us to make sure that you can answer "yes" to all the criteria below:

- Is the product able to be loaded with Google Tag Manager, ideally with a [native tag configuration](https://support.google.com/tagmanager/answer/3281060?hl=en)
- There are no calls to `document.write()` or the browser's `console` methods
- The script can be used with `async` or `defer` on the script tag
- Your product is [optimized for bfcache](https://web.dev/bfcache/#optimize-your-pages-for-bfcache)
- 2 or fewer variables are introduced into the global scope
- Any CSS is scoped using high specificity, a scoped selector, or by compiled CSS module
- The product and data collection are compliant with current user privacy data regulations and laws
- The product is compliant with the current accessibility regulations and laws, particularly Section 508 and WCAG standards
- There are no uses of synchronous XHR
- The product CSS does not set a `z-index` > 10 on any element

If the script is to be hosted on your domains can you also answer "yes" to all the following:

- Assets are served with appropriate content-type header. e.g. `text/javascript` for JavaScript files, `text/html` for HTML files, and `text/css` for CSS files
- Any assets loaded by your product are served over HTTPS using HTTP/2 or greater
- Your product uses a Content Delivery Network (CDN) for delivery of its assets
- Assets are loaded from 2 domains or fewer
- Does not use redirects
- All assets are served with compression such as gzip or brotli
- Is the total combined transfer size of all assets after compression < 50kb

If you can answer "yes" to all the criteria above, I'd like to {whatever your next steps are}.

Thanks,
{Your name}

#### What is their track record?
Conduct thorough due diligence before integrating any third-party JavaScript into the website. Consider factors such as reputation, reliability, security, and performance track record of the provider. Give preference to trusted vendors with a proven history of delivering reliable and well-performing scripts.

If you have adhered to this process and get satisfactory answers to all the above questions, then chances are good we are looking at a quality product that might provide us with a better picture of how people are using our sites.
