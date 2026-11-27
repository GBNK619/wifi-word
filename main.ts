// One Word for Your Wi-Fi — make.fun entry (u-tuan-muda-one-word-for-your-wi-fi-a1b4fd72)
// Writes the director-chosen word to MAKEFUN_OUTPUT_DIR/entry.txt,
// then reads it back to verify the file holds exactly that word.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Asthmatic";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, WORD + "\n", "utf8");

// Read-back validation: the file must hold exactly the intended word
// (one word, 1–20 characters) plus a single trailing newline.
const readBack = readFileSync(entryPath, "utf8");
if (readBack !== WORD + "\n") {
  throw new Error(`entry.txt mismatch: expected ${JSON.stringify(WORD + "\n")}, got ${JSON.stringify(readBack)}`);
}
if (WORD.length < 1 || WORD.length > 20 || /\s/.test(WORD)) {
  throw new Error(`word fails the gate: ${JSON.stringify(WORD)}`);
}
console.log(`wrote entry.txt: ${WORD} (read-back verified)`);
