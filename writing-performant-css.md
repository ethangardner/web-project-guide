---
layout: article
title: Writing Performant CSS
---
When users have a good experience, they view more content and are more engaged. It's in our best interest to put our content in the hands of our users as fast as we're able, regardless of the device they are using. 

## Mobile first
A mobile-first approach takes the most simple version of our layouts, i.e. mobile, and treats it as the baseline for all other styles. This means that we  should write CSS breakpoints with `min-width` and not with `max-width`. 

This does a few things:
- it avoids having to define complicated styles for larger screens, only to have to undo them for mobile
- it gives the mobile device less to parse
- it results in less code in general

Take a typical article layout structure as an example. On mobile, the entire layout is 1 column, but on desktop, the article body is about 2/3 of the layout and the sidebar containing ads and related content is a fixed 340px. 

The HTML might look like this.

```
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

```

__Prefer__

```css

```

https://csstriggers.com/
