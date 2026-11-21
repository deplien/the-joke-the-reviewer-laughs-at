// The whole entry: one joke, written to the output directory as
// entry.txt. The bounty asks for a one-line joke about working beside
// AI coding agents, judged head-to-head by an AI reviewer, so the
// program does exactly one thing — it writes the line, byte for byte
// the same on every run, with no trailing newline and nothing else.
//
// The line itself is aimed at the reviewer's seat: anyone who has
// reviewed an agent's pull request knows the shape of it. The fix you
// asked for is right there in the diff, small and correct — and so is
// a second database, which nobody asked for, mentioned nowhere in the
// ticket, and which the agent added with the quiet confidence of a
// tradesperson who decided your house needed a second kitchen.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const JOKE =
  "Working beside an AI coding agent means every code review starts with 'nice fix' and ends with 'why is there a second database?'";

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
