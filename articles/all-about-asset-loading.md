---
layout: article
title: All About Asset Loading
date: 2022-05-05
teaser: When, where, and how things are loaded can impact a user's experience and page performance.
tags:
- Web Performance
audience:
- Developers
---
As the sites grow, more features and code gets introduced in order to support the evolution of the products.

What we're loading and how we're loading is particularly important for the performance of our sites, especially in the `<head>` of the site. There are a few items to be aware of when adding new packages and strategies we can use to keep the sites performant as they grow.

## How the Browser Renders a Page
This is covered at length on the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work), but here is the short version. 

The browser first connects to the domain. That means DNS lookups, TCP handshakes, and TLS negotiation. 

Once the connection is established, the browser fetches and parses the HTML to construct the Document Object Model (DOM). It then reads the CSS to construct the CSS Object Model (CSSOM). Once the DOM and CSSOM is constructed, that constitutes what is known as the render tree.

Anything that delays the construction of the render tree will delay rendering the page to the user.

## Domain Latency
If you hit a third-party domain, the browser has to perform the DNS, TCP, TLS process for each domain you connect to. This means for extra domain you hit, you pay a performance penalty.

Depending on where and how these third-party assets are loaded, they can be detrimental to the performance of a site when the code is working fine, but is absolutely disastrous when the code is not because it creates a single point of failure.

### Scenario 1: non-blocking resource that is working fine
This one is the least offensive. You pay the time penalty for DNS, TCP, TLS. In some cases, third-party resources may still use HTTP/1.1, which often result in more than 1 connection being made to the domain.

For example, Olytics is still using HTTP/1.1, and when you call the script, it injects a few more assets into the DOM. These assets being loaded over HTTP/1.1 result in multiple connections being made.

<figure>
{% image "img/http1-1-connections.png", "Waterfall chart showing multiple connections to a single origin", [null, 400, 700], ['webp', 'png'], '(max-width: 700px) 100vw, 700px', 'lazy' %}
<figcaption>The orange and purple bars represent TCP and TLS respectively. Here it happens multiple times because this vendor loads multiple assets, but their server is configured only for HTTP/1.1</figcaption>
</figure>

### Scenario 2: non-blocking resource that is down
Even if the resource is non-blocking, but is discovered before the browser's onload event, the failing third-party will delay of the browser's onload event until the connection times out.

This happened in late 2021 when the domain for Facebook's tracking pixel failed to resolve.

### Scenario 3: blocking resource that is working fine
You pay the time penalty for DNS, TCP, TLS. If you connect to 2 different resources on separate third-party domains (e.g. Google Fonts and a JS CDN), you block the site from rendering for however long it takes the connection to happen.

If each service takes 500ms to resolve, you might delay the site from rendering by a full second if those requests don't happen in parallel.

### Scenario 4: blocking resource that is down
This is the absolute worst case scenario because it will delay rendering until the service times out. It creates a single point of failure that is out of our control.

For example, here is a simulated outage of the Google Optimize service, which is served in the `<head>` in a blocking way.

<figure>
{% image "img/spof-filmstrip.png", "Filmstrip of page load difference with a control and a simulated outage", [null, 400, 700], ['webp', 'png'], '(max-width: 700px) 100vw, 700px', 'lazy' %}
<figcaption>If the Google Optimize service was down, the user would not see content until the connection times out. The first render in this test took more than 30 seconds on a desktop with a cable connection. Not good!</figcaption>
</figure>

### Solution
Self-host as much as possible. It used to be the case that browsers used to be able to share cached assets across domains. For instance, if you loaded a version of jQuery from Google's CDN, but that same file had been loaded on a different domain that the user had visited earlier, the browser used to be able to used the cached version.

**That's not the case anymore.**

