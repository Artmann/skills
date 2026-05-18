---
name: unsplash
description:
  Find photos on Unsplash by keyword and return properly-sized,
  attribution-ready image URLs for any use case — blog hero images, inline
  article images, social media cards (OG, Twitter, LinkedIn, Instagram,
  Pinterest), thumbnails, illustrations, etc. Use this skill whenever the user
  wants to source, find, search for, or pick a photograph or stock image — even
  if they don't say "Unsplash" explicitly. Triggers on phrases like "find an
  image of X", "I need a photo of X", "stock photo", "hero image", "photo for my
  blog", "social media image", "OG image", and similar.
---

# Unsplash photo search

Search Unsplash for photographs by keyword and return a URL sized correctly for
the user's intended use (blog post hero, social media card, thumbnail, etc.)
along with the attribution snippet Unsplash requires.

## Workflow

1. **Get the access key.** Look at `~/.unsplash` first. If it's missing, walk
   the user through creating one (see "Obtaining an access key" below). Never
   prompt for it if the file already has a value.
2. **Confirm the use case** if it's ambiguous. "Blog post" could mean hero or
   inline; "social" could mean any of half a dozen formats. A quick "is this for
   X or Y?" is fine. If the user already said (e.g., "for an OG image"), skip
   this.
3. **Search** via `GET /search/photos` with appropriate `orientation` for the
   use case. Default to `per_page=10` so the user has choices.
4. **Present candidates** to the user. If the agent can render images in its UI,
   embed the `thumb` URLs (200px wide, cheap). Otherwise list each with its
   `description` / `alt_description`, photographer name, and the `links.html`
   URL on unsplash.com so they can click through.
5. **Once the user picks one**, build the final URL at the right size (see "Size
   presets") and produce the attribution snippet.
6. **Trigger a download event** by `GET`-ing the chosen photo's
   `links.download_location` — this is required by Unsplash's API guidelines any
   time a user actually uses a photo. It's a no-op for the user but it matters
   for the photographer's stats and your app's compliance.

## Reading the access key

```bash
cat ~/.unsplash 2>/dev/null
```

The file should contain just the access key on a single line. If it's empty or
missing, fall through to "Obtaining an access key".

## Obtaining an access key

If `~/.unsplash` doesn't exist, tell the user:

> I need an Unsplash access key to search for photos. It's free and takes about
> 2 minutes:
>
> 1. Go to https://unsplash.com/oauth/applications and log in (or create an
>    account).
> 2. Click **New Application**, accept the API terms, and fill in a name and
>    description (anything is fine — "Personal use" works).
> 3. On the application page, copy the **Access Key** (the public one — not the
>    Secret Key).
> 4. Paste it back to me and I'll save it to `~/.unsplash` for next time.
>
> Note: new keys start in "demo mode" with a 50-requests-per-hour rate limit,
> which is plenty for casual use. You can apply for production (5000/hour) later
> if needed.

When the user provides the key, save it:

```bash
echo "PASTED_KEY" > ~/.unsplash
chmod 600 ~/.unsplash
```

## Searching

Use `GET https://api.unsplash.com/search/photos` with the access key as a
`Client-ID` header:

```bash
curl -s "https://api.unsplash.com/search/photos?query=coffee+shop&per_page=10&orientation=landscape" \
  -H "Authorization: Client-ID $(cat ~/.unsplash)" \
  -H "Accept-Version: v1"
```

### Useful query parameters

- `query` — keywords (required)
- `per_page` — 1–30 (default 10)
- `orientation` — `landscape`, `portrait`, `squarish`
- `color` — `black_and_white`, `black`, `white`, `yellow`, `orange`, `red`,
  `purple`, `magenta`, `green`, `teal`, `blue`
- `order_by` — `relevant` (default) or `latest`
- `content_filter` — `low` (default) or `high`

### Picking orientation from use case

- Blog hero, OG image, Twitter card, LinkedIn post → `landscape`
- Pinterest, Instagram portrait/story → `portrait`
- Instagram feed square → `squarish`
- Inline blog body / unspecified → leave unset

## Size presets

Every photo has `urls.raw` — an Imgix URL you append params to. Build the final
URL as:

```
${photo.urls.raw}&w=WIDTH&h=HEIGHT&fit=crop&crop=entropy&auto=format&q=80
```

Keep the existing `ixid` parameter that's already in `raw` — it's how Unsplash
tracks views back to the photographer. Just append with `&`.

