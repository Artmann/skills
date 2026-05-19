# Twitter / X

**Bucket:** Native thread. Backlink in the final tweet only — algorithms
suppress threads that exist to drive clicks off-platform, so the thread must
deliver standalone value first.

## Format

Numbered thread, one block per tweet, separated by blank lines. Use this exact
shape in the output file so the user can copy-paste each tweet in order:

```
1/
<hook tweet, ≤ 280 chars, no number inside the body>

2/
<tweet, ≤ 280 chars>

3/
<tweet, ≤ 280 chars>

...

N/
Full breakdown: <source_url>
```

The `1/`, `2/`, etc. labels are for the user's reference — they don't get typed
into Twitter (the platform handles thread numbering).

## Length

Strict ≤ 280 characters per tweet. Count emoji as 2 chars each. Links count as
23 chars regardless of actual length (Twitter's t.co shortener).

## Thread length

Aim for 5–12 tweets. Below 5, just post a single tweet. Above 12, readers drop
off — split the source into two threads scheduled days apart.

## Hook tweet

The hook tweet does most of the work. Use one of these proven shapes:

- **Contrarian claim:** "Some people say backlinks are dead in 2025."
- **Surprising stat:** "I analyzed 100 sites that doubled their traffic. Plot
  twist: …"
- **Curiosity gap:** "Here's what actually works now:"
- **Personal stake:** "I spent 6 months testing X. Here's what I found:"

Pull from the source's own hook if it already has one of these shapes — don't
invent.

No hashtag in the hook tweet. No link in the hook tweet (Twitter deprioritizes
hook tweets with links).

## Body tweets

One idea per tweet. If the source has numbered points (1, 2, 3…), each point
gets its own tweet, prefixed `1.`, `2.`, etc. inside the tweet body (separate
from the `N/` thread label).

Line breaks inside a tweet improve readability. Use them.

## Final tweet

Always:

```
N/
Full breakdown: <source_url>
```

Optionally append one line of "if you found this useful, follow me for more on
<topic>" — but only if the source had its own CTA in that shape. Don't
manufacture.

## Hashtags

0–1 hashtag across the entire thread. If used, put it in a body tweet, not the
hook or the final link tweet.

## Emoji

Match the source. If the source uses none, the thread uses none.

## Backlink placement

Final tweet only. Never in the hook. Never mid-thread.
