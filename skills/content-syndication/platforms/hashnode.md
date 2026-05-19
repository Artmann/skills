# Hashnode

**Bucket:** Full republish with canonical URL.

Hashnode uses camelCase frontmatter — `canonicalUrl`, not `canonical_url`. Easy
to get wrong.

## Format

```markdown
---
title: <title from skeleton>
subtitle: <one-line summary, optional>
canonicalUrl: <source_url>
tags: <up to 5, comma-separated, lowercase>
cover: <hero image URL from skeleton, optional>
---

_Originally published at [<brand>](source_url)._

<article body>
```

Standard Markdown. Hashnode supports code blocks, callouts (`> [!NOTE]`), and
embeds.

## Length

Whatever the source is. Don't truncate.

## Hook

Same rule as Medium and Dev.to — opening paragraph should read standalone;
rewrite any self-referential opener.

## Hashtags

None in body. Up to 5 tags in frontmatter, lowercase. Hashnode has a fixed tag
taxonomy — common ones: `webdev`, `programming`, `javascript`, `react`, `seo`,
`general-programming`. Match an existing tag rather than inventing one.

## Backlink

`canonicalUrl` in frontmatter (Google) + "Originally published at" line
(readers). Note the camelCase — `canonical_url` (snake_case) is silently ignored
by Hashnode.
