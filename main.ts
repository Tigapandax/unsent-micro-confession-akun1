import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "confession.txt"), "utf8").replace(/\r\n/g, "\n");
const body = text.endsWith("\n") ? text.slice(0, -1) : text;
const lines = body.split("\n");
if (lines.length !== 2) { console.error(`FAIL: expected exactly 2 lines, got ${lines.length}`); process.exit(1); }
if (!lines[0].startsWith("To: ") || lines[0].length <= 4) { console.error("FAIL: first line must be a To: line"); process.exit(1); }
const message = lines[1];
if (message.length === 0 || message.length > 200) { console.error(`FAIL: message must be 1-200 characters, got ${message.length}`); process.exit(1); }
if (body.length < 1 || body.length > 260) { console.error(`FAIL: entry must be 1-260 characters, got ${body.length}`); process.exit(1); }
if (body.trim().length === 0) { console.error("FAIL: entry is only whitespace"); process.exit(1); }
const outDir = "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), body + "\n");
console.log(body);
console.log(`OK: ${body.length}/260 characters, two-part confession.`);
