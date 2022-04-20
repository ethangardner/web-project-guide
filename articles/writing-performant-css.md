---
layout: article
title: Writing Performant CSS
---
When users have a good experience, they view more content and are more engaged. It's in our best interest to put our content in the hands of our users as fast as we're able, regardless of the device they are using.

Writing performant CSS is one way we can help the page render faster.

## Mobile first
A mobile-first approach takes the most simple version of our layouts, i.e. mobile, and treats it as the baseline for all other styles. This means that we  should write CSS breakpoints with `min-width` and not with `max-width`. 

This does a few things:
- Avoids having to define complicated styles for larger screens, only to have to reset them to a simpler style for mobile
- Gives the mobile device less to parse
- Often results in less code

Take a typical article layout structure as an example. On mobile, the entire layout is 1 column, but on desktop, the article body is about 2/3 of the layout and the sidebar containing ads and related content is a fixed 340px. 

The HTML might look like this.

```html
<main class="article">
  <article class="article__body">
    Here is your article body.
  </article>
  <div class="article__sidebar">
    Sidebar content over here
  </div>
</main>
```

__Avoid__

```css
/**
 * Here we're starting with styles for large screens as the default.
 * This is bad because we're making mobile phones, who are likely to have
 * less computing power, to parse these rules when they are reset in the 
 * media query below.
 */
.article {
  display: flex;
}

.article__body {
  flex: 1;
  margin-bottom: 20px;
}

.article__sidebar {
  flex: 0 0 340px;
  margin-bottom: 20px;
}

/**
 * this max-width breakpoint overrides a previously set rule. 
 * A mobile phone would have to parse all of the above CSS only
 * to undo it in the media query below.
 */
@media (max-width: 700px) {
  .article {
    display: block;
  }
}
```

__Prefer__

```css
/**
 * We start with common styles that apply to all devices.
 */
.article__body {
  margin-bottom: 20px;
}

.article__sidebar {
  margin-bottom: 20px;
}

/**
 * Since this is min-width, it's ignored by anything with a viewport smaller
 * than 701px. Mobile would only have to parse the above CSS.
 */
@media (min-width: 701px) {
  .article {
    display: flex;
  }
  
  .article__body {
    flex: 1;
  }

  .article__sidebar {
    flex: 0 0 340px;
  }
}
```

## Be Aware of Layout Triggers
When content is displayed on screen, the browser has to perform a 3-step process known layout, paint, and composite.

- __Layout__ allocates the height and width of the element and its location on screen.
- __Paint__ draws pixels on the screen.
- __Composite__ stacks the layers on top of one another. Think of it like a z-index for the entire document.

These are computationally expensive operations, so it is best to keep anything that triggers re-layout, re-paint, or re-composites to a minimum. This is especially important for animations that can make the site feel sluggish.

For information about what CSS properties trigger paint, layout, and composites, see https://csstriggers.com/

## Dead CSS
If you are copying CSS from another site, be aware that it may not all be needed. Also, as the site ages, modules might be removed or hidden as they are no longer needed or as strategy changes.

Shipping unneeded code does nothing to enhance the site. It's only a detriment.  

Removing CSS is a tricky process because you don't want unstyled elements, but there are some things you can do to make refactoring easier.

There are a few ways to identify unused CSS:

- Use the [Code Coverage](https://developer.chrome.com/docs/devtools/coverage/) feature of devtools in Chrome.
- Run the site code against the compiled CSS using a tool like [PurgeCSS](https://github.com/FullHuman/purgecss)
- Add a beacon as a background image to your CSS file and send an analytics event to track selector usage. Credit: https://calendar.perfplanet.com/2021/css-me-not/

```css
.some-selector {
  background-image: url(1x1.png?selector=.some-selector);
}
```

Also consider if you are adding a CSS framework if you really _need_ all of it. It might be better to make a custom build to make sure that you are loading only the CSS that is needed. For example, if you are including all of Bootstrap, but only using the grids and forms, it would definitely be better to do a custom build instead.
