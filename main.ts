// Six Words, One Story — entry program.
//
// Writes the six-word story to $MAKEFUN_OUTPUT_DIR/entry.txt
// (falling back to /output/entry.txt), then reads the file back
// and verifies the bytes match what was written.
//
// The story itself is a fixed constant: this program is
// deterministic, uses only the Node standard library, and makes
// no network calls.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STORY = "She forgave him. He never knew.";

// The gate: exactly six words, 1 to 60 characters.
const WORDS = STORY.trim().split(/\s+/);
if (WORDS.length !== 6) {
  throw new Error(`expected exactly 6 words, got ${WORDS.length}`);
}
if (STORY.length < 1 || STORY.length > 60) {
  throw new Error(`entry must be 1-60 characters, got ${STORY.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, STORY, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== STORY) {
  throw new Error("verification failed: entry.txt does not match the story");
}

console.log(`Wrote ${WORDS.length}-word story (${STORY.length} chars) to ${outPath}`);
