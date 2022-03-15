---
layout: article
title: Color Contrast Requirements
---
One important way we can meet our [accessibility commitment](https://www.taunton.com/accessibility-commitment/) is to ensure adequate color contrast in the design components created as part of our content and marketing efforts.

On the web, adequate color contrast is defined as meeting the minimum requirement in the [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/WCAG21/) AA standard. This standard applies to text that's in HTML, as well as any text that's part of an image.

This standard means there should be a minimum contrast ratio between the foreground text color and background color of: 

- **4.5:1** or greater for body text
- **3:1** or greater for large text (24px regular weight or 18.67px bold)

Black text on a white background or vice versa has the greatest possible color contrast ratio of **21:1**. 

## What is Color Contrast Ratio?
Color contrast ratio is a calculation of the difference in _[relative luminance](https://www.w3.org/TR/WCAG20/#relativeluminancedef)_, the perceived brightness or darkness of color, between two colors. [The Science of Color Contrast](https://medium.muz.li/the-science-of-color-contrast-an-expert-designers-guide-33e84c41d156) describes more than you likely ever wanted to know about color contrast.

It's worth noting that you don't need to make these mathematical calculations yourself. There are tools out there such as the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify that all colors are in compliance.

It doesn't matter which color is in the foreground versus the background, the contrast ratio between the two always remains the same.

### Examples
Solid colors are easy. Calculating the contrast ratio is as simple as taking the background color and measuring it against the foreground color.

<style>
    .figure {
        padding: 40px 20px;
    }

    .figure-text--dark {
        color: #000;
    }

    .figure-text--light {
        color: #fff;
    }

    .figure-1 {
        background: #f09684; 
        text-align: center;
    }

    .figure-2 {
        background: #133e69;
        text-align: center;
    }

    .figure-3 {
        background: linear-gradient(90deg, #2D7160 0%, #87CFBE 100%);
        text-align: center;
    }

    .figure-4 {
        background: linear-gradient(90deg, #1a3f34 0%, #35826F 100%);
        text-align: center;
    }

    .figure-5 {
        background: #000000 url({{ navigation.home | url }}img/impossible-background-image.jpeg) no-repeat; 
        background-size: cover; 
        min-height: 300px;
        text-align: center;
    }

    .figure-6 {
        background: #f4f3ef url({{ navigation.home | url }}img/perfectly-acceptable-background.jpeg) no-repeat 0 100%; 
        background-size: cover;
        min-height: 300px;
        padding-bottom: 300px;
        text-align: center;
    }
</style>

<figure>
    <div class="figure-1 figure">
        <span class="figure-text--light">#FFFFFF</span>
    </div>
<figcaption>The contrast ratio between white (#FFFFFF) and a peach tone (#f09684) is 2.23:1. This does not meet the AA minimum requirements for body text or large text.</figcaption>
</figure>

<figure>
    <div class="figure-2 figure">
        <span class="figure-text--light">#FFFFFF</span>
    </div>
<figcaption>The contrast ratio between the shade of blue (#133e69) and white is 10.93:1. This color combination is acceptable for use in body text or large text.</figcaption>
</figure>

Gradient, pattern, or photo backgrounds can be difficult because there needs to be contrast between the foreground text color and any part of the image that touches it. It gets even more complicated when you resize your browser and realize that the background color moves independently of the text if the text is not part of the image.

There are other considerations when using text in images as covered in [Making Images Accessible](/articles/making-images-accessible/), but for now we'll focus on color contrast.

<figure>
    <div class="figure-3 figure">
        <span class="figure-text--light">Attention-grabbing text or call to action</span>
    </div>
<figcaption>If this example used solid colors with the darkest green (#2D7160) and white, it would pass with the contrast ratio of 5.76:1. As we move to the right, the contrast ratio gets less and less as the green in the gradient gets lighter causing it to fail.</figcaption>
</figure>

<figure>
    <div class="figure-4 figure">
        <span class="figure-text--light">Attention-grabbing text or call to action</span>
    </div>
<figcaption>This gradient passes. At its darkest, the green is #1a3f34, and its lightest is at #35826F. Even as the text flows to the right, we can guarantee a contrast ratio of at least 4.59:1, which is the contrast ratio between the lightest background color and the white text.</figcaption>
</figure>

<figure>
    <div class="figure-5 figure">
        <span class="figure-text--light">Attention-grabbing text or call to action</span>
    </div>
<figcaption>Because this photo features both very light and dark areas, it's nearly impossible to overlay text in a way that guarantees accessibility compliance. If you wanted to use this as a background image, you would need to add a background layer to the text. Photo by <a href="https://unsplash.com/@szmigieldesign?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Lukasz Szmigiel</a> on <a href="https://unsplash.com/s/photos/nature?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  </figcaption>
</figure>

<figure>
    <div class="figure-6 figure">
        <span class="figure-text--dark">Attention-grabbing text or call to action.</span>
    </div>
<figcaption>This photo uses a layer mask to create a solid color where the text goes. As you resize your browser window, notice that the flowers on bottom never interfere with the text. In this case, we can treat this is a solid color background (#f2f3ee) and black text (#000000), which gives a contrast ratio of 18.83:1. Photo by <a href="https://unsplash.com/@henry_be?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Henry Be</a> on <a href="https://unsplash.com/s/photos/nature?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  </figcaption>
</figure>
