# Robots.txt Introduction and Guide | Google Search Central

# Introduction to robots.txt

[Video](https://www.youtube.com/watch?v=IXNEVt9rZG8)


A robots.txt file tells search engine crawlers which URLs the crawler can access on your site.
This is used mainly to avoid overloading your site with requests; **it is not a
mechanism for keeping a web page out of Google** . To keep a web page out of Google,
[block indexing with `noindex`](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
or password-protect the page.

> [!IMPORTANT]
>
> **If you use a CMS, such as Wix or Blogger**, you might not need to (or
> be able to) edit your robots.txt file directly. Instead, your CMS might expose a search
> settings page or some other mechanism to tell search engines whether or not to crawl your
> page.
>
>
> If you want to hide or unhide one of your pages from search engines, search for instructions
> about modifying your page visibility in search engines on your CMS (for example,
> search for "wix hide page from search engines").

## What is a robots.txt file used for?


A robots.txt file is used primarily to manage crawler traffic to your site, and
*usually* to keep a file off Google, depending on the file type:

| robots.txt effect on different file types ||
|---|---|
| Web page | You can use a robots.txt file for web pages (HTML, PDF, or other [non-media formats that Google can read](https://developers.google.com/search/docs/crawling-indexing/indexable-file-types)), to manage crawling traffic if you think your server will be overwhelmed by requests from Google's crawler, or to avoid crawling unimportant or similar pages on your site. > [!WARNING] > **Warning**: Don't use a robots.txt file as a means to hide your web pages > (including PDFs and other text-based formats supported by Google) from Google Search > results. > If other pages point to your page with descriptive text, Google could still index > the URL without visiting the page. If you want to block your page from search > results, use another method such as password protection or > [`noindex`](https://developers.google.com/search/docs/crawling-indexing/block-indexing). **If your web page is blocked with a robots.txt file** , its URL can still appear in search results, but the search result [won't have a description](https://support.google.com/webmasters/answer/7489871). Image files, video files, PDFs, and other non-HTML files embedded in the blocked page will be excluded from crawling, too, unless they're referenced by other pages that are allowed for crawling. If you see this search result for your page and want to fix it, remove the robots.txt entry blocking the page. If you want to hide the page completely from Search, use [another method](https://developers.google.com/search/docs/crawling-indexing/remove-information#i-control-the-web-page). |
| Media file | Use a robots.txt file to manage crawl traffic, and also to prevent image, video, and audio files from appearing in Google Search results. This won't prevent other pages or users from linking to your image, video, or audio file. - [Read more about preventing images from appearing on Google.](https://developers.google.com/search/docs/crawling-indexing/prevent-images-on-your-page) - [Read more about how to remove or restrict your video files from appearing on Google.](https://developers.google.com/search/docs/appearance/video#remove) |
| Resource file | You can use a robots.txt file to block resource files such as unimportant image, script, or style files, **if you think that pages loaded without these resources won't be significantly affected by the loss**. However, if the absence of these resources make the page harder for Google's crawler to understand the page, don't block them, or else Google won't do a good job of analyzing pages that depend on those resources. |

## Understand the limitations of a robots.txt file


Before you create or edit a robots.txt file, you should know the limits of this URL blocking
method. Depending on your goals and situation, you might want to consider other mechanisms to
ensure your URLs are not findable on the web.

- **robots.txt rules may not be supported by all search engines.**   
  The instructions in robots.txt files cannot enforce crawler behavior to your site; it's up to the crawler to obey them. While Googlebot and other respectable web crawlers obey the instructions in a robots.txt file, other crawlers might not. Therefore, if you want to keep information secure from web crawlers, it's better to use other blocking methods, such as [password-protecting private files on your server](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share).
- **Different crawlers interpret syntax differently.**   
  Although respectable web crawlers follow the rules in a robots.txt file, each crawler might interpret the rules differently. You should know the [proper syntax](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt#syntax) for addressing different web crawlers as some might not understand certain instructions.
- **A page that's disallowed in robots.txt can
  still be indexed if linked to from other sites.**   
  While Google won't crawl or index the content blocked by a robots.txt file, we might still find and index a disallowed URL if it is linked from other places on the web. As a result, the URL address and, potentially, other publicly available information such as anchor text in links to the page can still appear in Google Search results. To properly prevent your URL from appearing in Google Search results, [password-protect the files on your server](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share), [use the `noindex` `meta` tag or response header](https://developers.google.com/search/docs/crawling-indexing/block-indexing), or remove the page entirely.

> [!CAUTION]
> **Caution** : Combining multiple crawling and indexing rules might cause some rules to counteract other rules. Learn how to [combine crawling with indexing and serving rules](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#combining).

## Create or update a robots.txt file


If you decided that you need one, learn how to
[create a robots.txt file](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt). Or if
you already have one, learn how to
[update it](https://developers.google.com/search/docs/crawling-indexing/robots/submit-updated-robots-txt).

Want to learn more? Check out the following resources:

- [How to write and submit a robots.txt file](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt)
- [Update your robots.txt file](https://developers.google.com/crawling/docs/robots-txt/submit-updated-robots-txt)
- [How Google interprets the robots.txt specification](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec)

# How Google interprets the robots.txt specification


Google's automated
[crawlers](https://developers.google.com/crawling/docs/crawlers-fetchers/overview-google-crawlers) support the
[Robots Exclusion Protocol (REP)](https://www.rfc-editor.org/rfc/rfc9309.html).
This means that before crawling a site, Google's crawlers download and parse the site's
robots.txt file to extract information about which parts of the site may be crawled. The REP
isn't applicable to Google's crawlers that are controlled by users (for example, feed
subscriptions), or crawlers that are used to increase user safety (for example, malware
analysis).


This page describes Google's interpretation of the REP. For the original
standard, check
[RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html).

## What is a robots.txt file


If you don't want crawlers to access sections of your site, you can create a robots.txt file
with appropriate rules. A robots.txt file is a text file containing rules about which
crawlers may access which parts of a site. For example, the robots.txt file for example.com
may look like this:

```
# This robots.txt file controls crawling of URLs under https://example.com.
# All crawlers are disallowed to crawl files in the "includes" directory, such
# as .css, .js, but Google needs them for rendering, so Googlebot is allowed
# to crawl them.
User-agent: *
Disallow: /includes/

User-agent: Googlebot
Allow: /includes/

Sitemap: https://example.com/sitemap.xml
```


If you're new to robots.txt, start with our
[intro to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro). You can also find
[tips for creating a robots.txt file](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt).

## File location and range of validity


You must place the robots.txt file in the top-level directory of a site, on a supported
protocol. The URL for the robots.txt file is (like other URLs) case-sensitive. In case of
Google Search, the supported protocols are HTTP, HTTPS, and FTP. On HTTP and HTTPS, crawlers
fetch the robots.txt file with an HTTP non-conditional `GET` request; on FTP,
crawlers use a standard `RETR (RETRIEVE)` command, using anonymous login.


The rules listed in the robots.txt file apply only to the host, protocol, and port number
where the robots.txt file is hosted.

## Examples of valid robots.txt URLs

The following table contains examples of robots.txt URLs and what URL paths they're valid for.
Column one contains the URL of a robots.txt file, and column two contains domains that that robots.txt file would and wouldn't apply to.

| Robots.txt URL examples ||
|---|---|
| `https://example.com/robots.txt` | This is the general case. It's not valid for other subdomains, protocols, or port numbers. It's valid for all files in all subdirectories on the same host, protocol, and port number. Yes - `https://example.com/` - `https://example.com/folder/file` No - `https://other.example.com/` - `http://example.com/` - `https://example.com:8181/` |
| `https://www.example.com/robots.txt` | A robots.txt on a subdomain is only valid for that subdomain. Yes `https://www.example.com/` No - `https://example.com/` - `https://shop.www.example.com/` - `https://www.shop.example.com/` |
| `https://example.com/folder/robots.txt` | Not a valid robots.txt file. Crawlers don't check for robots.txt files in subdirectories. |
| `https://www.exämple.com/robots.txt` | IDNs are equivalent to their punycode versions. See also [RFC 3492](https://www.ietf.org/rfc/rfc3492.txt). Yes - `https://www.exämple.com/` - `https://xn--exmple-cua.com/` No `https://www.example.com/` |
| `ftp://example.com/robots.txt` | Yes `ftp://example.com/` No `https://example.com/` |
| `https://212.96.82.21/robots.txt` | A robots.txt with an IP-address as the hostname is only valid for crawling of that IP address as the hostname. It isn't automatically valid for all websites hosted on that IP address (though it's possible that the robots.txt file is shared, in which case it would also be available under the shared hostname). Yes `https://212.96.82.21/` No `https://example.com/` (even if hosted on `212.96.82.21`) |
| `https://example.com:443/robots.txt` | Standard port numbers (`80` for HTTP, `443` for HTTPS, `21` for FTP) are equivalent to their default hostnames. Yes - `https://example.com:443/` - `https://example.com/` No `https://example.com:444/` |
| `https://example.com:8181/robots.txt` | Robots.txt files on non-standard port numbers are only valid for content made available through those port numbers. Yes `https://example.com:8181/` No `https://example.com/` |

## Handling of errors and HTTP status codes


When requesting a robots.txt file, the HTTP status code of the server's response affects how
the robots.txt file will be used by Google's crawlers. The following table summarizes how
Googlebot treats robots.txt files for different HTTP status codes.

| Handling of errors and HTTP status codes ||
|---|---|
| `2xx (success)` | HTTP status codes that signal success prompt Google's crawlers to process the robots.txt file as provided by the server. |
| `3xx (redirection)` | Google follows at least five redirect hops as defined by [RFC 1945](https://www.ietf.org/rfc/rfc1945.txt) and then stops and treats it as a `404` for the robots.txt file. This also applies to any disallowed URLs in the redirect chain, since the crawler couldn't fetch rules due to the redirects. Google doesn't follow logical redirects in robots.txt files (frames, JavaScript, or meta refresh-type redirects). |
| `4xx (client errors)` | Google's crawlers treat all `4xx` errors, except `429`, as if a valid robots.txt file didn't exist. This means that Google assumes that there are no crawl restrictions. > [!WARNING] > Don't use `401` and `403` status codes for limiting the crawl rate. The `4xx` status codes, except `429`, have no effect on crawl rate. [Learn how to limit your crawl rate](https://developers.google.com/crawling/docs/crawlers-fetchers/reduce-crawl-rate). |
| `5xx (server errors)` | If Google finds a robots.txt file but can't fetch it, Google follows this behavior: 1. For the first 12 hours, Google stops crawling the site but keeps trying to fetch the robots.txt file. 2. If Google can't fetch a new version, for the next 30 days Google will use the last good version, while still trying to fetch a new version. A `503 (service unavailable)` error results in fairly frequent retrying. If there's no cached version available, Google assumes there's no crawl restrictions. 3. If the errors are still not fixed after 30 days: - If the site is generally available to Google, Google will behave as if there is no robots.txt file (but still keep checking for a new version). - If the site has general availability problems, Google will stop crawling the site, while still periodically requesting a robots.txt file. |
| Other errors | A robots.txt file which cannot be fetched due to DNS or networking issues, such as timeouts, invalid responses, reset or interrupted connections, and HTTP chunking errors, is treated as a [server error](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec#server-error). |

## Caching


Google generally caches the contents of robots.txt file for up to 24 hours, but may cache it
longer in situations where refreshing the cached version isn't possible (for example, due to
timeouts or `5xx` errors). The cached response may be shared by different crawlers.
Google may increase or decrease the cache lifetime based on
[max-age Cache-Control](https://www.rfc-editor.org/rfc/rfc9110.html)
HTTP headers.

## File format


The robots.txt file must be a
[UTF-8](https://en.wikipedia.org/wiki/UTF-8) encoded plain text
file and the lines must be separated by `CR`, `CR/LF`, or
`LF`.


Google ignores invalid lines in robots.txt files, including the Unicode
[Byte Order Mark](https://en.wikipedia.org/wiki/Byte_order_mark)
(BOM) at the beginning of the robots.txt file, and use only valid lines. For example, if the
content downloaded is HTML instead of robots.txt rules, Google will try to parse the content
and extract rules, and ignore everything else.


Similarly, if the character encoding of the robots.txt file isn't UTF-8, Google may ignore
characters that are not part of the UTF-8 range, potentially rendering robots.txt rules
invalid.


Google enforces a robots.txt file size limit of 500
[kibibytes](https://en.wikipedia.org/wiki/Kibibyte) (KiB). Content
which is after the maximum file size is ignored. You can reduce the size of the robots.txt
file by consolidating rules that would result in an oversized robots.txt file. For
example, place excluded material in a separate directory.

## Syntax


A valid robots.txt line consists of a field, a colon, and a value. Field names are
case-insensitive (for example, `User-agent` and `user-agent` are treated the
same). Spaces are optional, but recommended to improve readability. Space at the beginning and
at the end of the line is ignored. To include comments, precede your comment with the
`#` character. Keep in mind that everything after the `#` character will
be ignored. The general format is
`<field>:<value><#optional-comment>`.


Google supports the following fields (other fields such as `crawl-delay` aren't supported):

- `user-agent`: identifies which crawler the rules apply to.
- `allow`: a URL path that may be crawled.
- `disallow`: a URL path that may not be crawled.
- `sitemap`: the complete URL of a sitemap.


The `allow` and `disallow` fields are also called rules (also known as
directives). These rules are always specified in the form of
`rule: [path]` where `[path]` is optional. By default, there are no
restrictions for crawling for the designated crawlers. Crawlers ignore rules without a
`[path]`.


The `[path]` value, if specified, is relative to the root of the website from where
the robots.txt file was fetched (using the same protocol, port number, host and domain names).
The path value must start with `/` to designate the root and the value is
case-sensitive. Learn more about
[URL matching based on path values](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec#url-matching-based-on-path-values).

### `user-agent`


The `user-agent` line identifies which crawler rules apply to. See
[Google's crawlers and user-agent strings](https://developers.google.com/crawling/docs/crawlers-fetchers/overview-google-crawlers)
for a comprehensive list of user-agent strings you can use in your robots.txt file.


Both the `user-agent` field name and its value are case-insensitive.

### `disallow`


The `disallow` rule specifies paths that must not be accessed by the crawlers
identified by the `user-agent` line the `disallow` rule is grouped with.
Crawlers ignore the rule without a path.


Google can't index the content of pages which are disallowed for crawling, but it may still
index the URL and show it in search results without a snippet. Learn how to
[block indexing](https://developers.google.com/search/docs/crawling-indexing/block-indexing).


The field name (`disallow`) is case-insensitive, but its value is case-sensitive.

Usage:

```
disallow: [path]
```

### `allow`


The `allow` rule specifies paths that may be accessed by the designated
crawlers. When no path is specified, the rule is ignored.


The field name (`allow`) is case-insensitive, but its value is case-sensitive.

Usage:

```
allow: [path]
```

### `sitemap`


Google, Bing, and other major search engines support the `sitemap` field in
robots.txt, as defined by [sitemaps.org](https://sitemaps.org).


The field name (`sitemap`) is case-insensitive, but its value is case-sensitive.

Usage:

```
sitemap: [absoluteURL]
```


The `[absoluteURL]` line points to the location of a sitemap or sitemap index file.
It must be a fully qualified URL, including the protocol and host, and doesn't have to be
URL-encoded. The URL doesn't have to be on the same host as the robots.txt file. You can
specify multiple `sitemap` fields, with no limit to the number of sitemaps you can
include. The sitemap field isn't tied to any specific user agent and may be followed by all
crawlers, provided it isn't disallowed for crawling.

For example:

```
user-agent: otherbot
disallow: /kale

sitemap: https://example.com/sitemap.xml
sitemap: https://cdn.example.org/other-sitemap.xml
sitemap: https://ja.example.org/テスト-サイトマップ.xml
```

## Grouping of lines and rules


You can group together rules that apply to multiple user agents by repeating
`user-agent` lines for each crawler.

For example:

```
user-agent: a
disallow: /c

user-agent: b
disallow: /d

user-agent: e
user-agent: f
disallow: /g

user-agent: h
```

In this example there are four distinct rule groups:

- One group for user agent "a".
- One group for user agent "b".
- One group for both "e" and "f" user agents.
- One group for user agent "h".


For the technical description of a group, see
[section 2.1 of the REP](https://www.rfc-editor.org/rfc/rfc9309.html#section-2.1-2.4).

## Order of precedence for user agents


Only one group is valid for a particular crawler. Google's crawlers determine the correct
group of rules by finding in the robots.txt file the group with the most specific user agent
that matches the crawler's user agent. Other groups are ignored. All non-matching text is
ignored (for example, both `googlebot/1.2` and `googlebot*` are
equivalent to `googlebot`). The order of the groups within the robots.txt file is
irrelevant.


If there's more than one specific group declared for a user agent, all the rules from the
groups applicable to the specific user agent are combined internally into a single group. User
agent specific groups and global groups (`*`) are not combined.

### Examples

#### Matching of `user-agent` fields

```
user-agent: googlebot-news
(group 1)

user-agent: *
(group 2)

user-agent: googlebot
(group 3)
```

This is how the crawlers would choose the relevant group:

| Group followed per crawler ||
|---|---|
| Googlebot News | `googlebot-news` follows group 1, because group 1 is the most specific group. |
| Googlebot (web) | `googlebot` follows group 3. |
| Googlebot Storebot | `Storebot-Google` follows group 2, because there is no specific `Storebot-Google` group. |
| Googlebot News (when crawling images) | When crawling images, `googlebot-news` follows group 1. `googlebot-news` doesn't crawl the images for Google Images, so it only follows group 1. |
| Otherbot (web) | Other Google crawlers follow group 2. |
| Otherbot (news) | Other Google crawlers that crawl news content, but don't identify as `googlebot-news` follow group 2. Even if there is an entry for a related crawler, it is only valid if it's specifically matching. |

#### Grouping of rules


If there are multiple groups in a robots.txt file that are relevant to a specific user agent,
Google's crawlers internally merge the groups. For example:

```
user-agent: googlebot-news
disallow: /fish

user-agent: *
disallow: /carrots

user-agent: googlebot-news
disallow: /shrimp
```

The crawlers internally group the rules based on user agent, for example:

```
user-agent: googlebot-news
disallow: /fish
disallow: /shrimp

user-agent: *
disallow: /carrots
```


Rules other than `allow`, `disallow`, and `user-agent` are
ignored by the robots.txt parser. This means that the following robots.txt snippet is treated
as one group, and thus both `user-agent` `a` and `b` are
affected by the `disallow: /` rule:

```
user-agent: a
sitemap: https://example.com/sitemap.xml

user-agent: b
disallow: /
```


When the crawlers process the robots.txt rules, they ignore the `sitemap` line.
For example, this is how the crawlers would understand the previous robots.txt snippet:

```
user-agent: a
user-agent: b
disallow: /
```

## URL matching based on path values


Google uses the path value in the `allow` and `disallow` rules as a
basis to determine whether or not a rule applies to a specific URL on a site. This works by
comparing the rule to the path component of the URL that the crawler is trying to fetch.
Non-7-bit ASCII characters in a path may be included as UTF-8 characters or as percent-escaped
UTF-8 encoded characters per
[RFC 3986](https://www.ietf.org/rfc/rfc3986.txt).


Google, Bing, and other major search engines support a limited form of *wildcards* for
path values. These wildcard characters are:

- `*` designates 0 or more instances of any valid character.
- `$` designates the end of the URL.


The following table shows how the different wildcard characters affect parsing:

| Example path matches ||
|---|---|
| `/` | Matches the root and any lower level URL. |
| `/*` | Equivalent to `/`. The trailing wildcard is ignored. |
| `/$` | Matches only the root. Any lower level URL is allowed for crawling. |
| `/fish` | Matches any path that starts with `/fish`. Note that the matching is case-sensitive. Yes - `/fish` - `/fish.html` - `/fish/salmon.html` - `/fishheads` - `/fishheads/yummy.html` - `/fish.php?id=anything` No - `/Fish.asp` - `/catfish` - `/?id=fish` - `/desert/fish` |
| `/fish*` | Equivalent to `/fish`. The trailing wildcard is ignored. Yes - `/fish` - `/fish.html` - `/fish/salmon.html` - `/fishheads` - `/fishheads/yummy.html` - `/fish.php?id=anything` No - `/Fish.asp` - `/catfish` - `/?id=fish` - `/desert/fish` |
| `/fish/` | Matches anything in the `/fish/` folder. Yes - `/fish/` - `/fish/?id=anything` - `/fish/salmon.htm` No - `/fish` - `/fish.html` - `/animals/fish/` - `/Fish/Salmon.asp` |
| `/*.php` | Matches any path that contains `.php`. Yes - `/index.php` - `/filename.php` - `/folder/filename.php` - `/folder/filename.php?parameters` - `/folder/any.php.file.html` - `/filename.php/` No - `/` (even if it maps to /index.php) - `/windows.PHP` |
| `/*.php$` | Matches any path that ends with `.php`. Yes - `/filename.php` - `/folder/filename.php` No - `/filename.php?parameters` - `/filename.php/` - `/filename.php5` - `/windows.PHP` |
| `/fish*.php` | Matches any path that contains `/fish` and `.php`, in that order. Yes - `/fish.php` - `/fishheads/catfish.php?parameters` No `/Fish.PHP` |

## Order of precedence for rules


When matching robots.txt rules to URLs, crawlers use the most specific rule based on the
length of the rule path. In case of conflicting rules, including those with wildcards, Google uses
the least restrictive rule.


The following examples demonstrate which rule Google's crawlers will apply on a given URL.

| Sample situations ||
|---|---|
| `https://example.com/page` | ``` allow: /p disallow: / ``` **Applicable rule** : `allow: /p`, because it's more specific. |
| `https://example.com/folder/page` | ``` allow: /folder disallow: /folder ``` **Applicable rule** : `allow: /folder`, because in case of conflicting rules, Google uses the least restrictive rule. |
| `https://example.com/page.htm` | ``` allow: /page disallow: /*.htm ``` **Applicable rule** : `disallow: /*.htm`, because the rule path is longer and it matches more characters in the URL, so it's more specific. |
| `https://example.com/page.php5` | ``` allow: /page disallow: /*.ph ``` **Applicable rule** : `allow: /page`, because in case of conflicting rules, Google uses the least restrictive rule. |
| `https://example.com/` | ``` allow: /$ disallow: / ``` **Applicable rule** : `allow: /$`, because it's more specific. |
| `https://example.com/page.htm` | ``` allow: /$ disallow: / ``` **Applicable rule** : `disallow: /`, because the `allow` rule only applies on the root URL. |

# Updating Your Robots.txt File | Google Crawling Infrastructure

# Update your robots.txt file


To update the rules in your existing robots.txt file, download a copy of your robots.txt file
from your site and make the necessary edits. Then, upload the updated file to your site.

> [!IMPORTANT]
>
> **If you use a site hosting service, such as Wix or Blogger**, you might not need to (or
> be able to) edit your robots.txt file directly. Instead, your provider might expose a search
> settings page or some other mechanism to tell search engines whether or not to crawl your
> page.
>
>
> If you want to hide or unhide one of your pages from search engines, search for instructions
> about modifying your page visibility in search engines on your hosting service, for example,
> search for "wix hide page from search engines".

## Download your robots.txt file


You can download your robots.txt file various ways, for example:

- Navigate to your robots.txt file, for example `https://example.com/robots.txt` and copy its contents into a new text file on computer. Make sure you follow the guidelines related to the [file format](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt#format_location) when creating the new local file.
- Download an actual copy of your robots.txt file with a tool like curl. For example:

  ```
  curl https://example.com/robots.txt -o robots.txt
  ```
- Use the [robots.txt report](https://support.google.com/webmasters/answer/6062598) in Search Console to copy the content of your robots.txt file, which you can then paste into a file on your computer.

## Edit your robots.txt file


Open the robots.txt file you downloaded from your site in a text editor and make the necessary
edits to the rules. Make sure you use the
[correct syntax](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt#create_rules)
and that you save the file with UTF-8 encoding.

## Upload your robots.txt file


Upload your new robots.txt file to the root directory of your site as a text file named
robots.txt. The way you upload a file to your site is highly platform and server dependent. Check
out our tips for finding help with
[uploading a robots.txt file to your site](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt#upload).

> [!NOTE]
>
> **If you do not have permission to upload files to the root directory of your site, contact
> your domain manager to make changes.**
>
>
> For example, if your site home page resides under
> `subdomain.example.com/site/example/`, you likely cannot update the robots.txt file
> at `subdomain.example.com/robots.txt`. In this case, contact the owner of
> `example.com/` to make any necessary changes to the robots.txt file.

## Refresh Google's robots.txt cache


During the automatic crawling process, Google's crawlers notice changes you made to your
robots.txt file and update the cached version every 24 hours. If you need to update the
cache faster, use the **Request a recrawl** function of the
[robots.txt report](https://support.google.com/webmasters/answer/6062598).

# Useful robots.txt rules

Here are some common useful robots.txt rules:

| Useful rules ||
|---|---|
| Disallow crawling of the entire site | Keep in mind that in some situations URLs from the site may still be indexed, even if they haven't been crawled. > [!NOTE] > **Note** : This doesn't match the [various AdsBot crawlers](https://developers.google.com/crawling/docs/crawlers-fetchers/overview-google-crawlers), which must be named explicitly. ``` User-agent: * Disallow: / ``` |
| Allow crawling of an entire site (with an empty `Disallow` rule) | This explicitly allows all crawlers to access the entire site. It is functionally equivalent to having no robots.txt file at all, or using an `Allow: /` rule. ``` User-agent: * Disallow: ``` |
| Disallow crawling of a directory and its contents | Append a forward slash to the directory name to disallow crawling of a whole directory. > [!CAUTION] > **Caution**: Remember, don't use robots.txt to block access to private content; use proper authentication instead. URLs disallowed by the robots.txt file might still be indexed without being crawled, and the robots.txt file can be viewed by anyone, potentially disclosing the location of your private content. ``` User-agent: * Disallow: /calendar/ Disallow: /junk/ Disallow: /books/fiction/contemporary/ ``` |
| Disallow crawling of a single web page | For example, disallow the `useless_file.html` page located at `https://example.com/useless_file.html`, and `other_useless_file.html` in the `junk` directory. ``` User-agent: * Disallow: /useless_file.html Disallow: /junk/other_useless_file.html ``` |
| Disallow crawling of the whole site except a subdirectory | Crawlers may only access the `public` subdirectory. ``` User-agent: * Disallow: / Allow: /public/ ``` |
| Allow access to a single crawler | Only `Googlebot-News` may crawl the whole site. ``` User-agent: Googlebot-News Allow: / User-agent: * Disallow: / ``` |
| Allow access to all but a single crawler | `Unnecessarybot` may not crawl the site, all other bots may. ``` User-agent: Unnecessarybot Disallow: / User-agent: * Allow: / ``` |
| Disallow crawling of an entire site, but allow `Storebot-Google` | This implementation hides your pages from Google Search results, but the `Storebot-Google` web crawler can still analyze them to show your products on Google Shopping. ``` User-agent: * Disallow: / User-agent: Storebot-Google Allow: / ``` |
| Block all images on your site from Google (includes anywhere images are displayed on Google, including Google Images and Discover) | Google can't index images and videos without crawling them. ``` User-agent: Googlebot-Image Disallow: / ``` |
| Block a specific image from Google Images | For example, disallow the `dogs.jpg` image. ``` User-agent: Googlebot-Image Disallow: /images/dogs.jpg ``` |
| Disallow crawling of files of a specific file type | For example, disallow for crawling all `.gif` files. ``` User-agent: Googlebot Disallow: /*.gif$ ``` |
| Use the `*` and `$` wildcards to match URLs that end with a specific string | For example, disallow all `.xls` files: ``` User-agent: Googlebot Disallow: /*.xls$ ``` > [!IMPORTANT] > The `$` wildcard designates the end of the URL. This means that any URL that has additional characters after the pattern (such as URL parameters) won't match. For example, `https://example.com/cats.xls?personality=loki` **won't** be blocked by the rule `/*.xls$`. |
| Combine multiple user agents in a single group | Consolidating rules for multiple crawlers into one group makes the file shorter and easier to manage, as all rules in the group apply to every user agent listed. This is the same as listing the user agents twice with the respective rules. ``` User-agent: Googlebot User-agent: Storebot-Google Allow: /cats Disallow: / ``` |