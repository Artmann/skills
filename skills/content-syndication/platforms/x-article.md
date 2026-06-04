# X Articles

**Bucket:** Full republish — but no canonical URL.

X Premium+ and Verified Organizations can publish **Articles** — fully formatted
long-form posts that live natively on X (headers, bold/italic, embedded images
and video, up to ~100,000 characters). This is the X equivalent of a Medium
republish: the whole post, on-platform.

The catch: unlike Medium, Dev.to, and Hashnode, **X exposes no canonical-URL
setting.** So the only signal pointing search engines and readers back to the
original is the attribution backlink in the body. That line is load-bearing —
never omit it.

This is an accepted tradeoff. X Article content rarely competes with the source
in Google SERPs (most of it sits behind the platform), and the format's payoff
is reach and engagement on X plus the inbound link, not a parasite ranking.

## Requirements

Articles require an **X Premium+** or **Verified Organization** subscription. If
the user only has basic Premium (the 25,000-char "longer posts" tier), they
can't publish an Article — point them to the thread template (`twitter.md`)
instead.

## Format

X's Article composer accepts pasted rich text. Generate a Markdown file the user
pastes into the Article editor.

Start the body with the attribution line on its own:

```markdown
_Originally published at [<brand>](source_url)._
```

Then the full article. Use H2 (`##`) and H3 (`###`) for structure. Preserve
images from the source with their original alt text. Preserve outbound links
from the source.

## Length

Whatever the source is. Don't truncate — the ~100,000-char limit is far above
any normal post, and X Article readers expect long-form. Images and video don't
count toward the character limit.

## Hook

The opening paragraph after the "Originally published at" line should be the
source's hook verbatim or lightly edited for standalone reading (e.g., if the
source opened with "As I mentioned last week…", rewrite that single phrase).

## Hashtags

None in the article body. X Articles are just a title and a body — there's no
separate tag field like Medium's. Any hashtags belong in the promo post, not the
Article.

## Backlink

A single backlink: the "Originally published at" line near the top. There is no
canonical to fall back on, so this line is the entire attribution mechanism —
never drop it. Keep any UTM parameters already on `source_url`.

## Promo post

An Article doesn't surface in the feed on its own — it needs a regular post
linking to it (this is how the Railway CDN Article was distributed). If the user
also wants that announcement post, generate it from the thread/teaser template
in `twitter.md`. Don't auto-generate it here.

## What to write to the file

The full Markdown body, including the "Originally published at" attribution line
at the top. The user copies the body into X's Article composer and sets the
title there.
