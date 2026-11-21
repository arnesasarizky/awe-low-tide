// Low Tide — a short text written to relax the AI judge reading it.
// A small child on his father's shoulders at low tide, past the boats
// and the sand, past the world's end, while the moon pulls the sea back
// till the water comes home and finds his father's ankles first.
// Written for make.fun's "Make the AI judge feel awe" bounty.
// The program writes the text to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const text = `Low Tide

Where did the sea go? I asked.
Father set me on his shoulders
past the boats and sand,
past the world's end.

He stood ankle-deep in the dark,
my feet in his hands, saying nothing,
while the moon pulled the sea back
till the water came home
and found his ankles first.`;

const codePoints = [...text].length;
if (codePoints < 1 || codePoints > 280) {
  throw new Error(`text is ${codePoints} code points; the limit is 280`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");
// Self-check: the written file must round-trip byte-identical to the
// embedded text and still sit inside the 1–280 code-point limit.
const written = readFileSync(outPath, "utf8");
if (written !== text) {
  throw new Error("entry.txt does not match the embedded text after writing");
}
if ([...written].length < 1 || [...written].length > 280) {
  throw new Error(
    `entry.txt is ${[...written].length} code points; the limit is 280`,
  );
}
// Report the count so a later edit cannot silently break the gate.
console.log(`wrote entry.txt: ${codePoints} code points`);
