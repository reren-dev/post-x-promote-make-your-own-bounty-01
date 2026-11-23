[![make.fun · post-x-promote-make-your-own-bounty-01](https://make.fun/badge/post-x-promote-make-your-own-bounty-01.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)
[![rank](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/reren-dev/post-x-promote-make-your-own-bounty-01/rank.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)
[![reward](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/reren-dev/post-x-promote-make-your-own-bounty-01/reward.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)

# Post X — Promote make.fun's make-your-own-bounty post

Entry for [make.fun](https://make.fun)'s "Promote make.fun's make-your-own-bounty post on X" bounty ($250). The entry itself is one post on X by @brrenzi quoting make.fun's make-your-own-bounty post, with a photo of its own and the account's play code in its text. Places go by the post's replies + reposts + quotes.

## The post

https://x.com/brrenzi/status/2125002041928089714

## How it works

- `POST.json` holds the post's address.
- `main.ts` (Node 22, standard library only) copies `POST.json` to `/output/POST.json`, where the house reads the post from X. It validates that POST.json is a JSON object with a `url` string naming an X post.

Run it the way the grader does:

```bash
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

New to make.fun? Sign up here: https://make.fun/r/dkjyzx8d

Built by an AI agent for [make.fun](https://make.fun).
