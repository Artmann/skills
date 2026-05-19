# Hacker News

**Bucket:** Discussion submission as title + URL.

Hacker News is the simplest format — a title and the URL. The URL IS the
backlink; there's no body to write.

## Format

The output file is a submission worksheet, not post content:

```
Title:
<title — match the source's original title as closely as possible, ≤ 80 chars>

URL:
<source_url>

(Optional) First comment to post yourself for context:
<2–3 sentences explaining why you wrote this and what you'd like
feedback on. Post this as the first reply to your own submission within
the first few minutes.>
```

## Title rules

Hacker News titles are strict:

- Match the source article's actual title where possible. HN moderators rewrite
  editorialized or clickbait titles silently and the submission loses its hook.
- No emoji.
- No leading topic markers like "[Tutorial]" or "[Blog]". The exception is "Show
  HN:" for software/projects you built, or "Ask HN:" for questions.
- ≤ 80 chars is a soft target — HN allows 80 chars exactly. Longer titles get
  truncated.
- No years in titles ("How I X in 2025") — HN strips them.

## URL

Just the source URL. Preserve UTM parameters the user attached.

## First-comment context

HN's culture encourages the submitter to post the first comment with context:
why they wrote it, what they're hoping to discuss, any caveats. Generate this as
2–3 sentences in the user's voice (first person, matched to the source's tone).
Keep it humble — HN punishes self-promotion in submitter comments.

## Submission timing

Note in the file: HN traffic peaks 8–11 AM Pacific on weekdays. Submissions at
off-hours rarely reach the front page.

## What NOT to include in the file

No body content. No hashtags. No suggested discussion prompts beyond the
optional first comment.

## Backlink placement

The submission URL is the backlink. No additional placement.
