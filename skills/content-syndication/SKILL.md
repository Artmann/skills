---
name: content-syndication
description:
  Take a piece of content already published on the user's own site and produce
  platform-native variations for syndication to Medium, X/Twitter, LinkedIn,
  Reddit, Hacker News, Dev.to, Hashnode, Bluesky, Threads, Substack, Facebook,
  and Instagram. Every variation includes a backlink to the original (and a
  canonical URL where supported) to capture the SEO benefits of syndication —
  brand search lift, parasite rankings, LLM citations, and indexing. Use this
  skill whenever the user wants to "syndicate", "repurpose", "cross-post",
  "distribute", or "make X versions of" an existing post or article. Triggers on
  phrases like "syndicate this post", "turn this into a Twitter thread", "make a
  LinkedIn version", "cross-post to Medium", "repurpose this content".
---

# Content syndication

Take one piece of already-published content and produce platform-native
variations for up to twelve channels. Each variation carries a contextual
backlink to the original — and a canonical URL on platforms that support one —
so the syndication compounds into SEO lift rather than competing with the source
for rankings.

## Why backlinks are the point

Syndication only pays off if the variations point back. The user is doing this
to earn:

- Brand-search lift and direct-traffic signals
- Parasite rankings on third-party domains (Medium, Dev.to, etc.)
- LLM citations from those parasites occupying top SERP slots
- Indexing help from new inbound links to the original

Never generate a variation without its backlink. Never strip UTM parameters the
user already attached to the source URL.

## Workflow

1. **Ask for the source** if the user hasn't provided one — a URL or a local
   path to the published post.
2. **Load the source.** URL → WebFetch. Local path → Read.
3. **Extract the skeleton** (see "Extracting the skeleton" below).
4. **Show the skeleton back** to the user in 5–8 lines so they can confirm it's
   accurate before you generate twelve variations off a bad base.
5. **Ask which platforms** to cover. Default offer: all twelve, grouped by
   syndication bucket so the user can pick by intent.
6. **For each chosen platform, Read its template file** at
   `skills/content-syndication/platforms/<platform>.md`. Only load the ones the
   user picked — the per-platform files exist so the agent doesn't carry
   templates it isn't using.
7. **Generate each variation** following its template, baking in the appropriate
   backlink or canonical.
8. **Write each variation** to `./syndicated/<slug>/<platform>.md`. Create the
   directory if needed. If it already exists, see the edge case below.
9. **Print a summary** listing every file written, the hook preview of each, and
   which still need manual steps from the user (subreddit choice, Hacker News
   submission, Medium import vs paste).

## Reading the source content

**URL** — use WebFetch with a prompt like "Extract the title, main body content,
author name, publication date, hero image URL, and any embedded images and
outbound links." If the response is a login wall, paywall, or near-empty page,
see edge cases.

**Local path** — use Read. Markdown, HTML, or plain text all work. If it's HTML,
strip the chrome (nav, sidebar, footer) and focus on the article body.

## Extracting the skeleton

Before any platform-specific work, pull these fields out of the source:

- `title` — the original post title
- `slug` — kebab-case version of the title, used as the output directory name.
  If the source URL already has a slug in its path, prefer that one.
- `hook` — the single most attention-grabbing line in the source, usually the
  opening sentence or the central contrarian claim
- `key_claims` — 3–7 bullet-sized takeaways, in the author's own words where
  possible
- `body` — the full prose, retained for the republish bucket
- `cta` — what the source asks the reader to do (sign up, download, reply, buy)
- `images` — URLs of any images in the source, especially the hero
- `outbound_links` — any URLs the source links to, preserved for the republish
  bucket
- `author` and `brand` — for attribution. If the brand name isn't obvious from
  the source URL's domain, ask before writing backlink anchor text.
- `source_url` — the canonical URL the variations will link back to, preserving
  any UTM parameters the user supplied

Show this back to the user as a compact bulleted block and ask them to confirm
or correct before proceeding.

## Asking which platforms