Instead of connecting to [fonts.google.com](https://fonts.google.com) to load up a webfont, download the font files and host them in a subdirectory within your project. 

Instead of using a service like CDNJS or unpkg, install the code with npm and include it along with the site assets.

It doesn't make sense where we have a bunch of assets that are considered site content like videos or images, but for site chrome, it's a good idea.

## CSS
CSS is a render blocking asset. Many sites now inline their critical CSS in a `<style>` tag so the browser gets the styles needed for components in the initial viewport right away without having to wait for a file to download.

This is a good idea, but we'll have to explore more on the tooling of it so we're not creating a bunch of manual work or a maintenance issue.

In the meantime, please refer to [Writing Performant CSS](/articles/writing-performant-css/).

## JavaScript
Byte-for-byte, JavaScript is the most expensive asset on the web. Unlike other formats, JS has to be downloaded, parsed, **AND** executed. 

JS execution can call other services, inject other resources, or do computationally expensive things that make a page seem unresponsive.

### How JS is loaded matters
The best ways to combat the performance effects of JavaScript are to load less of it to begin with, but for those scripts that need to be loaded, here is the rundown.

#### In the `<head>`

- `<script src="...">` - This has an implied `type="text/javascript"` if it's absent but no defer or async attribute. It blocks render until the download is complete and code is executed. This is the default behavior in WordPress.
- `<script src="..." defer>` - not render blocking, executes right before the `DOMContentLoaded` event. 
- `<script src="..." async>` - not render blocking, executes as soon as it is downloaded. Does not preserve load order, so it's best to use if the code is a standalone library and doesn't need to fire on `DOMContentLoaded`
- `<script src="..." type="module">` - not render blocking. Deferred by default 
- `<script>console.log("whatever");</script>` - This blocks render until execution is complete.

Where possible, you should use defer for legacy code and the module version for modern browsers. 

You do need to take care that deferred scripts that provide dependencies for other scripts later in the page, that those scripts later in the page are deferred as well.

More on [script load order](https://hacks.mozilla.org/2009/06/defer/). 

#### In the `<body>`
It used to be best practice to shove code in the footer if it needed to be run later. Now, it's also a good idea to put a `defer` attribute on external script files it if it's first-party code.

- `<script src="...">` - This will block the parser from continuing until the script is downloaded and executed.
- `<script src="..." defer>` - not parser blocking.
- `<script src="..." async>` - not parser blocking.
- `<script src="..." type="module">` - not render blocking. Deferred by default.
- `<script>console.log("whatever");</script>` - This blocks parsing until execution is complete.

#### Be aware
Inline scripts with the `async` or `defer` attributes are ignored. Those attributes only work with external script sources. In other words, the following scripts are all equivalent in behavior and when they execute:

```html
<script>console.log('hi');</script>

<!-- same as: -->
<script async>console.log('hi');</script>

<!-- same as: -->
<script defer>console.log('hi');</script>
```

If you want to defer a script, you can place it in an external file or you can wrap the script with `window.addEventListener('DOMContentLoaded', function() { /* ...code here */ })`.

There **is** a documented trick that involves making contents of the inline script a base-64 URL, but it makes it harder to tell what the script actually is that way, so it should be avoided. 

### The Module/Nomodule Pattern
During the transitional time where there are browsers still in use that don't support the `type="module"` attribute on script tags, it's best to use the module/nomodule pattern, aka differential serving for external scripts unless the script is absolutely needed for first render (e.g. the GDPR library and potentially Google Optimize).

```html
<!-- for modern browsers -->
<script src="app-modern.js" type="module"></script>
<!-- for old browsers. might polyfill missing features -->
<script src="app-legacy.js" nomodule defer></script>
```

The script loader on our sites is capable of serving scripts in this way. The dual build of the script is handled by Webpack as of May 2022.

```php
<?php
// part of a larger config object, but you get the idea...
array(
    'deferred-nomodule' => array(
        'file' => get_stylesheet_directory_uri() . '/dist/js/' . gba_module_asset_path('deferred.js', 'legacy'),
        'dependencies' => array('jquery', 'vendor', 'all-js', 'webpack-runtime-nomodule', 'deferred-vendor-nomodule'),
        'defer' => true,
        'type' => 'nomodule'
    ),
    'deferred' => array(
        'file' => get_stylesheet_directory_uri() . '/dist/js/' . gba_module_asset_path('deferred.js', 'modern'),
        'dependencies' => array('jquery', 'vendor', 'all-js', 'webpack-runtime', 'deferred-vendor'),
        'type' => 'module'
    )
);
```

### Dynamic Import
If you have a large chunk of JS that is only loaded after user interaction or on certain pages, you can make use of dynamic imports to keep the initial code size down.

A great example of this is an image gallery that is only used on an article page when someone clicks an image. Instead of loading all the code eagerly, you can trigger the import and instantiate the library code on click.

This only works with code that is built with the build system that uses Webpack and will not work for legacy code.

```js
const galleryTrigger = document.querySelector('.gallery-trigger');

if(galleryTrigger) {
    galleryTrigger.addEventListener('click', (e) => {
        import('/gallery/init.js')
            .then((module) => {
                module()
            });
    });
}
```

For expensive pieces of JS, this can be one of the most beneficial optimizations we have in our arsenal.

## Fonts
Fonts can be heavy files. In many cases, the font will also block text from showing up until the file has completed downloading. 

If you're loading a webfont for headlines and another for body text in multiple weights and styles, it can add significant delay to things showing up on the screen.

### Self-host where possible
It's best to host the fonts on the same domain as the rest of the project to avoid the domain latency mentioned above.

Providers such as Google Fonts will allow you to download a zip file of the fonts to use on your site.

### Subset your fonts
Font subsetting involves only loading the characters that are necessary for your content. With content in English, alphanumeric characters and punctuation is often enough. It's not necessary to include characters from other alphabets or accented characters in most cases.

### Use variable fonts
Newer fonts will include multiple weights and variants in the same file and the browser is responsible for using the correct variant.

When you use a variable font, not only do you get a smaller file, but you also get more font weights than is practical to load with a non-variable font.

Consider the difference between Roboto Flex vs. the serving all variants and weights of the older Roboto typeface.

| Typeface                          | Total File Size |
|-----------------------------------|-----------------|
| Roboto Flex (variable font)       | 101kb           |
| Roboto (all weights and variants) | 1100kb          |


### Faux Bold and Italics
Sorry designers. If you need to shave weight, using a regular weight font and using CSS for faux bold and faux italic is an easy way to do it.

### Font Display CSS
Consider if the font is needed for the user's first visit. If there is a similar system font, you might want to serve that for the first page view and then serve the webfont on the second view when it's available in browser cache.

Using `font-display: optional;` in CSS is a good compromise for things that need to show up quickly.

See more about [font display properties](https://developer.chrome.com/blog/font-display/).
