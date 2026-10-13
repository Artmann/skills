# Skills

[![lint](https://github.com/artmann/skills/actions/workflows/lint.yml/badge.svg)](https://github.com/artmann/skills/actions/workflows/lint.yml)
[![skills.sh](https://skills.sh/b/artmann/skills)](https://skills.sh/artmann/skills)

This repository is a collection of agent skills — small, focused capabilities
you can plug into Claude to make it a faster, more efficient builder. Each skill
lives in its own directory under `skills/` and ships with a `SKILL.md` that
tells the agent when to use it and how.

Install with [skills.sh](https://skills.sh):

```sh
bunx skills add artmann/skills
```

Drop a skill into your agent's loadout and it picks up new triggers
automatically: search for stock photos, source images for a blog, etc. without
you having to spell out the workflow every time.

## Unsplash

Search Unsplash for photographs by keyword and get back a properly-sized,
attribution-ready image URL.

- Reads the access key from `~/.unsplash`, or walks you through getting one.
- Picks the right orientation for the use case.
- Sizes the URL for where the image will go: blog hero, OG card, Instagram,
  Pinterest, YouTube thumbnail, and more.
- Generates the photographer attribution snippet.
- Triggers the download event that Unsplash's API guidelines require.

**Triggers on:** "find an image of X", "I need a stock photo", "hero image", "OG
image".

**Install:**

```sh
bunx skills add artmann/skills --skill unsplash
```

## Content syndication

Take a piece of content already published on your own site and produce
platform-native versions for syndication.

- Supports Medium, X/Twitter, LinkedIn, Reddit, Hacker News, Dev.to, Hashnode,
  Bluesky, Threads, Substack, Facebook, and Instagram.
- Every version links back to the original, and sets a canonical URL on
  platforms that support one (Medium, Dev.to, Hashnode), so syndication adds SEO
  value instead of competing with the source.
- Per-platform templates live in separate files, so only the platforms you pick
  get loaded into context.

**Triggers on:** "syndicate this post", "turn this into a Twitter thread", "make
a LinkedIn version", "cross-post to Medium", "repurpose this content".

**Install:**

```sh
bunx skills add artmann/skills --skill content-syndication
```

## Plan implementation

Create an implementation plan for a new feature or view before writing code. The
plan is written to `docs/plans/<feature>.md` and works UI-first, in four phases:

1. **UI and interaction** - user flows, views, loading/empty/error states, and
   how mutations are handled (optimistic updates, drafts, intent-based actions).
2. **Data model** - derived from what the UI needs, not the other way around.
3. **Services and endpoints** - the glue between UI and data. Domain-driven,
   flat APIs, one shared vocabulary.
4. **Review** - failure modes, validation, authorization, rate limiting, and
   queueing.

The plan ends with an ordered build checklist.

**Triggers on:** "plan this feature", "create an implementation plan", "how
should we build X", `/plan-implementation`.

**Install:**

```sh
bunx skills add artmann/skills --skill plan-implementation
```
