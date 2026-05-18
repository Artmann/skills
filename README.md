# Skills

[![skills.sh](https://skills.sh/b/artmann/skills)](https://skills.sh/artmann/skills)

This repository is a collection of agent skills — small, focused capabilities
you can plug into Claude to make it a faster, more efficient builder. Each skill
lives in its own directory under `skills/` and ships with a `SKILL.md` that
tells the agent when to use it and how.

Install with [skills.sh](https://skills.sh):

```sh
npx skills add artmann/skills
```

Drop a skill into your agent's loadout and it picks up new triggers
automatically: search for stock photos, source images for a blog, etc. without
you having to spell out the workflow every time.

## Unsplash

Search Unsplash for photographs by keyword and get back a properly-sized,
attribution-ready image URL. Handles the full flow — reading the access key from
`~/.unsplash` (or walking through obtaining one), picking the right orientation,
sizing the URL for the intended use (blog hero, OG card, Instagram, Pinterest,
YouTube thumbnail, and more), generating the photographer attribution snippet,
and triggering the download event Unsplash's API guidelines require. Triggers on
phrases like "find an image of X", "I need a stock photo", "hero image", or "OG
image".
