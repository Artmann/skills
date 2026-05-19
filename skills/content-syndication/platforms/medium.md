# Medium

**Bucket:** Full republish with canonical URL.

Medium is safe to republish because Medium's `canonical_url` tells Google the
original on the user's site is the source of truth — you don't compete with
yourself for rankings.

## Format

Medium accepts Markdown via paste or import-by-URL. Generate a Markdown file
that the user can paste into Medium's editor, or feed to Medium's "Import a
story" tool at `medium.com/p/import`.

Start the file with this YAML-style frontmatter block as a reference for the
user (Medium itself doesn't read frontmatter — these are fields the user will
set in Medium's UI after import):

```yaml
---
title: <title from skeleton>
subtitle: <one-line summary, optional>
canonical_url: <source_url>
tags: <up to 5, comma-separated, Title Case>
---
```

Then the article body, starting with this line on its own:

```markdown
_Originally published at [<brand>](source_url)._
```

Use H2 (`##`) and H3 (`###`) for structure. Preserve images from the source with
their original alt text. Preserve outbound links from the source.

## Length

Whatever the source is. Don't truncate. Medium readers expect long-form.

## Hook

The opening paragraph after the "Originally published at" line should be the
source's hook verbatim or lightly edited for standalone reading (e.g., if the
source opened with "As I mentioned last week…", rewrite that single phrase).

## Hashtags

None in body. Up to 5 tags in the frontmatter block, Title Case,
broad-but-relevant ("Marketing", "SEO", "Startups", not "marketing-tips").

## Backlink

Two backlinks: the canonical URL in the metadata, and the "Originally published
at" link in the body. Both. The canonical is for Google; the intro line is for
readers.

## What to write to the file

The full Markdown body, including the YAML reference block at the top and the
"Originally published at" line. The user copies the body into Medium and copies
the metadata into Medium's settings panel.