Default to offering all twelve, grouped by bucket so the user understands the
syndication strategy behind each choice. Use a multi-select prompt:

**Republish (full article, canonical URL):** medium, devto, hashnode

**Native thread (hook-first, backlink in final post):** twitter, bluesky,
threads

**Teaser → read-more (hook + takeaways + click-through):** linkedin, facebook,
substack, instagram

**Discussion submission (title + URL or short self-post):** reddit, hackernews

If the source URL is itself native to a platform — e.g. the source is a
twitter.com or x.com URL — skip that platform automatically and tell the user
why. Same for a linkedin.com source URL.

## Output layout

```
./syndicated/<slug>/
  medium.md
  devto.md
  hashnode.md
  twitter.md
  bluesky.md
  threads.md
  linkedin.md
  facebook.md
  substack.md
  instagram.md
  reddit.md
  hackernews.md
```

`<slug>` comes from the skeleton. If `./syndicated/<slug>/` already exists, list
the files inside it and ask the user whether to overwrite, suffix with a date
(e.g. `<slug>-2026-05-19/`), or abort.

## Loading platform templates

After the user picks platforms, Read each chosen template from
`skills/content-syndication/platforms/<platform>.md`. These files contain the
per-platform length limits, hook conventions, format scaffolds, hashtag rules,
and backlink placement. They are intentionally separate so the agent only loads
what it's generating.

Do not invent platform rules from training data. If a template file doesn't
cover a question, ask the user; don't guess.

## Voice and content guardrails (apply to every variation)

- **Preserve the author's voice and claims.** Adapt structure, not substance.
  Don't invent statistics, case studies, or quotes that aren't in the source.
- **No engagement bait** the source didn't include ("comment YES for the
  playbook", "drop a 🔥 if you agree"). If the source had it, keep it; if not,
  don't manufacture it.
- **No AI-cliché openers.** Skip "In today's fast-paced world…", "Let's dive
  in…", "Buckle up…", "Here's the thing…".
- **Match the source's emoji use.** If the source has none, the variation has
  none.
- **Hashtag discipline** is per-platform — see each template file.
- **Preserve technical accuracy.** Don't round numbers, soften qualifiers, or
  merge claims the source kept separate.

## Edge cases

- **Paywall, login wall, or empty WebFetch result** — tell the user, ask them to
  paste the content directly, and continue from the skeleton extraction step.
- **Source has no clear hook** — surface this; ask the user for one sentence to
  lead with. Don't invent one.
- **Brand or site name not derivable from the URL** — ask before writing the
  backlink anchor text on platforms where anchor text is visible (LinkedIn,
  Facebook, Reddit, Medium intro line).
- **Source is itself native to a platform** (twitter.com, x.com, linkedin.com,
  medium.com, substack URL, etc.) — skip that platform and tell the user why.
- **`./syndicated/<slug>/` already exists** — show the user what's in it, ask
  whether to overwrite, date-suffix, or abort.
- **Source contains unsourced statistics** — preserve them as-is. Don't add
  `[source needed]` annotations.
- **Source URL has UTM parameters** — keep them. They're how the user tracks
  syndicated traffic.

## What to return to the user

After writing, print a summary block listing each file with the opening hook of
its variation:

```
Wrote N variations to ./syndicated/<slug>/:

  medium.md       — "Originally published at <site>. <opening line>…"
  devto.md        — "Originally published at <site>. <opening line>…"
  ...
  twitter.md      — "<hook tweet, first 80 chars>…"
  linkedin.md     — "<hook line, first 80 chars>…"
  reddit.md       — "<suggested title>"
  hackernews.md   — "<title> → <source_url>"

Backlinks: all N point to <source_url>.
Canonicals: medium.md, devto.md, hashnode.md have canonical URLs set.

Manual steps still needed:
  - reddit.md: pick a subreddit (suggestions in the file)
  - hackernews.md: submit the URL at news.ycombinator.com/submit
  - medium.md: paste into Medium's editor or use their import-by-URL flow
```

Don't omit the manual-steps section — these are the platforms where the user
still has work to do.
