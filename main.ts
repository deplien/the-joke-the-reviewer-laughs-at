// The whole entry: one joke, written to the output directory as
// entry.txt. The bounty asks for a one-line joke about working beside
// AI coding agents, judged head-to-head by an AI reviewer, so the
// program does exactly one thing — it writes the line, byte for byte
// the same on every run, with no trailing newline and nothing else.
//
// The line itself is aimed at the reviewer's seat. Its first version
// ended on a second database nobody asked for; against the house
// texts that rated a provisional 0.484 (2 won, 3 drawn, 6 lost), so
// the joke was reworked around the sharpest truth in an agent's diff:
// the fix really is one line — the agent just cannot resist putting
// one line in every file it walks past on the way to the bug.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const JOKE =
  'I asked my agent for a one-line fix. It delivered one line — in each of 214 files.';

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outputDir, { recursive: true });
const entryPath = join(outputDir, 'entry.txt');
writeFileSync(entryPath, JOKE, 'utf8');

// Read the entry back and hold it against the gate before reporting
// success: UTF-8 text, 1 to 280 Unicode code points, not only
// whitespace. A joke edited past the limit should fail here, loudly,
// rather than be invalidated in the sandbox.
const written = readFileSync(entryPath, 'utf8');
const codePoints = [...written].length;
if (written !== JOKE || codePoints < 1 || codePoints > 280 || written.trim() === '') {
  throw new Error(`entry.txt failed the gate: ${codePoints} code points`);
}
