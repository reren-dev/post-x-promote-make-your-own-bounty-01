// Entry program for post-x-promote-make-your-own-bounty-01 (Node 22,
// standard library only). The entry itself is the X post: one post of the
// entrant's own quoting make.fun's make-your-own-bounty post
// (https://x.com/makefunai/status/2124915864336236646), with a photo of
// its own attached and the play code in its text. All this program does is
// hand the post's address to the gate: it reads POST.json from this
// repository and writes the same bytes to /output/POST.json, where the
// house reads the post's replies, reposts and quotes from X.
//
// POST.json still holds the placeholder address, so the gate refuses this
// entry as it stands. Replace the placeholder with the real post's address
// (https://x.com/<handle>/status/<id>) before submitting.
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

// Refuse to hand the gate malformed bytes: the address must be JSON.
try {
  JSON.parse(payload.toString('utf8'));
} catch (err) {
  console.error(`POST.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

writeFileSync(targetPath, payload);
