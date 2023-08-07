---
title: Edge-side A/B Testing
date: 2023-08-07
teaser: Testing hypotheses about UI changes at the CDN level
tags:
- A/B testing
audience:
- Developers
- Designers
---
A/B testing is an important tool for improving the performance of products and services, identifying areas for improvement, and avoiding costly mistakes. Instead of an all-in approach, A/B allows splitting traffic into test and control groups to determine if a hypothesis regarding impact is correct. This process helps identify the best version of a product or feature, so you can make informed decisions using the data collected during the test.

## Problems with previous A/B tests
Previously, A/B testing was executed using vendors like VWO or Google Optimize. These products work by using JavaScript to manage the test variations and display the proper variant to the user. These tests were incredibly easy to set up and execute, but unfortunately, the JavaScript approach significantly impacts the user experience and no information is displayed to the user until the test logic has completed.

## Server-side A/B tests
While not as easy to create tests, using A/B logic on the server is more ideal from a user perspective, and that is the approach we should employ going forward. Our approach makes use of a Cloudflare Worker, a `<template>` tag with data attributes in the application code, and Google Analytics to record the data from the tests.

Moving the logic to Cloudflare allows us to execute the tests after caching has happened and not putting additional stress on our origin server.

## Test limitations
Currently, tests are limited to one test per site running at a time. This is a deliberate limitation so there is no overlap between tests that might influence the outcome, and we can be clear what the impact of each variant is.

## How to create a test
The test need to be set up on both Cloudflare and in the application code.

### Cloudflare setup
Tests are defined in the `wrangler.toml` file in the [`cloudflare-edge-performance-enhancements`](https://bitbucket.org/tauntonintdevelopers/cloudflare-edge-performance-enhancements/src/master) worker. The test is set as an environment variable like this:

```toml
[env.staging-fww.vars]
A_B_TEST_ENABLED = true
A_B_TEST_ID = "subscribe-text"
```

The `A_B_TEST_ENABLED` is a boolean value and the `A_B_TEST_ID` is the name of the test. Each test will divide traffic in a 50/50 split between the control group and the test group.

On the initial request, the user is assigned to a group, and a cookie is set with the test ID and group information. The cookie name/value is assigned in the following format `cf-test_${A_B_TEST_ID}=(control|test)`. The cookie will persist for 2 years from the initial request.

### Application code
Tests in the application are defined using the `<template>` element with two specific data attributes, `data-cloudflare-a-b-test-id` and `data-cloudflare-a-b-test-group`.

This is what it looks like in the application code for a simple test of call to action text:

```html
<template data-cloudflare-a-b-test-id="subscribe-text" data-cloudflare-a-b-test-group="control">
    <a href="#">Subscribe</a>
</template>
<template data-cloudflare-a-b-test-id="subscribe-text" data-cloudflare-a-b-test-group="test">
    <a href="#">Start today!</a>
</template>
```

Cloudflare will unwrap the template element and keep only the contents, so it will be as if the template element is not there. Assuming the user is assigned to the test group, you will be left with this:

```html
<a href="#">Start today!</a>
```

You can and should also add GA events to the variations so clicks are recorded, and you can determine the winning variant.

### Local development
To assist with local development for the test variations, there is a small JavaScript function that will render the appropriate template based on a query string. If you don't have a query string present, the control variant will be rendered for everything.

`/?cloudflare-a-b-test-group=test` will render the test variant for _ALL_ templates on the page. `/?cloudflare-a-b-test-group=test&cloudflare-a-b-test-id=subscribe-text` will render the test variant for _ONLY_ the `subscribe-text` test and all other tests will get the control variant.

This allows us to have parity between local development and production.

## Test clean up
Once a test is completed, please remove all the test code from the application code and replace it with the winning variant. If a test is inconclusive, remove the test code and replace it with a different test or with the control variant.
