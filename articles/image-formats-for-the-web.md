---
layout: article
title: Image Formats for the Web
---
Images convey meaning to our users that would be difficult to achieve with words alone. For many, beautiful imagery is in essential part of the content experience.

Unfortunately, images are also bandwidth-intensive and are often the single largest contributor to overall page weight. The higher the page weight, the longer the page takes to load. 

<figure>
<blockquote>Consumer engagement and likelihood to convert [are] most effected by site speed.</blockquote>
<figcaption>
Deloitte <cite><a href="https://www2.deloitte.com/content/dam/Deloitte/ie/Documents/Consulting/Milliseconds_Make_Millions_report.pdf">Milliseconds Make Millions (pdf)</a></cite>
</figcaption>
</figure>

<figure>
{% image "img/content-type-distribution.png", "", [null, 400, 700], ['png', 'webp'] %}
<figcaption>Data from a sample article on one of our sites. 61% of the compressed page weight in this test came from images</figcaption>
</figure>

Choosing the optimal format for images can help offset the detrimental impact they can have on page speed. Sometimes, even choosing a specific file type over another can go a long way in making sure our pages remain fast for our users.

## Image Formats
There are three main image formats that dominate the web, GIF, JPEG, and PNG. Each one of these has their own distinct strengths. File size and desired quality are the determining factors for which image format to use.

### JPEG
JPEG files are the most common on the internet and for good reason. This format is ideal for any image that came from the lens of a camera. This includes pictures of people, animals, or still-life scenery.

The "P" in JPEG actually stands for _photographic_. 

If you're not sure what format to use, JPEG is a fairly safe bet. JPEGs saved with the "progressive" option are even more performant because they show content to the users quicker than a non-progressive JPEG.

<figure>
{% image "img/proper-jpeg-usage.jpeg", "Wooden house in mountain setting" %}
<figcaption>This photograph with many vibrant colors was a perfect candidate for a JPEG.</figcaption>
</figure>

#### Features:
- Supports 16 million colors
- Results in small file sizes when used for photographs when compared to other formats
- Can change the amount of compression to manipulate file size and quality (60-80% quality is the sweet spot)

#### Best for:
- Photographs of people, places, or things

### GIF
GIF files were the first image format supported in the early days of the internet. GIF files are only capable of 256 colors, which is a relic of computer capabilities from the era. Their one unique benefit over other image formats is they support animation. 

<figure>
<img alt="Image of moon orbiting around the earth" height="192" src="/img/proper-gif-usage.gif" width="256" loading="lazy" />
<figcaption>Animation is supported in GIF images</figcaption>
</figure>

__Fun fact:__ this tiny little image is 6x the file size of the example JPEG

#### Features:
- Support animation
- Support binary transparency (fully opaque or fully transparent)
- 256 colors

#### Best for:
- When animation is required, but video cannot be used (e.g. embedding in emails).  
 
Videos are often smaller and therefore more performant, which is why companies like Twitter convert GIF files to video behind the scenes when you share on their platform.

### PNG
PNG files come in two different varieties, 8-bit (PNG-8) and 24-bit (PNG-24). Both use a `*.png` file extension, but they are quite different. 

The 8-bit variety are similar to GIF, supporting both transparency and 256 colors but often result in a smaller file when used for graphics. 

The 24-bit variety are similar to JPEGs, supporting millions of colors but usually result in a significantly larger file size.   

#### PNG-8
Like GIFs, PNG-8 supports 256 colors. These images are best suited to illustrations or diagrams that were created digitally, such as the sewing patterns, building plans, and diagrams featured on our sites. 

<figure>
{% image "img/proper-png-usage.png", "Sewing instructions", [null, 400, 700], ['png', 'webp'] %}
<figcaption>These instructions are a perfect use of a PNG-8 because they're a diagram with few colors</figcaption>
</figure>

##### Features:
- Support transparency
- 256 colors
- Result in smaller files than GIFs in most cases

##### Best for:
- Diagrams
- Charts
- Logos with few colors

#### PNG-24
Similar to JPEGs, PNG-24 files support millions of colors, but they also support alpha-channel transparency. Unlike the fully-on/fully-off binary transparency of GIF files, alpha-channel transparency means that pixels can be semi-transparent.

PNG-24 files are typically used outside of the editorial setting where a developer might need to compose multiple images with code to make a page interactive. For example, a promo might require an image of magazine covers overlaid on top of a patterned background, and this is an example of when PNG-24 files are used. 

The exceptions where editorial might want to use a PNG-24 include screenshots and logos with many colors.  

##### Features:
- Support alpha-channel transparency
- Support millions of colors

##### Best for:
- Image composition
- Screenshots
- Logos with many colors

## Comparison
Here is the house image covered in the JPEG section being saved in Photoshop. You can see what it might look like being saved as other image formats and why JPEG is the best format for this particular image.

<figure>
<a href="/img/image-save-comparison.png">
    {% image "img/image-save-comparison.png", "Photo of a house in a mountain setting being saved for web using Photoshop in different formats", [null, 400, 700],
  ['png', 'webp'] %}
</a>
<figcaption>Comparison of image formats from Photoshop's Save for Web dialog. JPEG is the smallest at 62.48kb. PNG-8 is 144.3kb, GIF is 164.8kb, and PNG-24 is the largest at 318kb. The PNG-24 will take twice as long to download on a mobile device when compared to the JPEG.</figcaption>
</figure>

Here is a similar example with the instructions from the section on PNG images.

<figure>
<a href="/img/image-save-comparison-2.png">
    {% image "img/image-save-comparison-2.png", "Photo of step-by-step sewing instructions setting being saved for web using Photoshop in different formats", [null, 400, 700],
  ['png', 'webp'] %}
</a>
<figcaption>Comparison of image formats from Photoshop's Save for Web dialog. PNG-8 is the smallest at 25kb. JPEG is 34kb, GIF is 27.2kb, and PNG-24 is the largest at 70.9kb.</figcaption>
</figure>
