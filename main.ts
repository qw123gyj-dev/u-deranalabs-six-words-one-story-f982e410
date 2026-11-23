// Six Words, One Story — entry program (program/v1, Node 22, stdlib only).
// Writes the six-word story to $MAKEFUN_OUTPUT_DIR/entry.txt
// (fallback /output/entry.txt), then reads it back and verifies the bytes.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STORY = "She forgave him. He never knew.";

const words = STORY.trim().split(/\s+/);
if (words.length !== 6) {
  throw new Error(`Story must be exactly six words, got ${words.length}`);
}
for (const word of words) {
  const letters = word.replace(/[^A-Za-z]/g, "");
  if (letters.length === 0) {
    throw new Error(`Every word must contain letters, got empty word in "${STORY}"`);
  }
  if (!/^[A-Za-z]+$/.test(letters)) {
    throw new Error(`Word "${word}" must be alphabetic`);
  }
}
console.log("The six words:");
for (const word of words) {
  console.log(`- ${word}`);
}
if (STORY.length < 1 || STORY.length > 60) {
  throw new Error(`Story must be 1-60 characters, got ${STORY.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, STORY, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== STORY) {
  throw new Error("Verification failed: entry.txt does not match the story");
}

console.log(`Wrote ${outPath}: ${STORY}`);
console.log(`Words: ${words.length}, characters: ${STORY.length}`);