| Use case                                 | Recommended URL params                                  |
| ---------------------------------------- | ------------------------------------------------------- |
| Blog hero                                | `&w=1600&auto=format&q=80&fit=max`                      |
| Blog inline                              | `&w=800&auto=format&q=80&fit=max`                       |
| OG image / Twitter card / LinkedIn share | `&w=1200&h=630&fit=crop&crop=entropy&auto=format&q=80`  |
| Twitter/X header                         | `&w=1500&h=500&fit=crop&crop=entropy&auto=format&q=80`  |
| Instagram feed (square)                  | `&w=1080&h=1080&fit=crop&crop=entropy&auto=format&q=85` |
| Instagram portrait                       | `&w=1080&h=1350&fit=crop&crop=entropy&auto=format&q=85` |
| Instagram story                          | `&w=1080&h=1920&fit=crop&crop=entropy&auto=format&q=85` |
| Pinterest pin                            | `&w=1000&h=1500&fit=crop&crop=entropy&auto=format&q=80` |
| YouTube thumbnail                        | `&w=1280&h=720&fit=crop&crop=entropy&auto=format&q=85`  |
| Thumbnail / avatar                       | `&w=400&auto=format&q=75&fit=max`                       |

For retina, append `&dpr=2` (or generate a `srcset` varying `w`).

`fit=max` preserves the aspect ratio (good for inline/hero where dimensions
aren't strict). `fit=crop&crop=entropy` lets Unsplash auto-crop to fixed
dimensions using the most visually interesting region (good for social cards
where dimensions are strict).

`auto=format` is always worth including — it serves AVIF/WebP to browsers that
support it, JPEG otherwise.

## Attribution

Unsplash's API terms require attribution to the photographer and to Unsplash on
each rendered photo. After picking a photo, generate this snippet for the user:

**HTML:**

```html
Photo by
<a href="https://unsplash.com/@USERNAME?utm_source=YOUR_APP&utm_medium=referral"
  >PHOTOGRAPHER_NAME</a
>
on
<a href="https://unsplash.com/?utm_source=YOUR_APP&utm_medium=referral"
  >Unsplash</a
>
```

**Markdown:**

```markdown
Photo by
[PHOTOGRAPHER_NAME](https://unsplash.com/@USERNAME?utm_source=YOUR_APP&utm_medium=referral)
on [Unsplash](https://unsplash.com/?utm_source=YOUR_APP&utm_medium=referral)
```

Replace `YOUR_APP` with the application name the user set up on Unsplash
(slugified). If unknown, leave a placeholder and tell the user to fill it in.

Pull `PHOTOGRAPHER_NAME` from `photo.user.name` and `USERNAME` from
`photo.user.username`.

## Triggering a download

Once the user has picked a photo and is going to use it, hit the download
endpoint. It returns immediately and just increments the photographer's download
counter:

```bash
curl -s "$(echo "$DOWNLOAD_LOCATION_FROM_RESPONSE")?client_id=$(cat ~/.unsplash)" > /dev/null
```

Or, equivalently, with the header:

```bash
curl -s "$DOWNLOAD_LOCATION_FROM_RESPONSE" \
  -H "Authorization: Client-ID $(cat ~/.unsplash)" > /dev/null
```

This is in Unsplash's guidelines and is required to stay in compliance. Don't
skip it.

## What to return to the user

After they pick a photo, give them a compact block with everything they need:

```
Photo: [description or alt_description]
By: [photographer name] (@username)

Image URL (sized for [use case]):
https://images.unsplash.com/photo-XXX?ixid=...&w=1200&h=630&fit=crop&crop=entropy&auto=format&q=80

Attribution (Markdown):
Photo by [Name](...) on [Unsplash](...)

Unsplash page: https://unsplash.com/photos/XXX
```

If the user wants multiple sizes (e.g., a blog with both a hero and an OG
image), generate all of them from the same `urls.raw`.

## Edge cases

- **Empty results.** If `total` is 0, suggest broader or different keywords.
- **401 Unauthorized.** The key is invalid. Tell the user and walk through
  obtaining a new one — don't silently fail.
- **403 Forbidden.** Almost always means rate-limited in demo mode. Tell the
  user the limit resets hourly, or suggest applying for production access.
- **Sensitive queries.** Unsplash's `content_filter=low` default already blocks
  NSFW results. For content explicitly aimed at younger audiences, bump to
  `content_filter=high`.
- **Faces / people in cropped results.** When using `fit=crop` for fixed
  dimensions, swap `crop=entropy` for `crop=faces,entropy` if the photo features
  a person — keeps faces in frame.

## Rate limits

Demo mode is 50 requests/hour. Production is 5000/hour. Each search counts as
one request; image fetches (`images.unsplash.com`) don't count. Check the
`X-Ratelimit-Remaining` response header if you suspect issues.
