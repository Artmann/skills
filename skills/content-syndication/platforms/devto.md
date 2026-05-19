# Dev.to

**Bucket:** Full republish with canonical URL.

Dev.to reads frontmatter directly — it's the cleanest republish target of the
bunch. Set `published: false` so the user can review before it goes live.

## Format

```markdown
---
title: <title from skeleton>
published: false
canonical_url: <source_url>
tags: <up to 4 tags, lowercase, no spaces inside each, comma-separated>
cover_image: <hero image URL from skeleton, optional>
---

_Originally published at [<brand>](source_url)._

<article body>
```

Use standard Markdown — Dev.to supports fenced code blocks with language hints,
which the dev audience expects. Preserve any code samples from the source
exactly.

## Length

Whatever the source is. Don't truncate.

## Hook

The opening paragraph should work standalone. If the source opens with a
self-reference ("Last week I wrote…"), rewrite that single phrase.

## Hashtags

None in body. Up to 4 tags in frontmatter. Lowercase, no spaces — use existing
Dev.to tags where possible (`webdev`, `javascript`, `seo`, `tutorial`,
`beginners`, `productivity`, etc.). Don't invent niche tags; they get less
reach.

## Dev.to flavor

Dev.to readers respond to a single-sentence "Why I'm sharing this" line at the
bottom, inviting discussion:

```markdown
---

_I'd love to hear how others are handling this — what's worked for you?_
```

Add this only if the source doesn't already have its own discussion CTA.

## Backlink

`canonical_url` in frontmatter (Google) + "Originally published at" line
(readers).
