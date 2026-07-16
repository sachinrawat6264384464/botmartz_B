# Image Sitemaps | Google Search Central

# Image sitemaps


Image sitemaps are a way of telling Google about other images on your site, especially those that
we might not otherwise find (such as images your site reaches with JavaScript code). You can
create a separate image sitemap or add image sitemap tags to your existing sitemap; either
approach is equally fine for Google.


Image sitemaps are based on generic sitemaps so the
[general sitemap best practices](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#general-guidelines)
also apply to image sitemaps. We also recommend that you follow the
[general best practices for publishing images](https://developers.google.com/search/docs/appearance/google-images).

## Example image sitemap


The following example shows a regular sitemap with image sitemap extension, with two
`<url>` elements:

- `https://example.com/sample1.html`, which contains two images
- `https://example.com/sample2.html`, which contains one image

```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://example.com/sample1.html</loc>
    <image:image>
      <image:loc>https://example.com/image.jpg</image:loc>
    </image:image>
    <image:image>
      <image:loc>https://example.com/photo.jpg</image:loc>
    </image:image>
  </url>
  <url>
    <loc>https://example.com/sample2.html</loc>
    <image:image>
      <image:loc>https://example.com/picture.jpg</image:loc>
    </image:image>
  </url>
</urlset>
```

## Image sitemap reference


The `image` tags are defined in the Image Sitemaps namespace:
[`http://www.google.com/schemas/sitemap-image/1.1`](http://www.google.com/schemas/sitemap-image/1.1)


To make sure Google can use your image sitemap, you must use the following required tags:

| Required tags ||
|---|---|
| `<image:image>` | Encloses all information about a single image. Each `<url>` tag can contain up to 1,000 `<image:image>` tags. |
| `<image:loc>` | The URL of the image. In some cases, the image URL may not be on the same domain as your main site. This is fine, as long as you verify both domains in Search Console. If, for example, you use a content delivery network such as Google Sites to host your images, make sure that the hosting site is verified in Search Console. In addition, make sure that your [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro) file doesn't disallow the crawling of any content you want indexed. |

### Deprecated tags and attributes


We removed the following tags and attributes from our documentation:
`<image:caption>`, `<image:geo_location>`,
`<image:title>`, `<image:license>`. See the
[deprecation announcement](https://developers.google.com/search/blog/2022/05/spring-cleaning-sitemap-extensions)
for more information.

## Troubleshooting sitemaps


If you're having trouble with your sitemap, you can investigate the errors with Google Search Console.
See Search Console's
[sitemaps troubleshooting guide](https://support.google.com/webmasters/answer/7451001#errors)
for help.

## Additional resources


Want to learn more? Check out the following resources:

- [Submit your sitemap to Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#addsitemap)
- [Learn how to combine sitemap extensions](https://developers.google.com/search/docs/crawling-indexing/sitemaps/combine-sitemap-extensions)

# Create a News Sitemap | Google Search Central

# News sitemaps


If you are a news publisher, use news sitemaps to tell Google about your news articles and
additional information about them. You can either extend your existing sitemap with news
specific tags, or create a separate news sitemap that's reserved just for your news articles.
Either option is fine with Google, however creating a separate sitemap just for your news
articles may enable better tracking of your content in Search in Search Console.

## News sitemap best practices


News sitemaps are based on generic sitemaps, so the
[general sitemap best practices](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#general-guidelines)
also apply to news sitemaps.


Update your news sitemap with fresh articles as they're published. Don't create a new sitemap
with each update. Google News crawls news sitemaps as often as it crawls the rest of your
site.


Only include recent URLs for articles that were created in the last two days. Once the
articles are older than two days, either remove those URLs from the news sitemap or remove
the `<news:news>` metadata in your sitemap from the older URLs.


If you choose the method of removing old URLs from your news sitemap, this could mean that
your sitemap becomes empty for a period of time (for example, if you haven't published
articles in the last few days). You may see an Empty Sitemap warning in Search Console,
but this is just to make sure it was intentional on your behalf. It won't cause any problems with
Google Search if the file is empty.

## Example news sitemap


The following example shows a regular sitemap with news extension. It contains one
`<url>` tag and a single `<news:news>` tag with its required
child tags:

```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
  <loc>http://www.example.org/business/article55.html</loc>
  <news:news>
    <news:publication>
      <news:name>The Example Times</news:name>
      <news:language>en</news:language>
    </news:publication>
    <news:publication_date>2008-12-23</news:publication_date>
    <news:title>Companies A, B in Merger Talks</news:title>
  </news:news>
  </url>
</urlset>
```

## News sitemap reference

The `news` tags are defined in the news sitemap namespace:
[`http://www.google.com/schemas/sitemap-news/0.9`](http://www.google.com/schemas/sitemap-news/0.9)


To make sure Google can use your news sitemap, you must use the following required tags:

| Required tags ||
|---|---|
| `<news:news>` | The parent tag of other tags in the `news:` namespace. Each `url` sitemap tag can have only one `news:news` tag (plus the respective closing tag) and a sitemap may have up to 1,000 `news:news` tags. If there are more than 1,000 `<news:news>` tags in a news sitemap, [split your sitemap into several smaller sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps). |
| `<news:publication>` | The parent tag for the `<news:name>` and `<news:language>` tags. Each `<news:news>` parent tag may only have one `<news:publication>` tag. |
| `<news:name>` | The `<news:name>` tag is the name of the news publication. It must exactly match the name as it appears on your articles on [news.google.com](https://news.google.com/), omitting anything in parentheses. |
| `<news:language>` | The `<news:language>` tag is the language of your publication. Use an [ISO 639 language code](http://www.loc.gov/standards/iso639-2/php/code_list.php) (two or three letters). **Exception** : For Simplified Chinese, use `zh-cn` and for Traditional Chinese, use `zh-tw`. |
| `<news:publication_date>` | The article publication date in [W3C format](http://www.w3.org/TR/NOTE-datetime). Use either the "complete date" format (`YYYY-MM-DD`) or the "complete date plus hours, minutes, and seconds" format with time zone designator format (`YYYY-MM-DDThh:mm:ssTZD`). Specify the original date and time when the article was first published on your site. Don't specify the time when you added the article to your sitemap. Google accepts any of the following formats: - Complete date: `YYYY-MM-DD (1997-07-16)` - Complete date plus hours and minutes: `YYYY-MM-DDThh:mmTZD (1997-07-16T19:20+01:00)` - Complete date plus hours, minutes, and seconds: `YYYY-MM-DDThh:mm:ssTZD (1997-07-16T19:20:30+01:00)` - Complete date plus hours, minutes, seconds, and a decimal fraction of a second: `YYYY-MM-DDThh:mm:ss.sTZD` (`1997-07-16T19:20:30.45+01:00`) |
| `<news:title>` | The title of the news article. > [!TIP] > **Tip:** Google may shorten the title of the news article for space reasons when displaying the article on various devices. Include the title of the article as it appears on your site. Don't include the author name, publication name, or publication date in the `<news:title>` tag. Learn more about [creating better titles](https://developers.google.com/search/docs/appearance/title-link). |

## Troubleshooting sitemaps


If you're having trouble with your sitemap, you can investigate the errors with Google Search Console.
See Search Console's
[sitemaps troubleshooting guide](https://support.google.com/webmasters/answer/7451001#errors)
for help.

## Additional resources


Want to learn more? Check out the following resources:

- [Submit your sitemap to Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#addsitemap)
- [Learn how to combine sitemap extensions](https://developers.google.com/search/docs/crawling-indexing/sitemaps/combine-sitemap-extensions)

# Video sitemaps and alternatives


A video sitemap is a [sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
with additional information about videos hosted on your pages. Creating a video sitemap is a
good way to help Google find and understand the video content on your site, especially
content that was recently added or that we might not otherwise discover with our usual
crawling mechanisms.


Google recommends using video sitemaps, however we also support [mRSS feeds](https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps#sitemap_alternatives).

## Video sitemap best practices


Video sitemaps are based on generic sitemaps, so the
[general sitemap best practices](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#general-guidelines)
also apply to video sitemaps. You can create a separate sitemap or mRSS feed just for video,
or you can add video sitemap tags within an existing
[sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#xml), whichever is more
convenient for you.

Additionally, the following requirements apply to video sitemaps specifically:

- Don't list videos that are unrelated to the content of the host page. For example, a video that is a small addendum to the page, or unrelated to the main text content.
- All files referenced in the video sitemap must be accessible to Googlebot. This means that all URLs in the video sitemap:
  - must not be disallowed for crawling by [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro) rules,
  - must be accessible without metafiles and without logging in,
  - must not be blocked by firewalls or similar mechanism,
  - and must be accessible on a supported protocol: HTTP and FTP (streaming protocols are not supported).


  If you want to prevent spammers from accessing your video content at the
  `<player_loc>` or `<content_loc>` URLs,
  [verify that any bots accessing your server are really Googlebot](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot).


For more tips about videos in Google Search, see our
[video best practices](https://developers.google.com/search/docs/appearance/video).

## Example video sitemap


The following example shows a regular sitemap with video extension. It includes two video
entries nested in the single `<url>` tag. The first
`<video>` entry includes all the tags that Google can use while the second
only the required tags.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://www.example.com/videos/some_video_landing_page.html</loc>
    <video:video>
      <video:thumbnail_loc>https://www.example.com/thumbs/123.jpg</video:thumbnail_loc>
      <video:title>Grilling steaks for summer</video:title>
      <video:description>
        Alkis shows you how to get perfectly done steaks every time
      </video:description>
      <video:content_loc>
        http://streamserver.example.com/video123.mp4
      </video:content_loc>
      <video:player_loc>
        https://www.example.com/videoplayer.php?video=123
      </video:player_loc>
      <video:duration>600</video:duration>
      <video:expiration_date>2021-11-05T19:20:30+08:00</video:expiration_date>
      <video:rating>4.2</video:rating>
      <video:view_count>12345</video:view_count>
      <video:publication_date>2007-11-05T19:20:30+08:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:restriction relationship="allow">IE GB US CA</video:restriction>
      <video:platform relationship="allow">web tv</video:platform>
      <video:requires_subscription>yes</video:requires_subscription>
      <video:uploader
        info="https://www.example.com/users/grillymcgrillerson">GrillyMcGrillerson
      </video:uploader>
      <video:live>no</video:live>
      <video:tag>steak</video:tag>
      <video:tag>meat</video:tag>
      <video:tag>summer</video:tag>
    </video:video>
    <video:video>
      <video:thumbnail_loc>https://www.example.com/thumbs/345.jpg</video:thumbnail_loc>
      <video:title>Grilling steaks for winter</video:title>
      <video:description>
        In the freezing cold, Roman shows you how to get perfectly done steaks every time.
      </video:description>
      <video:content_loc>
        http://streamserver.example.com/video345.mp4
      </video:content_loc>
      <video:player_loc>
        https://www.example.com/videoplayer.php?video=345
      </video:player_loc>
    </video:video>
  </url>
</urlset>
```

#### More examples


The following example demonstrates how to add a Vimeo video embed to a video sitemap:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://www.example.com/videos/some_video_landing_page.html</loc>
    <video:video>
      <video:thumbnail_loc>https://www.example.com/thumbs/123.jpg</video:thumbnail_loc>
      <video:title>Lizzi is painting the wall</video:title>
      <video:description>
        Gary is watching the paint dry on the wall Lizzi painted.
      </video:description>
      <video:player_loc>
        https://player.vimeo.com/video/987654321
      </video:player_loc>
    </video:video>
  </url>
</urlset>
```


The following example demonstrates how to add a YouTube video embed to a video sitemap:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://www.example.com/videos/some_video_landing_page.html</loc>
    <video:video>
      <video:thumbnail_loc>https://www.example.com/thumbs/345.jpg</video:thumbnail_loc>
      <video:title>John teaches cheese</video:title>
      <video:description>
        John explains the differences between a banana and cheese.
      </video:description>
      <video:player_loc>
        https://www.youtube.com/embed/1a2b3c4d
      </video:player_loc>
    </video:video>
  </url>
</urlset>
```

## Video sitemap reference


The `video` tags are defined in the video sitemaps namespace:
[`http://www.google.com/schemas/sitemap-video/1.1`](http://www.google.com/schemas/sitemap-video/1.1).
Each tag can only be added one time per video, unless otherwise specified.


To make sure Google can use your video sitemap, you must use the following required tags:

| Required tags ||
|---|---|
| `<video:video>` | The parent element for all information about a single video on the page specified by the `<loc>` tag. You can include multiple `<video:video>` tags nested in the `<loc>` tag, one for each video on the hosting page. |
| `<video:thumbnail_loc>` | A URL pointing to the video thumbnail image file. Follow the [video thumbnail requirements.](https://developers.google.com/search/docs/appearance/video#thumbnails) |
| `<video:title>` | The title of the video. All HTML entities must be escaped or wrapped in a [`CDATA` block](http://wikipedia.org/wiki/CDATA). We recommend that this match the video title displayed on the web page where the video is embedded. |
| `<video:description>` | A description of the video. Maximum 2048 characters. All HTML entities must be escaped or wrapped in a [`CDATA` block](http://wikipedia.org/wiki/CDATA). It must match the description displayed on the web page where the video is embedded, but it doesn't need to be a word-for-word match. |
| `<video:content_loc>` | A URL pointing to the actual video media file. The file must be one of the [supported formats.](https://developers.google.com/search/docs/appearance/video#file-types) > [!NOTE] > It's required to provide either a `<video:content_loc>` or `<video:player_loc>` tag. We recommend that your provide the `<video:content_loc>` tag, if possible. This is the most effective way for Google to fetch your video content files. If `<video:content_loc>` isn't available, provide `<video:player_loc>` as an alternative. **Additional guidelines** - HTML and Flash aren't supported formats. - Must not be the same as the URL in the parent `<loc>` tag. - This is the equivalent of `https://developers.google.com/search/docs/appearance/structured-data/video` in structured data. - **Best practice:** If you want to restrict access to your content but still have it crawled, ensure that Googlebot can access your content by using [verifying Googlebot](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot). |
| `<video:player_loc>` | A URL pointing to a player for a **specific** video. Usually this is the information in the `src` attribute of an `<embed>` tag. > [!NOTE] > It's required to provide either a `<video:content_loc>` or `<video:player_loc>` tag. We recommend that your provide the `<video:content_loc>` tag, if possible. This is the most effective way for Google to fetch your video content files. If `<video:content_loc>` isn't available, provide `<video:player_loc>` as an alternative. **Additional guidelines** - Must not be the same as the `<loc>` URL. - For Vimeo, YouTube, and other video hosting platforms that allow embedding videos through `iframe` videos, this value is used rather than `video:content_loc`. This is the equivalent of `https://developers.google.com/search/docs/appearance/structured-data/video` in structured data. - **Best practice:** If you want to restrict access to your content but still have it crawled, ensure that Googlebot can access your content by using [verifying Googlebot](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot). |


Additionally, the following optional tags may help Google better understand your videos and
its properties:

| Optional tags ||
|---|---|
| `<video:duration>` | The duration of the video, in seconds. Value must be from `1` to `28800` (8 hours). |
| `<video:expiration_date>` | The date after which the video is no longer be available, in [W3C format](http://www.w3.org/TR/NOTE-datetime). Omit this tag if your video doesn't expire. If present, Google Search won't show your video after this date. For recurring videos at the same URL, update the expiration date to the new expiration date. Supported values are complete date (`YYYY-MM-DD`), or complete date plus hours, minutes and seconds, and timezone (`YYYY-MM-DDThh:mm:ss+TZD`). **Example:** `2012-07-16T19:20:30+08:00`. |
| `<video:rating>` | The rating of the video. Supported values are float numbers in the range `0.0` (low) to `5.0` (high). |
| `<video:view_count>` | The number of times the video has been viewed. |
| `<video:publication_date>` | The date the video was first published, in [W3C format](http://www.w3.org/TR/NOTE-datetime). Supported values are complete date (`YYYY-MM-DD`) or complete date plus hours, minutes and seconds, and timezone (`YYYY-MM-DDThh:mm:ss+TZD`). **Example:** `2007-07-16T19:20:30+08:00` |
| `<video:family_friendly>` | Whether the video is available with [SafeSearch](https://developers.google.com/search/docs/crawling-indexing/safesearch). If you omit this tag, the video is available when SafeSearch is turned on. **Supported values**: - `yes`: The video is available when SafeSearch is turned on. - `no`: The video is only available when SafeSearch is turned off. |
| `<video:restriction>` | Whether to show or hide your video in search results from specific countries. Specify a space-delimited list of country codes in [ISO 3166 format](http://wikipedia.org/wiki/ISO_3166). If there's no `<video:restriction>` tag, Google assumes that the video can be shown in all locations. *Note that this tag only affects search results; it doesn't prevent a user from finding or playing your video in a restricted location through other means.* [Learn more about applying country restrictions.](https://developers.google.com/search/docs/appearance/video#restrict_by_country) **Attributes:** If the parent tag `<video:restriction>` is used, the following attribute is required: - `relationship`: Whether the video is allowed or denied in search results in the specified countries. Supported values are: - `allow`: The listed countries are allowed and unlisted countries are denied. - `deny`: The listed countries are denied and unlisted countries are allowed. **Example:** This example allows the video search result to be shown only in Canada and Mexico: `<video:restriction relationship="allow">CA MX</video:restriction>` |
| `<video:platform>` | Whether to show or hide your video in search results on specified platform types. This is a list of space-delimited platform types. *Note that this only affects search results on the specified device types; it doesn't prevent a user from playing your video on a restricted platform.* If there's no `<video:platform>` tag, Google assumes that the video can be played on all platforms. [Learn more about applying platform restrictions.](https://developers.google.com/search/docs/appearance/video#restrict_by_platform) **Supported values**: - `web`: Computer browsers on desktops and laptops. - `mobile`: Mobile browsers, such as those on cellular phones or tablets. - `tv`: TV browsers, such as those available through Google TV devices and game consoles. **Attributes:** If the parent tag `<video:platform>` is used, the following attributes are required: - `relationship`: Specifies whether the video is restricted or permitted for the specified platforms. Supported values are: - `allow`: Any omitted platforms will be denied. - `deny`: Any omitted platforms will be allowed. **Example:** The following example allows users on web or TV, but not mobile devices: `<video:platform relationship="allow">web tv</video:platform>` |
| `<video:requires_subscription>` | Indicates whether a subscription (either paid or free) is required to view the video. Supported values are: - `yes`: Subscription is required. - `no`: Subscription is not required. |
| `<video:uploader>` | The video uploader's name. The string value can be a maximum of 255 characters. **Attributes:** - `info` \[*Optional*\]: Specifies the URL of a web page with additional information about this uploader. This URL must be in the same domain as the `<loc>` tag. |
| `<video:live>` | Indicates whether the video is a livestream. Supported values are: - `yes`: The video is a livestream. - `no`: The video is not a livestream. |
| `<video:tag>` | An arbitrary string tag describing the video. Tags are generally very short descriptions of key concepts associated with a video or piece of content. A single video could have several tags, although it might belong to only one category. For example, a video about grilling food may belong in the "grilling" category, but could be tagged "steak", "meat", "summer", and "outdoor". Create a new `<video:tag>` element for each tag associated with a video. A maximum of 32 tags is permitted per video. |

### Deprecated tags and attributes


We removed the following tags and attributes from our documentation:
`<video:category>`, `<video:gallery_loc>`, the
`autoplay` and `allow_embed` attributes of the
`<video:player_loc>` tag, the `<video:price>` tag and its
attributes, and the `<video:tvshow>` tag and its attributes. See the
[deprecation announcement](https://developers.google.com/search/blog/2022/05/spring-cleaning-sitemap-extensions)
for more information.

## Sitemap alternative: mRSS


While Google recommends using video sitemaps, we also support mRSS feeds.


Google supports [mRSS](http://www.rssboard.org/media-rss),
an RSS module that supplements the element capabilities of
[RSS 2.0](http://cyber.law.harvard.edu/rss/rss.html).
mRSS feeds are very similar to video sitemaps and can be tested, submitted, and updated just
like sitemaps.


For more information about media feeds, see the
[official media RSS documentation](http://www.rssboard.org/media-rss).

> [!NOTE]
> **RSS vs mRSS**: mRSS is a RSS extension used for syndicating multimedia files. It allows for a much more detailed description of the content than the RSS standard.

### mRSS Example

Here's an example of an mRSS entry that provides all the tags that Google uses.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/">
  <channel>
    <title>Example MRSS</title>
    <link>https://www.example.com/examples/mrss/</link>
    <description>MRSS Example</description>
    <item xmlns:media="http://search.yahoo.com/mrss/" xmlns:dcterms="http://purl.org/dc/terms/">
      <link>https://www.example.com/examples/mrss/example.html</link>
      <media:content url="https://www.example.com/examples/mrss/example.flv" fileSize="405321"
                        type="video/x-flv" height="240" width="320" duration="120" medium="video" isDefault="true">
        <media:player url="https://www.example.com/shows/example/video.swf?flash_params" />
        <media:title>Grilling Steaks for Summer</media:title>
        <media:description>Get perfectly done steaks every time</media:description>
        <media:thumbnail url="https://www.example.com/examples/mrss/example.png" height="120" width="160"/>
        <media:price price="19.99" currency="EUR" />
        <media:price type="subscription" />
      </media:content>
      <media:restriction relationship="allow" type="country">us ca</media:restriction>
      <dcterms:valid xmlns:dcterms="http://purl.org/dc/terms/">end=2020-10-15T00:00+01:00; scheme=W3C-DTF</dcterms:valid>
      <dcterms:type>live-video</dcterms:type>
    </item>
  </channel>
</rss>
```

### mRSS reference


The
[full mRSS specification](http://www.rssboard.org/media-rss)
contains more optional tags, best practices, and examples.


To make sure Google can use your mRSS feed, you must use the following required tags:

| Required tags ||
|---|---|
| `<media:content>` | Encloses information about the video. Attributes: - `medium`: Type of content. Set to `video`. - `url`: The direct URL to the raw video content. **If this isn't specified, you must specify the `<media:player>` tag.** - `duration` \[*Optional but recommended*\]: Length of the video in seconds. For all of the other optional attributes and child fields of the `<media:content>` tag, see the [mRSS specification](http://www.rssboard.org/media-rss). |
| `<media:player>` | **You must specify at least one of `<media:player>` or the `url` attribute in `<media:content>`.** A URL pointing to a player for a **specific** video. Usually this is the information in the `src` attribute of an `<embed>` tag and must not be the same as the content of the `<loc>` tag. It can't be the same URL as the `<link>` tag. The `<link>` tag points to the URL of the page hosting the video, while this tag points to a player. |
| `<media:title>` | The title of the video. Maximum 100 characters. All HTML entities must be escaped or wrapped in a [CDATA bock](http://wikipedia.org/wiki/CDATA). |
| `<media:description>` | The description of the video. Maximum 2048 characters. All HTML entities must be escaped or wrapped in a [CDATA block](http://wikipedia.org/wiki/CDATA). |
| `<media:thumbnail>` | A URL pointing to a preview thumbnail. Follow the [Video thumbnail requirements.](https://developers.google.com/search/docs/appearance/video#thumbnails) |


Additionally, the following optional tags may help Google better understand your videos and
its properties:

| Optional tags ||
|---|---|
| `<dcterms:valid>` | The publication and expiration date of the video. Here's the [Full specification of the `dcterms:valid`](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/terms/valid/) tag. **Example:** ```xml <dcterms:valid> start=2002-10-13T09:00+01:00; end=2002-10-17T17:00+01:00; scheme=W3C-DTF <dcterms:valid> ``` |
| `<media:restriction>` | A space-delimited list of countries where the video may or may not be played, in [ISO 3166 format](http://wikipedia.org/wiki/ISO_3166). If there's no `<media:restriction>` tag, Google assumes that the video can be played in all countries. **Attributes:** If the parent tag `<media:restriction>` is used, the following attributes are required: - `type`: Set the `type` attribute to `country`. Only country restrictions are supported. - `relationship`: Specifies whether the video may or may not be played in the specified list of countries. Supported values: - `allow`: The listed countries are allowed and unlisted countries are denied. - `deny`: The listed countries are denied and unlisted countries are allowed. [Learn more about using country restrictions.](https://developers.google.com/search/docs/appearance/video#restrict_by_country) Example: ```xml <media:restriction relationship="allow" type="country">us ca</media:restriction> ``` |
| `<media:price>` | The price to download or view the video. Don't use this tag for videos that are available without payment. More than one `<media:price>` element can be listed (for example, in order to specify various currencies or purchasing options). **Attributes:** If the parent tag `<media:price>` is used, the following attributes are required: - `currency`: The currency in [ISO 4217 format](https://en.wikipedia.org/wiki/ISO_4217). - `type`: The purchase option. Supported values are: - `rent`: The video is available for rent. - `purchase`: The video is available for purchase. - `package`: The video is part of a package deal. - `subscription`: The video is available with a subscription. |

## Troubleshooting sitemaps


If you're having trouble with your sitemap, you can investigate the errors with Google Search Console.
See Search Console's
[sitemaps troubleshooting guide](https://support.google.com/webmasters/answer/7451001#errors)
for help.

## Additional resources


Want to learn more? Check out the following resources:

- [Submit your sitemap to Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#addsitemap)
- [Learn how to combine sitemap extensions](https://developers.google.com/search/docs/crawling-indexing/sitemaps/combine-sitemap-extensions)

# How to Combine Sitemap Extensions | Google Search Central

# How to combine sitemap extensions


Sitemap extensions are a great way to tell Google about the different kinds of content and
their metadata that you're using on your site. Often the content on your pages may fit into
multiple kinds of extensions; for example, you might be publishing news articles that embed
images and videos. Additionally, your pages may be localized as well, which might mean that
you could add `hreflang` annotations for your localized pages.

## Namespaces


For each sitemap extension that you want to use in a sitemap you need to specify the
respective namespace that declares the tags the extension supports. This is done with the
`xmlns` attribute of the `urlset` tag. The namespaces for the sitemap
extensions Google supports are:

| Extension tags and their namespace definitions ||
|---|---|
| `image:` | [`http://www.google.com/schemas/sitemap-image/1.1`](http://www.google.com/schemas/sitemap-image/1.1) |
| `news:` | [`http://www.google.com/schemas/sitemap-news/0.9`](http://www.google.com/schemas/sitemap-news/0.9) |
| `video:` | [`http://www.google.com/schemas/sitemap-video/1.1`](http://www.google.com/schemas/sitemap-video/1.1) |
| `xhtml:` (for `hreflang`) | [`http://www.w3.org/1999/xhtml`](http://www.w3.org/1999/xhtml) |

### Declaring multiple namespaces


To declare multiple namespaces, add the respective namespace references to your sitemap as
described in the documentation of the respective extensions. Here's an example that shows how
to add the news, video, and xhtml (for `hreflang`) extensions to a sitemap:

```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
           xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
           xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
           xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
<!-- rest of the sitemap -->
```

## Combining sitemap extensions


Once you declared the namespaces, follow the implementation details from the respective sitemap
extension documentation you're going to use.

- [Image sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps)
- [News sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap)
- [Video sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps)
- [`hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions#sitemap)


To combine extensions, add the tags from whatever sitemap extensions you're using, one after the
other, to the appropriate `<url>` tag, as described in each sitemap extension's
documentation.


For example, to add news, video, and xhtml (`hreflang`) extensions to a sitemap:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://www.example.com/english/page.html</loc>
    <!-- Starting with the news extension tags -->
    <news:news>
      <news:publication>
        <news:name>The Example Times</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>2008-12-23</news:publication_date>
      <news:title>Companies A, B in Merger Talks</news:title>
    </news:news>
    <!-- Next we add video extension tags -->
    <video:video>
      <video:thumbnail_loc>https://www.example.com/thumbs/123.jpg</video:thumbnail_loc>
      <video:title>Lizzi is painting the wall</video:title>
      <video:description>
        Gary is watching the paint dry on the wall Lizzi painted.
      </video:description>
      <video:player_loc>
        https://player.example.com/video/987654321
      </video:player_loc>
    </video:video>
    <!-- And finally the xhtml tags for hreflang -->
    <xhtml:link
                rel="alternate"
                hreflang="de"
                href="https://www.example.de/deutsch/page.html"/>
    <xhtml:link
                rel="alternate"
                hreflang="de-ch"
                href="https://www.example.de/schweiz-deutsch/page.html"/>
    <xhtml:link
                rel="alternate"
                hreflang="en"
                href="https://www.example.com/english/page.html"/>
  </url>
<!-- Add more <url> tags -->
```


The order of the extension in the sitemap is irrelevant after the `<loc>`
tag. Keep in mind the
[general sitemap best practices](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#general-guidelines),
especially the file size limits. Combining sitemap extensions increases the file size of your
sitemap significantly.

## Troubleshooting sitemaps


If you're having trouble with your sitemap, you can investigate the errors with Google Search Console.
See Search Console's
[sitemaps troubleshooting guide](https://support.google.com/webmasters/answer/7451001#errors)
for help.