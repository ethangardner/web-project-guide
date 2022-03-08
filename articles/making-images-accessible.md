---
layout: article
title: Making Images Accessible
---
Our [accessibility commitment](https://www.taunton.com/accessibility-commitment/) aims to make sure our content remains accessible for all users. One major component of accessibility involves providing alternate representations of content.

Given the number of images that appear on our sites, it is especially important that we create meaningful alt text for our visual components.

In addition to providing inclusion, meaningful all text also provides benefits for search engine optimization.

## What is Alt Text
Alt text is extra data that is associated with an image that provides a description of the contents of the image within the context of how it's being used on the page.

Imagine taking a friend who's blindfolded to an art museum. The _Mona Lisa_ catches your eye, and you walk over to examine it. Wanting to give your friend a good experience as well, you decide to describe the painting to them. Which of these descriptions you think would give your friend a better idea of what you're seeing: 

- **Option A:** you say "here's a painting"
- **Option B:** your friend has seen the _Mona Lisa_ before, so you say "here's the _Mona Lisa_."
- **Option C:** your friend is unfamiliar with the _Mona Lisa_, so you say "here's a half-length portrait of a woman with dark, straight hair, a coy smile, and dark eyes that seem to follow my movements. She's wearing a simple, dark-colored dress with pleats and embroidery around the collar. She is seated with her right hand crossed over her left. There are mountains, a river, and a bridge in the background."


Options B & C are much more helpful to your friend. This is kind of like what writing meaningful all text is like, describing the subject-matter of an image to a friend.

## Why is it Needed?
There are several reasons why alt text is needed. There are many users on the internet with blindness, low vision, or different types of color blindness. There is a _legal obligation_ to support these users. 

There are other scenarios as well, such as providing a fallback in case an image gets accidentally deleted. There are also users who might have a bad connection temporarily, and disable images to view content more quickly, such as a contractor on a remote job site.

<figure>
<a href="/img/alt-text-wordpress-entry.png">
{% image "img/alt-text-wordpress-entry.png", "", [null, 400, 700], ['png', 'webp'] %}
</a>
<figcaption>Alt text being entered in the WordPress media gallery</figcaption>
</figure>

## Situational Use
Where and how images are used dictates the alt text requirements. There are different categories of images such as those meant to inform, decorate, or provide instruction.

The [WebAIM alt text guide](https://webaim.org/techniques/alttext/) is a quick, comprehensive resource providing multiple examples on when to populate the alt text or leave it empty based on context. _Note: empty alt text is defined as having `alt=""` in the final HTML. It is never acceptable to have an image tag without the presence of the alt attribute._ 

Another helpful and authoritative resource is the [W3C decision table](https://www.w3.org/WAI/tutorials/images/decision-tree/), which provides a series of yes or no questions to help determine alt text requirements.

Finally, [Alternate text for images (pdf)](https://www.ssa.gov/accessibility/files/SSA_Alternative_Text_Guide.pdf) has detailed explanations, multiple examples, and different scenarios using photos of a service dog named Pastel for those who prefer to learn with cute pictures of animals.

## Text in Images
This is a special topic covered in the resources above, but it's worth calling out here as well, as text in images can present problems for certain user populations. In some cases, text in images is unavoidable, such as diagrams, infographics, or charts, but special care should be taken in order to make sure the content is accessible to all users.

### Mobile Users
The image that's entered as the featured image for an article is used all over the site. What may look great for the main image for an article on desktop could become hard to read on a mobile device. 

Although most of us probably use a desktop computer for our work, mobile usage exceeds desktop usage among our audience at the time of this writing. For one of our sites, 61% of user sessions were on mobile during a recent reporting window. The site with the least amount of mobile traffic during this same period had 52% of user sessions on a mobile device.

<figure>
<a href="/img/article-list-video-thumbnail-with-text-mobile.png">
{% image "img/article-list-video-thumbnail-with-text-mobile.png", "Screenshot from an article list page on a mobile device", [null, 400, 700], ['png', 'webp'] %}
</a>
<figcaption>On a mobile device, an image with text can be difficult to read in areas where the image does not occupy the full width of the viewport</figcaption>
</figure>

### Users with Low Vision
Users with low vision may enlarge or magnify a portion of the screen to make it easier to read. Text that's represented in HTML will remain crisp no matter how much it's enlarged. However, text that is part of an image will pixelate or become blurry when that image is enlarged.

See the [WebAIM image enlargement example](https://webaim.org/techniques/images/#enlarging) for more info.

### Users who Rely on Contrast
In some cases, users might require sufficient contrast in order to read text. The colors on our websites have been checked against the [WCAG AA](https://www.w3.org/WAI/WCAG2AA-Conformance) standard to verify the have enough color contrast between the foreground and the background. 

It's possible that when an image is designed, the creator assumes there aren't any restrictions regarding color choices. However, this isn't the case, and the text that appears in an image still needs to adhere to WCAG standards. 

Color contrast can be checked using a tool such as the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).
