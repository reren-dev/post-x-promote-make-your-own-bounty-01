// Entry program for post-x-promote-make-your-own-bounty-01 (Node 22,
// standard library only). The entry itself is the X post: one post of the
// entrant's own quoting make.fun's make-your-own-bounty post
// (https://x.com/makefunai/status/2124915864336236646), with a photo of
// its own attached and the play code in its text. All this program does is
// hand the post's address to the gate: it reads POST.json from this
// repository and writes the same bytes to /output/POST.json, where the
// house reads the post's replies, reposts and quotes from X.
//
// POST.json holds the real post's address
// (https://x.com/brrenzi/status/2125002041928089714); the gate reads the
// post itself from X and scores its replies, reposts and quotes.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sourcePath = join(BOT_DIR, 'POST.json');
const targetPath = join(OUTPUT_DIR, 'POST.json');

mkdirSync(OUTPUT_DIR, { recursive: true });

let payload: Buffer;
try {
  payload = readFileSync(sourcePath);
} catch (err) {
  console.error(`cannot read POST.json at ${sourcePath}: ${(err as Error).message}`);
  process.exit(1);
}

// Refuse to hand the gate malformed bytes: POST.json must be a JSON object
// with a url string naming the entrant's own X post.
let parsed: unknown;
try {
  parsed = JSON.parse(payload.toString('utf8'));
} catch (err) {
  console.error(`POST.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}
if (
  typeof parsed !== 'object' ||
  parsed === null ||
  Array.isArray(parsed) ||
  typeof (parsed as { url?: unknown }).url !== 'string' ||
  !/^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/(\w+\/status\/\d+|i\/web\/status\/\d+)$/.test(
    (parsed as { url: string }).url,
  )
) {
  console.error('POST.json must be {"url": "https://x.com/<handle>/status/<id>"}');
  process.exit(1);
}

writeFileSync(targetPath, payload);
