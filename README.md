# Skills

[![lint](https://github.com/artmann/skills/actions/workflows/lint.yml/badge.svg)](https://github.com/artmann/skills/actions/workflows/lint.yml)
[![skills.sh](https://skills.sh/b/artmann/skills)](https://skills.sh/artmann/skills)

This repository is a collection of agent skills — small, focused capabilities
you can plug into Claude to make it a faster, more efficient builder. Each skill
lives in its own directory under `skills/` and ships with a `SKILL.md` that
tells the agent when to use it and how.

Install with [skills.sh](https://skills.sh):

```sh
bunx skills add artmann/skills --skill '*'
```

Drop a skill into your agent's loadout and it picks up new triggers
automatically: search for stock photos, source images for a blog, etc. without
you having to spell out the workflow every time.

## Unsplash

```sh
bunx skills add artmann/skills --skill unsplash
```

Search Unsplash for photographs by keyword and get back a properly-sized,
attribution-ready image URL. Handles the full flow — reading the access key from
`~/.unsplash` (or walking through obtaining one), picking the right orientation,
sizing the URL for the intended use (blog hero, OG card, Instagram, Pinterest,
YouTube thumbnail, and more), generating the photographer attribution snippet,
and triggering the download event Unsplash's API guidelines require. Triggers on
phrases like "find an image of X", "I need a stock photo", "hero image", or "OG
image".

## Content syndication

```sh
bunx skills add artmann/skills --skill content-syndication
```

Take a piece of content already published on your own site and produce
platform-native variations for syndication to Medium, X/Twitter, LinkedIn,
Reddit, Hacker News, Dev.to, Hashnode, Bluesky, Threads, Substack, Facebook, and
Instagram. Each variation carries a contextual backlink to the original — and a
canonical URL on platforms that support one (Medium, Dev.to, Hashnode) — so the
syndication compounds into SEO lift rather than competing with the source for
rankings. Per-platform templates live as separate files so only the chosen
platforms get loaded into context. Triggers on phrases like "syndicate this
post", "turn this into a Twitter thread", "make a LinkedIn version", "cross-post
to Medium", or "repurpose this content".

## Plan implementation

```sh
bunx skills add artmann/skills --skill plan-implementation
```

Create an implementation plan for a new feature or view before writing code. The
plan is built UI-first: user flows, views, loading/empty/error states, and how
mutations are handled (optimistic updates, drafts, intent-based actions). The
data model is then derived from what the UI needs, followed by the services and
endpoints that connect the two - domain-driven, flat APIs, one shared
vocabulary. A final review covers failure modes, validation, authorization, rate
limiting, and queueing, and the plan ends with an ordered build checklist. Plans
are written to `docs/plans/<feature>.md`. Triggers on phrases like "plan this
feature", "create an implementation plan", "how should we build X", or
`/plan-implementation`.
