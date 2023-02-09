---
layout: article
title: Browser support
date: 2022-03-15
teaser: Using analytics data to decide what browsers to support
tags:
- Browsers
audience:
- Developers
- Designers
---
Since the demise of Internet Explorer in 2022, browser support is a more fluid target than it used to be. Browser versions change on increasingly rapid schedules, with Safari being the only browser that is tied to OS updates. 

It's impractical to support browsers that have low usage, so that's where analytics comes into play. It's a manual process to review the data, but we do use analytics to help us set the policy. 

## Aggregate data
Much of our code is shared across different brands, and our browser support policy is set globally so code is portable from site-to-site. All sites support the same browsers and versions. 

To determine what should be supported, export the last 2 months of traffic from Google Analytics. 

Aggregate the browsers and major versions so that we get a total picture of usage across our properties. This should be browser by user and not by page view. The export is for all traffic (members and non-members / authenticated and non-authenticated users). If a browser and browser version is >= 0.5% of usage, it's included in our support policy. 

It's common in the industry to set support at [2% of overall usage](https://gds.blog.gov.uk/2012/01/25/support-for-browsers/), even for government services who serve an entire population. At 0.5% of usage, our policy is even more inclusive than typical.

## Managing support
We use [browserslist](https://browsersl.ist/) in our `package.json` files at the project root to hande build options. This way, CSS prefixes will be included or omitted programmatically, and we only ship what's needed in our support matrix. 

When this article was created, our browser support matrix looks like [this](https://browsersl.ist/#q=%3E+0.25%25+and+not+Android+%3C%3D+4.4+and+not+dead%2C+safari+%3E%3D+12%2C+ios_saf+%3E%3D+12).

## Polyfilling support for older browsers
Once you know what's in the support matrix, we use [caniuse.com](https://caniuse.com) to see what we can safely use for other APIs. An effort should be made to avoid polyfills. Instead, only use what is natively supported at the lowest common denominator unless it's absolutely necessary to use the polyfill.

If a polyfill is used, it should be something that can be removed from a project with minimal effort and monitored to make sure it's shipped only to the browsers who need it.

## Review
Periodically, it makes sense to review the policy. The current strategy was set in October 2022, so yearly or semiannually is a recommended touch point.
